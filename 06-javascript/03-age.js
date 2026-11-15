// Name: Derrick Tran
// CS 463 Intro to Web Development
// DESCRIPTION: A simple JavaScript exercise to show how to work with dates and time
// websites often need to work with dates
// this is a demonstration of the date object in JavaScript

// considerations:
// Always consider what values don't make sense when it comes to time calculations
// For example, a person's age cannot be negative and generally cannot be 0
// the response could also be formatted slightly differently based on the number 
// of numbers in the result

// JavaScript has a lot of built in functions that make working with time
// easier: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// dates can be local time (specific timezone) or UTC time

function calculateAge(dateString)
{
    // first, convert the string into a date object, which is built in to javascript
    const user_birth_date = new Date(dateString);

    // before any calculations, check the input to make sure it is a valid date
    // we can do this by attempting to get the date object as a time value
    // which is a number
    if (isNaN(user_birth_date.getTime()))
    {
        return 'Error: Invalid date format';
    }

    // you can check this by doing a return before continuing
    // return user_birth_date;

    // get today's date
    // const todays_date = new Date();

    // for testing only
    const todays_date = new Date('2026-05-20');

    // dates consist of years, months, and days
    // all we have to do is figure out what the difference is for each of those values
    let year_difference = todays_date.getFullYear() - user_birth_date.getFullYear();
    let month_difference = todays_date.getMonth() - user_birth_date.getMonth();
    let day_difference = todays_date.getDay() - user_birth_date.getDay();

    // the year difference is only accurate if someone's birthday already happened for this year
    // if not, then we need to subtract 1 from the year
    // if their birthday hasn't happened yet, then the month difference will be negative
    // OR the day difference is negative and the month difference is 0
    if (month_difference < 0 || (month_difference === 0 && day_difference < 0))
    {
        // note: we also need to use strict equality in javascript
        year_difference--;
    } 

    // for any code, don't forget to check the edge cases
    // note these should probably be if else statements so it's easier to read
    if (year_difference === 1)
    {
        // year is singular in this case
        return `You are ${year_difference} year old.`;
    }

    if (year_difference > 125)
    {
        return 'Are you sure you are more than 125 years old?';
    }

    if(year_difference < 0)
    {
        return 'Error: Birth date cannot be in the future';
    }

    return `You are ${year_difference} years old.`;
}

console.log(calculateAge('2000-07-01'));
// You are 25 years old
console.log(calculateAge('1988-05-18'));
// You are 38 years old
console.log(calculateAge('2025-05-01'));
// You are 1 year old
console.log(calculateAge('2190-01-01'));
// Error: Birth date cannot be in the future
console.log(calculateAge('1800-01-01'));
// Are you sure you are more than 125 years old?
console.log(calculateAge('invalid-date'));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
