import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
//This tells TypeScript that you are certain that SALT_ROUNDS will always be defined and will always be a string.
const saltRounds = process.env.SALT_ROUNDS!;

//creating User type to use for type checking
export type User = {
    id? : string; //The ? after id indicates that the id property is optional.
    firstname : string;
    lastname : string;
    username : string;
    password : string;
}

//This class represents postgres database in javascript land
export class CosmeticsUser {
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
            const sql = 'INSERT INTO cosmetics_users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash])
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
            const user = result.rows[0]

            //close database
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not delete user with id:${id}. Error: ${err}`)
        }
    }

    //custom method to authenticate user at login
    async authenticate(username: string, password:string): Promise<User | null> {
        //open database
        const sql = 'SELECT * FROM cosmetics_users WHERE username=($1)'
        // @ts-ignore
        const conn = await Client.connect()
        const result = await conn.query(sql, [username])

        console.log(password+pepper)

        if(result.rows.length) {
            const user = result.rows[0]

            console.log(user) 

            if(bcrypt.compareSync(password+pepper, user.password)) {
                return user
            }
        }

        return null
    }
}