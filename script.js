class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.skippedQuestions = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.timer = null;
        this.timeLeft = 15;
        this.isAnswered = false;
        this.userName = '';
        this.selectedField = '';
        this.aiGenerator = new AIQuestionGenerator();
        this.currentStreak = 0;
        
        // Settings
        this.settings = {
            timerDuration: 15,
            questionsCount: 15,
            soundEnabled: true,
            animationsEnabled: true
        };
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.loadBestScore();
        this.updateWelcomeScreen();
        this.updateHeader();
        this.startTimeUpdate();
    }

    initializeElements() {
        // Screens
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.nameScreen = document.getElementById('name-screen');
        this.fieldScreen = document.getElementById('field-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');

        // Header elements
        this.headerUserName = document.getElementById('header-user-name');
        this.timeDisplay = document.getElementById('time-display');

        // Welcome screen elements
        this.welcomeMessage = document.getElementById('welcome-message');
        this.bestScoreElement = document.getElementById('best-score');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.currentStreakElement = document.getElementById('current-streak');
        this.startBtn = document.getElementById('start-btn');

        // Name screen elements
        this.nameInput = document.getElementById('name-input');
        this.continueBtn = document.getElementById('continue-btn');

        // Field screen elements
        this.fieldCards = document.querySelectorAll('.field-card');

        // Quiz screen elements
        this.questionCounter = document.getElementById('question-counter');
        this.timerElement = document.getElementById('timer');
        this.progressFill = document.getElementById('progress-fill');
        this.questionText = document.getElementById('question-text');
        this.optionButtons = document.querySelectorAll('.option-btn');
        this.skipBtn = document.getElementById('skip-btn');
        this.currentScoreElement = document.getElementById('current-score');
        this.skippedCountElement = document.getElementById('skipped-count');

        // Result screen elements
        this.finalScoreElement = document.getElementById('final-score');
        this.totalScoreElement = document.getElementById('total-score');
        this.scorePercentageElement = document.getElementById('score-percentage');
        this.resultMessageElement = document.getElementById('result-message');
        this.emotionalFeedbackElement = document.getElementById('emotional-feedback');
        this.bestScoreResultElement = document.getElementById('best-score-result');
        this.correctAnswersElement = document.getElementById('correct-answers');
        this.wrongAnswersElement = document.getElementById('wrong-answers');
        this.skippedAnswersElement = document.getElementById('skipped-answers');
        this.restartBtn = document.getElementById('restart-btn');
        this.homeBtn = document.getElementById('home-btn');

        // Footer elements
        this.settingsBtn = document.getElementById('settings-btn');
        this.helpBtn = document.getElementById('help-btn');

        // Modal elements
        this.settingsModal = document.getElementById('settings-modal');
        this.helpModal = document.getElementById('help-modal');
        this.settingsClose = document.getElementById('settings-close');
        this.helpClose = document.getElementById('help-close');
        this.saveSettingsBtn = document.getElementById('save-settings-btn');
        this.helpCloseBtn = document.getElementById('help-close-btn');
        this.clearDataBtn = document.getElementById('clear-data-btn');
        this.exportDataBtn = document.getElementById('export-data-btn');

        // Settings form elements
        this.timerDurationSelect = document.getElementById('timer-duration');
        this.questionsCountSelect = document.getElementById('questions-count');
        this.soundEnabledCheckbox = document.getElementById('sound-enabled');
        this.animationsEnabledCheckbox = document.getElementById('animations-enabled');

        // Loading overlay
        this.loadingOverlay = document.getElementById('loading-overlay');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.showNameScreen());
        this.continueBtn.addEventListener('click', () => this.handleNameSubmit());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.homeBtn.addEventListener('click', () => this.goHome());
        this.skipBtn.addEventListener('click', () => this.skipQuestion());

        // Handle Enter key in name input
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleNameSubmit();
            }
        });

        // Field selection
        this.fieldCards.forEach(card => {
            card.addEventListener('click', () => this.selectField(card));
        });

        this.optionButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.selectOption(index));
        });

        // Footer buttons
        this.settingsBtn.addEventListener('click', () => this.showSettings());
        this.helpBtn.addEventListener('click', () => this.showHelp());

        // Modal events
        this.settingsClose.addEventListener('click', () => this.hideSettings());
        this.helpClose.addEventListener('click', () => this.hideHelp());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.helpCloseBtn.addEventListener('click', () => this.hideHelp());
        this.clearDataBtn.addEventListener('click', () => this.clearAllData());
        this.exportDataBtn.addEventListener('click', () => this.exportData());

        // Close modals when clicking outside
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.hideSettings();
            }
        });

        this.helpModal.addEventListener('click', (e) => {
            if (e.target === this.helpModal) {
                this.hideHelp();
            }
        });

        // Handle Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSettings();
                this.hideHelp();
            }
        });
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('quizSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
        this.applySettings();
    }

    applySettings() {
        // Apply settings to form elements
        this.timerDurationSelect.value = this.settings.timerDuration;
        this.questionsCountSelect.value = this.settings.questionsCount;
        this.soundEnabledCheckbox.checked = this.settings.soundEnabled;
        this.animationsEnabledCheckbox.checked = this.settings.animationsEnabled;

        // Apply animations setting
        if (!this.settings.animationsEnabled) {
            document.body.style.setProperty('--animation-duration', '0s');
        } else {
            document.body.style.removeProperty('--animation-duration');
        }
    }

    saveSettings() {
        this.settings = {
            timerDuration: parseInt(this.timerDurationSelect.value),
            questionsCount: parseInt(this.questionsCountSelect.value),
            soundEnabled: this.soundEnabledCheckbox.checked,
            animationsEnabled: this.animationsEnabledCheckbox.checked
        };

        localStorage.setItem('quizSettings', JSON.stringify(this.settings));
        this.applySettings();
        this.hideSettings();
        this.showNotification('Settings saved successfully!', 'success');
    }

    showSettings() {
        this.settingsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideSettings() {
        this.settingsModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    showHelp() {
        this.helpModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideHelp() {
        this.helpModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.clear();
            this.bestScore = 0;
            this.currentStreak = 0;
            this.userName = '';
            this.updateWelcomeScreen();
            this.updateHeader();
            this.hideSettings();
            this.showNotification('All data cleared successfully!', 'success');
        }
    }

    exportData() {
        // Ask user for format
        const format = prompt('Export format? Type "csv" for Excel/Sheets, or "json" for raw data. Default is csv:', 'csv');
        const data = {
            userName: this.userName,
            bestScore: this.bestScore,
            currentStreak: this.currentStreak,
            settings: this.settings,
            exportDate: new Date().toISOString()
        };

        if (format && format.toLowerCase() === 'json') {
            // JSON export
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quiz-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.showNotification('Data exported as JSON!', 'success');
        } else {
            // CSV export
            const csvRows = [];
            csvRows.push('User Name,Best Score,Current Streak,Timer Duration,Questions Count,Sound Enabled,Animations Enabled,Export Date');
            csvRows.push(`"${data.userName}",${data.bestScore},${data.currentStreak},${data.settings.timerDuration},${data.settings.questionsCount},${data.settings.soundEnabled},${data.settings.animationsEnabled},${data.exportDate}`);
            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quiz-data-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.showNotification('Data exported as CSV!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showLoading() {
        this.loadingOverlay.classList.add('show');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }

    startTimeUpdate() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        this.timeDisplay.textContent = timeString;
    }

    updateHeader() {
        const savedName = localStorage.getItem('quizUserName');
        if (savedName) {
            this.userName = savedName;
            this.headerUserName.textContent = savedName;
        } else {
            this.headerUserName.textContent = 'Guest';
        }
    }

    loadBestScore() {
        this.bestScore = localStorage.getItem('quizBestScore') || 0;
        this.currentStreak = localStorage.getItem('quizCurrentStreak') || 0;
    }

    saveBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('quizBestScore', this.bestScore);
        }
        
        // Update streak
        const percentage = (this.score / this.settings.questionsCount) * 100;
        if (percentage >= 80) {
            this.currentStreak++;
            localStorage.setItem('quizCurrentStreak', this.currentStreak);
        } else {
            this.currentStreak = 0;
            localStorage.setItem('quizCurrentStreak', 0);
        }
    }

    updateWelcomeScreen() {
        this.bestScoreElement.textContent = this.bestScore;
        this.totalQuestionsElement.textContent = this.settings.questionsCount;
        this.currentStreakElement.textContent = this.currentStreak;
        
        // Update welcome message with user name if available
        if (this.userName) {
            this.welcomeMessage.textContent = `Welcome back, ${this.userName}! Ready to test your knowledge?`;
        } else {
            this.welcomeMessage.textContent = 'Test your knowledge with our interactive quiz!';
        }
    }

    showScreen(screen) {
        // Hide all screens
        this.welcomeScreen.classList.remove('active');
        this.nameScreen.classList.remove('active');
        this.fieldScreen.classList.remove('active');
        this.quizScreen.classList.remove('active');
        this.resultScreen.classList.remove('active');

        // Show target screen
        screen.classList.add('active');
    }

    showNameScreen() {
        this.showScreen(this.nameScreen);
        this.nameInput.focus();
    }

    handleNameSubmit() {
        const name = this.nameInput.value.trim();
        if (name.length < 2) {
            this.showNotification('Please enter a valid name (at least 2 characters)', 'error');
            return;
        }
        
        this.userName = name;
        localStorage.setItem('quizUserName', name);
        this.headerUserName.textContent = name;
        this.showFieldScreen();
    }

    showFieldScreen() {
        this.showScreen(this.fieldScreen);
    }

    selectField(card) {
        // Remove previous selection
        this.fieldCards.forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        
        // Get selected field
        this.selectedField = card.dataset.field;
        
        console.log(`Selected field: ${this.selectedField}`);
        
        // Start quiz immediately
        this.startQuiz();
    }

    async startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.skippedQuestions = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        this.showScreen(this.quizScreen);
        this.showLoading();
        
        // Show loading state
        this.questionText.textContent = "Loading questions...";
        this.optionButtons.forEach(btn => {
            btn.disabled = true;
            btn.querySelector('.option-text').textContent = "Loading...";
        });
        
        // Load all questions at once
        await this.loadAllQuestions();
        
        this.hideLoading();
        
        // Start the quiz
        this.loadQuestion();
    }

    async loadAllQuestions() {
        console.log(`Loading questions for field: ${this.selectedField}`);
        
        // Initialize questions array
        this.questions = [];
        
        // Step 1: Get field-specific questions from cseQuestions
        let fieldQuestions = [];
        if (this.selectedField && cseQuestions[this.selectedField]) {
            fieldQuestions = [...cseQuestions[this.selectedField]];
            console.log(`Found ${fieldQuestions.length} field-specific questions`);
        } else {
            fieldQuestions = [...cseQuestions.general];
            console.log(`Using general questions: ${fieldQuestions.length}`);
        }
        
        // Step 2: Add field-specific questions to main array
        this.questions = [...fieldQuestions];
        
        // Step 3: Generate AI questions for the specific field if needed
        const neededQuestions = this.settings.questionsCount - this.questions.length;
        if (neededQuestions > 0) {
            console.log(`Generating ${neededQuestions} AI questions for field: ${this.selectedField}`);
            try {
                const aiQuestions = await this.aiGenerator.generateQuestions(neededQuestions, this.selectedField);
                this.questions = [...this.questions, ...aiQuestions];
                console.log(`Added ${aiQuestions.length} AI questions`);
            } catch (error) {
                console.error('Error generating AI questions:', error);
                // Continue with existing questions
            }
        }
        
        // Step 4: Remove duplicates and ensure we have exactly the required number of questions
        this.questions = this.removeDuplicateQuestions(this.questions);
        
        // Step 5: Randomize answer positions for all questions
        this.questions = this.questions.map(question => this.randomizeAnswerPosition(question));
        
        // Step 6: Shuffle the questions
        this.questions = this.shuffleArray(this.questions);
        
        // Step 7: Take only the required number of questions
        this.questions = this.questions.slice(0, this.settings.questionsCount);
        
        console.log(`Final questions loaded: ${this.questions.length}`);
        console.log('Questions:', this.questions.map(q => q.question.substring(0, 50) + '...'));
    }

    removeDuplicateQuestions(questions) {
        const seen = new Set();
        return questions.filter(question => {
            const questionText = question.question.toLowerCase().trim();
            if (seen.has(questionText)) {
                return false;
            }
            seen.add(questionText);
            return true;
        });
    }

    randomizeAnswerPosition(question) {
        let options;
        let correctAnswer;
        let correctIndex;
        
        if (question.options) {
            // New format: {question, options: [], correct: index}
            options = [...question.options];
            correctIndex = question.correct;
            correctAnswer = options[correctIndex];
        } else {
            // Old format: {question, optionA, optionB, optionC, optionD, correctAnswer}
            options = [question.optionA, question.optionB, question.optionC, question.optionD];
            correctAnswer = question.correctAnswer;
            correctIndex = options.indexOf(correctAnswer);
        }
        
        // Shuffle options
        const shuffledOptions = this.shuffleArray([...options]);
        
        // Find the new position of correct answer
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
        
        if (question.options) {
            // Return new format
            return {
                ...question,
                options: shuffledOptions,
                correct: newCorrectIndex
            };
        } else {
            // Return old format
            return {
                ...question,
                optionA: shuffledOptions[0],
                optionB: shuffledOptions[1],
                optionC: shuffledOptions[2],
                optionD: shuffledOptions[3],
                correctAnswer: shuffledOptions[newCorrectIndex]
            };
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // Update question counter
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        
        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Update current score
        this.currentScoreElement.textContent = this.score;
        
        // Update skipped count
        this.skippedCountElement.textContent = this.skippedQuestions;
        
        // Set question text
        this.questionText.textContent = question.question;
        
        // Set options - handle both formats
        let options;
        if (question.options) {
            // New format: {question, options: [], correct: index}
            options = question.options;
        } else {
            // Old format: {question, optionA, optionB, optionC, optionD, correctAnswer}
            options = [question.optionA, question.optionB, question.optionC, question.optionD];
        }
        
        this.optionButtons.forEach((btn, index) => {
            if (options[index]) {
                btn.querySelector('.option-text').textContent = options[index];
                btn.classList.remove('selected', 'correct', 'incorrect');
                btn.disabled = false;
            }
        });
        
        // Reset timer
        this.resetTimer();
        this.startTimer();
        
        this.isAnswered = false;
    }

    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timeLeft = this.settings.timerDuration;
        this.timerElement.textContent = this.timeLeft;
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    timeUp() {
        clearInterval(this.timer);
        if (!this.isAnswered) {
            this.skipQuestion();
        }
    }

    skipQuestion() {
        if (this.isAnswered) return;
        
        this.skippedQuestions++;
        this.currentStreak = 0;
        this.isAnswered = true;
        
        clearInterval(this.timer);
        
        // Show correct answer briefly
        this.showCorrectAnswer();
        
        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }

    selectOption(selectedIndex) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        clearInterval(this.timer);
        
        const question = this.questions[this.currentQuestionIndex];
        let isCorrect = false;
        
        if (question.correct !== undefined) {
            // New format: correct is the index
            isCorrect = question.correct === selectedIndex;
        } else if (question.correctAnswer) {
            // Old format: correctAnswer is the answer text
            const options = [question.optionA, question.optionB, question.optionC, question.optionD];
            isCorrect = question.correctAnswer === options[selectedIndex];
        }
        
        if (isCorrect) {
            this.score++;
            this.correctAnswers++;
            this.currentStreak++;
        } else {
            this.wrongAnswers++;
            this.currentStreak = 0;
        }
        
        this.showAnswerFeedback(selectedIndex, isCorrect);
        
        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }

    showAnswerFeedback(selectedIndex, isCorrect) {
        this.optionButtons.forEach((btn, index) => {
            const question = this.questions[this.currentQuestionIndex];
            let options;
            let isCorrectOption = false;
            
            if (question.options) {
                // New format
                options = question.options;
                isCorrectOption = question.correct === index;
            } else {
                // Old format
                options = [question.optionA, question.optionB, question.optionC, question.optionD];
                isCorrectOption = question.correctAnswer === options[index];
            }
            
            if (index === selectedIndex) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (isCorrectOption) {
                btn.classList.add('correct');
            }
        });
    }

    showCorrectAnswer() {
        const question = this.questions[this.currentQuestionIndex];
        let options;
        
        if (question.options) {
            // New format
            options = question.options;
        } else {
            // Old format
            options = [question.optionA, question.optionB, question.optionC, question.optionD];
        }
        
        this.optionButtons.forEach((btn, index) => {
            let isCorrectOption = false;
            
            if (question.correct !== undefined) {
                // New format: correct is the index
                isCorrectOption = question.correct === index;
            } else if (question.correctAnswer) {
                // Old format: correctAnswer is the answer text
                isCorrectOption = question.correctAnswer === options[index];
            }
            
            if (isCorrectOption) {
                btn.classList.add('correct');
            }
        });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadQuestion();
    }

    endQuiz() {
        this.saveBestScore();
        this.showResults();
    }

    showResults() {
        this.showScreen(this.resultScreen);
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        this.finalScoreElement.textContent = this.score;
        this.totalScoreElement.textContent = this.questions.length;
        this.scorePercentageElement.textContent = `${percentage}%`;
        this.correctAnswersElement.textContent = this.correctAnswers;
        this.wrongAnswersElement.textContent = this.wrongAnswers;
        this.skippedAnswersElement.textContent = this.skippedQuestions;
        this.bestScoreResultElement.textContent = this.bestScore;
        
        // Update result message
        this.resultMessageElement.textContent = this.getResultMessage(percentage);
        
        // Update emotional feedback
        const feedback = this.getEmotionalFeedback(percentage);
        this.emotionalFeedbackElement.textContent = feedback.message;
        this.emotionalFeedbackElement.className = `emotional-feedback ${feedback.class}`;
    }

    getResultMessage(percentage) {
        if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
        if (percentage >= 80) return "Excellent work! You really know your stuff! 🌟";
        if (percentage >= 70) return "Great job! You have solid knowledge! 👍";
        if (percentage >= 60) return "Good effort! Keep learning and improving! 📚";
        if (percentage >= 50) return "Not bad! With more practice, you'll do better! 💪";
        if (percentage >= 40) return "Keep studying! You'll improve with practice! 📖";
        return "Don't give up! Learning is a journey! 🚀";
    }

    getEmotionalFeedback(percentage) {
        if (percentage >= 90) {
            return {
                message: "🎉 Amazing! You're absolutely brilliant! Your knowledge is exceptional and you should be proud of this outstanding performance!",
                class: "excellent"
            };
        } else if (percentage >= 80) {
            return {
                message: "🌟 Fantastic! You've shown excellent understanding of the subject. Your hard work and dedication are clearly paying off!",
                class: "excellent"
            };
        } else if (percentage >= 70) {
            return {
                message: "👍 Well done! You have a solid grasp of the material. Keep up the good work and you'll continue to improve!",
                class: "good"
            };
        } else if (percentage >= 60) {
            return {
                message: "📚 Good effort! You're on the right track. With a bit more practice and study, you'll see even better results!",
                class: "good"
            };
        } else if (percentage >= 50) {
            return {
                message: "💪 Not bad! You have a foundation to build upon. Focus on the areas you found challenging and keep practicing!",
                class: "average"
            };
        } else if (percentage >= 40) {
            return {
                message: "📖 Keep studying! Every quiz is a learning opportunity. Review the material and try again - you'll get better!",
                class: "average"
            };
        } else {
            return {
                message: "🚀 Don't give up! Learning is a journey, not a destination. Take your time, study the material, and try again!",
                class: "poor"
            };
        }
    }

    restartQuiz() {
        this.showFieldScreen();
    }

    goHome() {
        this.updateWelcomeScreen();
        this.showScreen(this.welcomeScreen);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
}); 