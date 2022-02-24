import { createConnection } from "typeorm";
import { config } from "./config"
import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import jwt from "koa-jwt";
import winston from "winston"
import { logger } from "./logger";
import { protectedRouter } from "./router"
import { unprotectRouter } from "./router";
import { errorHandler } from "./middleware/errorHandler";

createConnection({
    type: "postgres",
    url: config.databaseUrl,
    synchronize: config.synchronize,
    logging: false,
    entities: config.dbEntitiesPath,
    extra: {
        ssl: config.dbsslconn,
    }
}).then(async () => {
    const app = new Koa();

    // Enable cors with default options
    app.use(cors());

    // Logger middleware -> use winston as logger (logging.ts with config)
    app.use(logger(winston));

    // Enable bodyParser with default options
    app.use(koaBody({ multipart: true }));

    // Enable fail handler middleware
    app.use(errorHandler);

    app.use(unprotectRouter.routes()).use(unprotectRouter.allowedMethods());

    // app.use(serve(Path.join(__dirname, "../static")));

    app.use(jwt({ secret: config.jwtSecret, passthrough: false }).unless({ path: [/^\/swagger-/] }));

    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    app.listen(config.port);

    console.log(`Server running on port ${config.port}`);

    // initRootUser().then(res => console.log(res));
}).catch((error: string) => console.log("TypeORM connection error: ", error));