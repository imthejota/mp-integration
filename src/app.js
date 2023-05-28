import express from 'express'
import morgan from 'morgan'
import paymentRoutes from './routes/payment-routes.js'
import {PORT} from './config.js'

const app = express();
/* const port = process.env.PORT || 3000; */
app.use(morgan('dev'))
app.use(paymentRoutes)


const start = async () => {
    try {
        app.listen(PORT, console.log(`Server is listening on port ${PORT}, https://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()