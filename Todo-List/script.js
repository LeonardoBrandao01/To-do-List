// Cria uma lista encadeada (LinkedList) para armazenar as tarefas
const tarefasList = new LinkedList();

// Função para adicionar uma nova tarefa à lista
function inserirTarefa() {
  // Obtém os valores da tarefa e prioridade dos campos de input
  const descricao = document.getElementById("txtnovaTarefa").value.trim();
  const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

  // Cria uma nova tarefa com descrição, prioridade, data e hora atual
  const novaTarefa = new Tarefa(
    descricao,
    prioridade,
    pegarDataAtual(),
    pegarHoraAtual()
  );

  // Add a nova tarefa à lista de tarefas
  tarefasList.addElemento(novaTarefa);
  console.log(tarefasList.toString());

  
  document.getElementById("txtnovaTarefa").value = "";
  document.getElementById("txtnovaPrioridade").value = "";
  document.getElementById("txtnovaTarefa").focus();

  // Atualiza 
  renderizarLista();
}

// Função para remover a tarefa mais antiga da lista
function finalizarTarefa() {
  
  const tarefaRemovida = tarefasList.removeElemento();

  
  if (tarefaRemovida != null) {
    exibirMensagemRemocao(tarefaRemovida);
    renderizarLista(); 
  } else {
    
    const avisoRemocao = document.getElementById("mensagem-remocao");
    avisoRemocao.innerHTML = "Você não tem nenhuma tarefa para remover.";
  }
}

// Função para exibir a tarefa mais antiga da lista (com base na data e hora)
function mostrarTarefaMaisAntiga() {
  const avisoRemocao = document.getElementById("mensagem-remocao");

  // Verifica se a lista está vazia
  if (!tarefasList.isEmpty()) {
    let tarefaAntiga = tarefasList.head.dado;

    // Compara todas as tarefas e identifica a mais antiga
    for (const tarefa of tarefasList) {
      tarefaAntiga = compararTarefas(tarefaAntiga, tarefa);
    }

    // Exibe a descrição e os detalhes da tarefa mais antiga
    avisoRemocao.innerHTML = `Tarefa mais antiga: ${tarefaAntiga._descricao}, ${tarefaAntiga._data}, ${tarefaAntiga._hora}`;
  } else {
    avisoRemocao.innerHTML = "A lista está vazia.";
  }
  avisoRemocao.style.display = "block"; // Mostra a mensagem
}

// Função para exibir a tarefa que está no início da lista
function mostrarTarefaInicio() {
  const avisoRemocao = document.getElementById("mensagem-remocao");

  // Verifica se a lista está vazia
  if (!tarefasList.isEmpty()) {
    let tarefaInicio = tarefasList.head.dado;

    // Exibe a descrição e os detalhes da tarefa no início da lista
    avisoRemocao.innerHTML = `Primeira tarefa: ${tarefaInicio._descricao}, ${tarefaInicio._prioridade}, ${tarefaInicio._data}, ${tarefaInicio._hora}`;
  } else {
    avisoRemocao.innerHTML = "A lista está vazia.";
  }
  avisoRemocao.style.display = "block"; // Mostra a mensagem
}

// Função para exibir uma mensagem de remoção, indicando quanto tempo se passou desde a criação da tarefa
function exibirMensagemRemocao(tarefaRemovida) {
  const aviso = document.getElementById("mensagem-remocao");

  // Obtém a data e hora atual
  const agora = new Date();
  const dataFormatada = `${String(agora.getDate()).padStart(2, "0")}/${String(
    agora.getMonth() + 1
  ).padStart(2, "0")}/${agora.getFullYear()}`;
  const horaFormatada = `${agora
    .getHours()
    .toString()
    .padStart(2, "0")}:${agora
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${agora.getSeconds().toString().padStart(2, "0")}`;

  // Exibe quanto tempo se passou desde a criação da tarefa (em dias e horas)
  aviso.innerHTML = `Tarefa: ${
    tarefaRemovida.descricao
  } concluída após ${calcularDiferencaDias(
    tarefaRemovida._data,
    dataFormatada
  )} e ${calcularDiferencaHoras(tarefaRemovida._hora, horaFormatada)}.`;
  aviso.style.display = "block"; // Mostra a mensagem
}

// Função para atualizar a interface com a lista atual de tarefas
function renderizarLista() {
  const listaHtml = document.getElementById("list_listadeTarefas");
  listaHtml.innerHTML = ""; // Limpa a lista HTML
  console.log(tarefasList);

  // Se a lista não estiver vazia, adiciona cada tarefa como um novo elemento <li>
  if (!tarefasList.isEmpty()) {
    for (const tarefa of tarefasList) {
      const novaLinha = document.createElement("li");
      novaLinha.innerHTML = tarefa.toString();
      listaHtml.appendChild(novaLinha);
    }
  } else {
    // Se a lista estiver vazia, exibe uma mensagem de lista vazia
    listaHtml.innerHTML = "<li>Lista de Tarefas Vazia</li>";
  }
}

// obter a data atual 
function pegarDataAtual() {
  let hoje = new Date();
  let dia = hoje.getDate();
  let mes = hoje.getMonth() + 1;
  let ano = hoje.getFullYear();

  return `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${ano}`;
}

// Função para obter a hora atual 
function pegarHoraAtual() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const segundos = agora.getSeconds().toString().padStart(2, "0");
  return `${horas}:${minutos}:${segundos}`;
}

// Função para calcular a diferença de tempo entre duas horas 
function calcularDiferencaHoras(horaInicio, horaFim) {
  const [h1, m1, s1] = horaInicio.split(":").map(Number);
  const [h2, m2, s2] = horaFim.split(":").map(Number);

  const diferencaSegundos =
    h2 * 3600 + m2 * 60 + s2 - (h1 * 3600 + m1 * 60 + s1);

  // Calcula horas, minutos e segundos de diferença
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  // Retorna o tempo de diferença no formato HH:MM:SS
  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")} [horas:minutos:segundos]`;
}

// Função para calcular a diferença em dias entre duas datas no formato DD/MM/AAAA
function calcularDiferencaDias(data1, data2) {
  const umDia = 24 * 60 * 60 * 1000;
  const [dia1, mes1, ano1] = data1.split("/").map(Number);
  const [dia2, mes2, ano2] = data2.split("/").map(Number);
  const inicio = new Date(ano1, mes1 - 1, dia1);
  const fim = new Date(ano2, mes2 - 1, dia2);
  const diferencaMs = fim - inicio;
  const dias = Math.floor(diferencaMs / umDia);
  return `${dias} dias`;
}

// Função para converter uma data no formato DD/MM/AAAA para o formato ISO8601 (AAAA-MM-DD)
function converterDataParaISO(data) {
  const partes = data.split("/");
  const dia = partes[0].padStart(2, "0");
  const mes = partes[1].padStart(2, "0");
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}

// Função para comparar duas tarefas com base na data e hora de criação e retornar a mais antiga
function compararTarefas(tarefa1, tarefa2) {
  const dataHora1 = new Date(
    `${converterDataParaISO(tarefa1._data)}T${tarefa1._hora}`
  );
  const dataHora2 = new Date(
    `${converterDataParaISO(tarefa2._data)}T${tarefa2._hora}`
  );
  return dataHora1 < dataHora2 ? tarefa1 : tarefa2;
}
