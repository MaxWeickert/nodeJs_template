function getRawData(app) {
    app.get("/rawData", function (req, res) {
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		
		var requestBody = "";
		var url = "https://ko1b91ida2.execute-api.us-east-1.amazonaws.com/api/raw-data?start=-1m"; //fill in API URL
		
		var client = new XMLHttpRequest();
		client.open(
			"get",
			url
		);
  
		client.setRequestHeader("Accept", "application/json");
		client.setRequestHeader("Content-Type", "application/json");
  
		//Only if Authorization is needed
		//client.setRequestHeader("Authorization", "Basic " + credentials);
  
		client.onreadystatechange = function () {
			if (this.readyState == this.DONE) {
				if(this.status >= 200 && this.status < 300) {
					res.status(this.status).send(this.responseText);
					console.log("Status: ", this.status);
				}
				else {                
					res.status(this.status).send(this.responseText);
					console.log("Status: ", this.status);
					console.error("ERROR: ", JSON.parse(this.responseText).message);
				}
			}	
		};
		client.send(requestBody);
  
		console.log("Redirected to getRawData..");
    });
}

module.exports = getRawData;