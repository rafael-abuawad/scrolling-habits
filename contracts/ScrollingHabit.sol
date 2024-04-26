// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScrollingHabit is ERC721, Ownable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                       CUSTOM ERRORS                        */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @dev The caller is not the owner of the NFT
    error ScrollingHabit__InvalidTokenOwner();

    /// @dev Tryed to interact with a differente type of Habit intended
    error ScrollingHabit__IsNotNumeric();

    /// @dev Cannot log a habit more than once a day
    error ScrollingHabit__NotEnoughTimeHasPassed();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                           EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @dev Emitted when a `token` `amount` is transferred from self to `owner`.
    event TokenRecovery(address indexed token, uint256 amount);

    /// @dev Emitted when a new entry (habit update) is registred
    event EntryAdded(address indexed owner, uint256 tokenId, uint256 amount);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @dev Token ID counter
    uint256 private _nextTokenId;

    /// @dev One day in seconds, used to limit the entrys at
    ///      one per day.
    uint256 private constant DELAY = 86400;

    /// @dev Mapping of habits to a specific token ID
    mapping(uint256 tokenId => Habit habit) private _habits;
    mapping(uint256 tokenId => Entry[] entries) private _entries;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STRUCTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @dev A Habit struct.
    struct Habit {
        address owner;
        string title;
        string metric;
        bool isNumeric;
    }

    /// @dev A Habit entry struct.
    struct Entry {
        uint256 amount;
        uint256 timestamp;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         CONSTRUCTOR                        */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    constructor(address initialOwner) ERC721("Scrolling Habit", "SCROLLHABIT") Ownable(initialOwner) {}

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                           ERC721                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function safeMint(string memory title, string memory metric) external {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _habits[tokenId] = Habit({owner: msg.sender, title: title, metric: metric, isNumeric: true});
    }

    function safeMint(string memory title) external {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _habits[tokenId] = Habit({owner: msg.sender, title: title, metric: "", isNumeric: false});
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                     CUSTOM METHODS                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function recoverToken(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(address(msg.sender), amount);
        emit TokenRecovery(token, amount);
    }

    function entry(uint256 tokenId) external {
        if (ownerOf(tokenId) != msg.sender) {
            revert ScrollingHabit__InvalidTokenOwner();
        }

        if (_entries[tokenId].length != 0) {
            uint256 idx = _entries[tokenId].length - 1;
            if (block.timestamp < _entries[tokenId][idx].timestamp + DELAY) {
                revert ScrollingHabit__NotEnoughTimeHasPassed();
            }
        }

        _entries[tokenId].push(Entry({amount: 1, timestamp: block.timestamp}));
        emit EntryAdded(msg.sender, tokenId, 1);
    }

    function entry(uint256 tokenId, uint256 amount) external {
        if (ownerOf(tokenId) != msg.sender) {
            revert ScrollingHabit__InvalidTokenOwner();
        }
        
        if (_entries[tokenId].length != 0) {
            uint256 idx = _entries[tokenId].length - 1;
            if (block.timestamp < _entries[tokenId][idx].timestamp + DELAY) {
                revert ScrollingHabit__NotEnoughTimeHasPassed();
            }
        }

        _entries[tokenId].push(Entry({amount: amount, timestamp: block.timestamp}));
        emit EntryAdded(msg.sender, tokenId, amount);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          GETTERS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function getHabit(uint256 tokenId) public view returns (Habit memory) {
        if (ownerOf(tokenId) != msg.sender) {
            revert ScrollingHabit__InvalidTokenOwner();
        }
        return _habits[tokenId];
    }

    function getHabits() public view returns (Habit[] memory) {
        uint256 tokenCount = _nextTokenId;
        uint256 habitCount = 0;
        for (uint256 i = 0; i < tokenCount; i++) {
            if (_habits[i].owner == msg.sender) {
                habitCount++;
            }
        }

        uint256 j = 0;
        Habit[] memory habitList = new Habit[](habitCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            if (_habits[i].owner == msg.sender) {
                habitList[j] = _habits[i];
                j++;
            }
        }

        return habitList;
    }

    function getEntries(uint256 tokenId) public view returns (Entry[] memory) {

        
    }
}
