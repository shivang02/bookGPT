const axios = require('axios');

class ChatGPTModel {
    async getSections(bookTitle, sectionTitle) {
        // Make a request to ChatGPT's API to get the sections for the book
        // If section title is null then set a value of a variable, let's call it choice, as book
        // If section title is not null then set a value of a variable, let's call it choice, as section
        prompt = sectionTitle ? `Give me the sub-sections of the section "${sectionTitle}" of the book "${bookTitle}"` : `Give me the sections of the book "${bookTitle}"`;
        const response = await axios.get('https://api.openai.com/v1/engines/davinci-codex/completions', {
            params: {
                prompt: prompt,
                max_tokens: 100,
                n: 1,
                stop: '\n',
                temperature: 0.7,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        // Extract the sections from the API response
        const sections = response.data.choices[0].text.trim().split('\n');

        // Return an array of section objects with a title and empty subsections array
        return sections.map((section) => ({
            title: section,
            content: null,
            subsections: [],
        }));
    }

    async getSummary(bookTitle, sectionTitle) {
        // Make a request to ChatGPT's API to get a summary of the section
        const response = await axios.get('https://api.openai.com/v1/engines/davinci-codex/completions', {
            params: {
                prompt: `Give a summary of the section "${sectionTitle}" of the book "${bookTitle}":`,
                max_tokens: 100,
                n: 1,
                stop: '\n',
                temperature: 0.7,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        // Extract the summary from the API response
        const summary = response.data.choices[0].text.trim();

        // Return the summary
        return summary;
    }
}

module.exports = ChatGPTModel;
