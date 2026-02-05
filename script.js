console.log('🚀 Portfolio carregado com sucesso!');

// Teste: mudar cor de fundo ao clicar
document.body.addEventListener('click', () => {
    console.log('Clicaste na página!');
});

// ===== DARK MODE TOGGLE =====

// 1. Função para alternar tema
function toggleTheme() {
    // Adiciona/remove classe dark-mode do body
    document.body.classList.toggle('dark-mode');
    
    // Verifica se está em dark mode
    const isDark = document.body.classList.contains('dark-mode');
    
    // Guarda preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log(`Tema alterado para: ${isDark ? 'escuro' : 'claro'}`);
}

// 2. Event listener no botão
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}