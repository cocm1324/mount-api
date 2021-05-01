import { Connection, createConnection, ConnectionOptions } from "typeorm";

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SCHEMA = process.env.DB_SCHEMA;

export class OrmService {
    
    conn: Connection;
    config: ConnectionOptions;

    constructor(private entities: any[]) {
        this.config = {
            type: 'mysql',
            host: DB_HOST,
            port: parseInt(DB_PORT),
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_SCHEMA,
            synchronize: true,
            logging: false,
            entities: [ ...this.entities ]
        };
    }

    getConnection(): Promise<Connection> {
        return createConnection(this.config);
    }
}