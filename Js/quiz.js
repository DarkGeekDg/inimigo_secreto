// =================
// ELEMENTOS
// =================
const pergunta = document.querySelector('.pergunta p');
//MUSICA
const musica = document.querySelector('audio');
const img_musica = document.querySelector('.img_musica');
const btn_musica = document.querySelector('.musica');

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
// NIVEL
// =================
let perguntaAtual = 3;
const pergunta_nivel = document.querySelector('.nivel');
pergunta_nivel.innerHTML = `PERGUNTA ${perguntaAtual + 1}`


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
pergunta.innerHTML = quiz[perguntaAtual].pergunta;

// =================
// Criando Botões de resposta
// =================
function criaBtnResposta(indice, nome, classe, class_img) {
    
    let divRespostas = document.querySelector('.btn__respostas')
    //Botão da resposta e colocando ele na section "btn__resposta"
    let btn_resposta = document.createElement('button');
    btn_resposta.setAttribute('name',nome)
    btn_resposta.classList.add('btn', classe);
    
    if(perguntaAtual == 0) {
        let imagemGerada = document.createElement('img');
        imagemGerada.classList.add(class_img);
        imagemGerada.src = quiz[0].alternativas[indice];
        btn_resposta.appendChild(imagemGerada)
    }else{
        let textoGerado = document.createElement('p');
        textoGerado.classList.add('texto__gerado');
        textoGerado.textContent = quiz[perguntaAtual].alternativas[indice];
        btn_resposta.appendChild(textoGerado)
    }
    

    divRespostas.appendChild(btn_resposta);

}

//Criando botões dinamicos

for(let i = 0; quiz[perguntaAtual].alternativas.length > i; i++){
    
    criaBtnResposta(i, quiz[perguntaAtual].nome[i], quiz[perguntaAtual].classe[i],quiz[perguntaAtual].class_img[i]);
    
}

// =================
// BOTÕES RESPOSTAS
// =================
//Selecionando o botão da resposta
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

//Dando a resposta correta

function animacaoClick(nomeDiv) {
    const imgTitulo = document.querySelector('.titulo img');

    imgTitulo.addEventListener('mousedown', () => {
        imgTitulo.src = 'imagens/confirmar_resposta_click.png';
        imgTitulo.style.transform = 'translateY(5px)';
        
    });

    imgTitulo.addEventListener('mouseup', () => {
        imgTitulo.src = 'imagens/confirmar_resposta.png';
        imgTitulo.style.transform = 'translateY(-3px)';
        
        
    })
    imgTitulo.addEventListener('click', () => {
        verificaResposta(nomeDiv);
    })


}

function verificaResposta(nome) {
    const imgTitulo = document.querySelector('.titulo img');
    if(nome == quiz[perguntaAtual].correto) {
        setTimeout(()=> {
            imgTitulo.src = 'imagens/acertou.png';
        }, 2000);
    }else{
        setTimeout(()=> {
            imgTitulo.src = 'imagens/errou.png';
        }, 2000);

    }


}