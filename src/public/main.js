const _socket = io();
const ID = Math.floor(Math.random() * 101);

let __WIDTH__ = document.documentElement.clientWidth //window.innerWidth;
let __HEIGHT__ = document.documentElement.clientHeight //window.innerHeight;

document.querySelector('body').onload = () => {
    document.querySelector('body').style.width = __WIDTH__ + 'px';
    document.querySelector('body').style.height = __HEIGHT__ + 'px';
    if (localStorage.getItem('last_message') !== null) {
        const message_element = document.querySelector('.last-sended');
        message_element.innerHTML = localStorage.getItem('last_message');
    }
}

function sendMessage() {
    const message = document.querySelector('#message').value;
    if (message.length === 0) return;
    const message_element = document.querySelector('.last-sended');

    const message_Self = `(Tú) > ${message}`;
    const message_Other = `(Pareja) > ${message}`;
    
    message_element.innerHTML = message_Self;
    
    localStorage.setItem('last_message', message_Other);

    _socket.emit('chat:message', { message: message_Other, id: ID });
    document.querySelector('#message').value = '';
}

_socket.on('chat:message_recieve', (data) => {
    if (data.id !== ID) {
        localStorage.setItem('last_message', data.message);
        const message_element = document.querySelector('.last-sended');
        message_element.innerHTML = data.message;
    }
});