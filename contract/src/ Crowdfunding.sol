// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Crowdfunding {
    struct Campaign {
        string name;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address manager;
        address[] donators;
    }

    uint256 public campaignCount = 0;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public donations;

    // custom errros ========================>

// create campaign
    error CrowdFunding__EmptyName();
    error CrowdFunding__InvalidTarget();
    error CrowdFunding__InvalidDeadline();
    error CrowdFunding__CampaignNotFound();

  //  dontate  
error CrowdFunding__DeadlinePassed();
error CrowdFunding__InvalidDonation();
error CrowdFunding__ManagerCannotDonate();
error CrowdFunding__NotManager();

// withdraw 
error CrowdFunding__DeadlineNotPassed();
error CrowdFunding__TargetNotReached();
error CrowdFunding__NothingToWithdraw();
error CrowdFunding__TransferFailed();

// refund
 error CrowdFunding__TargetAlreadyReached();
 error CrowdFunding__NotDonator();
 error CrowdFunding__NoDonationFound();


//  ==========================================>

    // Create Campaign
    function createCampaign(
        string memory _name,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        if (bytes(_name).length == 0) revert CrowdFunding__EmptyName();
        if (_target == 0) revert CrowdFunding__InvalidTarget();
        if (_deadline <= block.timestamp)
            revert CrowdFunding__InvalidDeadline();

        //genrate new campaign id
        campaignCount += 1;
        campaigns[campaignCount] = Campaign({// save kiya

            name: _name,
            target: _target,
            deadline: _deadline,
            amountCollected: 0,
            manager: msg.sender,
            donators: new address[](0)
        });

        return campaignCount; // ID bhejo wapas
    }

    // Donate
    function donate(uint256 _id) public payable {
         Campaign storage campaign = campaigns[_id];

       if (campaign.manager == address(0)) revert CrowdFunding__CampaignNotFound(); // pehle exist check
if (campaign.manager == msg.sender) revert CrowdFunding__ManagerCannotDonate();
    if (block.timestamp > campaign.deadline) revert CrowdFunding__DeadlinePassed();
    if (msg.value == 0) revert CrowdFunding__InvalidDonation();

    campaign.amountCollected += msg.value;
    campaign.donators.push(msg.sender);

    donations[_id][msg.sender] += msg.value;   // NAYI LINE


    }



    // Withdraw
    function withdraw( uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        if (campaign.manager == address(0)) revert CrowdFunding__CampaignNotFound();
    if (msg.sender != campaign.manager) revert CrowdFunding__NotManager();
    if (block.timestamp < campaign.deadline) revert CrowdFunding__DeadlineNotPassed();
    if (campaign.amountCollected < campaign.target) revert CrowdFunding__TargetNotReached();
     if (campaign.amountCollected == 0) revert CrowdFunding__NothingToWithdraw();

     uint256 amountToSend = campaign.amountCollected;    // amount yaad rakh liya
    campaign.amountCollected = 0;   
     (bool success, ) = payable(campaign.manager).call{value: amountToSend}("");
    if (!success) revert CrowdFunding__TransferFailed();

    }

    // Refund
    function refund( uint256 _id ) public {
        Campaign storage campaign = campaigns[_id];
          if (campaign.manager == address(0)) revert CrowdFunding__CampaignNotFound();
    if (block.timestamp < campaign.deadline) revert CrowdFunding__DeadlineNotPassed();
    if (campaign.amountCollected >= campaign.target) revert CrowdFunding__TargetAlreadyReached();
    uint256 donatedAmount = donations[_id][msg.sender];
      if (donatedAmount == 0) revert CrowdFunding__NoDonationFound();

          // State pehle update karo (reentrancy se bachao)
    donations[_id][msg.sender] = 0;
    campaign.amountCollected -= donatedAmount;
 // Phir transfer karo
    (bool success, ) = payable(msg.sender).call{value: donatedAmount}("");
    if (!success) revert CrowdFunding__TransferFailed();

    }

    // Get Single Campaign
    function getCampaign(uint256 _id) public view returns (Campaign memory) {
        if (campaigns[_id].manager == address(0)) revert CrowdFunding__CampaignNotFound();
    return campaigns[_id];
    }

    // Get All Campaigns

  function getAllCampaigns() public view returns (Campaign[] memory) {
    Campaign[] memory allCampaigns = new Campaign[](campaignCount);
    for (uint256 i = 1; i <= campaignCount; i++) {
        allCampaigns[i - 1] = campaigns[i];
    }
    return allCampaigns;
}
}
