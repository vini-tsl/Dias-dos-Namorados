let fallbackStorage = {};

function getStorage(key) {
    try {
        return localStorage.getItem(key) || fallbackStorage[key];
    } catch (e) {
        return fallbackStorage[key];
    }
}

function setStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        fallbackStorage[key] = value;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const valentinesMusic = document.getElementById('valentinesMusic');
    
    musicToggle.innerHTML = '<i class="fas fa-music text-2xl"></i>';

    musicToggle.addEventListener('click', function() {
    if (valentinesMusic.paused) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        valentinesMusic.play()
            .then(() => {
                musicToggle.innerHTML = '<i class="fas fa-pause text-2xl"></i>';
                musicToggle.title = "";
            })
            .catch(error => {
                musicToggle.innerHTML = '<i class="fas fa-exclamation-triangle text-2xl"></i>';
                musicToggle.title = "Erro ao tocar música - tente novamente!";
                console.error("Erro na reprodução:", error);
            });
        } else {
            valentinesMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-play text-2xl"></i>';
            musicToggle.title = "Clique para tocar a música!";
        }
    });

    const sections = ['home', 'album', 'card', 'gallery', 'poem', 'quiz'];
    let currentSection = 0;
    
    function showSection(index) {
        sections.forEach((section, i) => {
            const el = document.getElementById(section);
            if (i === index) {
                el.classList.remove('hidden');
                el.classList.add('fade-in');
            } else {
                el.classList.add('hidden');
            }
        });
        
        const backBtn = document.querySelectorAll('.nav-btn')[0];
        const nextBtn = document.querySelectorAll('.nav-btn')[1];
        
        if (index === 0) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
        
        if (index === sections.length - 1) {
            nextBtn.textContent = 'Recomeçar';
            nextBtn.innerHTML = 'Recomeçar <i class="fas fa-redo ml-2"></i>';
        } else {
            nextBtn.textContent = 'Continuar';
            nextBtn.innerHTML = 'Continuar <i class="fas fa-arrow-right ml-2"></i>';
        }
    }
    
    window.navigate = function(direction) {
        if (direction === 1 && currentSection === sections.length - 1) {
            currentSection = 0; 
        } else {
            currentSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        }
        showSection(currentSection);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    

    showSection(0);
    
    const timeline = document.querySelector('.timeline');
    const memories = [
        { date: "Meu aniversário", description: "Cada", icon: "fas fa-birthday-cake", image: "eu_e_ela_aniversario" },
        { date: "Em Casa", description: "Momento", icon: "fas fa-home", image: "eu_e_ela_casa" },
        { date: "No Corredor da Escola", description: "Com", icon: "fas fa-walking", image: "eu_e_ela_corredor" },
        { date: "Na Escola", description: "Você", icon: "fas fa-graduation-cap", image: "eu_e_ela_escola" },
        { date: "No Ônibus", description: "Se", icon: "fas fa-bus", image: "eu_e_ela_onibus" },
        { date: "No Ônibus De Novo", description: "Torna", icon: "fas fa-bus-alt", image: "eu_e_ela_onibus2" },
        { date: "Seu Presente de Páscoa", description: "Muito", icon: "fas fa-gift", image: "eu_e_ela_presente" },
        { date: "Na Sala", description: "Especial", icon: "fas fa-couch", image: "eu_e_ela_sala" },
    ];
    
    memories.forEach((memory, index) => {
        const direction = index % 2 === 0 ? 'left' : 'right';
        
        const memoryElement = document.createElement('div');
        memoryElement.className = `mb-8 flex ${direction === 'left' ? 'justify-start' : 'justify-end'} relative`;
        memoryElement.innerHTML = `
            <div class="w-full md:w-96 bg-white rounded-lg shadow-md p-6 border border-pink-200 transform transition-all duration-300 hover:scale-105">
                <div class="absolute -top-4 -left-4 md:left-0 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                    <i class="${memory.icon}"></i>
                </div>
                <h3 class="dancing-script text-2xl text-pink-600">${memory.date}</h3>
                <p class="mt-2 text-pink-700">${memory.description}</p>
                ${memory.image ? `
                    <div class="aspect-w-16 aspect-h-9 mt-4 bg-pink-100 rounded-md overflow-hidden">
                        <img src="image/${memory.image}.jpeg" alt="${memory.date}" class="w-[600px] h-[337px] object-cover">
                    </div>
                ` : `
                    <div class="aspect-w-16 aspect-h-9 mt-4 bg-pink-100 rounded-md flex items-center justify-center text-pink-400">
                        <i class="fas fa-camera text-4xl"></i>
                    </div>
                `}
            </div>
        `;
        
        timeline.appendChild(memoryElement);
    });

    const gallery = document.querySelector('#gallery > div');
    let currentAudio = null;
    const images = [
        {name: 'image/eu_e_ela1.jpeg', sound: 'static/just the way you are.mp3'},
        {name: 'image/eu_e_ela2.jpeg', sound: 'static/billie bossa nova.mp3'},
        {name: 'image/eu_e_ela3.jpeg', sound: 'static/halleys comet.mp3'},
        {name: 'image/eu_e_ela4.jpeg', sound: 'static/all of me.mp3'}
    ];
    
    images.forEach((img, i) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'polaroid transform transition-transform duration-300 bg-white p-4 pb-8 rounded shadow-md cursor-pointer';
        galleryItem.innerHTML = `
            <div class="aspect-w-1 aspect-h-1 bg-pink-100 rounded relative overflow-hidden">
                <img src="${img.name}" alt="Nós juntos" class="w-[600px] h-[300px] object-cover flex items-center justify-center">
                <div class="absolute bottom-0 left-0 right-0 text-center py-2 montserrat text-sm text-pink-700 bg-white bg-opacity-80">
                    Eu e Você #${i+1}
                </div>
            </div>
        `;
        
    galleryItem.addEventListener('click', async () => {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        if (!valentinesMusic.paused) {
            valentinesMusic.pause();
        }

        currentAudio = new Audio(img.sound);

        try {
            await currentAudio.play();
        } catch (e) {
            console.error("Erro ao tocar áudio:", e);
        }

        musicToggle.innerHTML = '<i class="fas fa-play text-2xl"></i>';
        
        galleryItem.classList.add('animate-pulse');
        setTimeout(() => {
            galleryItem.classList.remove('animate-pulse');
        }, 1000);
    });

        gallery.appendChild(galleryItem);
    });

     const quizQuestions = [
        { question: "Quem falou eu te amo primeiro?", options: ["Eu", "Você"], answer: 0 },
        { question: "Qual é minha comida favorita?", options: ["Lasanha", "Bolo", "Strogonoff", "Empada Doce de Nayeli"], answer: 3 },
        { question: "Qual minha trilogia favorita?", options: ["Star Wars", "Harry Potter", "Invocaçaõ do Mal", "Esqueceram de Mim"], answer: 1},
        { question: "Qual é minha música favorita?", options: ["Sentadona", "Droga do Amor", "Halley's Comet", "Vampiro"], answer: 2},
        { question: "O que mais me irrita em você?", options: ["Dorme muito", "Ser bagunceira", "Muito chata", "Nada, você é perfeita"], answer: 3},
        { question: "Qual foi o momento que percebi que te amo?", options: ["Quando te vi", "Quando nos beijamos", "Quando te dei um presente", "Quando te elogiei"], answer: 1},
        { question: "Qual lugar eu gostaria de visitar com você?", options: ["Paris", "Maldivas", "Nova York", "Japão"], answer: 0 },
        { question: "O que mais me faz sorrir?", options: ["Seu humor", "Seus mimos", "Seus gestos", "Tudo, sua existência"], answer: 3 },
        { question: "Qual qualidade sua mais me conquistou?", options: ["Generosidade", "Sensibilidade", "Inteligência", "Todas acima"], answer: 3 },
        { question: "Qual as três raça de cachorro que eu sonho em ter?", options: ["Labrador, Husky Siberiano, Golden Retriever", "Poodle, Salsicha, Pug", "Pit Bull, Pasto Alemão, Dog Argentino", "Nenhum, eu tenho alergia"], answer: 0},
        { question: "Qual minha cor favorita?", options: ["Rosa", "Vermelho", "Preto", "Azul"], answer: 2 },
        { question: "Qual esporte praticaríamos juntos?", options: ["Futsal", "Vôlei", "Basquete", "Dormir"], answer: 1},
        { question: "Minha moto do sonhos?", options: ["Yamaha R1", "BMW S1000RR", "Kawasaki H2R", "HONDA CG 160 Fan"], answer: 1},
        { question: "Qual é a coisa que eu mais gosto de fazer?", options: ["Ficar com você", "Jogar vôlei", "Programar", "Assistir série"], answer: 0},
        { question: "Qual é meu apelido carinhoso para você?", options: ["Amor", "Minha princesa", "Gostosa", "Todas acima"], answer: 3 },
        { question: "Oque eu quero com você?", options: ["Só ficar", "Só namorar", "Casar e depois divorciar", "Envelhecer com você até minha morte"], answer: 3 },
        { question: "Você me ama?", options: ["Não", "Talvez", "Sim"], answer: 2},
        { question: "Quantos filhos gostaríamos de ter?", options: ["0", "1", "2", "+3"], answer: 2 },
        { question: "Qual frase sempre te digo?", options: ["Eu te amo", "Confio em você", "Você é perfeita", "Todas acima"], answer: 3},
        { question: "Completem: para sempre...", options: ["Juntos",  "Felizes", "Vamos ficar juntos", "Amando"], answer: 2}
    ];
    
    const quizContainer = document.getElementById('quizContainer');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const progressBar = document.querySelector('#quizProgress > div > div');
    const progressText = document.getElementById('progressText');

    let currentQuestion = 0;
    let selectedOption = null;
    let correctAnswers = 0;
    const userAnswers = [];  // aqui vamos guardar as respostas do usuário

    function showQuestion() {
        if (currentQuestion >= quizQuestions.length) {
            showResults();
            return;
        }

        const question = quizQuestions[currentQuestion];
        quizQuestion.innerHTML = `<p class="text-xl font-semibold text-pink-800">${question.question}</p>`;

        const progress = ((currentQuestion) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Pergunta ${currentQuestion + 1} / ${quizQuestions.length}`;

        quizOptions.innerHTML = '';
        selectedOption = null;

        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium py-3 px-4 rounded-lg transition-colors duration-300 text-left';
            optionBtn.textContent = option;

            optionBtn.addEventListener('click', () => {
                selectedOption = index;

                document.querySelectorAll('#quizOptions button').forEach(btn => {
                    btn.classList.remove('bg-pink-500', 'text-white');
                    btn.classList.add('bg-pink-100', 'text-pink-800');
                });

                optionBtn.classList.remove('bg-pink-100', 'text-pink-800');
                optionBtn.classList.add('bg-pink-500', 'text-white');

                nextQuestionBtn.classList.remove('hidden');
            });

            quizOptions.appendChild(optionBtn);
        });

        nextQuestionBtn.classList.add('hidden');
    }

    function showResults() {
        const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
        let message = '';

        if (percentage >= 90) {
            message = 'Vc mimmmm conheceeeeeee.';
        } else if (percentage >= 70) {
            message = 'Isso ai meu bemmmmm.';
        } else if (percentage >= 50) {
            message = 'Que tal a gente se conhecer mais.';
        } else {
            message = 'Vamos passar mais tempo juntos.';
        }

        let resumoHtml = '';
        quizQuestions.forEach((question, i) => {
            const userAnswerIndex = userAnswers[i];
            const userAnswerText = userAnswerIndex !== null && userAnswerIndex !== undefined ? question.options[userAnswerIndex] : 'Não respondeu';
            const correctAnswerText = question.options[question.answer];

            resumoHtml += `
                <div class="mb-4 p-3 border rounded bg-pink-50">
                    <p><strong>Pergunta ${i + 1}:</strong> ${question.question}</p>
                    <p><strong>Sua resposta:</strong> <span style="color: ${userAnswerIndex === question.answer ? 'green' : 'red'}">${userAnswerText}</span></p>
                    <p><strong>Resposta correta:</strong> ${correctAnswerText}</p>
                </div>
            `;
        });

        quizQuestion.innerHTML = `
            <div class="text-center mb-6">
                <h3 class="dancing-script text-3xl text-pink-600 mb-4">Resultado do Quiz</h3>
                <div class="text-5xl text-pink-600 mb-6">${percentage}%</div>
                <p class="text-lg text-pink-800 mb-4">${correctAnswers} de ${quizQuestions.length} respostas corretas!</p>
                <p class="text-pink-700 mb-6">${message}</p>
                <p class="dancing-script text-xl text-pink-600 mb-6">Nosso amor vale 100% ❤️</p>
            </div>
            <div>${resumoHtml}</div>
        `;

        quizOptions.innerHTML = '';
        nextQuestionBtn.textContent = 'Fazer Quiz Novamente';
        nextQuestionBtn.classList.remove('hidden');
    }

    nextQuestionBtn.addEventListener('click', () => {
        if (nextQuestionBtn.textContent === 'Fazer Quiz Novamente') {
            currentQuestion = 0;
            correctAnswers = 0;
            userAnswers.length = 0;
            nextQuestionBtn.textContent = 'Próxima Pergunta';
            showQuestion();
            return;
        }

        if (selectedOption === null) {
            alert('Por favor, selecione uma opção antes de continuar.');
            return;
        }

        userAnswers[currentQuestion] = selectedOption;

        if (selectedOption === quizQuestions[currentQuestion].answer) {
            correctAnswers++;
        }
        currentQuestion++;
        showQuestion();
    });
    showQuestion();
});
