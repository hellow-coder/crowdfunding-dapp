// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {Crowdfunding} from "../src/Crowdfunding.sol";
import {DeployCrowdfunding} from "../script/DeployCrowdFunding.s.sol";

contract CrowdfundingTest is Test {
    Crowdfunding public crowdfunding;

    address manager = makeAddr("manager");
    address donor1  = makeAddr("donor1");
    address donor2  = makeAddr("donor2");

    string  constant NAME     = "Save Trees";
    uint256 constant TARGET   = 1 ether;
    uint256 constant DEADLINE = 30 days;

    function setUp() public {
        crowdfunding = new Crowdfunding();
    }

    function _createValidCampaign() internal returns (uint256 id) {
        vm.prank(manager);
        id = crowdfunding.createCampaign(NAME, TARGET, block.timestamp + DEADLINE);
    }

 

    function test_CreateCampaign() public {
        vm.prank(manager);
        uint256 id = crowdfunding.createCampaign(NAME, TARGET, block.timestamp + DEADLINE);

        assertEq(id, 1);

        Crowdfunding.Campaign memory c = crowdfunding.getCampaign(id);
        assertEq(c.name, NAME);
        assertEq(c.target, TARGET);
        assertEq(c.manager, manager);
        assertEq(c.amountCollected, 0);
        assertEq(c.donators.length, 0);
    }

    function test_CampaignCountIncrements() public {
        _createValidCampaign();
        _createValidCampaign();
        assertEq(crowdfunding.campaignCount(), 2);
    }

    function test_RevertIf_EmptyName() public {
        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__EmptyName.selector);
        crowdfunding.createCampaign("", TARGET, block.timestamp + DEADLINE);
    }

    function test_RevertIf_ZeroTarget() public {
        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__InvalidTarget.selector);
        crowdfunding.createCampaign(NAME, 0, block.timestamp + DEADLINE);
    }

    function test_RevertIf_PastDeadline() public {
        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__InvalidDeadline.selector);
        crowdfunding.createCampaign(NAME, TARGET, block.timestamp - 1);
    }

    function test_RevertIf_DeadlineEqualsCurrentTime() public {
        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__InvalidDeadline.selector);
        crowdfunding.createCampaign(NAME, TARGET, block.timestamp);
    }


    function test_Donate() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.5 ether}(id);

        Crowdfunding.Campaign memory c = crowdfunding.getCampaign(id);
        assertEq(c.amountCollected, 0.5 ether);
        assertEq(c.donators.length, 1);
        assertEq(c.donators[0], donor1);
    }

    function test_DonationTrackedPerDonor() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 2 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.5 ether}(id);

        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        assertEq(crowdfunding.donations(id, donor1), 0.8 ether);
    }

    function test_MultipleDonors() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.deal(donor2, 1 ether);

        vm.prank(donor1);
        crowdfunding.donate{value: 0.4 ether}(id);

        vm.prank(donor2);
        crowdfunding.donate{value: 0.3 ether}(id);

        Crowdfunding.Campaign memory c = crowdfunding.getCampaign(id);
        assertEq(c.amountCollected, 0.7 ether);
        assertEq(c.donators.length, 2);
    }

    function test_RevertIf_DonateToNonExistentCampaign() public {
        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__CampaignNotFound.selector);
        crowdfunding.donate{value: 0.5 ether}(999);
    }

    function test_RevertIf_ManagerDonates() public {
        uint256 id = _createValidCampaign();

        vm.deal(manager, 1 ether);
        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__ManagerCannotDonate.selector);
        crowdfunding.donate{value: 0.5 ether}(id);
    }

    function test_RevertIf_DonateAfterDeadline() public {
        uint256 id = _createValidCampaign();

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__DeadlinePassed.selector);
        crowdfunding.donate{value: 0.5 ether}(id);
    }

    function test_RevertIf_ZeroDonation() public {
        uint256 id = _createValidCampaign();

        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__InvalidDonation.selector);
        crowdfunding.donate{value: 0}(id);
    }

    function test_Withdraw() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 2 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 1 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        uint256 balanceBefore = manager.balance;
        vm.prank(manager);
        crowdfunding.withdraw(id);

        assertEq(manager.balance, balanceBefore + 1 ether);
    }

    function test_WithdrawResetsAmountCollected() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 2 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 1 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(manager);
        crowdfunding.withdraw(id);

        Crowdfunding.Campaign memory c = crowdfunding.getCampaign(id);
        assertEq(c.amountCollected, 0);
    }

    function test_RevertIf_NonManagerWithdraws() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 1 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__NotManager.selector);
        crowdfunding.withdraw(id);
    }

    function test_RevertIf_WithdrawBeforeDeadline() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 2 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 1 ether}(id);

        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__DeadlineNotPassed.selector);
        crowdfunding.withdraw(id);
    }

    function test_RevertIf_TargetNotReached() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__TargetNotReached.selector);
        crowdfunding.withdraw(id);
    }

    function test_RevertIf_WithdrawFromNonExistentCampaign() public {
        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__CampaignNotFound.selector);
        crowdfunding.withdraw(999);
    }

    function test_RevertIf_NothingToWithdraw() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 2 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 1 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(manager);
        crowdfunding.withdraw(id); // pehli baar

        vm.prank(manager);
        vm.expectRevert(Crowdfunding.CrowdFunding__TargetNotReached.selector);
        crowdfunding.withdraw(id); // doosri baar
    }

  

    function test_Refund() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        uint256 balanceBefore = donor1.balance;
        vm.prank(donor1);
        crowdfunding.refund(id);

        assertEq(donor1.balance, balanceBefore + 0.3 ether);
    }

    function test_RefundResetsDonation() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(donor1);
        crowdfunding.refund(id);

        assertEq(crowdfunding.donations(id, donor1), 0);
    }

    function test_RefundUpdatesAmountCollected() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(donor1);
        crowdfunding.refund(id);

        Crowdfunding.Campaign memory c = crowdfunding.getCampaign(id);
        assertEq(c.amountCollected, 0);
    }

    function test_RevertIf_RefundBeforeDeadline() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__DeadlineNotPassed.selector);
        crowdfunding.refund(id);
    }

    function test_RevertIf_RefundWhenTargetReached() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 2 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 1 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__TargetAlreadyReached.selector);
        crowdfunding.refund(id);
    }

    function test_RevertIf_RefundFromNonExistentCampaign() public {
        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__CampaignNotFound.selector);
        crowdfunding.refund(999);
    }

    function test_RevertIf_NonDonatorRefunds() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(donor2);
        vm.expectRevert(Crowdfunding.CrowdFunding__NoDonationFound.selector);
        crowdfunding.refund(id);
    }

    function test_RevertIf_DoubleRefund() public {
        uint256 id = _createValidCampaign();

        vm.deal(donor1, 1 ether);
        vm.prank(donor1);
        crowdfunding.donate{value: 0.3 ether}(id);

        vm.warp(block.timestamp + DEADLINE + 1);

        vm.prank(donor1);
        crowdfunding.refund(id); // pehli baar ok

        vm.prank(donor1);
        vm.expectRevert(Crowdfunding.CrowdFunding__NoDonationFound.selector);
        crowdfunding.refund(id); // doosri baar revert
    }

   

    function test_GetCampaign() public {
        uint256 id = _createValidCampaign();
        Crowdfunding.Campaign memory c = crowdfunding.getCampaign(id);
        assertEq(c.manager, manager);
        assertEq(c.name, NAME);
    }

    function test_RevertIf_GetNonExistentCampaign() public {
        vm.expectRevert(Crowdfunding.CrowdFunding__CampaignNotFound.selector);
        crowdfunding.getCampaign(999);
    }

    function test_GetAllCampaigns() public {
        _createValidCampaign();
        _createValidCampaign();
        _createValidCampaign();

        Crowdfunding.Campaign[] memory all = crowdfunding.getAllCampaigns();
        assertEq(all.length, 3);
    }

    function test_GetAllCampaigns_Empty() public view {
        Crowdfunding.Campaign[] memory all = crowdfunding.getAllCampaigns();
        assertEq(all.length, 0);
    }

    function test_DeployScript() public {
    DeployCrowdfunding deployer = new DeployCrowdfunding();
    Crowdfunding cf = deployer.run();
    assert(address(cf) != address(0));
}
}