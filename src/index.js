import app from './app/app.js';
import { variables } from './config/variables.js';
import { getLocalTime } from './utils/dateFormatter.js';

const port = variables.app.port;

app.listen(port, () => {
    const startTime = getLocalTime();  // Obtiene la hora local formateada
    console.log(`=== Server started at ${startTime} ===`);
    console.log(`=== Server running on port ${port} ===`);
});
