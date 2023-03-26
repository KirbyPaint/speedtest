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
  cleanTable();
  const csv = loadFile().split("\n");
  const head = "tableHead";
  const head2 = "tableHeadTwo";
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

function cleanTable() {
  document.getElementById("tableHead").innerHTML = "";
  document.getElementById("tableBody").innerHTML = "";
}

function createTableRow(array, elementId) {
  var tBody = document.getElementById(elementId);
  var row = tBody.insertRow(0);
  for (var i = 0; i < array.length; i++) {
    if (i % 6 == 0 || i % 6 == 1) {
      const bytes = parseInt(array[i]);
      if (bytes > 0) {
        array[i] = bytesToMbs(bytes) + " MBps";
      }
    }
    if (i % 6 == 2) {
      array[i] += " ms";
    }
    var cell = row.insertCell(i);
    cell.innerHTML = array[i];
  }
}

function bytesToMbs(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}
