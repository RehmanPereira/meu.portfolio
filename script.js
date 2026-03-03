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
        longDescription: 'Apresentação sobre os "EDDs"',
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

// Usamos DOMContentLoaded para garantir que o botão já existe no HTML
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
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
});