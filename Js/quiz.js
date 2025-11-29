// =================
// ELEMENTOS
// =================
const btn_div_resposta = document.querySelectorAll('.btn');
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
// PERGUNTAS
// =================

const quiz = [
    {
        pergunta: "Quem ganhou mais?",
        alternativas: ['imagens/timao_img.png', 'imagens/palmeiras_img.png'],
        nome: ['timao', 'pal'],
        classe: ['btn__timao', 'btn__palmeiras'],
        correto: 'imagens/palmeiras_img.png'
    },
    {
        pergunta: "Quantos ovos uma barata pode produzir?",
        alternativas: ['100', '500', '800'],
        correto: '800'
    },
    {
        pergunta: "É verdade que baratas tem uma incrivel regeneração e podem viver dias sem a cabeça e, se perder uma das patas, ela consegue se regenerar em poucos dias?",
        alternativas: ['Sim', 'Não'],
        correto: 'Sim'
    },
    {
        pergunta: "Que música tocou de fundo o jogo todo?",
        alternativas: ['Camila', `Camila, Camila`, `Camila, Camila, Camila`],
        correto: 'Camila, Camila'
    }

]
let perguntaAtual = 3;
pergunta.innerHTML = quiz[perguntaAtual].pergunta;

// =================
// Criando Botões de resposta
// =================
function criaBtnResposta(indice, nome, classe) {
    let divRespostas = document.querySelector('.btn__respostas')
    //Botão da resposta e colocando ele na section "btn__resposta"
    let btn_resposta = document.createElement('button');
    btn_resposta.setAttribute('name',nome)
    btn_resposta.classList.add('btn', classe);
    
    if(perguntaAtual == 0) {
        let imagemGerada = document.createElement('img');
        imagemGerada.classList.add('timao__icon');
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
    
    criaBtnResposta(i, quiz[0].nome[i], quiz[0].classe[i]);
}

// =================
// BOTÕES RESPOSTAS
// =================
//Selecionando o botão da resposta

btn_div_resposta.forEach(btn => {
    btn.addEventListener('click', () => {
        let nome = btn.getAttribute("name");
        
        //Reiniciando os estilos dos dois botões quando clicar em algum dos botões
        btn_div_resposta.forEach(b => {
            b.classList.remove('selecionado', 'certo', 'errado');
        })
        
        //Adicionando o estilo para cada resposta
        if(nome == 'timao'){
            btn.classList.add('selecionado', 'errado')

        }
        if(nome == 'pal') {
            btn.classList.add('selecionado', 'certo');
        }
        
    })
});



