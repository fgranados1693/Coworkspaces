'use strict';


let btn_sesion = document.querySelector('#btn-iniciar-sesion');
let btn_registrarse = document.querySelector('#btn-registrarse');

let sesion = localStorage.getItem('sesion');
//console.log(sesion);


if (sesion == 'true') {
    //btn_registrarse.classList.add('registro-off');
    btn_sesion.id = "link-cerrar-sesion";
    btn_sesion.innerHTML = "Cerrar sesión";
    //localStorage.setItem('sesion', false);
    btn_sesion.href = "../";
    //console.log('al menos se ejecuta ind');

    document.getElementById('pefilCont').classList.remove('visually-hidden');

} else {
    //console.log('al menos se ejecuta index');
    btn_registrarse.classList.remove('registro-off');
    btn_sesion.id = "btn-iniciar-sesion";
    btn_sesion.innerHTML = "Iniciar sesión";
    document.getElementById('regCont').classList.remove('visually-hidden');

}


    

if (document.getElementById('link-cerrar-sesion') != null) {
    document.getElementById('link-cerrar-sesion').onclick = function () {

        //Limpiar el local storage.
        localStorage.setItem('correo', '');
        localStorage.setItem('contrasenna', '');
        localStorage.setItem('idUsuario', '');
        localStorage.setItem('sesion', false);
        location.href = '../';
        return false;
    };
}
