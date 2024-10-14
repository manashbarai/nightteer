function getCurrentMonth() {
    const date = new Date(); // Create a new Date object
    return date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
}

function getCurrentDay() {
    const date = new Date(); // Create a new Date object
    return date.getDate(); // getDate() returns the day of the month (1-31)
}

// Export the functions
module.exports = { getCurrentMonth, getCurrentDay };

