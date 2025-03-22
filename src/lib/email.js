import arr from "@/lib/wellfare-emails"
import { bitk21 } from "./allowedK21_with_emails";
import { daysholarsbitmesraarray } from "./dayscholarbitmesra";


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



// check if the user is from bit wellfare or not
export function isBitWellfareEmail(email) {
  return arr.includes(email)?true:false;
}

// check if the user is from k21 bit wellfare or not
export function isBitK21WellfareEmail(email) {
  return bitk21.includes(email)?true:false;
}


export function isDaySholarsBITMesraEmail(email) {
  return daysholarsbitmesraarray.includes(email)?true:false;
}
