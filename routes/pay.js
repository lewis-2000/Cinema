const express = require('express');
const router = express.Router();
const axios = require('axios');

const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    return `${year}, ${month},${month}, ${hours}, ${minutes}, ${seconds}`;
}

const consumerKey = '';
const consumerSecret = '';


const generateAccessToken = async (consumerKey, consumerSecret) => {
    try {
        const response = await axios.get('https://api.safaricom.co.ke/oauth/v1/generate',{
            auth:{
                username: consumerKey,
                password: consumerSecret,
            },
        });
        return response.data.access_token;
    } catch (error) {
        throw new Error;
    }
};


router.post('/pay', async function (req, res) {
    try {
        // Generate Access Token for Authorization

        const accessToken = await generateAccessToken(consumerKey, consumerSecret);

        // Create the payment request

        const paymentRequest = {
            BusinessShortCode: 'YOUR BUSINESS_SHORT_CODE',
            Password: 'YOUR PASSWORD',
            Timestamp: generateTimestamp(), //Format: YYYY-MM-DD-HH:mm:ss
            TransactionType: 'CustomerPayBillOnline',
            Amount: req.body.amount,
            PartyA: req.body.phone,
            PartyB: 'YOUR_BUSINESS_SHORT_CODE',
            CallBackURL: 'localhost:4000/paymentCallback',
            AccountReference: 'YOUR_ORDER_ID',
            TranasactionDesc: 'Paymen for Order',
        }

        // Maake the payment for the request

        const paymentResponse = await initiatePayment(accessToken, paymentRequest);

        // Handle the payment Response
        console.log(paymentResponse);

        res.status(200).json( {message: 'Payment Succesfull', data: paymentResponse});
        
    } catch (error) {
        console.error(error);
        res.status(500).json( {message: 'Payment Error', data: error});
    }

});

// Function to initiate the lipa na MPesa payment

const initiatePayment = async (accessToken, paymentRequest) => {
    try {
        const response = await axios.post('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        paymentRequest,
        {
            headers:{
                Authorization: 'Bearer ' + accessToken,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error;
    }
};