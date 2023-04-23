import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()


const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  POSTGRES_DB_PROD,
  ENV,
} = process.env

let Client: Pool = new Pool(); // Initialize with default value
console.log(ENV);

if (ENV === 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (ENV === 'dev') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (ENV === 'prod') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_PROD,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

export default Client;