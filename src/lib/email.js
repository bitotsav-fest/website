
// check if the email is of bit mesra
export function isBitEmail(email) {
  const domain = email.split('@')[1];
  return domain === 'bitmesra.ac.in';
}

// get roll no from email
/**
 * if email = btech10574.24@bitmesra.ac.in
 * then rollNo = btech10574.24
 * and year = 2024
 * @param {*} email
 */
export function getRollNoFromEmail(email) {
  const rollNo = email.split('@')[0];
  return rollNo;
}

// get year from email
/**
 * if email = /**
 * if email = EMAIL.in
 * then year = 2024
 * @param {*} email
 */
export function getYearFromEmail(email) {
  const rollNo = email.split('@')[0];
  const year = rollNo.split('.')[1];
  return year;
}

