// ============================================================
//  SCRIPT.JS — Portfolio
// ============================================================


// ===== DARK MODE =====

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    console.log(`Tema alterado para: ${isDark ? 'escuro' : 'claro'}`);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') document.body.classList.add('dark-mode');
    } else {
        // Deteta o tema do sistema operativo se não houver preferência guardada
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.body.classList.add('dark-mode');
    }
}


// ===== RELÓGIO DIGITAL =====

let is24Hour = true;
let clockInterval;

function updateClock() {
    const now = new Date();
    let hours   = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24Hour) {
        hours = hours % 12 || 12;
    }

    hours   = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    const hoursEl   = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (hoursEl)   hoursEl.textContent   = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;

    // Atualiza a data por extenso — estava em falta no teu código!
    const dateEl = document.getElementById('date');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('pt-PT', options);
    }
}

function startClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
    console.log('⏰ Relógio iniciado!');
}

function toggleFormat() {
    is24Hour = !is24Hour;
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
    updateClock();
    console.log(`Formato: ${is24Hour ? '24h' : '12h'}`);
}

function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) is24Hour = (saved === '24');
}


// ===== CONTADOR DE VISITAS =====

function getVisitCount() {
    const count = localStorage.getItem('visitCount');
    return count ? parseInt(count) : 0;
}

function incrementVisitCount() {
    let count = getVisitCount();
    count++;
    localStorage.setItem('visitCount', count);
    localStorage.setItem('lastVisit', new Date().toISOString());
    return count;
}

function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');
    if (!lastVisitISO) return 'Primeira vez aqui! 🎉';

    const lastVisit = new Date(lastVisitISO);
    const now       = new Date();
    const diff      = now - lastVisit;

    const minutes = Math.floor(diff / 1000 / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);

    if (minutes < 1)  return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24)   return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

function updateVisitDisplay() {
    const countEl = document.getElementById('visit-count');
    if (countEl) countEl.textContent = getVisitCount();
}

function updateLastVisitDisplay() {
    const lastVisitEl = document.getElementById('last-visit');
    if (lastVisitEl) lastVisitEl.textContent = formatLastVisit();
}

function resetVisitCounter() {
    const confirmed = window.confirm('Tens a certeza que queres resetar o contador?');
    if (!confirmed) return;
    localStorage.removeItem('visitCount');
    localStorage.removeItem('lastVisit');
    updateVisitDisplay();
    updateLastVisitDisplay();
    console.log('🔄 Contador resetado!');
    alert('Contador resetado com sucesso!');
}

// A ORDEM AQUI É IMPORTANTE:
// 1. Mostrar a última visita ANTES de incrementar
// 2. Incrementar (regista esta visita)
// 3. Mostrar o novo total
function initVisitCounter() {
    updateLastVisitDisplay(); // Passo 1: visita ANTERIOR
    incrementVisitCount();    // Passo 2: registar ESTA visita
    updateVisitDisplay();     // Passo 3: novo total
}


// ===== FOOTER — ANO AUTOMÁTICO =====

function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}


// ===== DADOS DOS PROJETOS (teus projetos originais mantidos) =====

const projects = [
    {
        id: 1,
        title: 'Segurança no Desenvolvimento de Software',
        category: 'presentation',
        description: 'Apresentação',
        image: 'imagens/segurancads.jpg',
        tags: ['Tech', 'Web', 'Canva'],
        link: 'https://www.canva.com/design/DAGzJtRFPcA/wyoU4RmJ9JIx9N1qhVVfWQ/view?utm_content=DAGzJtRFPcA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5c14e1e449',
        longDescription: 'Apresentação sobre a "Segurança no Desenvolvimento de Software"',
        features: ['Aprendizado', 'Prático', 'Exemplos', 'Dicas de Segurança'],
        technologies: ['ChatGPT', 'Canva'],
        date: '2026-02'
    },
    {
        id: 2,
        title: 'Meu primeiro Website',
        category: 'web',
        description: 'Website',
        image: 'imagens/katseyef.jpg',
        tags: ['Tech', 'Web', 'Music'],
        link: 'tic%20html/inicio.html',
        longDescription: 'Website sobre o grupo pop "Katseye"',
        features: ['Musicas', 'Recomendações'],
        technologies: ['Pinterest', 'Music players'],
        date: '2024-12'
    },
    {
        id: 3,
        title: 'EDD',
        category: 'presentation',
        description: 'Apresentação',
        image: 'imagens/Edd.jpg',
        tags: ['Tech', 'Web', 'Canva'],
        link: 'https://www.canva.com/design/DAGljswWMVI/eMyHjhnl0bXN1OQmHXqwpw/view?utm_content=DAGljswWMVI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h178e982ccd',
        longDescription: 'Apresentação sobre os "EDDs" feita por mim e por um colega da turma (Tiago)',
        features: ['Aprendizado', 'Prático'],
        technologies: ['ChatGPT', 'Canva'],
        date: '2025-4'
    }
];

let currentCategory = 'all';


// ===== RENDERIZAR PROJETOS (com a tua animação de fade) =====

function renderProjects(projectsToRender) {
    const grid      = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    if (!grid) return;

    // Animação de saída nos cards existentes (a tua animação original)
    const existingCards = grid.querySelectorAll('.project-card');
    existingCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeOut 0.3s ease forwards';
        }, index * 50);
    });

    setTimeout(() => {
        grid.innerHTML = '';

        if (projectsToRender.length === 0) {
            if (noResults) noResults.style.display = 'block';
            return;
        }

        if (noResults) noResults.style.display = 'none';

        projectsToRender.forEach(project => {
            const card = createProjectCard(project);
            grid.appendChild(card);
        });

        updateCounters();
    }, existingCards.length * 50 + 300);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className        = 'project-card';
    card.dataset.id       = project.id;
    card.dataset.category = project.category;

    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-card-body">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return card;
}

function updateCounters() {
    const counts = {
        all:          projects.length,
        web:          projects.filter(p => p.category === 'web').length,
        mobile:       projects.filter(p => p.category === 'mobile').length,
        design:       projects.filter(p => p.category === 'design').length,
        presentation: projects.filter(p => p.category === 'presentation').length,
    };

    Object.keys(counts).forEach(cat => {
        const btn = document.querySelector(`[data-category="${cat}"] .count`);
        if (btn) btn.textContent = counts[cat];
    });
}


// ===== FILTROS =====

function filterProjects(category) {
    currentCategory = category;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    const filtered = category === 'all'
        ? projects
        : projects.filter(p => p.category === category);

    renderProjects(filtered);
}

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.category);
        });
    });
}


// ===== MODAL =====

function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>
        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
        </div>
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="modal-link">
            Ver Projeto Completo →
        </a>
    `;

    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function setupModalListeners() {
    const grid = document.getElementById('projects-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) openModal(parseInt(card.dataset.id));
        });
    }

    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}


// ===== PESQUISA COM DEBOUNCE =====

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function searchProjects(query) {
    const term = query.toLowerCase().trim();
    if (term === '') {
        filterProjects(currentCategory);
        return;
    }

    const base = currentCategory === 'all'
        ? projects
        : projects.filter(p => p.category === currentCategory);

    const results = base.filter(project =>
        project.title.toLowerCase().includes(term)       ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
    );

    renderProjects(results);
}

const debouncedSearch = debounce(searchProjects, 300);

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}


// ===== SCROLL TO TOP =====

window.addEventListener('scroll', () => {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});


// ===== VALIDAÇÃO DO FORMULÁRIO =====

// As regras usam "messages" (como no professor) — corrigido do "errorMessages" que estavas a usar
const validationRules = {
    name: {
        required: true,
        minLength: 3,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
        messages: {
            required:  'Por favor, introduz o teu nome',
            minLength: 'O nome deve ter pelo menos 3 caracteres',
            pattern:   'O nome só pode conter letras'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
            required: 'Por favor, introduz o teu email',
            pattern:  'Por favor, introduz um email válido'
        }
    },
    subject: {
        required: true,
        messages: {
            required: 'Por favor, seleciona um assunto'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 500,
        messages: {
            required:  'Por favor, escreve uma mensagem',
            minLength: 'A mensagem deve ter pelo menos 10 caracteres',
            maxLength: 'A mensagem não pode ter mais de 500 caracteres'
        }
    },
    phone: {
        required: false,
        pattern: /^(\+351)?[0-9]{9}$/,
        messages: {
            pattern: 'Formato: +351 912345678 ou 912345678'
        }
    }
};

function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { valid: true, message: '' };

    if (rules.required && !value.trim()) {
        return { valid: false, message: rules.messages.required };
    }
    if (rules.minLength && value.trim().length < rules.minLength) {
        return { valid: false, message: rules.messages.minLength };
    }
    if (rules.maxLength && value.trim().length > rules.maxLength) {
        return { valid: false, message: rules.messages.maxLength };
    }
    // Só valida o padrão se o campo não estiver vazio (importante para campos opcionais)
    if (rules.pattern && value.trim() && !rules.pattern.test(value)) {
        return { valid: false, message: rules.messages.pattern };
    }
    return { valid: true, message: '' };
}

function showFieldFeedback(fieldName, isValid, message = '') {
    const field = document.getElementById(fieldName);
    if (!field) return;
    const group   = field.closest('.form-group');
    const errorEl = group.querySelector('.error-message');

    group.classList.remove('valid', 'invalid');
    group.classList.add(isValid ? 'valid' : 'invalid');
    if (errorEl) errorEl.textContent = isValid ? '' : message;
}

function validateForm(silent = false) {
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    let allValid = true;

    fields.forEach(name => {
        const field = document.getElementById(name);
        if (!field) return;
        const result = validateField(name, field.value);
        if (!silent) showFieldFeedback(name, result.valid, result.message);
        if (!result.valid) allValid = false;
    });

    return allValid;
}

function updateSubmitButton() {
    const btn = document.getElementById('submit-btn');
    if (btn) btn.disabled = !validateForm(true);
}

function setupFormValidation() {
    const fields = ['name', 'email', 'phone', 'subject', 'message'];

    fields.forEach(name => {
        const field = document.getElementById(name);
        if (!field) return;

        // Mostra o erro ao sair do campo (blur)
        field.addEventListener('blur', () => {
            const result = validateField(name, field.value);
            showFieldFeedback(name, result.valid, result.message);
            updateSubmitButton();
        });

        // Corrige o erro em tempo real enquanto escreve (só se já foi tocado)
        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group.classList.contains('invalid') || group.classList.contains('valid')) {
                const result = validateField(name, field.value);
                showFieldFeedback(name, result.valid, result.message);
            }
            updateSubmitButton();
        });
    });

    updateSubmitButton();
}


// ===== CONTADOR DE CARACTERES =====

function setupCharCounter() {
    const textarea  = document.getElementById('message');
    const countEl   = document.getElementById('char-count');
    const counterEl = document.querySelector('.char-counter');
    if (!textarea || !countEl) return;

    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        countEl.textContent = len;
        counterEl.classList.remove('warning', 'error');
        if (len > 400 && len <= 500) counterEl.classList.add('warning');
        if (len > 500)               counterEl.classList.add('error');
        updateSubmitButton();
    });
}


// ===== TOAST NOTIFICATIONS =====

function showToast(type, title, message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);

    const remove = () => {
        toast.style.animation = 'toastOut 0.35s ease forwards';
        setTimeout(() => toast.remove(), 350);
    };

    toast.querySelector('.toast-close').addEventListener('click', remove);
    setTimeout(() => { if (toast.parentElement) remove(); }, duration);
}


// ===== GUARDAR MENSAGENS =====

function saveMessage(formData) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const msg = {
        id:      Date.now(),
        name:    formData.get('name'),
        email:   formData.get('email'),
        phone:   formData.get('phone') || null,
        subject: formData.get('subject'),
        message: formData.get('message'),
        date:    new Date().toISOString(),
        read:    false
    };
    messages.unshift(msg);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    return msg;
}


// ===== SUBMIT DO FORMULÁRIO =====

function setupFormSubmit() {
    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('error', 'Erro!', 'Por favor, corrige os erros no formulário');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const formData = new FormData(form);
            saveMessage(formData);

            showToast('success', 'Mensagem Enviada! 🎉', 'Obrigado pelo contacto. Respondo em breve!');

            form.reset();
            document.querySelectorAll('.form-group').forEach(g =>
                g.classList.remove('valid', 'invalid'));
            const charCount = document.getElementById('char-count');
            if (charCount) charCount.textContent = '0';

            loadMessages();

        } catch {
            showToast('error', 'Erro ao Enviar', 'Ocorreu um erro. Tenta novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            updateSubmitButton();
        }
    });
}


// ===== ADMIN VIEW =====

function markAllAsRead() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const updated  = messages.map(m => ({ ...m, read: true }));
    localStorage.setItem('contactMessages', JSON.stringify(updated));
}

function loadMessages(markRead = false) {
    if (markRead) markAllAsRead();

    const messages   = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const list       = document.getElementById('messages-list');
    const noMessages = document.getElementById('no-messages');
    const totalEl    = document.getElementById('total-messages');
    const badge      = document.getElementById('unread-badge');

    if (totalEl) totalEl.textContent = messages.length;

    const unread = messages.filter(m => !m.read).length;
    if (badge) {
        badge.textContent   = unread;
        badge.style.display = unread > 0 ? 'flex' : 'none';
    }

    if (!list || !noMessages) return;

    if (messages.length === 0) {
        list.style.display       = 'none';
        noMessages.style.display = 'block';
        return;
    }

    list.style.display       = 'flex';
    noMessages.style.display = 'none';

    list.innerHTML = messages.map(msg => `
        <div class="message-card ${msg.read ? '' : 'unread'}" data-id="${msg.id}">
            <div class="message-header">
                <div class="message-sender">
                    <h4>${msg.name}</h4>
                    <p>${msg.email}</p>
                    ${msg.phone ? `<p class="msg-phone">📱 ${msg.phone}</p>` : ''}
                </div>
                <div class="message-meta">
                    <div>${new Date(msg.date).toLocaleDateString('pt-PT')}</div>
                    <div>${new Date(msg.date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            </div>
            <span class="message-subject">${msg.subject}</span>
            <div class="message-body">${msg.message}</div>
            <div class="message-actions">
                <button class="btn-delete" data-id="${msg.id}">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');

    list.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteMessage(parseInt(btn.dataset.id)));
    });
}

function deleteMessage(id) {
    if (!confirm('Eliminar esta mensagem?')) return;
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages = messages.filter(m => m.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages();
    showToast('success', 'Eliminada!', 'Mensagem removida com sucesso');
}

function clearAllMessages() {
    if (!confirm('Eliminar TODAS as mensagens? Esta ação é irreversível!')) return;
    localStorage.removeItem('contactMessages');
    loadMessages();
    showToast('success', 'Limpo!', 'Todas as mensagens foram removidas');
}

function setupAdminToggle() {
    const toggleBtn = document.getElementById('toggle-admin');
    const adminSec  = document.getElementById('admin-messages');
    const clearBtn  = document.getElementById('clear-messages');
    if (!toggleBtn || !adminSec) return;

    let visible = false;

    toggleBtn.addEventListener('click', () => {
        visible = !visible;
        adminSec.style.display = visible ? 'block' : 'none';
        if (visible) {
            loadMessages(true);
            adminSec.scrollIntoView({ behavior: 'smooth' });
        }
    });

    if (clearBtn) clearBtn.addEventListener('click', clearAllMessages);
}


// ============================================================
//  INICIALIZAÇÃO — UM ÚNICO DOMContentLoaded
//  (o teu código tinha 3 blocos DOMContentLoaded separados,
//   o que é má prática — aqui está tudo junto e em ordem)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // Tema claro/escuro
    loadSavedTheme();
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

    // Relógio
    loadClockFormat();
    startClock();
    const formatToggleBtn = document.getElementById('format-toggle');
    if (formatToggleBtn) formatToggleBtn.addEventListener('click', toggleFormat);

    // Contador de visitas
    initVisitCounter();
    const resetBtn = document.getElementById('reset-counter');
    if (resetBtn) resetBtn.addEventListener('click', resetVisitCounter);

    // Footer
    setFooterYear();

    // Projetos
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();

    // Scroll to top
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Formulário
    setupFormValidation();
    setupCharCounter();
    setupFormSubmit();
    setupAdminToggle();
    loadMessages();

    console.log('✅ Portfolio totalmente carregado!');

    initGitHubStats();

    initWeatherWidget();

    initButterflyHero();
});

// Cursor desaparece no fim do typewriter
setTimeout(() => {
    document.querySelectorAll('.digitando').forEach(el => {
        el.style.borderRight = 'none';
        el.style.animation = el.classList.contains('titulo')
            ? 'typing1 1.5s steps(19, end) 0.3s forwards'
            : 'typing2 2.5s steps(41, end) 2s forwards';
    });
}, 4700); // 2s delay + 2.5s typing do subtítulo = 4.5s + margem

// ===== GITHUB API INTEGRATION =====

const GITHUB_USERNAME = 'RehmanPereira'; // ALTERAR PARA O TEU USERNAME!

// Buscar dados do utilizador
async function fetchGitHubUserData() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ GitHub user data:', data);
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar GitHub user:', error);
        throw error;
    }
}

// Atualizar stats no DOM
function updateGitHubStats(userData) {
    document.getElementById('repos-count').textContent = userData.public_repos;
    document.getElementById('followers-count').textContent = userData.followers;
    document.getElementById('following-count').textContent = userData.following;
    
    // Remover classe loading
    document.querySelectorAll('.stat-value').forEach(el => {
        el.classList.remove('loading');
    });
}

// Buscar repositórios do utilizador
async function fetchGitHubRepos() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        console.log('✅ GitHub repos:', repos);
        return repos;
        
    } catch (error) {
        console.error('❌ Erro ao buscar repos:', error);
        throw error;
    }
}

// Calcular total de stars
async function calculateTotalStars() {
    try {
        const repos = await fetchGitHubRepos();
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        document.getElementById('stars-count').textContent = totalStars;
        
        return repos;
    } catch (error) {
        document.getElementById('stars-count').textContent = '0';
        throw error;
    }
}

// Renderizar repositórios
function renderRepos(repos) {
    const grid = document.getElementById('repos-grid');
    
    grid.innerHTML = repos.map(repo => `
        

            

                
📦

                

                    
${repo.name}

                

            

            

                ${repo.description || 'Sem descrição'}
            


            

                ⭐ ${repo.stargazers_count}
                🔀 ${repo.forks_count}
            

            ${repo.language ? `${repo.language}` : ''}
        

    `).join('');
}

// ===== INICIALIZAR GITHUB STATS =====

async function initGitHubStats() {
    console.log('🐙 Carregando GitHub stats...');
    
    try {
        // Buscar dados em paralelo
        const [userData, repos] = await Promise.all([
            fetchGitHubUserData(),
            calculateTotalStars()
        ]);
        
        // Atualizar UI
        updateGitHubStats(userData);
        renderRepos(repos);
        
        console.log('✅ GitHub stats carregados!');
        
    } catch (error) {
        console.error('❌ Erro ao carregar GitHub stats');
        // Mostrar erro na UI
        document.querySelectorAll('.stat-value').forEach(el => {
            el.textContent = '--';
            el.classList.remove('loading');
        });
    }
}




// ===== CACHE SIMPLES =====

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

function getCachedData(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // Verificar se cache ainda é válido
    if (now - timestamp < CACHE_DURATION) {
        console.log(`✅ Usando cache para ${key}`);
        return data;
    }
    
    // Cache expirado
    localStorage.removeItem(key);
    return null;
}

function setCachedData(key, data) {
    const cacheObj = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheObj));
}

// Atualizar fetchGitHubUserData para usar cache
async function fetchGitHubUserData() {
    const cacheKey = `github_user_${GITHUB_USERNAME}`;
    
    // Tentar obter do cache primeiro
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    // Se não tem cache, buscar da API
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Guardar no cache
        setCachedData(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error('❌ Erro ao buscar GitHub user:', error);
        throw error;
    }
}

// ===== WEATHER WIDGET =====

const OPENWEATHER_API_KEY = '00b57ea0d89eb13566b4f0f1cb5e00e3';
const DEFAULT_CITY = 'Lisbon'; // Cidade padrão se geolocalização falhar

// Mapeamento de códigos para emojis
const weatherIcons = {
    '01d': '☀️',  // clear sky day
    '01n': '🌙',  // clear sky night
    '02d': '⛅',  // few clouds day
    '02n': '☁️',  // few clouds night
    '03d': '☁️',  // scattered clouds
    '03n': '☁️',
    '04d': '☁️',  // broken clouds
    '04n': '☁️',
    '09d': '🌧️',  // shower rain
    '09n': '🌧️',
    '10d': '🌦️',  // rain day
    '10n': '🌧️',  // rain night
    '11d': '⛈️',  // thunderstorm
    '11n': '⛈️',
    '13d': '❄️',  // snow
    '13n': '❄️',
    '50d': '🌫️',  // mist
    '50n': '🌫️'
};

// Buscar meteorologia por cidade
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Weather data:', data);
        
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar meteorologia:', error);
        throw error;
    }
}

// Buscar meteorologia por coordenadas
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar meteorologia:', error);
        throw error;
    }
}

// Atualizar UI do widget
function updateWeatherWidget(data) {
    const widget = document.getElementById('weather-widget');
    const loading = widget.querySelector('.weather-loading');
    const content = widget.querySelector('.weather-content');
    const error = widget.querySelector('.weather-error');
    
    // Esconder loading e error
    loading.style.display = 'none';
    error.style.display = 'none';
    
    // Atualizar dados
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('weather-location').textContent = data.name;
    
    // Atualizar ícone
    const iconCode = data.weather[0].icon;
    const icon = weatherIcons[iconCode] || '🌈';
    document.getElementById('weather-icon').textContent = icon;
    
    // Mostrar content
    content.style.display = 'flex';
}

// Mostrar erro
function showWeatherError() {
    const widget = document.getElementById('weather-widget');
    widget.querySelector('.weather-loading').style.display = 'none';
    widget.querySelector('.weather-content').style.display = 'none';
    widget.querySelector('.weather-error').style.display = 'block';
}

// ===== INICIALIZAR WEATHER WIDGET =====

async function initWeatherWidget() {
    console.log('🌤️ Carregando meteorologia...');
    
    try {
        // Tentar obter localização do utilizador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Sucesso
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude);
                    updateWeatherWidget(data);
                },
                // Erro ou negado
                async (error) => {
                    console.log('Geolocalização negada, usando cidade padrão');
                    const data = await fetchWeatherByCity(DEFAULT_CITY);
                    updateWeatherWidget(data);
                }
            );
        } else {
            // Browser não suporta geolocalização
            const data = await fetchWeatherByCity(DEFAULT_CITY);
            updateWeatherWidget(data);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar meteorologia');
        showWeatherError();
    }
}

// ===== ERROR HANDLING AVANÇADO =====

// Função para lidar com erros de API
function handleAPIError(error, apiName) {
    console.error(`❌ Erro na ${apiName} API:`, error);
    
    // Diferentes tipos de erro
    if (error.message.includes('Failed to fetch')) {
        showToast('error', 'Sem Conexão', `Verifica a tua ligação à internet`);
    } else if (error.message.includes('404')) {
        showToast('error', 'Não Encontrado', `${apiName}: Recurso não encontrado`);
    } else if (error.message.includes('429')) {
        showToast('error', 'Rate Limit', `${apiName}: Muitos pedidos. Tenta mais tarde.`);
    } else if (error.message.includes('403')) {
        showToast('error', 'Acesso Negado', `${apiName}: Verifica API key`);
    } else {
        showToast('error', 'Erro', `${apiName}: ${error.message}`);
    }
}

// Atualizar fetchs para usar handleAPIError
async function fetchGitHubUserData() {
    const cacheKey = `github_user_${GITHUB_USERNAME}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        setCachedData(cacheKey, data);
        return data;
        
    } catch (error) {
        handleAPIError(error, 'GitHub');
        throw error;
    }
}

// ===== RETRY LOGIC =====

async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return response;
            
        } catch (error) {
            // Última tentativa - lançar erro
            if (i === maxRetries - 1) {
                throw error;
            }
            
            // Esperar antes de retry (exponential backoff)
            const delay = Math.pow(2, i) * 1000;
            console.log(`Retry ${i + 1}/${maxRetries} após ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usar em fetchs
async function fetchGitHubUserData() {
    // ... cache code ...
    
    try {
        const response = await fetchWithRetry(
            `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        const data = await response.json();
        // ... resto
    } catch (error) {
        handleAPIError(error, 'GitHub');
        throw error;
    }
}

// ===== ANIMAÇÃO DE BORBOLETA NO HERO (extra, para dar um toque especial) =====/

function initButterflyHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const positions = [
        { left: '4%',  top: '8%'  },
        { left: '74%', top: '6%'  },
        { left: '82%', top: '58%' },
        { left: '3%',  top: '60%' },
        { left: '58%', top: '74%' },
        { left: '24%', top: '10%' },
    ];

    const moves = [
        { x1: '25px',  y1: '-20px', x2: '45px',  y2: '5px'   },
        { x1: '-20px', y1: '-25px', x2: '10px',  y2: '-40px'  },
        { x1: '30px',  y1: '-18px', x2: '-12px', y2: '-28px'  },
        { x1: '-28px', y1: '-15px', x2: '18px',  y2: '-32px'  },
        { x1: '20px',  y1: '-28px', x2: '-15px', y2: '-10px'  },
        { x1: '-15px', y1: '-22px', x2: '28px',  y2: '-8px'   },
    ];

    positions.forEach((pos, i) => {
        const m = moves[i];
        const scale   = 0.7 + Math.random() * 0.5;
        const duration = (4.5 + i * 1.2).toFixed(1);
        const delay   = (i * 0.7).toFixed(1);
        const flapDur = (0.35 + Math.random() * 0.2).toFixed(2);

        const wrapper = document.createElement('div');
        wrapper.className = 'hero-butterfly';
        wrapper.style.cssText = `position:absolute;left:${pos.left};top:${pos.top};z-index:1;--sx1:${m.x1};--sy1:${m.y1};--sx2:${m.x2};--sy2:${m.y2};animation:svgfly ${duration}s ease-in-out ${delay}s infinite;`;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width',   Math.round(50 * scale));
        svg.setAttribute('height',  Math.round(40 * scale));
        svg.setAttribute('viewBox', '0 0 50 40');
        svg.classList.add('bf-svg');
        svg.style.animation = `svgflap ${flapDur}s ease-in-out infinite alternate`;
        svg.innerHTML = `
            <path d="M25,20 Q10,5 2,8 Q0,15 8,20 Q0,25 2,32 Q10,35 25,20Z" class="bf-wing" opacity="0.9"/>
            <path d="M25,20 Q40,5 48,8 Q50,15 42,20 Q50,25 48,32 Q40,35 25,20Z" class="bf-wing" opacity="0.9"/>
            <ellipse cx="25" cy="20" rx="2" ry="10" class="bf-body"/>
        `;
        wrapper.appendChild(svg);
        hero.appendChild(wrapper);
    });

    // Árvores silhueta nos cantos
    [
        { left: '0%',  w: 60, h: 130 },
        { left: '4%',  w: 45, h: 100 },
        { left: '8%',  w: 35, h: 80  },
        { right: '0%', w: 65, h: 140 },
        { right: '4%', w: 48, h: 108 },
        { right: '8%', w: 36, h: 82  },
    ].forEach(t => {
        const tree = document.createElement('div');
        const half = t.w / 2;
        const pos  = t.left !== undefined ? `left:${t.left}` : `right:${t.right}`;
        tree.style.cssText = `position:absolute;bottom:0;${pos};width:0;height:0;border-left:${half}px solid transparent;border-right:${half}px solid transparent;border-bottom:${t.h}px solid rgba(0,0,0,0.22);z-index:1;`;
        hero.appendChild(tree);
    });

    // Partículas de brilho
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 5 + 3;
        p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;left:${Math.random()*95}%;top:${Math.random()*85}%;animation:particleDrift ${2+Math.random()*3}s ease-in-out ${Math.random()*3}s infinite;--pdx:${Math.random()*30-15}px;--pdy:${Math.random()*30-15}px;z-index:1;`;
        hero.appendChild(p);
    }

    updateButterflyColors();
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => setTimeout(updateButterflyColors, 50));
}

function updateButterflyColors() {
    const isDark     = document.body.classList.contains('dark-mode');
    const wingColor  = isDark ? 'rgba(220,160,255,0.9)' : '#1a0030';
    const bodyColor  = isDark ? '#ffffff'                : '#0d0018';
    const glowFilter = isDark ? 'drop-shadow(0 0 5px #c070ff)' : 'none';
    const partColor  = isDark ? 'rgba(200,150,255,0.25)' : 'rgba(80,0,120,0.2)';

    document.querySelectorAll('.bf-wing').forEach(el => el.setAttribute('fill', wingColor));
    document.querySelectorAll('.bf-body').forEach(el => el.setAttribute('fill', bodyColor));
    document.querySelectorAll('.bf-svg').forEach(el  => el.style.filter = glowFilter);
    document.querySelectorAll('.hero-particle').forEach(el => el.style.background = partColor);
}