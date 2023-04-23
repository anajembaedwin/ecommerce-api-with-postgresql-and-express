import express, { Request, Response } from 'express';
import { Product, CosmeticsProduct } from '../models/cosmetics_product';

const storeProduct = new CosmeticsProduct();

const productIndex = async (_req: Request, res: Response) => {
    const product = await storeProduct.productIndex()
    res.json(product);
};

const productShow = async (req: Request, res: Response) => {
    const product = await storeProduct.productShow(req.params.id)
    res.json(product);
};

const productCreate = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            product_name: req.body.productName,
            price: req.body.price,
            product_quantity: req.body.productQuantity,
        }

        const newProduct = await storeProduct.productCreate(product);
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const productDestroy = async (req: Request, res: Response) => {
    const deleted = await storeProduct.productDestroy(req.params.id)
    res.json(deleted)
}


    
const cosmetics_product_routes = (app: express.Application) => {
    app.get('/product', productIndex);
    app.get('/product/:id', productShow);
    app.post('/product', productCreate);
    app.delete('/product/:id', productDestroy);
};

export default cosmetics_product_routes;