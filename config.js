// Configuration file for Quiz App
const CONFIG = {
    // OpenAI API Configuration
    OPENAI_API_KEY: 'your-openai-api-key-here', // Replace with your actual OpenAI API key
    
    // Alternative AI Services (uncomment to use)
    // ANTHROPIC_API_KEY: 'your-anthropic-api-key-here', // For Claude API
    // GOOGLE_API_KEY: 'your-google-api-key-here', // For Google AI
    
    // Quiz Settings
    QUESTIONS_PER_QUIZ: 15,
    TIME_PER_QUESTION: 15, // seconds
    BATCH_SIZE: 5, // Number of questions to generate per API call
    
    // AI Question Settings
    AI_TEMPERATURE: 0.8, // Higher temperature for more creative/tricky questions
    GENERATE_EXTRA_QUESTIONS: 1.5, // Generate 50% more questions to account for filtering
    PREVENT_REPETITION: true, // Track used questions to prevent repetition
    RANDOMIZE_ANSWERS: true, // Randomize correct answer positions
    
    // API Settings
    API_TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    
    // Fallback Settings
    USE_FALLBACK_ON_ERROR: true,
    SHOW_LOADING_MESSAGE: true,
    
    // Question Difficulty
    MAKE_QUESTIONS_TRICKY: true, // Generate challenging questions
    INCLUDE_MISCONCEPTIONS: true, // Include common misconceptions as wrong options
    PRACTICAL_SCENARIOS: true // Include real-world scenarios
};

// Instructions for users:
/*
To use AI-generated questions:

1. Get an OpenAI API key:
   - Go to https://platform.openai.com/
   - Sign up and get your API key
   - Replace 'your-openai-api-key-here' with your actual key

2. Alternative AI services:
   - Uncomment and configure other AI services if needed
   - Update the AIQuestionGenerator class to use different APIs

3. Security Note:
   - Never commit your API key to public repositories
   - Consider using environment variables for production
   - This is for educational purposes only

4. Cost Note:
   - OpenAI API has usage costs
   - Monitor your usage to avoid unexpected charges
   - Consider setting up usage limits

5. Question Settings:
   - AI_TEMPERATURE: Higher values (0.8-1.0) create more creative/tricky questions
   - GENERATE_EXTRA_QUESTIONS: Generate more questions than needed to filter duplicates
   - PREVENT_REPETITION: Track used questions across sessions
   - RANDOMIZE_ANSWERS: Shuffle option positions to prevent pattern recognition
*/ 