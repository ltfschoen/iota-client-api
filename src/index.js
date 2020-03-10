require('dotenv').config();

const IOTA = require('iota.lib.js');
const iota = new IOTA({
	host: "http://iota.hopto.org", //'http://127.0.0.1',
	port: 15600 //14265
});

// Check node info (node version, footprint) and processing state (pending txs)
iota.api.getNodeInfo((error, nodeInfo) => {
  	if (error) {
    	console.error('getNodeInfo error', error);
  	} else {
		console.log('getNodeInfo result', nodeInfo);
  	}
});

// Generate IOTA address to send transactions to using the API
const seed = process.env.SENDER_IOTA_SEED;

iota.api.getNewAddress(seed, (error, address) => {
   	if (error) {
		console.error('getNewAddress error', error);
   	} else {
    	console.log('new address generated: ', address);
   	}
});

// Transfer tokens (Lock) to IOTAs tangle
const DEPTH = 3; // IOTA constant defining how deep to search for the tips in the Tangle
const MIN_WEIGHT_MAGNITUDE = 16; // IOTA constant defining the difficulty of PoW
const MESSAGE = 'My DHX Address is: DHX123. Lock period: 3-months';

const transfers = [
    {
        // Recipient IOTA address to send the transaction to
        address: process.env.RECIPIENT_IOTA_ADDRESS,
        // Amount of IOTA tokens to transfer
        value: 42,
        // Comments to add to the transaction
        message: iota.utils.toTrytes(MESSAGE)        
    }
]

const options = {
    // IOTA addresses of the wallets to use to fund this transfer
    inputs: ['ZISNLNSKMPDOORSSFRCBGQOPY9BI9SONMTDHJJDWBTTCYLFV9PQ9VSWNI9FHEAEFGROGZ9YHSMZYOGFQG']
}

// Transfer by sending a transfer object that returns a transaction object.
// Obtain the transaction object's transaction hash property and paste it at
// the online Tangle Viewer https://thetangle.org/ to view the transaction details.
// If the transaction is in the "Pending" state the transaction was properly attached to the Tangle,
// although it was not yet validated by other transactions in the Tangle tree
// and we need to wait until it gets into the "Confirmed" state within a few minutes.
iota.api.sendTransfer(seed, DEPTH, MIN_WEIGHT_MAGNITUDE, transfers, options, (error, transactions) => {
  	if (error) {
		console.error('sendTransfer error', error);
  	} else {
		console.log('transactions sent!', transactions);
  	}
});

// Incase the transaction becomes attached to the part of the tree that will never be validated,
// either because there were too many tips in the Tangle tree waiting for validation so it gets
// "forgotten" by the tip selection algorithm (the tip selection algorithm is biased towards the
// transactions from the top of the tree) or it happened to get attached to the subtree that yielded incorrect,
// then in these cases our transaction stays in the "Pending" state and we need to fix the problem by
// "reattaching" our transfers (called "bundle") to another part of the Tangle tree by periodically
// running the following code.
// In this procedure we are adding more duplicates to the Tangle. Replay transaction is a separate transaction.
// It is also necessary to track the "inclusion state" (status) of both the original and the replay transaction,
// since we need to replay it once again in case it does not get validated within a few minutes.
// All this comes with the cost of issuing a new transaction, but this is actually beneficial to the IOTA network
// as a whole because by doing this we are confirming another pair of transactions. And there are double-spending
// validation schemes implemented that ensures only one of the transactions will be finally confirmed.
iota.api.getLatestInclusion([hash], (error, inclusionStates) => {
	if (error) {
		console.error('getLatestInclusion error', error);
	} else if (inclusionStates[0]) {
		console.log('transaction is included (confirmed)! yay!');
	} else {
		iota.api.replayBundle(hash, Depth, MinWeightMagnitude, (error, replayTransactions) => {
			// TODO
		});
	}
})

// Signal
//
// No monetary value, but include a message with the transaction that needs to be tryte-encoded


