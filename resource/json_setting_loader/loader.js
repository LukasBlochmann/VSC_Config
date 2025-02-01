const fs = require('fs');

let rawData = fs.readFileSync('data.json', 'utf8'); 
let jsonData = JSON.parse(rawData); 

console.log(jsonData);



jsonData.newKey = "Dynamischer Wert"; // Ändert oder fügt einen Wert hinzu

fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 4), 'utf8'); 
console.log("Datei gespeichert!");
