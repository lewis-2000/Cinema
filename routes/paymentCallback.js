const express = require('express');
const router = express.Router();

router.post('/payment-callback', function (req, res) {
    // Handle Payment Callback events
    //Verify the payment  and update app

    //Respond with a success message

    res.status(200).send({ message: 'Payment Success' });
});