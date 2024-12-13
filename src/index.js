

const app = require("./app/app.js");
const variables = require("./config/variables.js");
const { getLocalTime } = require("./utils/dateFormatter");
const port = variables.app.port;


app.listen(port, () => {
    const startTime = getLocalTime();  // Obtiene la hora local formateada
    console.log(`=== Server started at ${startTime} ===`);
    console.log(`=== Server running on port ${port} ===`);
});