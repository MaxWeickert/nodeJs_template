function getAPI(app) {
    app.get("/api", function (req, res) {
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		
		var requestBody = "";

		//URL der Zielroute der API
		var url = "https://ko1b91ida2.execute-api.us-east-1.amazonaws.com/api/buckets"; //fill in API URL
		
		//HTTP Request an die API initialisieren und auslösen
		var client = new XMLHttpRequest();
		client.open(
			"get",
			url
		);
  
		client.setRequestHeader("Accept", "application/json");
		client.setRequestHeader("Content-Type", "application/json");
  
		//Nur wenn eine Authorizierung notwendig ist
		//client.setRequestHeader("Authorization", "Basic " + credentials);
  
		client.onreadystatechange = function () {
			if (this.readyState == this.DONE) {
				//Erfolg des API-Calls abfragen
				if(this.status >= 200 && this.status < 300) {
					//Antwort der Node.js-Route senden
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
  
		console.log("Redirected to getAPI..");
    });
}

module.exports = getAPI;