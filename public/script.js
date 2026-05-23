let socket;
let username;

const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const currentUserSpan = document.getElementById('current-user');

joinBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        initWebSocket();
        loginScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        currentUserSpan.textContent = `Logged in as: ${username}`;
    }
});

function initWebSocket() {
    // Determine the WebSocket URL based on the current page location
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log('Connected to server');
        // Notify others that a user joined
        const joinMsg = {
            type: 'system',
            content: `${username} joined the chat`,
            sender: 'System'
        };
        socket.send(JSON.stringify(joinMsg));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        displayMessage(data);
    };

    socket.onclose = () => {
        console.log('Disconnected from server');
    };
}

function displayMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (data.type === 'system') {
        messageDiv.classList.add('system');
        messageDiv.textContent = data.content;
    } else {
        const isMe = data.sender === username;
        messageDiv.classList.add(isMe ? 'sent' : 'received');

        const senderSpan = document.createElement('span');
        senderSpan.classList.add('sender');
        senderSpan.textContent = isMe ? 'You' : data.sender;
        
        const contentDiv = document.createElement('div');
        contentDiv.textContent = data.content;

        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(contentDiv);
    }

    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function sendMessage() {
    const content = messageInput.value.trim();
    if (content && socket.readyState === WebSocket.OPEN) {
        const msg = {
            type: 'chat',
            content: content,
            sender: username
        };
        socket.send(JSON.stringify(msg));
        messageInput.value = '';
    }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
