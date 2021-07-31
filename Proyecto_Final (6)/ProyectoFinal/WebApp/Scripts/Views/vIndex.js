'use strict';

let link_sesion = document.querySelector('#btn-iniciar-sesion');
let link_registrarse = document.querySelector('#btn-registrarse');
let link_perfil = document.querySelector('#hidden-profile-link');

//console.log(sesion);



if (localStorage.getItem('sesion') == 'true') {

    link_perfil.classList.remove('hide-profile');

    link_registrarse.classList.add('registro-off');
    link_sesion.id = "link-cerrar-sesion";
    link_sesion.innerHTML = "Cerrar sesión";
    localStorage.setItem('sesion', false);
    link_sesion.href = "../";
    //console.log('al menos se ejecuta ind');
} else {
    //console.log('al menos se ejecuta index');
    link_perfil.classList.add('hide-profile');

    link_registrarse.classList.remove('registro-off');
    link_sesion.id = "btn-iniciar-sesion";
    link_sesion.innerHTML = "Iniciar sesión";
}

if (document.getElementById('link-cerrar-sesion') != null) {
    document.getElementById('link-cerrar-sesion').onclick = function () {

        //Limpiar el local storage.
        localStorage.setItem('correo', '');
        localStorage.setItem('contrasenna', '');
        localStorage.setItem('sesion', false);
        location.reload();
        return false;
    };
}
