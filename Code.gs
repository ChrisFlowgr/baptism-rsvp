function doGet(e) {
  return HtmlService.createHtmlOutput("Service is running.");
}

function doPost(e) {
  // Add CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  };
  
  try {
    // Log the raw request
    Logger.log("Raw request data: " + e.postData.contents);
    
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    Logger.log("Parsed data: " + JSON.stringify(data));
    
    // Open the specific spreadsheet by ID
    var ss = SpreadsheetApp.openById("1whl4CxjTWzWIS5wP-cSp8oEtnPiXIei8640wwkchL0k");
    var sheet = ss.getSheetByName('Responses');
    
    // Verify sheet access
    Logger.log("Sheet found: " + (sheet !== null));
    
    // Create the row data
    var rowData = [
      new Date(), // Timestamp
      data.firstName,
      data.surname,
      data.attending,
      data.numberOfGuests
    ];
    Logger.log("Row data to append: " + JSON.stringify(rowData));
    
    // Append the data
    sheet.appendRow(rowData);
    Logger.log("Data appended successfully");
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'RSVP recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
    
  } catch (error) {
    Logger.log("Error occurred: " + error.toString());
    Logger.log("Error stack: " + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
  }
} 