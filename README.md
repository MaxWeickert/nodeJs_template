## 1 Einleitung

In diesem Kapitel soll es darum gehen, wie die API Schnittstelle, welche mittels dem AWS API Gateway zur Verfügung gestellt wurde, getestet und konsumiert werden kann.
Für das Testen der API wird hier die Anwendung Postman verwendet, welche eine sehr intuitive Oberfläche dafür bietet.
Das Konsumieren der API wird hier beispielhaft mithilfe einer Node.js-Anwendung realisiert. Postman und Node.js fügen sich wie folgt in die Zielarchitektur ein:


![components](https://user-images.githubusercontent.com/41301931/123372592-22bad100-d584-11eb-9443-ab18fc5439f7.png)



Quellen der des Node.js- und Postman-Bildes innerhalb des obigen Bildes:
```http
https://commons.wikimedia.org/wiki/File:Node.js_logo.svg
https://www.testautomatisierung.org/lexikon/postman-api/
```


## 2 Testen einer API mittels Postman

Postman ist eine Google-Chrome-Anwendung, welche für Tests von API verwendet werden kann. Die Anwendung ermöglicht automatisierte und manuelle Tests von APIs sowie kollaboratives Arbeiten. Es können Requests in Collections abgelegt werden, welche entweder lokal oder accountgebunden in einer Cloud gespeichert werden. Außerdem gibt es die Möglichkeit Workspaces anzulegen und aus diesen heraus Collections mit anderen Account-Inhabern zu teilen und gemeinsam daran zu arbeiten.

### 2.1 Installation von Postman

Die Anwendung kann lokal als Desktop-Anwendung oder als Webversion ausgeführt werden. Zu beachten ist hierbei, dass die Desktop-Anwendung auch ohne zusätzlichem Postman-Account verwendbar ist, die Webversion jedoch einen Account benötigt, da sie ausschließlich auf die in einer Cloud gespeicherten Collections zurückgreift. Collections sind Sammlungen, die ein Nutzer anlegen kann, in denen die einzelnen Request gespeichert werden.

Unter dem folgenden Link ist der Download der Anwendung und der Absprung zur Webversion möglich:

```http
https://www.postman.com/downloads/
```

### 2.2 Manuelle Tests mit Postman

Nach dem starten der Anwendung in der Desktop-Anwendung (analog auch in der Webversion) muss zunächst eine Collection angelegt und ein Name für diese vergeben werden.


![1_postman](https://user-images.githubusercontent.com/41301931/123372602-2b130c00-d584-11eb-836c-28e6b0ebf5f9.png)



Nachdem die Collection hinzugefügt wurde, kann ein Request angelegt werden. Durch einen Rechtsklick auf die neu angelegte Collection wird dies realisiert und analog zu der Collection ein Name vergeben werden.


![2_postman](https://user-images.githubusercontent.com/41301931/123372606-2ea69300-d584-11eb-978a-ce071311482d.png)



Nun kann der Request konfiguriert werden. Dafür sind mehrere Schritte notwendig:

<ol>
<li>URL der Route angeben, welche angesteuert werden soll (z.B. die im Praktikumsteil "REST API" angelegte Route) und wenn notwendig die Methode festlegen (GET, POST, PUT, DELETE...)</li>
<li>Festlegen der notwendiger Header, damit der zu empfangende Datentyp festgelegt wird</li>
<li>Auslösen des API-Calls mittels "Send"-Knopf</li>
<li>Kontrolle des Antwortstatus des API-Calls (mögliche Statuscodes und deren Bedeutung sind mithilfe des Suchbefehls "http status codes" auf Google leicht zu finden)</li>
<li>Kontrolle der empfangenen Daten und Analyse der Datenstruktur möglich</li>
</ol>

Im folgenden Screenshot sind die Schritte noch einmal anhand der Oberfläche dargestellt.


![postman](https://user-images.githubusercontent.com/41301931/123372623-36663780-d584-11eb-8412-cb1556842c66.png)



Es ist auch möglich eine Authentifizierung über den Reiter "Authorization" innerhalb eines Request zu hinterlegen. Dies ist aber nicht nötig im Rahmen dieser Einführung. Außerdem können rechts neben dem Antwortstatus auch die für den API-Call benötigte Zeit sowie die benötigten Speichermengen der Datenübertragung (Request & Response) abgelesen werden.

<b>Funktionale Tests</b>

Damit nun systematisch funktionale Tests durchgeführt werden können, ist es notwendig innerhalb des Requests Tests anzulegen. Dafür gibt es die Möglichkeit Testskripte in der Sprache JavaScript zu schreiben. Dies ist möglich, da Postman eine Runtime integriert, basierend auf Node.js.
Beispieltestskripte findet man unter folgendem Link:

```http
https://learning.postman.com/docs/writing-scripts/script-references/test-examples/#assertion-deep-equality-error
```

Das Hinzufügen von Tests wird innerhalb des Requests auf folgende Art und Weise realisiert:


![postman_tests](https://user-images.githubusercontent.com/41301931/123372637-3d8d4580-d584-11eb-9237-71be0e511844.png)



<b>Aufgabe</b>

Erstellen Sie die für die von Ihnen im Praktikumsteil "REST API" angelegte Route einen Request in Postman mit mindestens einem angelegtem Test.
In diesem Link finden Sie dazu fertige Testskripte, die Teils direkt oder leicht abgewandelt anwendbar auf diese Route sind.

```http
https://learning.postman.com/docs/writing-scripts/script-references/test-examples/#assertion-deep-equality-error
```

Für das BPA-Praktikum kann folgender JavaScript-Code für einen Test der Route zu den Metrics (bzw. CalculatedData) verwendet werden:

```js script
const statusCode = pm.response.code;
const headers = pm.response.headers;
const jsonData = pm.response.json();

pm.test("Successful GET request", () => {
  pm.expect(statusCode).to.be.oneOf([200,204]);
});
```

### 2.3 Testautomatisierung mit Postman

Wenn das vorherige Kapitel 2.2 erfolgreich absolviert wurde, dann können nun auch automatisierte Tests umgesetzt werden. Dafür wird zunächst in den Monitoring-Bereich von Postman gewechselt und dort ein neuer Monitor angelegt. Danach ist es möglich den Monitor zu konfigurieren. Neben dem Namen können auch die zu überwachende Collection, das zu verwendende Environment, der Timer und die E-Mail-Adresse, welcher bei auftretenden Fehlern eine E-Mail zugesandt wird, festgelegt werden. Der Ablauf ist wie folgt:


![postman_monitor](https://user-images.githubusercontent.com/41301931/123372656-43832680-d584-11eb-8f7b-29fd705d3ca5.png)



Danach kann auch schon mithilfe der Schaltfläche "Run" das Monitoring begonnen werden.


![postman_monitoring](https://user-images.githubusercontent.com/41301931/123372666-48e07100-d584-11eb-856b-02d23cd12bbb.png)



Für weiterführende Information zu Postman selbst, den verwendeten Sicherheitsstandards und der Dokumentation ist die Internetseite von Postman sehr zu empfehlen und ist unter diesem Link erreichbar.

```http
https://www.postman.com/
```

## 3 Konsumieren einer API mittels einer Node.js-Anwendung
### 3.1 Installation der notwendigen Komponenten

Folgende Schritte sind im Vorfeld einer Entwicklung einer Node.js-Anwendung zu absolvieren:

1. Installation von node.js mithilfe des folgenden Links unter Windows

```http
https://nodejs.org/en/
```

oder unter Linux mithilfe des Paketmanagers:

``sudo apt install nodejs``

2. Installation von npm mithilfe einer Konsole mit den Befehl
Windows:
``npm install npm@latest -g``

Linux:
``sudo apt install npm``

Um nun ein Grundgerüst für eine Node.js-Anwendung kann entweder die manuelle Implementation einer solchen Anwendung erfolgen oder mithilfe eines "git clone" Befehls ein Repository geklont werden.

<b>Manuelle Implementation</b>
Zunächst sind diese Befehle für die Erzeugung in der Konsole auszuführen. Wichtig dabei zu beachten, ist, dass bei dem ersten Befehl als "entry point" die später anzulegende index.js eingetragen wird.

``
npm init
npm install express
``

Danach werden die Dateien index.js und index.html angelegt.

<b>Klonen eines Repositories</b>
Dafür wird mithilfe der Konsole oder einer IDE wie Visual Studio Code das Repository geklont. Der folgende Befehl wird in der Konsole in dem gewünschten Zielordner ausgeführt:

``git clone https://github.com/MaxWeickert/nodeJs_template.git``

Diese beinhaltet zwei Branches. Auf dem "main" befindet sich ein Grundgerüst einer Node.js-Anwendung, die es ermöglicht nach ausfüllen der URL eine beliebige Route einer API abzurufen und die Daten als JSON-String auf der Oberfläche darzustellen.
Der zweite Branch mit dem Namen "bpa_template" beinhaltet eine bereits fertige Anwendung, die Daten im Rahmen des Belegs des Moduls Business Performance Automation abrufen kann.

Ein Wechsel der Branches erfolgt mittels dem Konsolenbefehl:

``git checkout branchName``

Damit die Anwendung lauffähig wird, muss zunächst dieser Befehl in der Konsole innerhalb des geklonten Repositories ausgeführt werden:

``
npm install
``

Mithilfe dieses Befehls kann die Anwendung dann gestartet werden:

``npm run start``

Wenn der Fehler "no module named 'nodemon'" oder "Der Befehl 'nodemon' ist entweder falsch geschrieben oder konnte nicht gefunden werden." auftritt, dann muss folgender Befehl zusätzlich in der Konsole ausgeführt werden:

``npm install nodemon``

Die Anwendung auf dem Branch "bpa_template" beinhaltet ausführliche Kommentare, die die Funktionsweise der Node.js-Anwendung beschreiben sollen. Ziel dieser Anwendung ist es nicht nur eine Einführung in Node.js zu ermöglichen, sondern auch in das Framework plotly, welches ursprünglich aus der Programmiersprache Python stammt. Diese Links führen jeweils zu den Dokumentationen von npm und der JavaScript-Version von plotly:

npm:
```http
https://docs.npmjs.com/
```

Plotly:
```http
https://plotly.com/javascript/
```
