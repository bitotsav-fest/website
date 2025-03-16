import { readString } from 'react-papaparse';
import csvData from './wellfare_with_email.csv';

// check if email exists in welfare csv
export function isEmailInWelfare(email) {
  try {
    // Parse the CSV data using PapaParse
    const { data } = readString(csvData, {
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
      transform: (value) => value.trim()
    });
    
    // Check if email exists in records
    return data.some(record => record.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Error checking email in welfare:', error);
    return false;
  }
}
