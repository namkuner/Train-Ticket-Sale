import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewsEngine';
import initWebRouters from './route/web';
import connectDB from './config/connectDB';
const path = require('path');

require('dotenv').config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 8081;
app.listen(port, () => {
	console.log('Server đang chạy ở port : ' + port);
});
