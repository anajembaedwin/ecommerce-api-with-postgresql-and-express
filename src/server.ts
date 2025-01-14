import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cosmetics_user_routes from './handlers/cosmetics_users';
import cosmetics_product_routes from './handlers/cosmetics_products';
import cosmetics_order_routes from './handlers/cosmetics_orders';

const app: express.Application = express()
const address = "0.0.0.0:3000";


const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

//testing for initial request and response. (works fine)
app.get('/', function (req: Request, res: Response) {
    res.send('Hello world');
})

//testing that cors works with all requests and responses, with middleware. (works fine)
app.get('/test-cors', cors(corsOptions), function (req: Request, res: Response, next) {
    res.json({msg: 'This is CORS-enabled with a middle ware'});
})

//user routes. (works fine)
cosmetics_user_routes(app);

//product routes. (does not work fine)
cosmetics_product_routes(app);

//order routes. (does not work fine)
cosmetics_order_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
