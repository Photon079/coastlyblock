// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ProjectToken
 * @dev ERC20 token for NGO project funding
 * @notice This token is used to reward NGOs when admin approves their projects
 */
contract ProjectToken is ERC20, Ownable {
    uint8 private constant DECIMALS = 18;
    
    // Events
    event TokensMinted(address indexed to, uint256 amount, string reason);
    
    /**
     * @dev Constructor that gives the deployer the initial ownership
     * @param initialOwner The address that will own the contract
     */
    constructor(address initialOwner) ERC20("ProjectToken", "PTK") Ownable(initialOwner) {
        // Initial supply can be 0, tokens will be minted as needed
    }
    
    /**
     * @dev Returns the number of decimals used to get its user representation
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }
    
    /**
     * @dev Mint tokens to a specific address
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint (in wei, considering 18 decimals)
     * @notice Only the contract owner (admin) can call this function
     * @notice This function is called when admin approves NGO projects
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "ProjectToken: cannot mint to zero address");
        require(amount > 0, "ProjectToken: amount must be greater than 0");
        
        _mint(to, amount);
        emit TokensMinted(to, amount, "Project approved by admin");
    }
    
    /**
     * @dev Mint tokens to multiple addresses in a single transaction
     * @param recipients Array of addresses that will receive tokens
     * @param amounts Array of amounts corresponding to each recipient
     * @notice Only the contract owner can call this function
     * @notice Useful for batch approving multiple NGO projects
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "ProjectToken: arrays length mismatch");
        require(recipients.length > 0, "ProjectToken: empty arrays");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "ProjectToken: cannot mint to zero address");
            require(amounts[i] > 0, "ProjectToken: amount must be greater than 0");
            
            _mint(recipients[i], amounts[i]);
            emit TokensMinted(recipients[i], amounts[i], "Batch project approval");
        }
    }
    
    /**
     * @dev Get the total supply of tokens
     * @return The total amount of tokens in circulation
     */
    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }
    
    /**
     * @dev Emergency function to transfer ownership
     * @param newOwner The address of the new owner
     * @notice Only current owner can transfer ownership
     */
    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "ProjectToken: new owner is the zero address");
        super.transferOwnership(newOwner);
    }
}