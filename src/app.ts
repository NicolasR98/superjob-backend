require('dotenv').config();
import express from 'express';
import config from 'config';
import connectToDB from './utils/connectToDB';

import router from './routes';

const app = express();
app.use(router);

const port = config.get<number>('port');

app.listen(port, () => {
	console.log(`App started at http://localhost:${port}`);

	connectToDB();
});
