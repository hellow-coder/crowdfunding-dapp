// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {Crowdfunding} from "../src/Crowdfunding.sol";

contract CrowdfundingTest is Test {
    Crowdfunding public crowdfunding;

    function setUp() public {
        crowdfunding = new Crowdfunding();
    }

    function test_Example() public {
        // test here
    }
}