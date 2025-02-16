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
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Open the specific spreadsheet by ID
    var ss = SpreadsheetApp.openById("1whl4CxjTWzWIS5wP-cSp8oEtnPiXIei8640wwkchL0k");
    var sheet = ss.getSheetByName('Responses');
    
    // Append the data
    sheet.appendRow([
      new Date(), // Timestamp
      data.firstName,
      data.surname,
      data.attending,
      data.numberOfGuests
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'RSVP recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
  }
} 