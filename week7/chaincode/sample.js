'use strict';

const shim = require('fabric-shim');
const util = require('util');

let ChaincodeTest = class {
    async Init(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);
        console.info('=========== Instantiated Chaincode 01 ===========');
        return shim.success();
    }

    async Invoke(stub) {
        console.info('Transaction ID: ' + stub.getTxID());
        console.info(util.format('Args: %j', stub.getArgs()));

        let ret = stub.getFunctionAndParameters();
        console.info(ret);

        let method = this[ret.fcn];
        if (!method) {
            console.log('no function of name:' + ret.fcn + ' found');
            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }
        try {
            let payload = await method(stub, ret.params, this);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.error(err);
        }
    }

    async UserEnter(stub, args, thisClass) {
        if(args.length != 3) {
            throw new Error('Incorrect argument number.');
        }

        if (args[0].length <= 0) {
            throw new Error('1st argument must be a non-empty string, user ID');
        }
        if (args[1].length <= 0) {
            throw new Error('2nd argument must be a non-empty string, user name');
        }
        if (args[2].length <= 0) {
            throw new Error('3rd argument must be a non-empty string, beacon ID');
        }

        let userID = parseInt(args[0]);
        let username = args[1];
        let beaconID = parseInt(args[2]);

        if (typeof userID !== 'number' && typeof beaconID !== 'number') {
            throw new Error('Both user ID and beaconID should be numeric');
        }

        let beaconInteractionEnter = {
            'docType' : 'UserEnterBeacon',
            'userID' : userID,
            'username' : username,
            'beaconID' : beaconID
        };

        await stub.putState(username, Buffer.from(JSON.stringify(beaconInteractionEnter)));

        console.info('Stored user-beacon interaction');
    }

    async UserLeave(stub, args, thisClass) {

    }

    async QueryByUser(stub, args, thisClass) {

    }

    async QueryByBeacon(stub, args, thisClass) {

    }
}

shim.start(new ChaincodeTest());