start geth --dev --datadir "." --rpc --rpcaddr 127.0.0.1 --rpcport "2302" --preload loadScript.js console
timeout /t 2
node server.js

pause