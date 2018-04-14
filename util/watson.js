const watson = require('watson-developer-cloud');


module.exports.message = (msgInput, context) => {
    return new Promise((resolve, reject) => {

        const assistant = new watson.AssistantV1({
            username: process.env.ASSISTANT_USERNAME || 'e51d5555-bbce-44c7-b51c-fafb7d037293',
            password: process.env.ASSISTANT_PASSWORD || 'ctQFAgPKJqop',
            version: '2018-02-16'
        });
        const payload = {
            workspace_id: 'f716bbef-d7c8-4563-b5ef-9c0f008eb71f',
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