import {ACCESS_TOKEN} from '../config.js'
import mercadopago from 'mercadopago'
/* import {PORT} from '../config.js' */

export const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: ACCESS_TOKEN
    })

    const result = await mercadopago.preferences.create({
        items: [{
            title: "test product",
            unit_price: 500, 
            currency_id: "ARS",
            quantity: 1
        }],
        back_urls: {
            success: `https://localhost:3000/success`,
            failure: "https://localhost:3000/failure",
            pending: "https://localhost:3000/pending"
        },
        notification_url: "https://d0c0-181-1-169-99.ngrok-free.app/webhook"
    })
    console.log(result)
    res.send(result.body)
};

export const receiveWebhook = async (req, res) => {
    const payment = req.query;
    
    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log(data)
            // store in database
        };
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }     
}
