const Web3 = require("Web3");
const web3 = new Web3();

const fs = require("fs");

web3.setProvider(new Web3.providers.HttpProvider("http://localhost:2302"));

console.log(web3.eth.blockNumber);

if (process.argv.length <= 3 || process.argv.length > 4) {
	console.log("USAGE: watcher.js address \"Path to abi\"");
	process.exit(-1);
}

const address = process.argv[2];
const abi = JSON.parse(fs.readFileSync(process.argv[3]));

var contract = web3.eth.contract(abi);
var contractInstance = contract.at(address);


var events = contractInstance.allEvents();

events.watch(function(error, result) {
	if (!error) {
		
		console.log("Event: " + result.event);
		console.log("Arguments:" + JSON.stringify(result.args));
		console.log();
		
	}
});

setInterval(function(){
	console.log("Listening...");
}, 60000);