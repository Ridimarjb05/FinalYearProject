const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    if (!password) throw new Error("Password is required");
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
