import Client from '../database'

//creating Product type to use for type checking
export type Order = {
    id? : string;
    product_id : string;
    product_quantity : number;
    user_id : string;
    order_status : string;
}

export class CosmeticsOrder {
    async orderIndex(): Promise<Order[]> {
        try {
            //open database
            const conn = await Client.connect()
            const sql = 'SELECT * FROM cosmetics_orders'
            const result = await conn.query(sql)

            //close database
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get order details ${err}`)
        }
    }

    async orderShow(id: string): Promise<Order> {
        try {
            //open database
            const sql = 'SELECT * FROM cosmetics_orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])

            //close database
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find Order with id: ${id} . Error: ${err}`)
        }
    }

    async orderCreate(o: Order): Promise<Order> {
        try {
            //open database
            const sql = 'INSERT INTO cosmetics_orders (productId, userId, productQuantity, orderStatus) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [o.product_id, o.user_id, o.product_quantity, o.order_status])
            const order = result.rows[0]

            //close database
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add new order for ${o.user_id}. Error: ${err}`)
        }
    }

    async orderDestroy(id: string): Promise<Order> {
        try {
            //open database
            const sql = 'DELETE FROM cosmetics_orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]

            //close database
            conn.release()
        
            return order
        } catch (err) {
            throw new Error(`Could not delete order with id:${id}. Error: ${err}`)
        }
    }
}