function loadFile() {
  let result = null;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "speedtest.csv", false);
  xmlhttp.send();
  if (xmlhttp.status === 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function renderTable() {
  cleanTable();
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
  math();
}

function cleanTable() {
  document.getElementById("tableHead").innerHTML = "";
  document.getElementById("tableBody").innerHTML = "";
}

function getCsvColumn(columnNumber) {
  const csv = loadFile()
    .split("\n")
    .filter((n) => n);
  const column = [];
  for (let i = 1; i < csv.length; i++) {
    column.push(csv[i].split(",")[columnNumber]);
  }
  return column;
}

function math() {
  // Sums
  const downloadSum = getCsvColumn(0).reduce(
    (a, b) => parseFloat(a) + parseFloat(b)
  );
  const uploadSum = getCsvColumn(1).reduce(
    (a, b) => parseFloat(a) + parseFloat(b)
  );
  const pingSum = getCsvColumn(2).reduce(
    (a, b) => parseFloat(a) + parseFloat(b)
  );
  const bytesSentSum = getCsvColumn(4).reduce(
    (a, b) => parseFloat(a) + parseFloat(b)
  );
  const bytesReceivedSum = getCsvColumn(5).reduce(
    (a, b) => parseFloat(a) + parseFloat(b)
  );
  // Averages
  const downloadAverage = downloadSum / getCsvColumn(0).length;
  const uploadAverage = uploadSum / getCsvColumn(1).length;
  const pingAverage = pingSum / getCsvColumn(2).length;
  const bytesSentAverage = bytesSentSum / getCsvColumn(4).length;
  const bytesReceivedAverage = bytesReceivedSum / getCsvColumn(5).length;
  // Max
  const downloadMax = Math.max(...getCsvColumn(0));
  const uploadMax = Math.max(...getCsvColumn(1));
  const pingMax = Math.max(...getCsvColumn(2));
  const bytesSentMax = Math.max(...getCsvColumn(4));
  const bytesReceivedMax = Math.max(...getCsvColumn(5));
  // Min
  const downloadMin = Math.min(...getCsvColumn(0));
  const uploadMin = Math.min(...getCsvColumn(1));
  const pingMin = Math.min(...getCsvColumn(2));
  const bytesSentMin = Math.min(...getCsvColumn(4));
  const bytesReceivedMin = Math.min(...getCsvColumn(5));
  // Display
  document.getElementById("sum_download").innerHTML =
    bytesToMbs(downloadSum) + " MBps";
  document.getElementById("sum_upload").innerHTML =
    bytesToMbs(uploadSum) + " MBps";
  document.getElementById("sum_ping").innerHTML = pingSum;
  document.getElementById("sum_sent").innerHTML = bytesSentSum;
  document.getElementById("sum_received").innerHTML = bytesReceivedSum;
  document.getElementById("avg_download").innerHTML =
    bytesToMbs(downloadAverage);
  document.getElementById("avg_upload").innerHTML = bytesToMbs(uploadAverage);
  document.getElementById("avg_ping").innerHTML = pingAverage;
  document.getElementById("avg_sent").innerHTML = bytesSentAverage;
  document.getElementById("avg_received").innerHTML = bytesReceivedAverage;
  document.getElementById("max_download").innerHTML = bytesToMbs(downloadMax);
  document.getElementById("max_upload").innerHTML = bytesToMbs(uploadMax);
  document.getElementById("max_ping").innerHTML = pingMax;
  document.getElementById("max_sent").innerHTML = bytesSentMax;
  document.getElementById("max_received").innerHTML = bytesReceivedMax;
  document.getElementById("min_download").innerHTML = bytesToMbs(downloadMin);
  document.getElementById("min_upload").innerHTML = bytesToMbs(uploadMin);
  document.getElementById("min_ping").innerHTML = pingMin;
  document.getElementById("min_sent").innerHTML = bytesSentMin;
  document.getElementById("min_received").innerHTML = bytesReceivedMin;
}

function createTableRow(array, elementId) {
  var tBody = document.getElementById(elementId);
  var row = tBody.insertRow(0);
  for (var i = 0; i < array.length; i++) {
    // download
    if (i % 6 === 0) {
      const bytes = parseFloat(array[i]);
      if (bytes > 0) {
        array[i] = bytesToMbs(bytes) + " MBps";
      }
    }
    // upload
    if (i % 6 === 1) {
      const bytes = parseFloat(array[i]);
      if (bytes > 0) {
        array[i] = bytesToMbs(bytes) + " MBps";
      }
    }
    // ping
    if (i % 6 === 2) {
      array[i] += " ms";
    }
    // timestamp
    if (i % 6 === 3) {
    }
    // bytes sent
    if (i % 6 === 4) {
    }
    // bytes received
    if (i % 6 === 5) {
    }
    var cell = row.insertCell(i);
    cell.innerHTML = array[i];
  }
}

function bytesToMbs(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}
