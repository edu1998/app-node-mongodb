const disconnect = (client) => {

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    })
}

const mensaje = (client, io) => {
    client.on('mensaje-emit', (data) => {
        console.log('esto es lo que se emite desde el cliente', data);

        io.emit('registro', data);
    })
}

module.exports = {
    disconnect,
    mensaje
}