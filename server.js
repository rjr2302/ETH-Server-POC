const http = require("http");

const Web3 = require("web3");
const web3 = new Web3();

const fs = require("fs");
fs.readFile("test.html", (error, html) => {
	if (error) {
		throw error;
	}
	
	const hostname = "127.0.0.1";
	const port = 2020;

	web3.setProvider(new Web3.providers.HttpProvider("http://localhost:2302"));

	if (web3.isConnected()){

		console.log("Connected to Web3, starting server.");

		const server = http.createServer((request, response) => {
			
			var file = request.url;
			
			response.stausCode = 200;
			
			if (file == "/") {
				response.setHeader("Content-Type", "text/html");
				response.setHeader("Allow-Access-Control-Origin", "*");
				response.write(html);
				response.end();
			}
			else if (file == "/client.js") {
				fs.readFile("./client.js", (error, script) => {
					if (error) {
						response.end();
					}
					else {
						response.setHeader("Content-Type", "text/javascript");
						response.write(script);
						response.end();
					}
				});
			}
			else if (file == "/blockNumber"){
				response.setHeader("Content-Type", "text/plain");
				response.write(String(web3.eth.blockNumber));
				response.end();
			}
		});
		
		server.listen(port, hostname, ()=> {
			console.log("Server running at http://" + hostname + ":" + port);
		});


	} else {
		console.log("Failed to connect to Web3, shutting down.");
	}
});

