// =================
// ELEMENTOS
// =================
const pergunta = document.querySelector('.pergunta p');
const musica = document.querySelector('.som__musica');
const som_efeito = document.querySelector('.som__efeito');
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
        pergunta: "Curiosidade: As baratas tem uma incrivel regeneração e podem viver dias sem a cabeça e, se perder uma das patas, elas conseguem se regenerar em poucos dias.",
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
    //quiz.length -2 pq ele vai pegar sempre a penultima pergunta
    if(nivel == (quiz.length - 2)) {
        let imagemGerada = document.createElement('img');
        imagemGerada.classList.add(class_img);
        imagemGerada.src = quiz[(quiz.length - 2)].alternativas[indice];
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
                som_efeito.src = 'audio/click1.mp3';
                let nomeDiv = btn.getAttribute('name');
                
                let btn_todas_respostas = document.querySelectorAll('.btn');

                btn_todas_respostas.forEach(b => {
                    b.classList.remove('selecionado')
                })
                
                btn.classList.add('selecionado');
                let click = 0;
                
                if(btn.classList.contains('selecionado')){
                    
                    const imgTitulo = document.querySelector('.titulo img');
                    while(click < 1) {
                        
                        imgTitulo.src = 'imagens/confirmar_resposta.png';
                        animacaoClick(nomeDiv);
                        click++;
                        
                    }
                    
                    
                }
            });
    });
}

//Dando a resposta correta

function animacaoClick(nomeDiv) {
    let click = 0;

    imgTitulo.addEventListener('mousedown', () => {        
        while(click < 1) {
            verificaResposta(nomeDiv); 
            imgTitulo.src = 'imagens/confirmar_resposta_click.png';
            imgTitulo.style.transform = 'translateY(10px)';   
            click++; 
            som_efeito.src = 'audio/click3.mp3';
            
        }     
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



