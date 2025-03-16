// import { parse } from 'csv-parse/sync';
// import csvData from './wellfare_with_email.csv';

// // check if email exists in welfare csv
// export function isEmailInWelfare(email) {
//   try {
//     // Parse the CSV data
//     const records = parse(csvData, {
//       columns: true,
//       skip_empty_lines: true,
//       trim: true
//     });
    
//     // Check if email exists in records
//     return records.some(record => record.email.toLowerCase() === email.toLowerCase());
//   } catch (error) {
//     console.error('Error checking email in welfare:', error);
//     return false;
//   }
// }
