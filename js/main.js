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
				var display = responeJSON;

				document.getElementById("workspace").innerHTML = display;
				console.log({responseJSON});
			}
		}
	};
	client.send(requestBody);
}