const { connect, connection } = require("mongoose");

connect(process.env.MONGO_URL);

module.exports = connection;
