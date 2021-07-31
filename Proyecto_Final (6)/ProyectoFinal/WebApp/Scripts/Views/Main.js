"use strict";

let ctrlActions = new ControlActions();

//PERMITE GUARDAR ARRAYS Y OBJETOS EN LOCALSTORAGE
Storage.prototype.setObj = function (key, obj) {

    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let id_usuario = localStorage.getItem('sesion');

let btn_carrito = document.getElementById("carrito-btn");

let contador_carrito;

let total_carrito;
let cnt_inferio_carrito;
let btn_pagar;

let reservas_cargadas = false;

let perfil_espacio_reservas = [];
let reservas_local_storage_main = localStorage.getObj('reservas');//CAMBIAR EL FOR DEL LOAD() POR ESTA VARIABLE
//console.log(new Date().toISOString().slice(0, 10));

let reserva_template2 = {
    Id_Usuario: "1",
    Id_Espacio: "12",
    Nombre_Espacio: "Lab 4",
    Fecha: new Date().toISOString().slice(0, 10),
    Hora_Entrada: "10:00",
    Hora_Salida: "20:00",
    Calificacion_Usuario: "0",
    Calificacion_Propietario: "0",
    Calificacion_Propiedad: "0",
    Monto: "6000",
    Estado: "x"
};

let reserva_template3 = {
    Id_Usuario: "1",
    Id_Espacio: "13",
    Nombre_Espacio: "Cocina master",
    Fecha: new Date().toISOString().slice(0, 10),
    Hora_Entrada: "8:00",
    Hora_Salida: "16:00",
    Calificacion_Usuario: "0",
    Calificacion_Propietario: "0",
    Calificacion_Propiedad: "0",
    Monto: "8000",
    Estado: "x"
};
//reservas_usuario.push(reserva_template2,reserva_template3);


function load() {
    
    
}

//CARRITO DE RESERVAS
$(document).ready(function () {
    //console.log('si se ejecuta 1');
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        localStorage.setItem('sesion', false);
        localStorage.setItem("hasCodeRunBefore", true);
        //console.log('si se ejecuta');
    }
    if (document.getElementById('btn-iniciar-sesion') !== null) {
        document.getElementById('btn-iniciar-sesion').onclick = function () {
            localStorage.setItem('sesionReservaUsuario', 0);
        }
    }
    //CARGA LAS RESERVAS DEL LOCAL STORAGE
    if (reservas_local_storage_main != null) {
        for (var i = 0; i < reservas_local_storage_main.length; i++) {
            console.log(reservas_local_storage_main[i]);
            perfil_espacio_reservas.push(reservas_local_storage_main[i]);
        }
    }
    

    cnt_inferio_carrito = document.getElementsByClassName("cnt-inferior-tabla-carrito")[0];
    contador_carrito = document.getElementById("contador-carrito");
    btn_pagar = document.getElementById("btn-checkout");
    //console.log(contador_carrito);

    //CUANDO SE DA CLICK EN EL BOTON DE PAGAR SE VERIFICA SI HAY RESERVAS PARA GUARDARLAS EN LOCALSTORAGE Y CAMBIAR A LA VISTA DE PAGO
    btn_pagar.onclick = function () {
        if (perfil_espacio_reservas.length != 0) {
            //VALIDA SI EL USUARIO YA INICIO SESION
            if (localStorage.getItem('sesion') == "true") {
                localStorage.setObj('reservas', perfil_espacio_reservas);
                if (window.location.href.indexOf("Home") > -1) {
                    window.location.href = "PagarReserva";
                } else {
                    window.location.href = "Home/PagarReserva";
                }
                localStorage.setItem('sesionReservaUsuario', 0);
            } else {
                //REDIRIGE A INICIAR SESION
                localStorage.setObj('reservas', perfil_espacio_reservas);
                localStorage.setItem('sesionReservaUsuario', 1);
                window.location.href = "Home/vIniciarSesion";
            }
        } else {

        }
    };


    //ESCONDE EL TOTAL Y EL BOTON DE RESERVAS SI NO HAY NINGUNA RESERVA EN EL CARRITO
    if (perfil_espacio_reservas.length == 0) {
        $(cnt_inferio_carrito).hide();
    } else {
        $(cnt_inferio_carrito).show();
    }

    contador_carrito.innerHTML = perfil_espacio_reservas.length;

    total_carrito = document.getElementById("total-carrito");
    // CAJA DE CARRITO
    var modal = document.getElementById("myModal");

    // ICONO DE CARRITO
    var carrito = document.getElementById("carrito-btn");

    // ELEMENTO span QUE CIERRA LA CAJA DEL CARRITO
    var cerrarCarrito = document.getElementsByClassName("close")[0];


    agregarReservaCarrito();
    console.log("carga aqui");
    reservas_cargadas = true;

    // CUANDO SE SELECCIONE EL CARRITO, ABRIR LA CAJA
    carrito.onclick = function () {
        console.log(reservas_cargadas);
        if (reservas_cargadas == false) {
            agregarReservaCarrito();
        }
        modal.style.display = "block";
    }

    // CUANDO SE APRITE LA X, SE CIERRA LA CAJA
    cerrarCarrito.onclick = function () {
        modal.style.display = "none";
    }

    // CUANDO SE PRESIONE EN CUALQUIER LUGAR FUERA DE LA CAJA, CERRARLA
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


//CARGA LA TABLA CON LA(S) RESERVA(S)
function agregarReservaCarrito() {
    let subtotal_reservas = 0;
    if (perfil_espacio_reservas.length != 0) {
        
        for (var i = 0; i < perfil_espacio_reservas.length; i++) {
            
            subtotal_reservas += parseFloat(perfil_espacio_reservas[i]['Monto']);
            total_carrito.innerHTML = subtotal_reservas;

            var tr = document.createElement("tr");
            var espacio = document.createElement("td");
            var fecha = document.createElement("td");
            var hora_entrada = document.createElement("td");
            var hora_salida = document.createElement("td");
            var subtotal = document.createElement("td");
            var eliminar = document.createElement("td");

            espacio.appendChild(document.createTextNode(perfil_espacio_reservas[i]['Nombre_Espacio']));
            fecha.appendChild(document.createTextNode(perfil_espacio_reservas[i]['Fecha']));
            hora_entrada.appendChild(document.createTextNode(perfil_espacio_reservas[i]['Hora_Entrada']));
            hora_salida.appendChild(document.createTextNode(perfil_espacio_reservas[i]['Hora_Salida']));
            subtotal.appendChild(document.createTextNode(perfil_espacio_reservas[i]['Monto']));

            var aEliminar = document.createElement("a");
            aEliminar.href = "#";
            aEliminar.className = "EliminarReserva";
            aEliminar.id = "Eliminar_" + perfil_espacio_reservas[i]['Nombre_Espacio'];
            //aEliminar.addEventListener('click', eliminarReserva);
            var iconEliminar = document.createElement("i");
            iconEliminar.classList.add("fas");
            iconEliminar.classList.add("fa-trash-alt");
            iconEliminar.classList.add("edit");
            iconEliminar.id = perfil_espacio_reservas[i]['Id_Espacio'];
            aEliminar.appendChild(iconEliminar);
            eliminar.appendChild(aEliminar);

            //SE AGREGAN A LAS CELDAS
            tr.appendChild(espacio);
            tr.appendChild(fecha);
            tr.appendChild(hora_entrada);
            tr.appendChild(hora_salida);
            tr.appendChild(subtotal);
            tr.appendChild(eliminar);

            document.getElementById("tblBodyCarrito").appendChild(tr);
        }
    } else {
        subtotal_reservas = 0;
        total_carrito.innerHTML = subtotal_reservas;
        //ESCONDE EL TOTAL Y EL BOTON DE RESERVAS SI NO HAY NINGUNA RESERVA EN EL CARRITO
        if (perfil_espacio_reservas.length == 0) {
            $(cnt_inferio_carrito).hide();
            //ctrlActions.ShowMessage('I', 'No hay reservas agregadas')
        } else {
            $(cnt_inferio_carrito).show();
        }
        
    }
}

function limpiarCarrito() {
    //ELIMINA TODAS LAS FILAS DE LA TABLA MENOS LOS TITULOS
    $("#tblCarrito tr").remove(); 
}

//EVENTO DE CLICK EN UN BOTON PARA ELIMINAR UNA RESERVA
$(document).on('click', 'a', function () {
    //alert(this.id);
    //alert(this.href);
    if (this.className == "EliminarReserva") {
        for (var i = 0; i < perfil_espacio_reservas.length; i++) {
            let posibleIdAnchor = "Eliminar_" + perfil_espacio_reservas[i]["Nombre_Espacio"];
            if (this.id == posibleIdAnchor) {
                perfil_espacio_reservas.splice(perfil_espacio_reservas.indexOf(perfil_espacio_reservas[i]), 1);
                console.log(perfil_espacio_reservas);

                localStorage.setObj('reservas', perfil_espacio_reservas);
                //SE ACTUALIZA LA TABLA
                limpiarCarrito();
                agregarReservaCarrito();
                contador_carrito.innerHTML = perfil_espacio_reservas.length;
                break;
            }
        }
    }
});

