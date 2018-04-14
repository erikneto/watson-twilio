const watson = require('watson-developer-cloud');


module.exports.message = (msgInput, context) => {
    return new Promise((resolve, reject) => {

        const assistant = new watson.AssistantV1({
            username: process.env.ASSISTANT_USERNAME || '<username>',
            password: process.env.ASSISTANT_PASSWORD || '<password>',
            version: '2018-02-16'
        });
        const payload = {
            workspace_id: '<workspace>',
            context: context || {},
            input: msgInput || {}
        };

        // Send the input to the assistant service
        assistant.message(payload, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}