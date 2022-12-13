const path = require("path");

// get the path to the directory of your entry point file
module.exports = path.dirname(require.main.filename);
