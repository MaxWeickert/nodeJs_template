function getAPI() {
	var requestBody = "";

	var client = new XMLHttpRequest();
	client.open("get", "/api");

	client.setRequestHeader("Accept", "application/json");
	client.setRequestHeader("Content-Type", "application/json");

	client.onreadystatechange = function () {
		if (this.readyState == this.DONE) {
			if(this.responseText) {
				var responseJSON = JSON.parse(this.responseText);
				var display = this.responseText;

				document.getElementById("bucketsDisplay").innerHTML = display;
				console.log({responseJSON});
			}
		}
	};
	client.send(requestBody);
}

function getRawData() {
	var requestBody = "";

	var client = new XMLHttpRequest();
	client.open("get", "/rawData");

	client.setRequestHeader("Accept", "application/json");
	client.setRequestHeader("Content-Type", "application/json");

	client.onreadystatechange = function () {
		if (this.readyState == this.DONE) {
			if(this.responseText) {
				var responseJSON = JSON.parse(this.responseText);
				if(responseJSON.messages) {
					responseJSON.messages.forEach(m => {
						Plotly.extendTraces('statusChart', {
							y:[[parseInt(m.message_type)]],
							text:[[m.message.toString()]]
						},[0]);
					});
				}
				console.log({responseJSON});
			}
		}
	};
	client.send(requestBody);
}