// Data atual formatada para cabeçalho
const data = new Date();
const opcoes = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);
document.getElementById('app-date').textContent = dataFormatada;

// Configurar data atual no input
const hoje = new Date().toISOString().split('T')[0];
document.getElementById('tarefa-data').value = hoje;

// Manipular formulário
const form = document.getElementById('tarefa-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const tarefaData = document.getElementById('tarefa-data').value;
  const tarefaTipo = document.getElementById('tarefa-tipo').value;
  const tarefaLocal = document.getElementById('tarefa-local').value;
  const tarefaHora = document.getElementById('tarefa-hora').value;
  
  // Criar objeto da tarefa
  const tarefa = {
    data: tarefaData,
    tipo: tarefaTipo,
    local: tarefaLocal,
    hora: tarefaHora,
    timestamp: Date.now()
  };
  
  // Salvar no localStorage por data
  let tarefasPorData = JSON.parse(localStorage.getItem('tarefas') || '{}');
  
  if (!tarefasPorData[tarefaData]) {
    tarefasPorData[tarefaData] = [];
  }
  
  tarefasPorData[tarefaData].push(tarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefasPorData));
  
  // Feedback visual
  const button = document.querySelector('.submit-button');
  const originalText = button.textContent;
  button.textContent = 'Enviado!';
  button.style.background = 'linear-gradient(135deg, #0a5a3b, #054032)';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    form.reset();
    document.getElementById('tarefa-data').value = hoje;
  }, 1500);
});
