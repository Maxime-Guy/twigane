const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3001;

// WhatsApp Business API configuration
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || 'YOUR_WHATSAPP_TOKEN';
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'YOUR_VERIFY_TOKEN';
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || 'YOUR_PHONE_NUMBER_ID';
const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kinyarwanda learning responses
const kinyarwandaResponses = {
  greetings: [
    {
      trigger: ['muraho', 'mwaramutse', 'mwiriwe', 'hello', 'hi'],
      response: 'Mwaramutse! Witwa nde? Ndashaka kugufasha kwiga Ikinyarwanda! 🇷🇼',
      translation: 'Good morning! What\'s your name? I want to help you learn Kinyarwanda!'
    }
  ],
  basics: [
    {
      trigger: ['amakuru', 'bite', 'how are you'],
      response: 'Ni meza, murakoze! Wowe ni gute? Ikinyarwanda ni ururimi rwiza cyane!',
      translation: 'I\'m fine, thank you! How about you? Kinyarwanda is a very beautiful language!'
    },
    {
      trigger: ['murakoze', 'asante', 'thank you'],
      response: 'Ntacyo banze! Komeza kwiga! Ubu reka tubane ibindi magambo y\'ingenzi.',
      translation: 'You\'re welcome! Keep learning! Now let\'s learn other important words.'
    }
  ],
  lessons: [
    {
      trigger: ['family', 'umuryango', 'familia'],
      response: 'Umuryango (Family):\n• Papa - Father\n• Mama - Mother\n• Mwana - Child\n• Mukuru - Elder\n• Muto - Younger\n\nGerageza kuvuga: "Umuryango wanjye ni mwiza" (My family is good)',
      translation: 'Family vocabulary with pronunciation practice'
    },
    {
      trigger: ['numbers', 'imibare', 'numero'],
      response: 'Imibare (Numbers):\n• 1 - rimwe\n• 2 - kabiri\n• 3 - gatatu\n• 4 - kane\n• 5 - gatanu\n\nGerageza kuvuga: "Mfite abaana batanu" (I have five children)',
      translation: 'Numbers 1-5 with example sentence'
    }
  ],
  help: [
    {
      trigger: ['help', 'ubufasha', 'ayuda'],
      response: 'Nabafasha gute mu kwiga Ikinyarwanda? 🤔\n\n📚 Vuga "lessons" - Amasomo\n👨‍👩‍👧‍👦 Vuga "family" - Umuryango\n🔢 Vuga "numbers" - Imibare\n🗣️ Vuga "pronunciation" - Imvugo\n\nCyangwa usabe icyari cyose ukunda!',
      translation: 'How can I help you learn Kinyarwanda? Say "lessons", "family", "numbers", "pronunciation", or ask anything!'
    }
  ]
};

// Webhook verification (required by WhatsApp)
app.get('/api/whatsapp/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    res.status(403).send('Forbidden');
  }
});

// Webhook to receive messages
app.post('/api/whatsapp/webhook', async (req, res) => {
  try {
    const body = req.body;

    // Check if it's a WhatsApp message
    if (body.object === 'whatsapp_business_account') {
      body.entry.forEach(entry => {
        entry.changes.forEach(change => {
          if (change.field === 'messages') {
            const messages = change.value.messages;
            if (messages) {
              messages.forEach(message => {
                handleIncomingMessage(message, change.value.metadata.phone_number_id);
              });
            }
          }
        });
      });
    }

    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle incoming messages
async function handleIncomingMessage(message, phoneNumberId) {
  const from = message.from;
  const messageText = message.text?.body?.toLowerCase() || '';
  const messageType = message.type;

  console.log(`Received message from ${from}: ${messageText}`);

  // Only respond to text messages
  if (messageType === 'text') {
    const response = generateKinyarwandaResponse(messageText);
    await sendMessage(from, response.text, phoneNumberId);
    
    // Send translation if available
    if (response.translation) {
      setTimeout(() => {
        sendMessage(from, `📝 Translation: ${response.translation}`, phoneNumberId);
      }, 1000);
    }
  }
}

// Generate Kinyarwanda learning response
function generateKinyarwandaResponse(messageText) {
  const allResponses = [
    ...kinyarwandaResponses.greetings,
    ...kinyarwandaResponses.basics,
    ...kinyarwandaResponses.lessons,
    ...kinyarwandaResponses.help
  ];

  // Find matching response
  for (const responseObj of allResponses) {
    for (const trigger of responseObj.trigger) {
      if (messageText.includes(trigger)) {
        return {
          text: responseObj.response,
          translation: responseObj.translation
        };
      }
    }
  }

  // Default response if no match found
  return {
    text: 'Ndashaka kugufasha kwiga Ikinyarwanda! Vuga "help" kugira ngo ubone uko nawe nshobora kugufasha.',
    translation: 'I want to help you learn Kinyarwanda! Say "help" to see how I can assist you.'
  };
}

// Send message to WhatsApp
async function sendMessage(to, message, phoneNumberId) {
  try {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: message
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, data, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Twigane WhatsApp Bot is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Twigane WhatsApp Bot server running on port ${port}`);
  console.log(`📱 Webhook URL: http://localhost:${port}/api/whatsapp/webhook`);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
});

// Export for testing
module.exports = app; 