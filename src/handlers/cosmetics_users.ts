import express, { Request, Response } from 'express';
import { User, CosmeticsUser } from '../models/cosmetics_user';

const store = new CosmeticsUser();

const index = async (_req: Request, res: Response) => {
    const user = await store.index()
    res.json(user);
};

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user);
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
        }

        const newUser = await store.create(user);
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


    
const cosmetics_user_routes = (app: express.Application) => {
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', create);
    app.delete('/user/:id', destroy);
};

export default cosmetics_user_routes;