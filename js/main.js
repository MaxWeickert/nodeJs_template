function getAPI() {
	var requestBody = "";

	//HTTP Request an die Node.js-Route initialisieren und auslösen
	var client = new XMLHttpRequest();
	client.open("get", "/api");

	client.setRequestHeader("Accept", "application/json");
	client.setRequestHeader("Content-Type", "application/json");

	client.onreadystatechange = function () {
		if (this.readyState == this.DONE) {
			if(this.responseText) {
				//Empfangen der Antwort der Node.js-Route
				var responseJSON = JSON.parse(this.responseText);
				var display = this.responseText;

				//Verarbeitung der empfangenen Daten, wenn Daten vorhanden sind
				document.getElementById("bucketsDisplay").innerHTML = display;
				console.log({responseJSON});
			}
		}
	};
	client.send(requestBody);
}

function getRawData() {
	var requestBody = "";

	//HTTP Request an die Node.js-Route initialisieren und auslösen
	var client = new XMLHttpRequest();
	client.open("get", "/rawData");

	client.setRequestHeader("Accept", "application/json");
	client.setRequestHeader("Content-Type", "application/json");

	client.onreadystatechange = function () {
		if (this.readyState == this.DONE) {
			if(this.responseText) {
				//Empfangen der Antwort der Node.js-Route
				var responseJSON = JSON.parse(this.responseText);
				if(responseJSON.messages) {
					//Verarbeitung der empfangenen Daten, wenn Daten vorhanden sind
					responseJSON.messages.forEach(m => {
						var infoText = getInfoText(m.machine, m.message_type, m.message);
						//Aktualisieren des Plotly-Graphen
						Plotly.extendTraces('statusChart', {
							x:[[new Date(m.timestamp)]],
							y:[[parseInt(m.message_type)]],
							text:[[infoText]]
						}, [0]);
					});
				}
				console.log({responseJSON});
			}
		}
	};
	client.send(requestBody);
}

function getInfoText(machine, message_type, message) {
	var infoText = "Machine " + machine + ": ";
	switch(message_type){
		case "1":
			switch(message){
				case "1": infoText += "gestartet"; break;
				case "2": infoText += "gestoppt"; break;
				case "3": infoText += "Wartung gestartet"; break;
				case "4": infoText += "Wartung beendet"; break;
				case "5": infoText += "Flasche abgefüllt"; break;
				case "6": infoText += "Störung beseitigt"; break;
				default: infoText += "fehlerhafter Infocode";
			}; break;
		case "2":
			switch(message){
				case "2": infoText += "Warnung - Flasche aussortiert"; break;
				default: infoText += "fehlerhafter Warnungscode";
			} break;
		case "3":
			switch(message){
				case "1": infoText += "Fehler - Unerwartete Störung"; break;
				default: infoText += "fehlerhafter Fehlercode";
			} break;

	}
	return infoText;
}