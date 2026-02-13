// let quizData = {};
let currentQuiz = null;
let currentQuizName = '';
let userAnswers = {};
let showingAnswers = false;

// Load quiz data from external JSON file
async function loadQuizData() {
    try {
        const response = await fetch('questions.json');
        quizData = await response.json();
        console.log('Quiz data loaded successfully');
    } catch (error) {
        console.error('Error loading quiz data:', error);
        alert('無法載入題庫資料，請確認 questions.json 檔案存在');
    }
}

// Initialize on page load
// loadQuizData();
console.log(quizData);
function loadQuiz(quizName) {
    console.log('Available quizzes:', Object.keys(quizData));
    console.log(`Loading quiz: ${quizName}`);
    currentQuiz = quizData[quizName];
    currentQuizName = quizName;
    userAnswers = {};
    showingAnswers = false;

    document.querySelectorAll('.quiz-button').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.quiz-button').classList.add('active');

    document.getElementById('scoreDisplay').textContent = `當前題庫: ${currentQuiz.title} (${currentQuiz.total_questions} 題)`;
    document.getElementById('resultSummary').classList.remove('show');

    renderQuestions();
    document.getElementById('questionsContainer').classList.add('show');
}

function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    currentQuiz.questions.forEach((q, index) => {
        const isMultiple = Array.isArray(q.answer);
        const inputType = isMultiple ? 'checkbox' : 'radio';

        let optionsHTML = '';
        for (let [key, value] of Object.entries(q.options)) {
            let displayValue = typeof value === 'boolean' ? key : value;
            optionsHTML += `
                        <div class="option" data-question="${q.id}" data-option="${key}">
                            <input type="${inputType}" name="q${q.id}" value="${key}" id="q${q.id}_${key}">
                            <label for="q${q.id}_${key}"><strong>${key}:</strong> ${displayValue}</label>
                        </div>
                    `;
        }

        const questionHTML = `
                    <div class="question-card" id="card-${q.id}">
                        <div class="question-header">
                            <div class="question-number">${index + 1}</div>
                            <div class="question-text">${q.question}</div>
                        </div>
                        <div class="options">
                            ${optionsHTML}
                        </div>
                        <div class="answer-section" id="answer-${q.id}">
                            <div class="answer-label">正確答案：</div>
                            <div class="answer-text">${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}</div>
                        </div>
                    </div>
                `;

        container.innerHTML += questionHTML;
    });

    document.querySelectorAll('.option input').forEach(input => {
        input.addEventListener('change', function () {
            const questionId = parseInt(this.name.substring(1));
            const isMultiple = this.type === 'checkbox';

            if (isMultiple) {
                if (!userAnswers[questionId]) {
                    userAnswers[questionId] = [];
                }
                if (this.checked) {
                    userAnswers[questionId].push(this.value);
                } else {
                    userAnswers[questionId] = userAnswers[questionId].filter(v => v !== this.value);
                }
            } else {
                userAnswers[questionId] = this.value;
            }
        });
    });
}

function checkAnswers() {
    if (!currentQuiz) {
        alert('請先選擇一個題庫');
        return;
    }

    let correct = 0;
    let total = currentQuiz.questions.length;

    currentQuiz.questions.forEach(q => {
        const userAnswer = userAnswers[q.id];
        const correctAnswer = q.answer;
        const card = document.getElementById(`card-${q.id}`);

        card.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });

        let isCorrect = false;

        if (Array.isArray(correctAnswer)) {
            const userSet = new Set(userAnswer || []);
            const correctSet = new Set(correctAnswer);
            isCorrect = userSet.size === correctSet.size &&
                [...userSet].every(v => correctSet.has(v));

            card.querySelectorAll('.option').forEach(opt => {
                const optValue = opt.dataset.option;
                if (correctAnswer.includes(optValue)) {
                    opt.classList.add('correct');
                }
                if (userAnswer && userAnswer.includes(optValue) && !correctAnswer.includes(optValue)) {
                    opt.classList.add('incorrect');
                }
            });
        } else {
            isCorrect = userAnswer === correctAnswer;

            card.querySelectorAll('.option').forEach(opt => {
                const optValue = opt.dataset.option;
                if (optValue === correctAnswer) {
                    opt.classList.add('correct');
                }
                if (userAnswer === optValue && userAnswer !== correctAnswer) {
                    opt.classList.add('incorrect');
                }
            });
        }

        if (isCorrect) correct++;
    });

    const percentage = Math.round((correct / total) * 100);
    const resultHTML = `
                <h2>📊 測驗結果</h2>
                <div class="score-circle">
                    <div>${percentage}%</div>
                    <div class="score-label">得分</div>
                </div>
                <div class="result-details">
                    答對 <strong>${correct}</strong> 題 / 共 <strong>${total}</strong> 題<br>
                    ${percentage >= 80 ? '🎉 太棒了！' : percentage >= 60 ? '👍 不錯！繼續加油！' : '💪 再接再厲！'}
                </div>
            `;

    document.getElementById('resultSummary').innerHTML = resultHTML;
    document.getElementById('resultSummary').classList.add('show');
    document.getElementById('resultSummary').scrollIntoView({ behavior: 'smooth' });
}

function toggleAnswers() {
    if (!currentQuiz) {
        alert('請先選擇一個題庫');
        return;
    }

    showingAnswers = !showingAnswers;

    currentQuiz.questions.forEach(q => {
        const answerSection = document.getElementById(`answer-${q.id}`);
        if (showingAnswers) {
            answerSection.classList.add('show');
        } else {
            answerSection.classList.remove('show');
        }
    });
}

function resetQuiz() {
    if (!currentQuiz) {
        alert('請先選擇一個題庫');
        return;
    }

    if (confirm('確定要重設所有答案嗎？')) {
        userAnswers = {};
        showingAnswers = false;
        document.getElementById('resultSummary').classList.remove('show');
        renderQuestions();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
