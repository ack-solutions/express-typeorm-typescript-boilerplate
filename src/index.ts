import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { join } from "path";
import { appDataSource } from "./config/database";
import { setupRoutes } from "./routes";

// Load config form env file
dotenv.config({ path: join(process.cwd(), '.env') });

const bootstrapApp = async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // Init Database, create connection with database
    global['DataSource'] = await appDataSource.initialize()

    // register all application routes
    setupRoutes(app)

    // true if file is executed
    if (require.main === module) {
        const port = process.env['PORT'] || 3000
        // Run the app
        const server = app.listen(port, () => {
            console.log('server started at http://localhost:' + port);
        });
    }
    return app
}


export const app = bootstrapApp();
