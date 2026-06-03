const express = require('express');
const router = express.Router();

const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
});

router.post('/summary', async (req, res) => {
    try {
        const { text } = req.body;

        const completion = await client.chat.completions.create({
            model: 'openai/gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'Summarize study notes into short bullet points.'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
        });

        const summary = completion.choices[0].message.content;

        res.json({ summary });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'AI Summary failed'
        });
    }
});

module.exports = router;