var minBlockHeight = 0;
var minConfirmations = 15;

if (web3.eth.accounts.length == 0){
	console.log("New account without password set as coinbase. Use console or Mist to create secure account.");
	web3.personal.newAccount("");
}

setInterval(function() {
	
	if (txpool.status.pending > 0) {
		miner.start(1);
		minBlockHeight = web3.eth.blockNumber + minConfirmations;
	}
	
	else if(web3.eth.getBalance(web3.eth.coinbase) < 100* Math.pow(10,18)){
		miner.start(1);
	}
	
	else if (web3.eth.blockNumber >= minBlockHeight) {
		miner.stop();
	}
}, 5000);