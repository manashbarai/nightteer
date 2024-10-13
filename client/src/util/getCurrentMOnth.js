function getCurrentMonth() {
    const date = new Date(); // Create a new Date object
    return date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
}

// Export the function
module.exports = getCurrentMonth;
