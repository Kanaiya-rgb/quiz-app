# 🎯 AI-Powered Quiz App

A modern, interactive quiz application with AI-generated questions based on different fields of study.

## ✨ Features

- **Field-Specific Questions**: Choose from CSE, ECE, ME, CE, or General Knowledge
- **AI-Generated Content**: Dynamic questions using OpenAI API
- **Interactive UI**: Modern, responsive design with smooth animations
- **Timer & Skip**: 15-second timer per question with skip option
- **Progress Tracking**: Real-time progress bar and question counter
- **Score Management**: Best score saved in localStorage
- **Emotional Feedback**: Personalized feedback based on performance
- **Offline Fallback**: Works without internet using pre-loaded questions

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open `config.js`** and add your OpenAI API key:
   ```javascript
   OPENAI_API_KEY: 'your-actual-api-key-here'
   ```
3. **Open `index.html`** in your browser
4. **Start the quiz!** 🎉

## 🔧 Setup Instructions

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the generated key
6. Replace `'your-openai-api-key-here'` in `config.js` with your actual key

### Alternative AI Services

You can also configure other AI services by modifying `config.js`:

```javascript
// For Anthropic Claude
ANTHROPIC_API_KEY: 'your-anthropic-api-key-here',

// For Google AI
GOOGLE_API_KEY: 'your-google-api-key-here',
```

## 📁 File Structure

```
quiz-app/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Main application logic
├── config.js           # Configuration and API keys
├── ai-questions.js     # AI question generator
├── questions.js        # Static questions
├── cse-questions.js    # Field-specific questions
└── README.md           # This file
```

## 🎓 Available Fields

### Computer Science (CSE)
- Programming languages
- Data structures & algorithms
- Web development
- Databases
- Software engineering

### Electronics (ECE)
- Circuit components
- Digital electronics
- Communication systems
- Signal processing
- Electrical laws

### Mechanical (ME)
- Mechanics & dynamics
- Thermodynamics
- Fluid mechanics
- Manufacturing
- Material science

### Civil (CE)
- Structural analysis
- Construction materials
- Geotechnical engineering
- Transportation
- Environmental engineering

### General Knowledge
- Science & technology
- History & geography
- Mathematics
- Literature & arts

## ⚙️ Configuration Options

Edit `config.js` to customize:

```javascript
const CONFIG = {
    OPENAI_API_KEY: 'your-key-here',
    QUESTIONS_PER_QUIZ: 15,        // Number of questions per quiz
    TIME_PER_QUESTION: 15,          // Seconds per question
    BATCH_SIZE: 5,                  // Questions per API call
    API_TIMEOUT: 10000,             // API timeout in ms
    RETRY_ATTEMPTS: 3,              // API retry attempts
    USE_FALLBACK_ON_ERROR: true,    // Use fallback questions if API fails
    SHOW_LOADING_MESSAGE: true      // Show loading messages
};
```

## 🔒 Security & Privacy

- **API Keys**: Never commit your API keys to public repositories
- **Local Storage**: User data is stored locally in the browser
- **No Server**: This is a client-side application
- **Cost Control**: Monitor your API usage to avoid unexpected charges

## 💡 Usage Tips

1. **First Time**: The app will use fallback questions until you configure the API key
2. **Internet Required**: AI questions require an internet connection
3. **Offline Mode**: Works completely offline with pre-loaded questions
4. **Performance**: AI questions may take a few seconds to generate
5. **Cost**: Each API call has a small cost (typically $0.001-0.01 per call)

## 🛠️ Troubleshooting

### API Key Issues
- Ensure your API key is correct and active
- Check your OpenAI account balance
- Verify the key is properly formatted in `config.js`

### No AI Questions
- Check browser console for error messages
- Verify internet connection
- Ensure API key is configured correctly
- App will automatically use fallback questions

### Performance Issues
- Reduce `BATCH_SIZE` in config for slower connections
- Increase `API_TIMEOUT` if requests are timing out
- Check OpenAI API status at [status.openai.com](https://status.openai.com)

## 🎨 Customization

### Adding New Fields
1. Add field questions to `cse-questions.js`
2. Update field selection in `index.html`
3. Add field prompts in `ai-questions.js`

### Styling Changes
- Modify `style.css` for visual changes
- Update colors, fonts, and animations
- Responsive design included

### Question Format
Questions should follow this format:
```javascript
{
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0  // Index of correct answer (0-3)
}
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Feel free to contribute by:
- Adding new question sets
- Improving the UI/UX
- Adding new features
- Fixing bugs
- Improving documentation

## 📄 License

This project is for educational purposes. Please respect OpenAI's terms of service when using their API.

## 🙏 Acknowledgments

- OpenAI for providing the AI API
- Modern CSS techniques for beautiful UI
- JavaScript community for best practices

---

**Happy Quizzing! 🎯✨** 