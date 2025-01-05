import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js'

import mmRoutes from './routes/moneymanager.route.js'
dotenv.config()



const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accepts json

app.use("/api/expense",mmRoutes)

console.log("NODE ENV",process.env.NODE_ENV)
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(5000, () => {
    connectDB();
    console.log('Server Started at PORT',+ PORT)
})


// 275lJ3djaBx80G7S