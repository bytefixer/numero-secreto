// let titulo = document.querySelector("h1"); //seleciona a tag do doc html
// titulo.innerHTML = "Número Secreto"; // novo titulo h1

// let paragrafo = document.querySelector("p"); //seleciona a tag do doc html
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";

let listaNumSorteados = [];
let limiteNum = 10;
let numSecreto = randomNum();
let tentativas = 1;

function display(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1});
}

function displayInicio(){
    display("h1", "Jogo do Número Secreto");
    display("p", "Escolha um número entre 1 e 10");

}
displayInicio();

function verificarChute(){
    let chute = document.querySelector("input").value;

    if(chute == numSecreto){
        display("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let displayTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        display("p", displayTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");

    } else if(chute == ""){
        alert("Por favor, digite um número para iniciar o jogo!");

    } else if(chute > numSecreto){
        display("p", `O número secreto é menor que ${chute}`);

    } else {
        display("p", `O número secreto é maior que ${chute}`);

    } 
    tentativas++;
    limparCampo();
}

function randomNum(){
    let numSorteado = parseInt(Math.random() * limiteNum + 1);
    let qtdElementosLista = listaNumSorteados.length;

    if(qtdElementosLista == limiteNum){
        listaNumSorteados = [];
    }
    if(listaNumSorteados.includes(numSorteado)){
        return randomNum();
    } else{
        listaNumSorteados.push(numSorteado);
        console.log(listaNumSorteados);
        return numSorteado;
    }

}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciar(){
    numSecreto = randomNum();
    limparCampo();
    tentativas = 1;
    displayInicio();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}