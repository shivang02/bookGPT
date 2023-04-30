const ChatGPTModel = require('../models/chatGPTModel');

// Create a new instance of the ChatGPTModel class
const chatGPTModel = new ChatGPTModel();

exports.getSections = async (req, res) => {
    try {
        // Get the book title from the request query parameters
        const { bookTitle, sectionTitle } = req.query;

        // Call the getSections method on the ChatGPTModel instance
        const sections = await chatGPTModel.getSections(bookTitle, sectionTitle);

        // Send the sections as the response
        res.json(sections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getSummary = async (req, res) => {
    try {
        // Get the book title and section title from the request query parameters
        const { bookTitle, sectionTitle } = req.query;

        // Call the getSummary method on the ChatGPTModel instance
        const summary = await chatGPTModel.getSummary(bookTitle, sectionTitle);

        // Send the summary as the response
        res.json({ summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
