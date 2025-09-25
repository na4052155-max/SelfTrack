// Global state management
let currentUser = null;
let learningPlans = [];
let currentPlan = null;
let currentQuiz = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkAuthState();
});

// Initialize application
function initializeApp() {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('learnpath_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
        loadUserData();
    }
    
    // Load learning plans
    const savedPlans = localStorage.getItem('learnpath_plans');
    if (savedPlans) {
        learningPlans = JSON.parse(savedPlans);
        if (learningPlans.length > 0) {
            currentPlan = learningPlans[0];
        }
    }
    
    updateDashboard();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Auth buttons
    document.getElementById('login-btn').addEventListener('click', () => showModal('login-modal'));
    document.getElementById('signup-btn').addEventListener('click', () => showModal('signup-modal'));
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Modal controls
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    document.getElementById('switch-to-signup').addEventListener('click', () => {
        closeModals();
        showModal('signup-modal');
    });
    
    document.getElementById('switch-to-login').addEventListener('click', () => {
        closeModals();
        showModal('login-modal');
    });
    
    // Forms
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('create-plan-form').addEventListener('submit', handleCreatePlan);
    
    // Plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => {
            const planName = card.dataset.plan;
            createLearningPlan(planName, 'beginner');
        });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModals();
            }
        });
    });
}

// Navigation handler
function handleNavigation(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    const section = href.replace('#', '');
    showSection(section);
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show requested section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    } else {
        // Default sections
        if (sectionName === 'home' || sectionName === 'roadmaps') {
            document.getElementById('hero').classList.remove('hidden');
            document.getElementById('prebuilt-plans').classList.remove('hidden');
        } else if (sectionName === 'dashboard') {
            if (currentUser) {
                document.getElementById('dashboard').classList.remove('hidden');
                updateDashboard();
            } else {
                showModal('login-modal');
            }
        } else if (sectionName === 'challenges') {
            // Show challenges section (could be implemented)
            document.getElementById('hero').classList.remove('hidden');
        }
    }
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login (in real app, this would be an API call)
    currentUser = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
        points: 0,
        level: 1,
        badges: [],
        joinedAt: new Date().toISOString(),
        learningPreferences: {
            style: 'visual',
            pace: 'medium',
            difficulty: 'beginner'
        }
    };
    
    localStorage.setItem('learnpath_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeModals();
    showSection('dashboard');
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Simulate signup
    currentUser = {
        id: Date.now().toString(),
        email: email,
        name: name,
        points: 0,
        level: 1,
        badges: [],
        joinedAt: new Date().toISOString(),
        learningPreferences: {
            style: 'visual',
            pace: 'medium',
            difficulty: 'beginner'
        }
    };
    
    localStorage.setItem('learnpath_user', JSON.stringify(currentUser));
    updateAuthUI();
    closeModals();
    showSection('dashboard');
}

function logout() {
    currentUser = null;
    learningPlans = [];
    currentPlan = null;
    localStorage.removeItem('learnpath_user');
    localStorage.removeItem('learnpath_plans');
    updateAuthUI();
    showSection('home');
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    
    if (currentUser) {
        authButtons.classList.add('hidden');
        userProfile.classList.remove('hidden');
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-points').textContent = currentUser.points;
    } else {
        authButtons.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

function checkAuthState() {
    updateAuthUI();
}

// Learning plan functions
function handleCreatePlan(e) {
    e.preventDefault();
    const field = document.getElementById('search-field').value.trim();
    const difficulty = document.getElementById('difficulty-select').value;
    
    if (!field) {
        alert('Please enter a field to learn');
        return;
    }
    
    if (!currentUser) {
        showModal('login-modal');
        return;
    }
    
    createLearningPlan(field, difficulty);
}

function createLearningPlan(field, difficulty) {
    if (!currentUser) {
        showModal('login-modal');
        return;
    }
    
    const newPlan = {
        id: Date.now().toString(),
        title: `${field} Learning Path`,
        description: `Comprehensive ${difficulty} level plan for mastering ${field}`,
        field: field,
        difficulty: difficulty,
        estimatedDuration: getDurationByDifficulty(difficulty),
        objectives: generateObjectives(field, difficulty),
        milestones: generateMilestones(field, difficulty),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    learningPlans.push(newPlan);
    currentPlan = newPlan;
    
    localStorage.setItem('learnpath_plans', JSON.stringify(learningPlans));
    
    showSection('dashboard');
    updateDashboard();
}

function getDurationByDifficulty(difficulty) {
    switch (difficulty) {
        case 'beginner': return '3-6 months';
        case 'intermediate': return '6-12 months';
        case 'advanced': return '12-18 months';
        default: return '6-12 months';
    }
}

function generateObjectives(field, difficulty) {
    return [
        `Understand core ${field} concepts`,
        `Apply ${field} principles in practical scenarios`,
        `Build real-world ${field} projects`,
        `Master industry-standard tools and technologies`
    ];
}

function generateMilestones(field, difficulty) {
    return [
        {
            id: '1',
            title: `${field} Fundamentals`,
            description: 'Learn the basic concepts and principles',
            tasks: [
                {
                    id: '1-1',
                    title: 'Complete introduction course',
                    description: 'Watch introductory videos and read materials',
                    completed: false,
                    notes: '',
                    sentiment: 'neutral'
                },
                {
                    id: '1-2',
                    title: 'Practice basic exercises',
                    description: 'Complete hands-on exercises',
                    completed: false,
                    notes: '',
                    sentiment: 'neutral'
                },
                {
                    id: '1-3',
                    title: 'Take assessment quiz',
                    description: 'Test your understanding',
                    completed: false,
                    notes: '',
                    sentiment: 'neutral'
                }
            ],
            completed: false,
            progress: 0,
            resources: [
                {
                    id: 'r1',
                    title: `${field} Documentation`,
                    url: '#',
                    type: 'article',
                    notes: 'Official documentation'
                }
            ]
        },
        {
            id: '2',
            title: `Intermediate ${field}`,
            description: 'Build on fundamentals with advanced topics',
            tasks: [
                {
                    id: '2-1',
                    title: 'Build first project',
                    description: 'Create a practical application',
                    completed: false,
                    notes: '',
                    sentiment: 'neutral'
                },
                {
                    id: '2-2',
                    title: 'Learn advanced concepts',
                    description: 'Study intermediate-level topics',
                    completed: false,
                    notes: '',
                    sentiment: 'neutral'
                }
            ],
            completed: false,
            progress: 0,
            resources: []
        }
    ];
}

function updatePlanProgress(planId, milestoneId, taskId) {
    const plan = learningPlans.find(p => p.id === planId);
    if (!plan) return;
    
    const milestone = plan.milestones.find(m => m.id === milestoneId);
    if (!milestone) return;
    
    const task = milestone.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Toggle task completion
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    
    // Update milestone progress
    const completedTasks = milestone.tasks.filter(t => t.completed).length;
    milestone.progress = (completedTasks / milestone.tasks.length) * 100;
    milestone.completed = milestone.progress === 100;
    
    // Update user points
    if (task.completed) {
        currentUser.points += 10;
        checkLevelUp();
    } else {
        currentUser.points = Math.max(0, currentUser.points - 10);
    }
    
    // Save data
    localStorage.setItem('learnpath_plans', JSON.stringify(learningPlans));
    localStorage.setItem('learnpath_user', JSON.stringify(currentUser));
    
    updateDashboard();
}

function checkLevelUp() {
    const newLevel = Math.floor(currentUser.points / 100) + 1;
    if (newLevel > currentUser.level) {
        currentUser.level = newLevel;
        // Award level up badge
        const badge = {
            id: Date.now().toString(),
            name: `Level ${newLevel}`,
            description: `Reached level ${newLevel}`,
            icon: '🏆',
            earnedAt: new Date().toISOString(),
            rarity: 'common'
        };
        currentUser.badges.push(badge);
        
        // Show level up notification (could be implemented)
        console.log(`Level up! You are now level ${newLevel}`);
    }
}

// Dashboard functions
function updateDashboard() {
    if (!currentUser) return;
    
    // Update welcome message
    document.getElementById('dashboard-welcome').textContent = `Welcome back, ${currentUser.name}! 👋`;
    
    // Update stats
    document.getElementById('total-points').textContent = currentUser.points;
    document.getElementById('user-level').textContent = currentUser.level;
    document.getElementById('active-plans').textContent = learningPlans.length;
    
    // Calculate completed tasks
    let completedTasks = 0;
    learningPlans.forEach(plan => {
        plan.milestones.forEach(milestone => {
            completedTasks += milestone.tasks.filter(task => task.completed).length;
        });
    });
    document.getElementById('completed-tasks').textContent = completedTasks;
    
    // Update current plan display
    const currentPlanElement = document.getElementById('current-plan');
    const noPlanElement = document.getElementById('no-plan');
    
    if (currentPlan) {
        currentPlanElement.classList.remove('hidden');
        noPlanElement.classList.add('hidden');
        renderCurrentPlan();
    } else {
        currentPlanElement.classList.add('hidden');
        noPlanElement.classList.remove('hidden');
    }
    
    // Update badges
    updateBadgesDisplay();
}

function renderCurrentPlan() {
    if (!currentPlan) return;
    
    const currentPlanElement = document.getElementById('current-plan');
    
    const html = `
        <div class="plan-header">
            <h2 class="plan-title">${currentPlan.title}</h2>
            <p class="plan-description">${currentPlan.description}</p>
            <div class="plan-meta-info">
                <span><i class="fas fa-clock"></i> ${currentPlan.estimatedDuration}</span>
                <span><i class="fas fa-book"></i> ${currentPlan.difficulty}</span>
            </div>
        </div>
        
        <div class="milestones">
            ${currentPlan.milestones.map((milestone, index) => `
                <div class="milestone">
                    <div class="milestone-header">
                        <div class="milestone-indicator ${milestone.completed ? 'completed' : milestone.progress > 0 ? 'in-progress' : 'pending'}">
                            ${milestone.completed ? '<i class="fas fa-check"></i>' : index + 1}
                        </div>
                        <div class="milestone-content">
                            <h3 class="milestone-title">${milestone.title}</h3>
                            <p class="milestone-description">${milestone.description}</p>
                            
                            <div class="milestone-progress">
                                <div class="progress-info">
                                    <span>Progress</span>
                                    <span>${Math.round(milestone.progress)}%</span>
                                </div>
                                <div class="progress-bar-milestone">
                                    <div class="progress-fill" style="width: ${milestone.progress}%"></div>
                                </div>
                            </div>
                            
                            <div class="tasks">
                                ${milestone.tasks.map(task => `
                                    <div class="task" onclick="updatePlanProgress('${currentPlan.id}', '${milestone.id}', '${task.id}')">
                                        <div class="task-checkbox ${task.completed ? 'completed' : ''}">
                                            ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                                        </div>
                                        <div class="task-content">
                                            <p class="task-title ${task.completed ? 'completed' : ''}">${task.title}</p>
                                            <p class="task-description">${task.description}</p>
                                            ${task.notes ? `<p class="task-notes">Note: ${task.notes}</p>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            ${milestone.resources.length > 0 ? `
                                <div class="resources">
                                    <h4>Resources</h4>
                                    <div class="resource-list">
                                        ${milestone.resources.map(resource => `
                                            <a href="${resource.url}" target="_blank" class="resource-link">
                                                ${resource.title}
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    ${index < currentPlan.milestones.length - 1 ? '<div class="milestone-connector"></div>' : ''}
                </div>
            `).join('')}
        </div>
    `;
    
    currentPlanElement.innerHTML = html;
}

function updateBadgesDisplay() {
    const badgesList = document.getElementById('badges-list');
    
    if (currentUser.badges.length === 0) {
        badgesList.innerHTML = '<p class="no-badges">Complete tasks to earn your first badge!</p>';
        return;
    }
    
    const html = currentUser.badges.slice(-3).map(badge => `
        <div class="badge-item">
            <div class="badge-icon">
                ${badge.icon}
            </div>
            <div class="badge-info">
                <h4>${badge.name}</h4>
                <p>${badge.description}</p>
            </div>
        </div>
    `).join('');
    
    badgesList.innerHTML = html;
}

// Quiz functions
function startQuiz(field, difficulty) {
    currentQuiz = generateQuiz(field, difficulty);
    showSection('quiz');
    renderQuiz();
}

function generateQuiz(field, difficulty) {
    const questions = [
        {
            id: '1',
            question: `What is a fundamental concept in ${field}?`,
            options: [
                'Core principles and methodologies',
                'Advanced optimization techniques',
                'Industry-specific jargon',
                'Theoretical frameworks only'
            ],
            correctAnswer: 0,
            explanation: 'Understanding core principles and methodologies is essential for building a strong foundation in any field.'
        },
        {
            id: '2',
            question: `Which approach is most effective for learning ${field}?`,
            options: [
                'Memorizing all concepts',
                'Hands-on practice with real projects',
                'Reading theory only',
                'Watching videos passively'
            ],
            correctAnswer: 1,
            explanation: 'Hands-on practice with real projects helps reinforce theoretical knowledge and builds practical skills.'
        }
    ];
    
    return {
        id: Date.now().toString(),
        title: `${field} ${difficulty} Quiz`,
        field: field,
        difficulty: difficulty,
        questions: questions,
        timeLimit: 300,
        currentQuestion: 0,
        selectedAnswers: [],
        startTime: Date.now()
    };
}

function renderQuiz() {
    if (!currentQuiz) return;
    
    const quizContainer = document.getElementById('quiz-container');
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const progress = ((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100;
    
    const html = `
        <div class="quiz-card">
            <div class="quiz-header">
                <div class="quiz-header-top">
                    <h2 class="quiz-title">${currentQuiz.title}</h2>
                    <div class="quiz-timer">
                        <i class="fas fa-clock"></i>
                        <span id="quiz-timer">5:00</span>
                    </div>
                </div>
                
                <div class="quiz-info">
                    <span>Question ${currentQuiz.currentQuestion + 1} of ${currentQuiz.questions.length}</span>
                    <span class="capitalize">${currentQuiz.difficulty}</span>
                </div>
                
                <div class="quiz-progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            
            <div class="quiz-content">
                <h3 class="question-title">${question.question}</h3>
                
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option" onclick="selectAnswer(${index})">
                            <span class="option-label">${String.fromCharCode(65 + index)}.</span>
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="quiz-controls">
                    <button class="btn-quiz btn-quiz-secondary" onclick="previousQuestion()" ${currentQuiz.currentQuestion === 0 ? 'disabled' : ''}>
                        Previous
                    </button>
                    <button class="btn-quiz btn-quiz-primary" onclick="nextQuestion()" id="next-btn" disabled>
                        ${currentQuiz.currentQuestion === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = html;
    startQuizTimer();
}

function selectAnswer(answerIndex) {
    currentQuiz.selectedAnswers[currentQuiz.currentQuestion] = answerIndex;
    
    // Update UI
    document.querySelectorAll('.option').forEach((option, index) => {
        option.classList.toggle('selected', index === answerIndex);
    });
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestion++;
        renderQuiz();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuiz.currentQuestion > 0) {
        currentQuiz.currentQuestion--;
        renderQuiz();
    }
}

function finishQuiz() {
    const correctAnswers = currentQuiz.questions.filter(
        (question, index) => currentQuiz.selectedAnswers[index] === question.correctAnswer
    ).length;
    
    const score = (correctAnswers / currentQuiz.questions.length) * 100;
    
    // Award points
    if (currentUser) {
        const points = Math.round(score);
        currentUser.points += points;
        
        // Award quiz completion badge
        if (score >= 80) {
            const badge = {
                id: Date.now().toString(),
                name: 'Quiz Master',
                description: `Scored ${Math.round(score)}% on ${currentQuiz.field} quiz`,
                icon: '🧠',
                earnedAt: new Date().toISOString(),
                rarity: score >= 95 ? 'epic' : 'rare'
            };
            currentUser.badges.push(badge);
        }
        
        checkLevelUp();
        localStorage.setItem('learnpath_user', JSON.stringify(currentUser));
    }
    
    renderQuizResults(score, correctAnswers);
}

function renderQuizResults(score, correctAnswers) {
    const quizContainer = document.getElementById('quiz-container');
    
    const html = `
        <div class="quiz-results">
            <div class="results-header">
                <div class="results-icon">
                    <i class="fas fa-award"></i>
                </div>
                <h2 class="results-title">Quiz Complete!</h2>
                <p class="results-score">
                    You scored ${Math.round(score)}% (${correctAnswers}/${currentQuiz.questions.length})
                </p>
            </div>
            
            <div class="results-breakdown">
                ${currentQuiz.questions.map((question, index) => `
                    <div class="result-item ${currentQuiz.selectedAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}">
                        <div class="result-header">
                            <i class="fas ${currentQuiz.selectedAnswers[index] === question.correctAnswer ? 'fa-check-circle' : 'fa-times-circle'} result-icon ${currentQuiz.selectedAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}"></i>
                            <p class="result-question">${question.question}</p>
                        </div>
                        <p class="result-explanation">${question.explanation}</p>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 2rem;">
                <button class="btn-primary" onclick="showSection('dashboard')">
                    Back to Dashboard
                </button>
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = html;
}

function startQuizTimer() {
    let timeLeft = currentQuiz.timeLimit;
    const timerElement = document.getElementById('quiz-timer');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

// Utility functions
function showModal(modalId) {
    closeModals();
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

function loadUserData() {
    if (!currentUser) return;
    
    // Load additional user data if needed
    updateDashboard();
}

// Sentiment Analysis (Basic Implementation)
function analyzeSentiment(text) {
    if (!text) return 'neutral';
    
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'like', 'enjoy', 'easy', 'clear', 'helpful'];
    const negativeWords = ['bad', 'terrible', 'hate', 'difficult', 'hard', 'confusing', 'boring', 'frustrating'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) {
            positiveScore++;
        }
        if (negativeWords.some(nw => word.includes(nw))) {
            negativeScore++;
        }
    });
    
    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
}

// Export functions for global access
window.showSection = showSection;
window.updatePlanProgress = updatePlanProgress;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.startQuiz = startQuiz;