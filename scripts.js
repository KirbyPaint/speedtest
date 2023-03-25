function loadFile() {
  let result = null;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "speedtest.csv", false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function renderTable() {
  const csv = loadFile().split("\n");
  const head = "tableHead";
  const body = "tableBody";
  // Append first row in csv array to table id contents
  createTableRow(
    csv[0].split(",").filter((n) => n),
    head
  );
  // Iterate through remaining csv array and append to table id contents
  for (let i = 1; i < csv.length; i++) {
    createTableRow(
      csv[i].split(",").filter((n) => n),
      body
    );
  }
}

function createTableRow(array, elementId) {
  var tBody = document.getElementById(elementId);
  var row = tBody.insertRow(0);
  for (var i = 0; i < array.length; i++) {
    var cell = row.insertCell(i);
    cell.innerHTML = array[i];
  }
}
