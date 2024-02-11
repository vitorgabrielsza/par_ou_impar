const pontuacaoJog = document.querySelector("#pontuacaoJog");
const pontuacaoMaq = document.querySelector("#pontuacaoMaq");
const form = document.querySelector("#form");
const numero = document.querySelector("#numero");
const par = document.querySelector("#par");
const impar = document.querySelector("#impar");
const boxModal = document.querySelector("#boxModal");
const msgModal = document.querySelector("#msgModal");
const btnFecharModal = document.querySelector("#btnFecharModal");
let pontJog = 0;
let pontMaq = 0;
let rodadas = 0;
let vencedor;

// Eventos
window.addEventListener("click", fecharModalClique);
window.addEventListener("keydown", fecharModalTecla);
form.addEventListener("submit", validarForm);
btnFecharModal.addEventListener("click", fecharModal);

// Funções

// Função que valida os dados do formulário
function validarForm(evt){
	evt.preventDefault();

	const numJog = parseInt(numero.value);

	// Verifica se jogador não informou um número
	if(isNaN(numJog)){
		exibirModal("Por favor, informe um número");

		return;
	}

	// Verifica se jogador informou um número menor que 0 ou maior que 5
	if(numJog < 0 || numJog > 5){
		exibirModal("Por favor, informe um número entre 0 e 5");

		return;
	}

	// Verifica se usuário não selecionou nenhuma das opções (par ou ímpar)
	if(!par.checked && !impar.checked){
		exibirModal("Por favor, selecione uma das opções");

		return;
	}

	iniciarJogo(numJog);
}

// Função que exibe o modal
function exibirModal(msg){
	msgModal.innerHTML = msg;

	boxModal.classList.add("ativo");
}

// Função que fecha o modal com um clique fora dele
function fecharModalClique(evt){
	// Verifica se alvo do evento é o fundo do modal
	if(evt.target === boxModal){
		fecharModal();
	}
}

// Função que fecha o modal
function fecharModal(){
	msgModal.textContent = "";

	boxModal.classList.remove("ativo");

	// Verifica se jogador venceu a partida
	if(vencedor === "jogador"){
		exibirModal(`Você venceu a partida! <i class="bi bi-emoji-smile"></i> Clique em "Reiniciar" para jogar novamente`);
		trocarEventos();

		return;
	}

	// Verifica se máquina venceu a partida
	if(vencedor === "maquina"){
		exibirModal(`Você perdeu a partida! <i class="bi bi-emoji-frown"></i> Clique em "Reiniciar" para jogar novamente`);
		trocarEventos();
	}
}

// Função que fecha o modal quando o usuário aperta uma tecla
function fecharModalTecla(evt){
	// Verifica se usuário apertou "Esc"
	if(evt.key === "Escape"){
		fecharModal();
	}
}

// Função que inicia o jogo
function iniciarJogo(nJog){
	const numMaq = Math.floor(Math.random() * 5);
	const resultado = (nJog + numMaq) % 2;
	let opJogador, opMaquina;

	// Verifica se jogador escolheu par
	if(par.checked){
		opJogador = "par";
		opMaquina = "impar";
	}else{
		opJogador = "impar";
		opMaquina = "par";
	}

	verificarVencedor(resultado, opJogador, opMaquina);

	numero.value = "";
}

// Função que verifica o vencedor
function verificarVencedor(res, opJog, opMaq){
	// Verifica se jogador venceu
	if(res === 0 && opJog === "par" || res !== 0 && opJog === "impar"){
		exibirModal(`Você venceu a ${rodadas + 1}ª rodada! <i class="bi bi-emoji-smile"></i>`);
		incrementarPont("jogador");
		decidirJogo();
	}else{
		exibirModal(`Você perdeu a ${rodadas + 1}ª rodada! <i class="bi bi-emoji-frown"></i>`);
		incrementarPont("maquina");
		decidirJogo();
	}
}

// Função que incrementa a pontuação
function incrementarPont(venc){
	// Verifica se jogador venceu
	if(venc === "jogador"){
		pontJog++;

		pontuacaoJog.textContent = pontJog;
	}else{
		pontMaq++;

		pontuacaoMaq.textContent = pontMaq;
	}
}

// Função que decide o jogo
function decidirJogo(){
	rodadas++;

	// Verifica se passaram duas rodadas e o jogador venceu
	if(rodadas === 2 && pontJog > pontMaq){
		vencedor = "jogador";

		return;
	}

	// Verifica se passaram duas rodadas e a máquina venceu
	if(rodadas === 2 && pontMaq > pontJog){
		vencedor = "maquina";

		return;
	}

	// Verifica se passaram três rodadas e o jogador venceu
	if(rodadas === 3 && pontJog > pontMaq){
		vencedor = "jogador";

		return;
	}

	// Verifica se passaram três rodadas e a máquina venceu
	if(rodadas === 3 && pontMaq > pontJog){
		vencedor = "maquina";

		return;
	}
}

// Função que troca os eventos dos elementos relacionados ao modal
function trocarEventos(){
	window.removeEventListener("click", fecharModalClique);
	window.removeEventListener("keydown", fecharModalTecla);
	btnFecharModal.removeEventListener("click", fecharModal);

	window.addEventListener("click", reiniciarClique);
	window.addEventListener("keydown", reiniciarTecla);
	btnFecharModal.addEventListener("click", reiniciar);

	btnFecharModal.classList.add("reiniciar");
	btnFecharModal.textContent = "Reiniciar";
}

// Função que reinicia o jogo quando o usuário clica fora do modal
function reiniciarClique(evt){
	// Verifica se alvo do evento é o fundo do modal
	if(evt.target === boxModal){
		reiniciar();
	}
}

// Função que reinicia o jogo quando o aperta uma tecla
function reiniciarTecla(evt){
	// Verifica se tecla pressionada foi "Esc"
	if(evt.key === "Escape"){
		reiniciar();
	}
}

// Função que reinicia o jogo
function reiniciar(){
	window.location.reload();
}