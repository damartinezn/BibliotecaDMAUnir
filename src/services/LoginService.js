const usuariosLogin = require('../data/dataUsuario.json');

export const consultaLoginUser = (nick, pass, mail) => {
    return usuariosLogin.usuarios.filter(item => item.username === nick
        && item.password === pass
        && item.correo === mail);
}