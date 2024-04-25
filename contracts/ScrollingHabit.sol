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
    error ScrollingHabitInvalidTokenOwner();

    /// @dev Tryed to interact with a differente type of Habit intended
    error ScrollingHabitIsNotNumeric();
    
    /// @dev Cannot log a habit more than once a day
    error ScrollingHabitNotEnoughTimeHasPassed();


    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                           EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @dev Emitted when a `token` `amount` is transferred from self to `owner`.
    event TokenRecovery(address indexed token, uint256 amount);

    /// @dev Emitted when a new entry (habit update) is registred
    event Entry(address indexed owner, uint256 tokenId, uint256 amount);


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


    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STRUCTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /// @dev A Habit struct.
    struct Habit {
        string title;
        string metric;
        uint256 entries;
        bool isNumeric;
        address owner;
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
        _habits[tokenId] = Habit({
            title: title,
            metric: metric,
            entries: 0,
            isNumeric: true,
            owner: msg.sender,
            timestamp: block.timestamp - DELAY - 1
        });
    }

    function safeMint(string memory title) external {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _habits[tokenId] = Habit({
            title: title,
            metric: "",
            entries: 0,
            isNumeric: false,
            owner: msg.sender,
            timestamp: block.timestamp - DELAY - 1
        });
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
            revert ScrollingHabitInvalidTokenOwner();
        }
        Habit storage habit = _habits[tokenId];
        if (block.timestamp < habit.timestamp + DELAY) {
            revert ScrollingHabitNotEnoughTimeHasPassed();
        }
        habit.entries++;
        habit.timestamp = block.timestamp;
        emit Entry(msg.sender, tokenId, 1);
    }

    function entry(uint256 tokenId, uint256 amount) external {
        if (ownerOf(tokenId) != msg.sender) {
            revert ScrollingHabitInvalidTokenOwner();
        }
        Habit storage habit = _habits[tokenId];
        if (block.timestamp < habit.timestamp + DELAY) {
            revert ScrollingHabitNotEnoughTimeHasPassed();
        }
        if (!habit.isNumeric) {
            revert ScrollingHabitIsNotNumeric();
        }
        habit.entries += amount;
        habit.timestamp = block.timestamp;
        emit Entry(msg.sender, tokenId, amount);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          GETTERS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function getHabit(uint256 tokenId) public view returns (Habit memory) {
        if (ownerOf(tokenId) != msg.sender) {
            revert ScrollingHabitInvalidTokenOwner();
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
}
