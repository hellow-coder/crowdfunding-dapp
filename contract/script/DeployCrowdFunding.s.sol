// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";

contract DeployMyContract is Script {
    function run() external {
        vm.startBroadcast();
        // deploy here
        vm.stopBroadcast();
    }
}