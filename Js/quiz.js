// =================
// ELEMENTOS
// =================
const pergunta = document.querySelector('.pergunta p');
const musica = document.querySelector('audio');
const img_musica = document.querySelector('.img_musica');
const btn_musica = document.querySelector('.musica');
const imgTitulo = document.querySelector('.titulo img');

// =================
// SISTEMA DE MÚSICA
// =================
let status_musica = 0;
img_musica.src = 'imagens/notmusica.png';
musica.pause()

//Mutando e desmutando a musica
btn_musica.addEventListener('click', () => {
    if(status_musica == 1){
        img_musica.src = 'imagens/notmusica.png';
        musica.pause();
        status_musica = 0;
        
    }else if(status_musica == 0){
        img_musica.src = 'imagens/musica.png';
        musica.play();
        status_musica = 1;
        
    }
    
    console.log(`status da musica: ${status_musica}`)
})

// =================
// PERGUNTAS
// =================

const quiz = [
    {
        pergunta: "Quem ganhou mais?",
        alternativas: ['imagens/timao_img.png', 'imagens/palmeiras_img.png'],
        nome: ['timao', 'pal'],
        classe: ['btn__timao', 'btn__palmeiras'],
        class_img: ['timao__icon', 'palmeiras__icon'],
        correto: 'pal'
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
        pergunta: "As baratas tem uma incrivel regeneração e podem viver dias sem a cabeça e, se perder uma das patas, elas conseguem se regenerar em poucos dias.",
        alternativas: ['Verdade', 'Mentira'],
        nome: ['verdade', 'mentira'],
        classe: ['verdade', 'mentira'],
        class_img: ['none', 'none'],
        correto: 'verdade'
    },
    {
        pergunta: "Que música tocou de fundo o jogo todo?",
        alternativas: ['Camila', `Camila, Camila`, `Proibida pra Mim`],
        nome: ['camila', 'camila__camila', 'proibida_pra_mim'],
        classe: ['camila', 'camila__camila', 'proibida_pra_mim'],
        class_img: ['none', 'none', 'none'],
        correto: 'camila__camila'
    }

]

// =================
// NIVEL CARREGADO DO LOCALSTORAGE
// =================
let nivel = localStorage.getItem('nivel');
if(nivel === null) {
    nivel = 0;
}

// =================
// Criando Botões de resposta
// =================
function criaBtnResposta(indice, nome, classe, class_img) {
    
    let divRespostas = document.querySelector('.btn__respostas')
    //Botão da resposta e colocando ele na section "btn__resposta"
    let btn_resposta = document.createElement('button');
    btn_resposta.setAttribute('name',nome)
    btn_resposta.classList.add('btn', classe);
    
    if(nivel == 0) {
        let imagemGerada = document.createElement('img');
        imagemGerada.classList.add(class_img);
        imagemGerada.src = quiz[0].alternativas[indice];
        btn_resposta.appendChild(imagemGerada)
    }else{
        let textoGerado = document.createElement('p');
        textoGerado.classList.add('texto__gerado');
        textoGerado.textContent = quiz[nivel].alternativas[indice];
        btn_resposta.appendChild(textoGerado)
    }
    
    divRespostas.appendChild(btn_resposta);

}

// =================
// BOTÕES RESPOSTAS
// =================


//Selecionando o botão da resposta
function aplicarEventosBotoes() {
    let btn_todas_respostas = document.querySelectorAll('.btn');

    btn_todas_respostas.forEach((btn) => {
            btn.addEventListener('click', () => {
                let nomeDiv = btn.getAttribute('name');
                
                let btn_todas_respostas = document.querySelectorAll('.btn');

                btn_todas_respostas.forEach(b => {
                    b.classList.remove('selecionado')
                })
                
                btn.classList.add('selecionado');

                if(btn.classList.contains('selecionado')){
                    const imgTitulo = document.querySelector('.titulo img');
                    imgTitulo.src = 'imagens/confirmar_resposta.png';
                    animacaoClick(nomeDiv);
                    
                }
            });
    });
}

//Dando a resposta correta

function animacaoClick(nomeDiv) {
    
    imgTitulo.addEventListener('mousedown', () => {
        imgTitulo.src = 'imagens/confirmar_resposta_click.png';
        imgTitulo.style.transform = 'translateY(5px)';
        console.log('clicado');
    });

    imgTitulo.addEventListener('mouseup', () => {
        imgTitulo.src = 'imagens/confirmar_resposta.png';
        imgTitulo.style.transform = 'translateY(-3px)';
        verificaResposta(nomeDiv);
        
    })

}

function verificaResposta(nome) {
    const imgTitulo = document.querySelector('.titulo img');
    let btn_todas_respostas = document.querySelectorAll('.btn');

    let segundos = 1;
    if(nome == quiz[nivel].correto) {
        setTimeout(()=> {
            imgTitulo.src = 'imagens/acertou.png';
            
            btn_todas_respostas.forEach(b => {
                b.classList.remove('selecionado');
            })
            setTimeout(() => {
                proximoNivel();
            }, 3000 );
            
        }, segundos * 1000);
          
    }else{
        setTimeout(()=> {
            imgTitulo.src = 'imagens/errou.png';
            
            btn_todas_respostas.forEach(b => {
                b.classList.remove('selecionado');
            })
        }, segundos * 1000);
        
    }

}

function proximoNivel() {
    nivel++;

    if(nivel >= quiz.length) {
        ultimaTela();
    }else {
        localStorage.setItem('nivel', nivel);
        carregarPergunta();
    }
    
}

//Função que vai carregar as perguntas
function carregarPergunta() {
    imgTitulo.src = 'imagens/QUIZ THITHI EDITION.png'
    const pergunta_nivel = document.querySelector('.nivel');
    pergunta_nivel.innerHTML = `PERGUNTA ${parseInt(nivel) + 1}`
    //Atualizando a pergunta
    if(nivel <= quiz.length) {
        pergunta.innerHTML = quiz[nivel].pergunta;
    }    

    //Apaga os botões antigos
    let divRespostas = document.querySelector('.btn__respostas');
    divRespostas.innerHTML = '';

    //Criando botões dinamicos
    for(let i = 0; quiz[nivel].alternativas.length > i; i++){
        criaBtnResposta(i, quiz[nivel].nome[i], quiz[nivel].classe[i],quiz[nivel].class_img[i]);
    }
    aplicarEventosBotoes();
    
}

//Inicialização do Quiz
carregarPergunta();

console.log(quiz.length);


function ultimaTela() {
    pergunta.innerHTML = 'FIM DE JOGO!';
    const pergunta_nivel = document.querySelector('.nivel');
    pergunta_nivel.innerHTML = ''
    let divRespostas = document.querySelector('.btn__respostas');
    divRespostas.innerHTML = 'Parabéns, você ganhou o premio:\nA tristeza eterna e imensuravel de Thiago Menezes.';
    localStorage.clear();
}



