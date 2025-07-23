
document.getElementById('send-button').addEventListener('click', async () => {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim() === '') return;

    appendMessage('You', message, 'text-right');
    input.value = '';

    try {
        const response = await axios.post('/functions/api/handler.ts', { message });
        const reply = response.data.reply;
        appendMessage('ChatFlow AI', reply, 'text-left');
    } catch (error) {
        console.error('Error communicating with API:', error);
    }
});

function appendMessage(sender, message, textAlign) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('my-2', 'p-3', 'rounded-lg', textAlign);
    messageElement.style.backgroundColor = textAlign === 'text-right' ? '#50E3C2' : '#4A90E2';
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
