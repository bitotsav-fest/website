const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

function convertRollToEmail(roll) {
  // Convert roll number like B.TECH/10238/24 to btech10238.24@bitmesra.ac.in
  const parts = roll.toLowerCase().split('/');
  const branch = parts[0].replace('.', '');
  const number = parts[1];
  const year = parts[2];
  return `${branch}${number}.${year}@bitmesra.ac.in`;
}

function processCSV() {
  const csvPath = path.join(__dirname, 'wellfare.csv');
  const csvData = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV
  const records = csv.parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });

  // Add email column
  const updatedRecords = records.map(record => ({
    ...record,
    email: convertRollToEmail(record.rollno)
  }));

  // Convert back to CSV
  const header = Object.keys(updatedRecords[0]).join(',');
  const rows = updatedRecords.map(record => Object.values(record).join(','));
  const outputCSV = [header, ...rows].join('\n');

  // Write updated CSV
  fs.writeFileSync(path.join(__dirname, 'wellfare_with_email.csv'), outputCSV);
  //console.log('Successfully added email column to CSV');
}

processCSV();