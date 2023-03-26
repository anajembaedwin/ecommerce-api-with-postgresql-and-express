import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/users', function (req: Request, res: Response) {
    const users = {} //here we will call the model method
    return res.json(users)
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
