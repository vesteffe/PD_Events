const fs = require('fs');
const csv = require('csv-parser');
const { parse, transforms: { flatten } } = require('json2csv');

// Function to read CSV file and populate JSON object
function csvToJson(csvFilePath) {
    return new Promise((resolve, reject) => {
        const jsonData = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                // Push each row to the JSON array
                jsonData.push(row);
            })
            .on('end', () => {
                // Resolve with the JSON data when CSV parsing is done
                resolve(jsonData);
            })
            .on('error', (error) => {
                // Reject with the error if any occurs
                reject(error);
            });
    });
}

// Check if CSV file path is provided as an argument
if (process.argv.length !== 3) {
    console.error('Usage: node script.js <csv_file_path>');
    process.exit(1);
}

const csvFilePath = process.argv[2]; // Get CSV file path from command-line argument

// Function to extract substring2 
function extractSubstring2AndUpdate(jsonData) {
    //const regex = /\((.*?)\) -/;
    //const regex = /\(([^)]+)\) -/g;
    const regex = /\(([^)]+)\) -/;
    jsonData.forEach((data) => {
        if (data.Title) {
            const match = regex.exec(data.Title);
            if (match && match[1]) {
                console.log("Match Title:" + data.Title + "Match:" + match[1]);
                //console.log(match[1]);
                data.regExpTeam = match[1];
                data.Title = data.Title.replace(match[1], 'regExpTeam');
            }
            else
            {
                console.log("No Match Title:" + data.Title);
                data.regExpTeam = ""
            }
        }
    });
}
// Function to write JSON data to CSV file
function writeJsonToCsv(jsonData, csvFilePath) {
    try {
        const csvData = parse(jsonData, { transforms: [flatten()] });
        fs.writeFileSync(csvFilePath, csvData);
        console.log(`Updated JSON data written to ${csvFilePath}`);
    } catch (error) {
        console.error('Error writing to CSV:', error);
    }
}
// Main
csvToJson(csvFilePath)
    .then((jsonData) => {
        extractSubstring2AndUpdate(jsonData);
        writeJsonToCsv(jsonData, 'output.csv');
    })
    .catch((error) => {
        console.error('Error:', error);
    });