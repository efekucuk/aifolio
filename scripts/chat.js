const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Check if chat is blocked immediately when the script loads
if (localStorage.getItem('chatBlocked') === 'true') {
    disableChat();
    showBlockMessage();
}

function disableChat() {
    userInput.disabled = true;
    sendBtn.disabled = true;
}

function showBlockMessage() {
    chatBox.innerHTML = '';
    const blockMsg = document.createElement('div');
    blockMsg.className = 'block-message visible';
    blockMsg.textContent = "be nicer next time! :'(";
    chatBox.appendChild(blockMsg);
}

function addMessage(message, isUser = false, isError = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user' : 'bot'} ${isError ? 'error' : ''}`;
    
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    msgDiv.innerHTML = `
        <span class="timestamp">[${timestamp}]</span> 
        ${isUser ? 'you' : 'efe'}: ${message}
    `;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <span class="timestamp">[efe@portfolio]</span> typing<span class="typing-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </span>
    `;
    chatBox.appendChild(indicator);
    chatBox.scrollTop = chatBox.scrollHeight;
    return indicator;
}

function handleBlockUser() {
    const container = document.querySelector('.container');
    const amaContainer = document.querySelector('.ama-container');
    
    // Create and add the block overlay
    const blockOverlay = document.createElement('div');
    blockOverlay.className = 'block-overlay visible'; // Add 'visible' class immediately
    const blockMsg = document.createElement('div');
    blockMsg.className = 'block-message';
    blockMsg.textContent = "be nicer next time! :(";
    blockOverlay.appendChild(blockMsg);
    container.appendChild(blockOverlay);

    // Add blocked class to AMA container
    amaContainer.classList.add('blocked');

    // Disable input and button
    userInput.disabled = true;
    sendBtn.disabled = true;

    // Remove block message after 2 seconds
    setTimeout(() => {
        blockOverlay.remove();
        amaContainer.classList.remove('blocked');
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.value = ''; // Clear the input
        userInput.focus();
    }, 2000);
}

function addQAPair(question, answer) {
    const qaList = document.getElementById('qaList');
    
    // Clear previous QA pairs
    qaList.innerHTML = '';
    
    const qaItem = document.createElement('div');
    qaItem.className = 'qa-item';
    qaItem.innerHTML = `
        <div class="question">${question}</div>
        <div class="answer">${answer}</div>
    `;
    
    qaList.appendChild(qaItem);

    // Trigger a cool animation for the new QA pair and scroll to it
    setTimeout(() => {
        qaItem.classList.add('show');
        qaItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 10);
}

async function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        // Disable input and button while processing
        userInput.disabled = true;
        sendBtn.disabled = true;
        userInput.blur(); // Remove focus from the input to hide the keyboard

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.blocked) {
                    handleBlockUser();
                } else {
                    addQAPair(message, data.response);
                    userInput.value = '';
                }
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            const errorResponse = "Sorry, I'm having trouble answering right now. Please try again later.";
            addQAPair(message, errorResponse);
        } finally {
            // Re-enable input and button if not blocked
            if (!document.querySelector('.block-overlay')) {
                userInput.disabled = false;
                sendBtn.disabled = false;
                // Don't focus on the input after sending a message
                // userInput.focus();
            }
        }
    }
}

function shouldBlockMessage(message) {
    const blockWords = ['fuck', 'shit', 'asshole', 'bitch', 'cunt', 'dick', 'pussy', 'nigger', 'faggot'];
    return blockWords.some(word => message.toLowerCase().includes(word));
}

sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Check if chat is blocked on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('chatBlocked') === 'true') {
        disableChat();
        showBlockMessage();
    }
});

function appendMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${isUser ? 'you' : 'satoshi'}: ${message}
        </div>
    `;
    qaList.appendChild(messageDiv);
    qaList.scrollTop = qaList.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <span class="timestamp">[satoshi@bitcoin]</span> typing<span class="typing-dots">...</span>
        </div>
    `;
    qaList.appendChild(typingDiv);
    qaList.scrollTop = qaList.scrollHeight;
}
