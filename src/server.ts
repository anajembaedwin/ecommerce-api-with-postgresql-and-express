import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cosmetics_user_routes from './handlers/cosmetics_users';

const app: express.Application = express()
const address = "0.0.0.0:3000";


const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello world');
// })

// app.get('/test-cors', cors(corsOptions), function (req: Request, res: Response, next) {
//     res.json({msg: 'This is CORS-enabled with a middle ware'})
// })



cosmetics_user_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
