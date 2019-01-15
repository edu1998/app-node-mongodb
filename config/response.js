const E_SERVER = (err) => {
    return{
        message:err.message,
        code: 500
    };
}

module.exports = {
    E_SERVER,
}