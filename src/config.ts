import dotenv from "dotenv";

console.log("current env: " + process.env.NODE_ENV);
dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export interface Config {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
    dbEntitiesPath: string[];
    synchronize: boolean;
}

const isDevMode = process.env.NODE_ENV !== "production";

export const config: Config = {
    port: +(process.env.PORT || 3000),
    debugLogging: isDevMode,
    dbsslconn: false,
    jwtSecret: process.env.JWT_SECRET || "hello123",
    databaseUrl: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/tests-result", // todo 拼
    dbEntitiesPath: [
        ...isDevMode ? ["src/entity/postgres/*.ts"] : ["dist/entity/postgres/*.js"],
    ],
    synchronize: process.env.DB_SYNCHRONIZE === "true"
};