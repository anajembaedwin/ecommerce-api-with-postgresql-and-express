import express, { Request, Response } from 'express';
import { Order, CosmeticsOrder } from '../models/cosmetics_order';

const storeOrder = new CosmeticsOrder();

const orderIndex = async (_req: Request, res: Response) => {
    const order = await storeOrder.orderIndex()
    res.json(order);
};

const orderShow = async (req: Request, res: Response) => {
    const order = await storeOrder.orderShow(req.params.id)
    res.json(order);
};

const orderCreate = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            product_id: req.body.productId,
            user_id: req.body.userId,
            product_quantity: req.body.productQuantity,
            order_status: req.body.orderStatus
        }

        const newOrder = await storeOrder.orderCreate(order);
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const orderDestroy = async (req: Request, res: Response) => {
    const deleted = await storeOrder.orderDestroy(req.params.id)
    res.json(deleted)
}

const cosmetics_order_routes = (app: express.Application) => {
    app.get('/order', orderIndex);
    app.get('/order/:id', orderShow);
    app.post('/order', orderCreate);
    app.delete('/order/:id', orderDestroy);
};

export default cosmetics_order_routes;
