//TODO add imports if needed
// import { randomItem, generateBirthdate, generateEmployee } from "./src/employee.js";

/**
 * The main function which calls the application.
 * Generates an array of employees with random personal data.
 *
 * @param {object} dtoIn contains:
 *    count: number of employees to generate
 *    age: {min, max} - age limits for generated employees (inclusive)
 *
 * @returns {Array} dtoOut = list of employees
 */
export function main(dtoIn) {
  const dtoOut = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const employee = generateEmployee(dtoIn.age.min, dtoIn.age.max);
    dtoOut.push(employee);
  }

  return dtoOut;
}


// Databaze jmen
const maleNames = ["Jan", "Petr", "Tomáš", "Jakub", "Karel", "Václav", "Martin", "Daniel"];
const femaleNames = ["Anna", "Tereza", "Petra", "Kateřina", "Lucie", "Eliška", "Jana", "Adéla"];
const surnames = [
  "Novák", "Svoboda", "Dvořák", "Černý", "Procházka",
  "Kučera", "Veselý", "Horák", "Němec", "Král"
];

const workloads = [10, 20, 30, 40];

// Random
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function calculateAge(birthdateISO) {
  const birth = new Date(birthdateISO);
  const now = new Date();

  // Delka roku
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;

  return Math.floor((now - birth) / msPerYear);
}

function generateBirthdate(minAge, maxAge) {
  let date;

  do {
    // Nahodny vek
    const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;

    const today = new Date();
    const year = today.getFullYear() - age;
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;

    date = new Date(Date.UTC(year, month, day));

  } while (calculateAge(date.toISOString()) < minAge ||
           calculateAge(date.toISOString()) > maxAge);

  return date.toISOString();
}

function generateEmployee(minAge, maxAge) {
  const gender = Math.random() < 0.5 ? "male" : "female";

  return {
    gender: gender,
    birthdate: generateBirthdate(minAge, maxAge),
    name: gender === "male" ? randomItem(maleNames) : randomItem(femaleNames),
    surname: randomItem(surnames),
    workload: randomItem(workloads)
  };
}
