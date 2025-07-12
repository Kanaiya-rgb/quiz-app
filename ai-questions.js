class AIQuestionGenerator {
    constructor() {
        this.apiKey = CONFIG.OPENAI_API_KEY;
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.retryAttempts = CONFIG.RETRY_ATTEMPTS;
        this.timeout = CONFIG.API_TIMEOUT;
        this.usedQuestions = new Set(); // Track used questions to prevent repetition
    }

    async generateQuestions(count = 10, field = 'general') {
        try {
            // Check if API key is configured
            if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {
                console.warn('OpenAI API key not configured. Using fallback questions.');
                return this.getFallbackQuestions(field, count);
            }

            const questions = [];
            const fieldPrompts = {
                'cse': 'Generate tricky multiple choice questions about Computer Science topics like programming, algorithms, data structures, web development, databases, and software engineering. Make questions challenging but fair. Include edge cases and common misconceptions.',
                'ece': 'Generate tricky multiple choice questions about Electronics and Communication topics like circuits, components, digital electronics, communication systems, and signal processing. Make questions challenging but fair. Include practical scenarios and common mistakes.',
                'me': 'Generate tricky multiple choice questions about Mechanical Engineering topics like mechanics, thermodynamics, fluid mechanics, manufacturing, and material science. Make questions challenging but fair. Include real-world applications and common misconceptions.',
                'ce': 'Generate tricky multiple choice questions about Civil Engineering topics like structural analysis, construction materials, geotechnical engineering, transportation, and environmental engineering. Make questions challenging but fair. Include practical scenarios and common errors.',
                'general': 'Generate tricky multiple choice questions about general knowledge including science, history, geography, technology, mathematics, and literature. Make questions challenging but fair. Include interesting facts and common misconceptions.'
            };

            const prompt = fieldPrompts[field] || fieldPrompts['general'];
            
            // Generate more questions than needed to account for filtering
            const extraQuestions = Math.ceil(count * CONFIG.GENERATE_EXTRA_QUESTIONS);
            const batchSize = CONFIG.BATCH_SIZE;
            const batches = Math.ceil(extraQuestions / batchSize);
            
            for (let batch = 0; batch < batches; batch++) {
                const questionsInBatch = Math.min(batchSize, extraQuestions - (batch * batchSize));
                const batchQuestions = await this.generateBatchQuestionsWithRetry(questionsInBatch, prompt);
                
                // Filter out used questions and add new ones
                for (const question of batchQuestions) {
                    if (questions.length >= count) break;
                    
                    if (CONFIG.PREVENT_REPETITION) {
                        const questionKey = this.getQuestionKey(question);
                        if (!this.usedQuestions.has(questionKey)) {
                            this.usedQuestions.add(questionKey);
                            questions.push(CONFIG.RANDOMIZE_ANSWERS ? this.randomizeAnswerPosition(question) : question);
                        }
                    } else {
                        questions.push(CONFIG.RANDOMIZE_ANSWERS ? this.randomizeAnswerPosition(question) : question);
                    }
                }
                
                // Small delay between batches to avoid rate limiting
                if (batch < batches - 1) {
                    await this.delay(1000);
                }
            }
            
            return questions.slice(0, count);
        } catch (error) {
            console.error('Error generating AI questions:', error);
            if (CONFIG.USE_FALLBACK_ON_ERROR) {
                return this.getFallbackQuestions(field, count);
            }
            throw error;
        }
    }

    getQuestionKey(question) {
        // Create a unique key based on question text and options
        const options = question.options || [];
        return `${question.question.toLowerCase().trim()}-${options.join('-').toLowerCase().trim()}`;
    }

    randomizeAnswerPosition(question) {
        // Create a copy of the question
        const newQuestion = {
            question: question.question,
            options: [...question.options],
            correct: question.correct
        };
        
        // Shuffle options and update correct answer index
        const correctAnswer = newQuestion.options[newQuestion.correct];
        this.shuffleArray(newQuestion.options);
        
        // Find new position of correct answer
        newQuestion.correct = newQuestion.options.indexOf(correctAnswer);
        
        return newQuestion;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async generateBatchQuestionsWithRetry(count, prompt) {
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                return await this.generateBatchQuestions(count, prompt);
            } catch (error) {
                console.warn(`Attempt ${attempt} failed:`, error.message);
                if (attempt === this.retryAttempts) {
                    throw error;
                }
                // Wait before retrying
                await this.delay(2000 * attempt);
            }
        }
    }

    async generateBatchQuestions(count, prompt) {
        const systemPrompt = `You are a quiz question generator that creates TRICKY and CHALLENGING multiple choice questions. Generate ${count} questions in JSON format. Each question should have:
- A challenging question that tests deep understanding
- 4 options where all options seem plausible
- The correct answer index (0-3)
- Include common misconceptions as wrong options
- Make questions practical and scenario-based when possible

Format: [{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0}]

Make questions educational but challenging. Avoid obvious wrong answers.`;

        const userPrompt = `${prompt}\n\nGenerate exactly ${count} TRICKY questions. Make sure all options are plausible and the correct answer is not obvious.`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    max_tokens: 2000,
                    temperature: CONFIG.AI_TEMPERATURE // Use config temperature for creativity
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid API response format');
            }

            const content = data.choices[0].message.content;
            
            // Try to parse JSON from the response
            const jsonMatch = content.match(/\[.*\]/s);
            if (jsonMatch) {
                const questions = JSON.parse(jsonMatch[0]);
                const validQuestions = questions.filter(q => 
                    q.question && 
                    q.options && 
                    Array.isArray(q.options) && 
                    q.options.length === 4 && 
                    typeof q.correct === 'number' &&
                    q.correct >= 0 && 
                    q.correct <= 3
                );
                
                if (validQuestions.length === 0) {
                    throw new Error('No valid questions found in response');
                }
                
                return validQuestions;
            }
            
            throw new Error('Invalid response format - no JSON array found');
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('API request timed out');
            }
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getFallbackQuestions(field, count) {
        // Enhanced fallback questions with tricky options
        const fallbackQuestions = {
            'cse': [
                {
                    question: "What happens when you try to access an array index that doesn't exist in JavaScript?",
                    options: ["Returns undefined", "Throws an error", "Returns null", "Returns empty string"],
                    correct: 0
                },
                {
                    question: "Which of these is NOT a valid way to declare a variable in JavaScript?",
                    options: ["let x = 5", "const x = 5", "var x = 5", "variable x = 5"],
                    correct: 3
                },
                {
                    question: "What is the output of: console.log(typeof null)?",
                    options: ["null", "undefined", "object", "number"],
                    correct: 2
                },
                {
                    question: "Which method removes the last element from an array?",
                    options: ["shift()", "pop()", "unshift()", "push()"],
                    correct: 1
                },
                {
                    question: "What does the '===' operator check for?",
                    options: ["Value equality", "Value and type equality", "Reference equality", "Type equality only"],
                    correct: 1
                }
            ],
            'ece': [
                {
                    question: "What happens to current in a series circuit if one resistor burns out?",
                    options: ["Current increases", "Current decreases", "Current stops completely", "Current remains same"],
                    correct: 2
                },
                {
                    question: "Which component would you use to block DC but allow AC?",
                    options: ["Resistor", "Capacitor", "Inductor", "Diode"],
                    correct: 1
                },
                {
                    question: "What is the phase difference between voltage and current in a pure capacitor?",
                    options: ["0°", "90°", "180°", "270°"],
                    correct: 1
                },
                {
                    question: "Which logic gate gives output 1 when inputs are different?",
                    options: ["AND", "OR", "XOR", "NAND"],
                    correct: 2
                },
                {
                    question: "What is the main advantage of digital signals over analog?",
                    options: ["Lower cost", "Better quality", "Noise immunity", "Higher speed"],
                    correct: 2
                }
            ],
            'me': [
                {
                    question: "What happens to pressure when velocity increases in a pipe?",
                    options: ["Pressure increases", "Pressure decreases", "Pressure remains constant", "Pressure becomes zero"],
                    correct: 1
                },
                {
                    question: "Which material has the highest thermal conductivity?",
                    options: ["Steel", "Aluminum", "Copper", "Iron"],
                    correct: 2
                },
                {
                    question: "What is the efficiency of a Carnot engine operating between 300K and 600K?",
                    options: ["25%", "50%", "75%", "100%"],
                    correct: 1
                },
                {
                    question: "Which force acts on a body moving in a circle?",
                    options: ["Centripetal force", "Centrifugal force", "Gravitational force", "Frictional force"],
                    correct: 0
                },
                {
                    question: "What is the unit of stress?",
                    options: ["Newton", "Pascal", "Joule", "Watt"],
                    correct: 1
                }
            ],
            'ce': [
                {
                    question: "What happens to concrete strength if you add too much water?",
                    options: ["Strength increases", "Strength decreases", "Strength remains same", "Strength becomes zero"],
                    correct: 1
                },
                {
                    question: "Which foundation is best for weak soil?",
                    options: ["Spread footing", "Pile foundation", "Mat foundation", "Strip foundation"],
                    correct: 1
                },
                {
                    question: "What is the purpose of stirrups in reinforced concrete?",
                    options: ["To carry axial load", "To resist shear", "To provide cover", "To reduce cost"],
                    correct: 1
                },
                {
                    question: "Which material has the highest compressive strength?",
                    options: ["Wood", "Brick", "Steel", "Concrete"],
                    correct: 2
                },
                {
                    question: "What is the function of a column in a building?",
                    options: ["To support beams", "To carry axial load", "To resist bending", "To provide stability"],
                    correct: 1
                }
            ],
            'general': [
                {
                    question: "Which planet has the most moons in our solar system?",
                    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                    correct: 1
                },
                {
                    question: "What is the largest organ in the human body?",
                    options: ["Heart", "Liver", "Skin", "Brain"],
                    correct: 2
                },
                {
                    question: "Which gas is most abundant in Earth's atmosphere?",
                    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
                    correct: 2
                },
                {
                    question: "What is the square root of -1?",
                    options: ["-1", "0", "1", "i"],
                    correct: 3
                },
                {
                    question: "Which country has the most time zones?",
                    options: ["Russia", "USA", "France", "China"],
                    correct: 2
                }
            ]
        };

        const questions = fallbackQuestions[field] || fallbackQuestions['general'];
        const shuffledQuestions = [...questions];
        this.shuffleArray(shuffledQuestions);
        
        return shuffledQuestions.slice(0, count).map(q => this.randomizeAnswerPosition(q));
    }
} 