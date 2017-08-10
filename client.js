var url = "http://127.0.0.1:2020/blockNumber";

function updateBlockNumber(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			document.getElementById("blockNumber").innerHTML = xmlHttp.responseText;
			setTimeout(updateBlockNumber, 5000)
		}
		
	};
	
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
	
}


window.onload = function(){
	updateBlockNumber();
};