// =================
// ELEMENTOS
// =================
const pergunta = document.querySelector('.pergunta p');
const musica = document.querySelector('.som__musica');
const som_efeito = document.querySelector('.som__efeito');
const img_musica = document.querySelector('.img_musica');
const btn_musica = document.querySelector('.musica');
const imgTitulo = document.querySelector('.titulo img');

//Controle de se pode clicar
let podeConfirmar = true;

// =================
// SISTEMA DE MÚSICA
// =================
let status_musica = 0;
img_musica.src = 'imagens/notmusica.png';
musica.pause();

btn_musica.addEventListener('click', () => {
    if(status_musica == 1){
        img_musica.src = 'imagens/notmusica.png';
        musica.pause();
        status_musica = 0;
    } else {
        img_musica.src = 'imagens/musica.png';
        musica.play();
        status_musica = 1;
    }
});

// =================
// PERGUNTAS
// =================
const quiz = [
    {
        pergunta: "Qual é o nome completo?\nThiago Menezes...",
        alternativas: ['Cacheado', 'Liso', 'Crespo'],
        nome: ['cacheado', 'liso', 'crespo'],
        classe: ['cacheado', 'liso','crespo'],
        class_img: ['none', 'none','none'],
        correto: "crespo"
    },
    {
        pergunta: "Data de aniversário:",
        alternativas: ['12/06', '13/06', '14/06'],
        nome: ['1206', '1306', '1406'],
        classe: ['1206', '1306','1406'],
        class_img: ['none', 'none','none'],
        correto: "1306"
    },
    {
        pergunta: "Thiago é muito:",
        alternativas: ['Viado', 'Corinthians', 'Palmeiras'],
        nome: ['viado', 'timao', 'pal'],
        classe: ['viado', 'timao','pal'],
        class_img: ['none', 'none','none'],
        correto: "timao"
    },
    {
        pergunta: "Quantos ovos uma barata pode produzir?",
        alternativas: ['100', '500', '800'],
        nome: ['cem', 'quientos', 'oitocentos'],
        classe: ['cem', 'quientos', 'oitocentos'],
        class_img: ['none', 'none', 'none'],
        correto: 'oitocentos'
    },
    {
        pergunta: "Curiosidade: As baratas tem uma incrivel regeneração...",
        alternativas: ['Verdade', 'Mentira'],
        nome: ['verdade', 'mentira'],
        classe: ['verdade', 'mentira'],
        class_img: ['none', 'none'],
        correto: 'verdade'
    }, 
    {
        pergunta: "Entre Corinthians e Palmeiras, Quem ganhou mais?",
        alternativas: ['imagens/timao_img.png', 'imagens/palmeiras_img.png'],
        nome: ['timao', 'pal'],
        classe: ['btn__timao', 'btn__palmeiras'],
        class_img: ['timao__icon', 'palmeiras__icon'],
        correto: 'pal'
    },
    {
        pergunta: "Que música tocou de fundo o jogo todo?",
        alternativas: ['Camila', 'Camila, Camila', 'Proibida pra Mim'],
        nome: ['camila', 'camila__camila', 'proibida_pra_mim'],
        classe: ['camila', 'camila__camila', 'proibida_pra_mim'],
        class_img: ['none', 'none', 'none'],
        correto: 'camila__camila'
    }
];

// =================
// NIVEL
// =================
let nivel = localStorage.getItem('nivel');
if(nivel === null) nivel = 0;

// =================
// BOTÕES
// =================
function criaBtnResposta(indice, nome, classe, class_img) {
    const divRespostas = document.querySelector('.btn__respostas');
    const btn_resposta = document.createElement('button');

    btn_resposta.name = nome;
    btn_resposta.classList.add('btn', classe);

    if(nivel == (quiz.length - 2)) {
        const img = document.createElement('img');
        img.classList.add(class_img);
        img.src = quiz[nivel].alternativas[indice];
        btn_resposta.appendChild(img);
    } else {
        const texto = document.createElement('p');
        texto.classList.add('texto__gerado');
        texto.textContent = quiz[nivel].alternativas[indice];
        btn_resposta.appendChild(texto);
    }

    divRespostas.appendChild(btn_resposta);
}

// =================
// CONTROLE DE SELEÇÃO
// =================
let btnSelecionadoAtual = '';

function selecionandoBtn() {
    const todoBtn = document.querySelectorAll('.btn');

    todoBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            todoBtn.forEach(b => b.classList.remove('selecionado'));
            btn.classList.add('selecionado');
            som_efeito.src = 'audio/click1.mp3';
            btnSelecionadoAtual = btn.name;
            imgTitulo.src = 'imagens/btn_confirmar.png';
        });
    });
}

// =================
// CONFIRMAR RESPOSTA (EVENTO ÚNICO)
// =================
imgTitulo.addEventListener('mousedown', () => {
    
    if(btnSelecionadoAtual === '' || !podeConfirmar) return;//Se nenhum btn for selecionado, não faça nada|| btnConfirmar == false

    podeConfirmar = false;

    imgTitulo.src = 'imagens/btn_confirmar_click.png';
    //imgTitulo.style.transform = 'translateY(10px)';
    som_efeito.src = 'audio/click3.mp3';

    verificaResposta(btnSelecionadoAtual);
});

// =================
// VERIFICA RESPOSTA
// =================
function verificaResposta(nome) {
    const btns = document.querySelectorAll('.btn');

    setTimeout(() => {
        if(nome === quiz[nivel].correto) {
            imgTitulo.src = 'imagens/acertou.png';
            btns.forEach(b => b.classList.remove('selecionado'));
            setTimeout(proximoNivel, 3000);
        } else {
            imgTitulo.src = 'imagens/errou.png';
            btns.forEach(b => b.classList.remove('selecionado'));
            podeConfirmar = true;
        }
    }, 1000);
}

// =================
// PROXIMO NIVEL
// =================
function proximoNivel() {
    nivel++;
    if(nivel >= quiz.length) {
        ultimaTela();
    } else {
        localStorage.setItem('nivel', nivel);
        carregarPergunta();
    }
}

// =================
// CARREGAR PERGUNTA
// =================
function carregarPergunta() {
    podeConfirmar = true;

    imgTitulo.src = 'imagens/QUIZ THITHI EDITION.png';

    document.querySelector('.nivel').textContent = `PERGUNTA ${Number(nivel) + 1}`;
    pergunta.textContent = quiz[nivel].pergunta;

    const divRespostas = document.querySelector('.btn__respostas');
    divRespostas.innerHTML = '';

    for(let i = 0; i < quiz[nivel].alternativas.length; i++) {
        criaBtnResposta(i, quiz[nivel].nome[i], quiz[nivel].classe[i], quiz[nivel].class_img[i]);
    }

    btnSelecionadoAtual = '';
    selecionandoBtn();
}

// =================
// FIM
// =================
function ultimaTela() {
    pergunta.textContent = 'FIM DE JOGO!';
    imgTitulo.src = 'imagens/QUIZ THITHI EDITION.png'    
    document.querySelector('.nivel').textContent = '';
    let btnResposta = document.querySelector('.btn__respostas');
    btnResposta.classList.add('texto__final');
    btnResposta.textContent = 'PARABÉNS! Você ganhou o premio:\n A tristeza eterna e IMENSURÁVEL de Thiago Menezes.';
    localStorage.clear();
}

// INICIAR
carregarPergunta();
