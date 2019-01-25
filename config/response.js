const E_SERVER = (err) => {
    return {
        message: err.message,
        code: 500
    };
}

const OK_SERVER = (result) => {
    return {
        message: "succes execute",
        code: 200,
        data: result
    }
}

module.exports = {
    E_SERVER,
    OK_SERVER
}