const fs = require('fs');
const csv = require('csv-parser');

// Define input and output file paths
const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Delete existing output files if they exist
if (fs.existsSync(canadaFile)) {
  fs.unlinkSync(canadaFile);
  console.log(`${canadaFile} deleted.`);
}

if (fs.existsSync(usaFile)) {
  fs.unlinkSync(usaFile);
  console.log(`${usaFile} deleted.`);
}

// Read the CSV file and filter data for Canada and USA
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if (row.country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, `${row.country},${row.year},${row.population}\n`);
    }
    if (row.country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, `${row.country},${row.year},${row.population}\n`);
    }
  })
  .on('end', () => {
    console.log('CSV file processed successfully.');
  });
