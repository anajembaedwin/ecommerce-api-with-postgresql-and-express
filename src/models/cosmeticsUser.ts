import Client from '../database'

//creating User type to use for type checking
export type User = {
    id : Number;
    firstname : string;
    lastname : string;
    password : string;
}

//This class represents postgres database in javascript land
export class CosmeticsStore {
    async index(): Promise<User[]> {
        try {
            //open database
            const conn = await Client.connect()
            const sql = 'SELECT * FROM cosmetics_users'
            const result = await conn.query(sql)

            //close database
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get user details ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            //open database
            const sql = 'SELECT * FROM cosmetics_users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])

            //close database
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find User with id:${id} . Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            //open database
            const sql = 'INSERT INTO cosmetics_users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password])
            const user = result.rows[0]

            //close database
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            //open database
            const sql = 'DELETE FROM cosmetics_users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const book = result.rows[0]

            //close database
            conn.release()
        
            return book
        } catch (err) {
            throw new Error(`Could not delete user with id:${id}. Error: ${err}`)
        }
    }
}