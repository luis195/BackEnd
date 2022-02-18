const socket = io.connect();
function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}
function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}


function addLista(e) {
    const lista = {
        author: document.getElementById('title').value,
        text: document.getElementById('price').value,
        text: document.getElementById('thumb').value
    };
    socket.emit('new-product', lista);
    return false;
}
function renderLista(lista) {
    const html = lista.map((elem, index) => {
        return(`

<div>
<table>
    <tr>
        <th>id</th>
        <th>nombre</th>
        <th>precio</th>
        <th>imagen</th>
    </tr> 
    <tr>
        <th>1</th>
        <th>${elem.title}</th>
        <th>${elem.price}</th>
        <th>${elem.thumbnail}</th>
</tr>
</div>`)
    }).join(" ");
    document.getElementById('listas').innerHTML = html;
}

socket.on('mensajes', function(data) { render(data); });
socket.on('listas', function(datos) { renderLista(datos); });
