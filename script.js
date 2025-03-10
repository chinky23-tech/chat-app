const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add a message to the chat
function addMessage(sender, message, timestamp) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <div class="sender">${sender}</div>
    <div class="text">${message}</div>
    <div class="timestamp">${timestamp}</div>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
}

// Send message
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    const timestamp = new Date().toLocaleTimeString();
    db.collection('messages').add({
      sender: 'User', // Replace with a dynamic username if needed
      message: message,
      timestamp: timestamp
    });
    messageInput.value = '';
  }
});

// Receive messages in real-time
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
  chatMessages.innerHTML = ''; // Clear previous messages
  snapshot.forEach(doc => {
    const data = doc.data();
    addMessage(data.sender, data.message, data.timestamp);
  });
});