var express = require('express');
var router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const watson = require('../util/watson');

let context = {};

/* GET home page. */
router.post('/voice', async (req, res, next) => {
    // Use the Twilio Node.js SDK to build an XML response
    let msgInput = '';
    if (req.body.CallStatus === 'ringing') {
        context = {};
    } else {
        msgInput = {
            'text': req.body.SpeechResult
        };
    }
    const retornoWatson = await watson.message(msgInput, context);
    console.log(retornoWatson);
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
        input: 'speech',
        language: 'pt-BR'
    });
    gather.say({
        voice: 'alice',
        language: 'pt-br'
    }, await retornoWatson.output.text.join('. '));


    // Render the response as XML in reply to the webhook request
    res.type('text/xml');
    res.send(twiml.toString());
});

module.exports = router;