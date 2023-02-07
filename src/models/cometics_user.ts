import Client from '../database'

export type user = {
    id : Number;
    firstname : string;
    lastname : string;
    email : string; 
    password : string;
}

export class cosmetics_store_user {
    async index(): Promise<user[]> {
        try {
            //open database
            const conn = await Client.connect()
            const sql = 'SELECT * FROM cosmetics_store_users'
            const result = await conn.query(sql)
            //close database
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get user details ${err}`)
        }
    }
}