import Client from '../database'

//creating Product type to use for type checking
export type Product = {
    id? : string;
    product_name: string;
    price : string;
    product_quantity: number;
}

export class CosmeticsProduct {
    async productIndex(): Promise<Product[]> {
        try {
            //open database
            const conn = await Client.connect()
            const sql = 'SELECT * FROM cosmetics_products'
            const result = await conn.query(sql)

            //close database
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get product details ${err}`)
        }
    }

    async productShow(id: string): Promise<Product> {
        try {
            //open database
            const sql = 'SELECT * FROM cosmetics_products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])

            //close database
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find Product with id: ${id} . Error: ${err}`)
        }
    }

    async productCreate(p: Product): Promise<Product> {
        try {
            //open database
            const sql = 'INSERT INTO cosmetics_products (productName, price, productQuantity) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [p.product_name, p.price, p.product_quantity])
            const product = result.rows[0]

            //close database
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.product_name}. Error: ${err}`)
        }
    }

    async productDestroy(id: string): Promise<Product> {
        try {
            //open database
            const sql = 'DELETE FROM cosmetics_products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]

            //close database
            conn.release()
        
            return product
        } catch (err) {
            throw new Error(`Could not delete product with id:${id}. Error: ${err}`)
        }
    }
}