// criação de lista para os numeros que ja foram sorteados não se repetir
let listaDeNumerosSorteados = [];
let limiteDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10:'

  // Utilizar uma função como a de baixo para evitar repetições
function exibirTexto(tag, texto){
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
   if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
// Function para exibição da mensagem inicial do jogo
function exibirMensagemInicial(){
  exibirTexto('h1', 'Jogo do número secreto');
  exibirTexto('p', 'Escolha um número entre 1 e 10:');
}
exibirMensagemInicial();

function verificarChute(){
  let chute = document.querySelector('input').value;

  if( chute ==numeroSecreto){
    exibirTexto('h1', 'Parabéns!');
    // Alterar de singular para plural de acordo com o número de tentativas  
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

    exibirTexto('p',mensagemTentativas);
    // habilitar o botão de reinciar o jogo
    document.getElementById('reiniciar').removeAttribute('disabled');
    // Verificar se o numero é maior ou menor que o chute
  }else{
    if(chute > numeroSecreto){
      exibirTexto('p', 'O número secreto é menor!');
    }else{
      exibirTexto('p', 'O número secreto é maior!');
    }
    // Somar número de tentativas a cada tentativa
    tentativas ++
    limparCampo();
  }
}
// Geração do numero aleatorio guardando na variavel numeroEscolhido para depois verificar se ja foi selecionado
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1);
  // Quando todos os numeros forem sorteados a lista reseta para continuar o jogo
  let quantidadeNumerosSorteados = listaDeNumerosSorteados.length;
  if(quantidadeNumerosSorteados == limiteDeNumeros){
    listaDeNumerosSorteados = [];
  }
  // Verifica se o numero sorteado esta dentro da lista, se estiver gera um novo numero
  if(listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  }else{
    // O .push coloca o numeroEscolhido dentro da lista (Caso queira remover um elemento da lista, utiliza o .pop)
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}
// Function para limpeza do campo após cada tentativas
function limparCampo(){
  chute = document.querySelector('input');
  chute.value = '';
}
// Function para reinciar o jogo e todos os padroes
function reinciarJogo(){
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}