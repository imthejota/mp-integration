import mercadopago from 'mercadopago'
import {PORT} from '../config.js'

export const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: "TEST-5900262110201622-052719-fda7938a5456a145aa9e21f389142a1c-1384223211"
    })

    const result = await mercadopago.preferences.create({
        items: [{
            title: "test product",
            unit_price: 500, 
            currency_id: "ARS",
            quantity: 1
        }],
        back_urls: {
            success: `https://localhost:${PORT}/success`,
            failure: "https://localhost:3000/failure",
            pending: "https://localhost:3000/pending"
        },
        notification_url: "https://4021-181-1-169-99.sa.ngrok.io/webhook"
    })
    console.log(result)
    res.send(result.body)
};

export const receiveWebhook = async (req, res) => {
    const payment = req.query
    
    try {
        if (payment.type === 'payment') {
            const data = mercadopago.payment.findById(payment["data.id"])
            console.log(data)
        };
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({error: error.message})
    }    
    res.send("webhook");    
}
