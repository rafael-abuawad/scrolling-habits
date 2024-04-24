// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScrollingHabit is ERC721, Ownable {
    error ERC721InvalidTokenOwner();
    error ERC721HabitIsNotNumeric();

    uint256 private _nextTokenId;

    struct Habit {
        string title;
        string metric;
        uint256 entries;
        bool isNumeric;
        address owner;
    }

    mapping (uint256 tokenId => Habit habit) private _habits;

    event TokenRecovery(address indexed token, uint256 amount);
    event Entry(address indexed owner, uint256 tokenId, uint256 amount);

    constructor(address initialOwner)
        ERC721("Checkbox Scrolling Habit", "CHECKSH")
        Ownable(initialOwner)
    {}

    function safeMint(string memory title, string memory metric) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _habits[tokenId] = Habit ({
            title: title,
            metric: metric,
            entries: 0,
            isNumeric: true,
            owner: msg.sender
        });
    }

    function safeMint(string memory title) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _habits[tokenId] = Habit ({
            title: title,
            metric: "",
            entries: 0,
            isNumeric: false,
            owner: msg.sender
        });
    }

    function recoverToken(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(address(msg.sender), amount);
        emit TokenRecovery(token, amount);
    }

    function entry(uint256 tokenId) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert ERC721InvalidTokenOwner();
        }
        _habits[tokenId].entries++;
        emit Entry(msg.sender, tokenId, 1);
    }

    function entry(uint256 tokenId, uint256 amount) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert ERC721InvalidTokenOwner();
        }
        Habit memory habit = _habits[tokenId];
        if (!habit.isNumeric) {
            revert ERC721HabitIsNotNumeric();
        }
        habit.entries += amount;
        emit Entry(msg.sender, tokenId, amount);
    }

    function habits() public view returns (Habit[] memory) {
        uint256 tokenCount = _nextTokenId;
        uint256 habitCount = 0;
        for(uint256 i = 0; i < tokenCount; i++) {
            if (_habits[i].owner == msg.sender) {
                habitCount++;
            }
        }

        uint256 j = 0;
        Habit[] memory list = new Habit[](habitCount);
        for(uint256 i = 0; uint256j = 0; i < tokenCount; i++) {
            if (_habits[i].owner == msg.sender) {
                list[j] = _habits[i]; 
                j++;
            }
        }

        return list;
    }
}
