function generateRandomPassword() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
}

module.exports = generateRandomPassword;
