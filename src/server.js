import app from './app.js';
import 'dotenv/config';

const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server is running at ${port} port`));
