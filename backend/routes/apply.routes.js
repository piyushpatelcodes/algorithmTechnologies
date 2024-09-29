const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');

// Function to get Google Auth client
module.exports = function(app) {

    async function getGoogleAuth() {
        const auth = new GoogleAuth({
          keyFile: path.join(__dirname, 'algorithms-437114-4e982f478e51.json'), // Update this path
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const authClient = await auth.getClient();
        return authClient;
      }

// Function to append data to Google Sheet
async function appendDataToSheet(data) {
  const auth = await getGoogleAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1SjMOLV1g9a0WnbfyYfI9pMHv9UI_o2KDXZZyJQiZ8hk'; // Replace with your spreadsheet ID
  const range = 'Sheet1!A1'; // Adjust the range as needed

  // Data to be appended (adding the current date)
  const currentDate = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
  const rowData = [
    data.firstName,
    data.lastName,
    data.email,
    data.domain,
    data.resumelink,
    data.message,
    currentDate, // Adding date of application
  ];

  // Check if the sheet is empty and set headers if so
  await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:G1', // Range to check for existing headers
  })
  .then(async (response) => {
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      // If the sheet is empty, set headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
          values: [['First Name', 'Last Name', 'Email', 'Domain', 'Resume Link', 'Message', 'Date of Application']],
        },
      });
    }
  })
  .catch(err => console.error('Error checking for headers:', err));

  // Append the data
  const request = {
    spreadsheetId,
    range: 'Sheet1!A:G', // Append to the range of your data
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [rowData],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
    // Highlight rows with the same date
    await highlightRowsWithDate(sheets, spreadsheetId, currentDate);
  } catch (error) {
    console.error('Error appending data to sheet:', error);
  }
}

// Function to highlight rows with the same date
async function highlightRowsWithDate(sheets, spreadsheetId, date) {
  const range = 'Sheet1!A:G'; // Adjust as necessary

  // Retrieve existing rows to check for dates
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];
  
  // Prepare requests to update cell formatting
  const requests = rows.map((row, index) => {
    if (row[6] === date) { // Check if the date column matches
      return {
        repeatCell: {
          range: {
            sheetId: 0, // Adjust this if your sheet ID is different
            startRowIndex: index + 1,
            endRowIndex: index + 2,
            startColumnIndex: 0,
            endColumnIndex: 7,
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 1,
                green: 1,
                blue: 0.5, // Light yellow background
              },
            },
          },
          fields: 'userEnteredFormat.backgroundColor',
        },
      };
    }
    return null;
  }).filter(request => request !== null);

  if (requests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests,
      },
    });
  }
}

// Example route
app.post('/api/append', async (req, res) => {
  try {
    const data = req.body; // Ensure that your data comes in this format
    await appendDataToSheet(data);
    res.status(200).send('Data appended successfully');
  } catch (error) {
    console.error('Error in /api/append route:', error);
    res.status(500).send('Failed to append data');
  }
});

}