/* ===== CHATBOT KODO LABS - JAVASCRIPT ===== */

class KodoChatbot {
    constructor() {
        this.trigger = document.getElementById('chatbot-trigger');
        this.container = document.getElementById('chatbot-container');
        this.messages = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.notification = document.getElementById('chatbot-notification');
        this.loading = document.getElementById('chatbot-loading');
        
        this.isOpen = false;
        this.conversationState = 'greeting';
        this.userName = '';
        this.userEmail = '';
        this.projectType = '';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        setTimeout(() => {
            this.hideLoading();
            this.showWelcomeMessage();
        }, 1500);
    }

    setupEventListeners() {
        this.trigger.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Cerrar con escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.toggleChat();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('active');
        this.trigger.classList.toggle('active');
        
        if (this.isOpen) {
            this.input.focus();
            this.hideNotification();
        }
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showWelcomeMessage() {
        this.addBotMessage(
            "¡Hola! 👋 Soy el asistente virtual de Kodo Labs. Estoy aquí para ayudarte con información sobre nuestros servicios de desarrollo de software.",
            this.getWelcomeQuickReplies()
        );
    }

    getWelcomeQuickReplies() {
        return [
            "💻 Desarrollo Web",
            "📱 Apps Móviles", 
            "🛠️ Sistemas",
            "🛒 E-commerce",
            "💰 Presupuesto",
            "📞 Contacto"
        ];
    }

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addUserMessage(text);
        this.input.value = '';
        this.sendBtn.disabled = true;

        // Mostrar indicador de escritura
        this.showTyping();

        // Procesar respuesta después de un delay
        setTimeout(() => {
            this.processMessage(text);
            this.hideTyping();
            this.sendBtn.disabled = false;
        }, 1000 + Math.random() * 1000);
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Detección de intenciones
        if (this.conversationState === 'greeting' && !this.userName) {
            if (lowerMessage.includes('hola') || lowerMessage.includes('buenas') || lowerMessage.includes('hi')) {
                this.addBotMessage("¡Perfecto! Para brindarte una mejor atención, ¿cuál es tu nombre?");
                this.conversationState = 'ask_name';
                return;
            }
        }

        if (this.conversationState === 'ask_name') {
            this.userName = this.extractName(message);
            this.addBotMessage(
                `¡Mucho gusto, ${this.userName}! 😊 ¿En qué puedo ayudarte hoy?`,
                this.getWelcomeQuickReplies()
            );
            this.conversationState = 'main_menu';
            return;
        }

        // Respuestas por categorías
        if (lowerMessage.includes('web') || lowerMessage.includes('sitio') || lowerMessage.includes('página')) {
            this.handleWebDevelopment();
        } else if (lowerMessage.includes('app') || lowerMessage.includes('móvil') || lowerMessage.includes('mobile')) {
            this.handleMobileDevelopment();
        } else if (lowerMessage.includes('sistema') || lowerMessage.includes('gestión') || lowerMessage.includes('crm') || lowerMessage.includes('erp')) {
            this.handleSystemDevelopment();
        } else if (lowerMessage.includes('ecommerce') || lowerMessage.includes('tienda') || lowerMessage.includes('e-commerce')) {
            this.handleEcommerce();
        } else if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('presupuesto')) {
            this.handlePricing();
        } else if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('email')) {
            this.handleContact();
        } else if (lowerMessage.includes('tiempo') || lowerMessage.includes('plazo') || lowerMessage.includes('cuánto')) {
            this.handleTimeline();
        } else if (lowerMessage.includes('experiencia') || lowerMessage.includes('quién') || lowerMessage.includes('empresa')) {
            this.handleAbout();
        } else {
            this.handleGeneral(lowerMessage);
        }
    }

    handleWebDevelopment() {
        this.addBotMessage(
            "🌐 ¡Excelente elección! Nuestro desarrollo web incluye:\n\n" +
            "✅ Sitios web modernos y responsivos\n" +
            "✅ React, Next.js y tecnologías actuales\n" +
            "✅ SEO optimizado\n" +
            "✅ Hosting y dominio incluido\n" +
            "✅ Panel de administración\n\n" +
            "¿Te gustaría conocer más detalles sobre algún aspecto específico?",
            ["💰 Precios", "⏱️ Tiempos", "🎨 Diseños", "📞 Contactar"]
        );
    }

    handleMobileDevelopment() {
        this.addBotMessage(
            "📱 ¡Perfecto! Desarrollamos apps que destacan:\n\n" +
            "✅ Apps nativas iOS y Android\n" +
            "✅ React Native para máxima eficiencia\n" +
            "✅ Diseño UX/UI profesional\n" +
            "✅ Integración con APIs\n" +
            "✅ Publicación en stores incluida\n\n" +
            "¿Qué tipo de app tienes en mente?",
            ["🛒 E-commerce", "📊 Corporativa", "🎮 Entretenimiento", "💬 Social"]
        );
    }

    handleSystemDevelopment() {
        this.addBotMessage(
            "⚙️ ¡Sistemas que transforman empresas! Ofrecemos:\n\n" +
            "✅ CRM y ERP personalizados\n" +
            "✅ Gestión de inventario\n" +
            "✅ Automatización de procesos\n" +
            "✅ Reportes inteligentes\n" +
            "✅ Acceso multi-usuario\n\n" +
            "¿Qué procesos necesitas automatizar?",
            ["📦 Inventario", "👥 Clientes", "💰 Ventas", "📊 Reportes"]
        );
    }

    handleEcommerce() {
        this.addBotMessage(
            "🛒 ¡Tiendas online que venden! Incluimos:\n\n" +
            "✅ Catálogo de productos completo\n" +
            "✅ Carrito y checkout optimizado\n" +
            "✅ Pasarelas de pago seguras\n" +
            "✅ Panel administrativo\n" +
            "✅ Integración con redes sociales\n\n" +
            "¿Qué productos planeas vender?",
            ["👗 Ropa", "🍕 Comida", "📚 Servicios", "🎁 Otros"]
        );
    }

    handlePricing() {
        this.addBotMessage(
            "💰 Nuestros precios son competitivos y transparentes:\n\n" +
            "🌐 **Sitio Web:** Desde $150.000 ARS\n" +
            "📱 **App Móvil:** Desde $250.000 ARS\n" +
            "⚙️ **Sistema:** Desde $300.000 ARS\n" +
            "🛒 **E-commerce:** Desde $200.000 ARS\n\n" +
            "*Precios finales según funcionalidades específicas*\n\n" +
            "¿Te gustaría un presupuesto personalizado?",
            ["📋 Presupuesto", "📞 Consulta", "ℹ️ Más info"]
        );
    }

    handleContact() {
        this.addBotMessage(
            "📞 ¡Conectemos! Puedes contactarnos por:\n\n" +
            "📧 **Email:** contacto@kodolabs.com\n" +
            "📱 **WhatsApp:** +54 9 221 XXX-XXXX\n" +
            "🕒 **Horarios:** Lun-Vie 9:00-19:00\n" +
            "📍 **Ubicación:** La Plata, Buenos Aires\n\n" +
            "También puedo ayudarte a completar un formulario de contacto. ¿Prefieres que te llamen o envías un WhatsApp?",
            ["📱 WhatsApp", "📞 Que me llamen", "📧 Email", "📋 Formulario"]
        );
    }

    handleTimeline() {
        this.addBotMessage(
            "⏱️ **Tiempos de desarrollo típicos:**\n\n" +
            "🌐 **Sitio Web:** 2-4 semanas\n" +
            "📱 **App Móvil:** 6-12 semanas\n" +
            "⚙️ **Sistema:** 8-16 semanas\n" +
            "🛒 **E-commerce:** 4-8 semanas\n\n" +
            "*Los tiempos pueden variar según la complejidad*\n\n" +
            "¿Tienes alguna fecha límite en mente?",
            ["🚀 Urgente", "📅 1-3 meses", "🕐 +3 meses", "🤔 Flexible"]
        );
    }

    handleAbout() {
        this.addBotMessage(
            "👨‍💻 **Sobre Kodo Labs:**\n\n" +
            "🎓 Estudiantes de Ingeniería en Sistemas\n" +
            "💡 Especializados en tecnologías modernas\n" +
            "🤝 Enfoque en PyMEs y startups\n" +
            "💰 Precios competitivos\n" +
            "🌟 Calidad profesional\n\n" +
            "Creemos en crear relaciones ganar-ganar: tú obtienes digitalización de calidad, nosotros ganamos experiencia real.",
            ["🔍 Ver portfolio", "📞 Contactar", "💰 Precios"]
        );
    }

    handleGeneral(message) {
        const responses = [
            "🤔 Interesante pregunta. Para darte la mejor respuesta, ¿podrías ser más específico sobre qué tipo de desarrollo te interesa?",
            "💡 ¡Perfecto! Me gustaría ayudarte mejor. ¿Estás buscando información sobre desarrollo web, apps móviles, o sistemas de gestión?",
            "🎯 Excelente consulta. Para orientarte mejor, ¿tu proyecto es para una empresa nueva o ya establecida?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.addBotMessage(randomResponse, this.getWelcomeQuickReplies());
    }

    extractName(message) {
        // Simple name extraction
        const words = message.split(' ');
        for (let word of words) {
            if (word.length > 2 && /^[A-ZÁÉÍÓÚ][a-záéíóú]+$/.test(word)) {
                return word;
            }
        }
        return message.split(' ')[0] || 'Amigo';
    }

    addUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'message user';
        message.textContent = text;
        this.messages.appendChild(message);
        this.scrollToBottom();
    }

    addBotMessage(text, quickReplies = []) {
        const message = document.createElement('div');
        message.className = 'message bot';
        
        // Formatear texto con markdown básico
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        message.innerHTML = formattedText;
        
        if (quickReplies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.className = 'quick-replies';
            
            quickReplies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply';
                button.textContent = reply;
                button.addEventListener('click', () => {
                    this.input.value = reply;
                    this.sendMessage();
                });
                repliesContainer.appendChild(button);
            });
            
            message.appendChild(repliesContainer);
        }
        
        this.messages.appendChild(message);
        this.scrollToBottom();

        // Mostrar notificación si el chat está cerrado
        if (!this.isOpen) {
            this.showNotification();
        }
    }

    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    showNotification() {
        this.notification.style.display = 'flex';
    }

    hideNotification() {
        this.notification.style.display = 'none';
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}

// Inicializar el chatbot cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new KodoChatbot();
    
    // Mostrar notificación inicial después de 10 segundos
    setTimeout(() => {
        if (!chatbot.isOpen) {
            chatbot.showNotification();
        }
    }, 10000);
    
    // Analytics del chatbot
    window.chatbotAnalytics = {
        trackInteraction: function(action, data = {}) {
            console.log('📊 Chatbot Analytics:', action, data);
            
            // Aquí puedes enviar datos a Google Analytics, etc.
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chatbot_interaction', {
                    chatbot_action: action,
                    ...data
                });
            }
        },
        
        trackConversion: function(type) {
            console.log('🎯 Chatbot Conversion:', type);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chatbot_conversion', {
                    conversion_type: type
                });
            }
        }
    };
    
    console.log('🤖 Chatbot Kodo Labs inicializado correctamente!');
});

// Función global para abrir el chatbot desde enlaces externos
window.openChatbot = function(message = '') {
    const chatbot = document.querySelector('.chatbot-container');
    const trigger = document.querySelector('.chatbot-trigger');
    
    if (chatbot && !chatbot.classList.contains('active')) {
        trigger.click();
        
        if (message) {
            setTimeout(() => {
                const input = document.getElementById('chatbot-input');
                if (input) {
                    input.value = message;
                    input.focus();
                }
            }, 500);
        }
    }
};

// Comando secreto: Ctrl + Shift + C para abrir chatbot
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        openChatbot('🎮 Comando secreto activado! ¿En qué puedo ayudarte?');
    }
});

// Detección de inactividad para mostrar chatbot
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const chatbot = document.querySelector('.chatbot-container');
        if (chatbot && !chatbot.classList.contains('active')) {
            const notification = document.getElementById('chatbot-notification');
            if (notification) {
                notification.style.display = 'flex';
                notification.textContent = '?';
            }
        }
    }, 120000); // 2 minutos
}

// Resetear timer en interacciones del usuario
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

resetInactivityTimer();