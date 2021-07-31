let propiedadEspacio = document.getElementById('Propiedad');
let nombre_espacio = document.getElementById('Nombre');
let precio = document.getElementById('Precio');
let reembolso = document.getElementById('Permite_Reembolso');
let cancelacion = document.getElementById('Permite_Cancelacion');
let tiempoReserva = document.getElementById('Tiempo_Reserva');
let hora_inicio = document.getElementById('Hora_Inicio');
let hora_fin = document.getElementById('Hora_Fin');

let idEspacioPerfil = localStorage.getItem('idEspacioPerfil');
let usuario_logeado = localStorage.getItem('idUsuario');

var diaSeleccionado = "";
var horaEntradaSeleccionada = "";

let nombreEspacioCarta;
let precioCarta;
let reservas_cargadas_perfil;
let contador_carrito_perfil;
let total_carrito_perfil;

let currentDateElement;
let currentDayElement;
let currentToDateString;

//PERMITE GUARDAR ARRAYS Y OBJETOS EN LOCALSTORAGE
Storage.prototype.setObj = function (key, obj) {

    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}
var modalCarrito;

// ICONO DE CARRITO
var carritoPerfil;

// ELEMENTO span QUE CIERRA LA CAJA DEL CARRITO
var cerrarCarritoPerfil;

//let reservas_perfil_espacio = localStorage.getObj('reservas');

var weekday = new Array(7);
weekday[0] = "Domingo";
weekday[1] = "Lunes";
weekday[2] = "Martes";
weekday[3] = "Miércoles";
weekday[4] = "Jueves";
weekday[5] = "Viernes";
weekday[6] = "Sábado";

//BOTON ESPACIO RESERVA
function vPerfilEspacio() {
    this.ctrlActions = new ControlActions();
    this.Reservar = function () {
        var datetime = currentDateElement.getFullYear() + '-' + (currentDateElement.getMonth() + 1) + '-' + currentDateElement.getDate();
        let reserva = {
            Id_Usuario: usuario_logeado,
            Id_Espacio: idEspacioPerfil,
            Nombre_Espacio: nombreEspacioCarta,
            Fecha: datetime,
            Hora_Entrada: document.getElementById('selectHorarioEntrada').options[document.getElementById('selectHorarioEntrada').selectedIndex].text,
            Hora_Salida: document.getElementById('selectHorarioSalida').options[document.getElementById('selectHorarioSalida').selectedIndex].text,
            Calificacion_Usuario: "0",
            Calificacion_Propietario: "0",
            Calificacion_Propiedad: "0",
            Monto: precioCarta,
            Estado: "en curso"
        }
        //PRIMERO HAY QUE REVISAR SI HAY MAS RESERVAS
        let reservas_local = localStorage.getObj('reservas');

        if (reservas_local != null) {
            console.log('habian reservas');
            reservas_local.push(reserva);
            localStorage.setObj('reservas', reservas_local);
        } else {
            console.log("reserva nueva");
            let reserva_nueva = [];
            reserva_nueva.push(reserva);
            localStorage.setObj('reservas', reserva_nueva);
        }
        this.ctrlActions.ShowMessageDivPersonalizado('I', "Reserva añadida al carrito exitosamente");
        console.log("Se reservó");
        console.log(localStorage.getObj('reservas'));

        //console.log(reservas_cargadas_perfil);
        
        agregarReservaCarrito(localStorage.getObj('reservas'));
        reservas_cargadas_perfil = true;
        
        document.getElementById("myModal").style.display = "block";

    }

}

$(document).ready(function () {
    //BTN PAGAR CARRITO
    document.getElementById("btn-checkout").onclick = function () {
        if (localStorage.getObj('reservas') != 0) {
            //VALIDA SI EL USUARIO YA INICIO SESION
            if (localStorage.getItem('sesion') == "true") {
                localStorage.setObj('reservas', localStorage.getObj('reservas'));
                window.location.href = "PagarReserva";
                localStorage.setItem('sesionReservaUsuario', 0);
            } else {
                //REDIRIGE A INICIAR SESION
                localStorage.setObj('reservas', localStorage.getObj('reservas'));
                localStorage.setItem('sesionReservaUsuario', 1);
                window.location.href = "vIniciarSesion";
            }
        } else {

        }
    };
});

//CONTINUACION CARRITO
//CARGA LA TABLA CON LA(S) RESERVA(S)
function agregarReservaCarrito(reservas_perfil_espacio) {
    let subtotal_reservas_perfil = 0;
    if (reservas_perfil_espacio != null) {

        for (var i = 0; i < reservas_perfil_espacio.length; i++) {

            subtotal_reservas_perfil += parseFloat(reservas_perfil_espacio[i]['Monto']);
            document.getElementById("total-carrito").innerHTML = subtotal_reservas_perfil;

            var tr = document.createElement("tr");
            var espacio = document.createElement("td");
            var fecha = document.createElement("td");
            var hora_entrada = document.createElement("td");
            var hora_salida = document.createElement("td");
            var subtotal = document.createElement("td");
            var eliminar = document.createElement("td");

            espacio.appendChild(document.createTextNode(reservas_perfil_espacio[i]['Nombre_Espacio']));
            fecha.appendChild(document.createTextNode(reservas_perfil_espacio[i]['Fecha']));
            hora_entrada.appendChild(document.createTextNode(reservas_perfil_espacio[i]['Hora_Entrada']));
            hora_salida.appendChild(document.createTextNode(reservas_perfil_espacio[i]['Hora_Salida']));
            subtotal.appendChild(document.createTextNode(reservas_perfil_espacio[i]['Monto']));

            var aEliminar = document.createElement("a");
            aEliminar.href = "#";
            aEliminar.className = "EliminarReserva";
            aEliminar.id = "Eliminar_" + reservas_perfil_espacio[i]['Nombre_Espacio'];
            //aEliminar.addEventListener('click', eliminarReserva);
            var iconEliminar = document.createElement("i");
            iconEliminar.classList.add("fas");
            iconEliminar.classList.add("fa-trash-alt");
            iconEliminar.classList.add("edit");
            iconEliminar.id = reservas_perfil_espacio[i]['Id_Espacio'];
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
            $(document.getElementsByClassName("cnt-inferior-tabla-carrito")[0]).show();
            console.log(reservas_perfil_espacio);
            console.log(document.getElementsByClassName("cnt-inferior-tabla-carrito")[0]);
        }
    } else {
        subtotal_reservas_perfil = 0;
        document.getElementById("total-carrito").innerHTML = subtotal_reservas_perfil;
        //ESCONDE EL TOTAL Y EL BOTON DE RESERVAS SI NO HAY NINGUNA RESERVA EN EL CARRITO
        console.log(reservas_perfil_espacio);
        console.log(document.getElementsByClassName("cnt-inferior-tabla-carrito")[0]);
        if (reservas_perfil_espacio != null) {
            if (reservas_perfil_espacio.length == 0) {
                $(document.getElementsByClassName("cnt-inferior-tabla-carrito")[0]).hide();
            } else {
                $(document.getElementsByClassName("cnt-inferior-tabla-carrito")[0]).show();
            }
        }
        //ctrlActions.ShowMessage('I', 'No hay reservas agregadas')
    }
}





const myCalender = new CalendarPicker('#myCalendarWrapper', {
    min: new Date(),
    max: new Date(2021, 8)
});


myCalender.onValueChange((currentValue) => {
    currentDateElement = currentValue;   
    console.log(currentDateElement);
    currentDayElement = currentValue.getDay();
    console.log(currentDayElement);
    diaSeleccionado = weekday[currentDayElement];
    llenarSelectEntrada('#selectHorarioEntrada');
})

// funcion que obtiene todos los horarios del espacio seleccionado
async function getHorarios() {

    var result = await fetch('https://localhost:44302/api/horario?idEspacio=' + idEspacioPerfil, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];
}

// funcion que obtiene todos las reservaciones del espacio seleccionado
async function getReservacionesEspacio() {

    var result = await fetch('https://localhost:44302/api/reservacion?idEspacio=' + idEspacioPerfil, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];
}

// funcion para comprar el horario de acuerdo al dia seleccionado
async function obtenerHorario() {

    var horarios = await getHorarios();
    var horario_inicio;
    var horario_final;

    for (i in horarios) {

        if (horarios[i]['Dia_Semana'] == diaSeleccionado) {

            horario_inicio = horarios[i]['Hora_Inicio'];
            horario_final = horarios[i]['Hora_Fin'];
        }
    }
    return [horario_inicio, horario_final];
}

async function splitHorario() {

    var horarioEspacio = await obtenerHorario();
    var horarioInicio = horarioEspacio[0];
    var horarioFinal = horarioEspacio[1];

    arrInicio = horarioInicio.split(':');
    horaInicio = $.trim(arrInicio[0]);
    minInicio = $.trim(arrInicio[1]);

    arrFinal = horarioFinal.split(':')
    horaFinal = $.trim(arrFinal[0]);
    minFinal = $.trim(arrFinal[1]);

    return [horaInicio, minInicio, horaFinal, minFinal];
}

// funcion para establecer los horarios de entrada disponibles
async function obtenerHorasEntrada() {

    var arrayHorarioEntrada = [];

    var arrayTiempo = await splitHorario();
    var strHoraInicio = arrayTiempo[0];
    var strMinutosInicio = arrayTiempo[1];
    var strHoraFinal = arrayTiempo[2];

    horaInicio = parseInt(strHoraInicio);
    minutosInicio = parseInt(strMinutosInicio);
    horaFinal = parseInt(strHoraFinal);

    var string = localStorage.getItem('tiempoReservacion');
    var tiempoMinReservacion = parseInt(string);

    var desde = (horaInicio + minutosInicio) * 60;
    var hasta = (horaFinal * 60) - tiempoMinReservacion;

    for (var i = desde; i <= hasta; i += tiempoMinReservacion) {
        horas = Math.floor(i / 60);
        minutos = i % 60;

        if (minutos < 10) {
            minutos = '0' + minutos;
        }
        if (horas < 10) {
            horas = '0' + horas;
        }
        arrayHorarioEntrada.push(horas + ':' + minutos);        
    }
    return arrayHorarioEntrada;
}

// Funcion que cambia la fecha seleccionada al formato YYYY-MM-DD
async function cambiarFecha() {

    var fechaSeleccionada;

    if (currentDateElement.getDate() > 10 && currentDateElement.getMonth() < 10) {
        fechaSeleccionada = currentDateElement.getFullYear() + '-' + '0' + 
            (currentDateElement.getMonth() + 1) + '-' + currentDateElement.getDate();
    }
    
    if (currentDateElement.getDate() < 10 && currentDateElement.getMonth() > 10){
        fechaSeleccionada = currentDateElement.getFullYear() + '-' +
            (currentDateElement.getMonth() + 1) + '-' + '0'+ currentDateElement.getDate();
    }
    
    if (currentDateElement.getDate() < 10 && currentDateElement.getMonth() < 10) {
        fechaSeleccionada = currentDateElement.getFullYear() + '-'  + '0' +
            (currentDateElement.getMonth() + 1) + '-' + '0' + currentDateElement.getDate();
    }
    if (currentDateElement.getDate() > 10 && currentDateElement.getMonth() > 10) {
        fechaSeleccionada = currentDateElement.getFullYear() + '-' +
            (currentDateElement.getMonth() + 1) + '-' + currentDateElement.getDate();
    }
    return fechaSeleccionada;    
}

// funcion que retorna un arreglo con las reservaciones
async function obtenerReservacion() {

    var reservaciones = await getReservacionesEspacio();
    fechaSeleccionada = await cambiarFecha();
    var arrayReservaciones = [];
    var string = localStorage.getItem('tiempoReservacion');
    var tiempoMinReservacion = parseInt(string);

    for (i in reservaciones) {

        var fecha = reservaciones[i]['Fecha'];
        fechaReservacion = fecha.substring(0, 10);

        if (fechaReservacion == fechaSeleccionada) {

            var hora_inicio_reserva = reservaciones[i]['Hora_Entrada'];
            var horaInicioReserva = hora_inicio_reserva.substring(0, 5);
            var hora_salida_reserva = reservaciones[i]['Hora_Salida'];
            var horaSalidaReserva = hora_salida_reserva.substring(0, 5);

            var strHoraInicio = horaInicioReserva.substring(0, 2);
            var horaInicio = parseInt(strHoraInicio);
            var strMinInicio = horaInicioReserva.substring(3, 5);
            var minutosInicio = parseInt(strMinInicio);

            var strHoraSalida = hora_salida_reserva.substring(0, 2);
            var horaFinal = parseInt(strHoraSalida);

            var desde = (horaInicio + minutosInicio) * 60;
            var hasta = (horaFinal * 60) - tiempoMinReservacion;

            for (var i = desde; i <= hasta; i += tiempoMinReservacion) {
                horas = Math.floor(i / 60);
                minutos = i % 60;
                if (minutos < 10) {
                    minutos = '0' + minutos;
                }
                if (horas < 10) {
                    horas = '0' + horas;
                }
                arrayReservaciones.push(horas + ':' + minutos);
            }
            arrayReservaciones.push(horaInicioReserva, horaSalidaReserva);
        }       
    }
    return arrayReservaciones;    
}

// funcion que compara el arreglo de horarios con el arreglo de reservaciones
// elimina las coincidencias
async function compararHorarioReservaciones() {

    var arrayHorario = await obtenerHorasEntrada();
    var arrayReservaciones = await obtenerReservacion();
    var arrayHorariosDisponibles = [];

    for (var i = 0; i < arrayHorario.length; i++) {
        var igual = false;
        for (var j = 0; j < arrayReservaciones.length & !igual; j++) {
            if (arrayHorario[i] == arrayReservaciones[j])
                igual = true;
        }
        if (!igual) arrayHorariosDisponibles.push(arrayHorario[i]);
    }    
    return arrayHorariosDisponibles;
}

document.getElementById('selectHorarioEntrada').addEventListener('change', function () {

    horaEntradaSeleccionada = document.getElementById('selectHorarioEntrada').value;
    console.log(horaEntradaSeleccionada);  
    llenarSelectSalida('#selectHorarioSalida');
});

async function obtenerHorarioSalida() {

    var reservaciones = await getReservacionesEspacio();
    fechaSeleccionada = await cambiarFecha();
    var arrayHorarioSalida = [];
    var string = localStorage.getItem('tiempoReservacion');
    var tiempoMinReservacion = parseInt(string);
    var valorMin = await obtenerMinutosMin();

    var horaEntrada = horaEntradaSeleccionada;
    console.log(horaEntradaSeleccionada);
    var strHoraSeleccionada = horaEntrada.substring(0, 2);
    var horaSeleccionada = parseInt(strHoraSeleccionada);
    var strMinSeleccionados = horaEntrada.substring(3, 5);
    var minutosSeleccionados = parseInt(strMinSeleccionados);

    var desde = (horaSeleccionada * 60) + minutosSeleccionados + tiempoMinReservacion;
    var hasta = valorMin;

    var arrayTiempo = await splitHorario();
    var strHoraFinal = arrayTiempo[2];
    horaFinal = parseInt(strHoraFinal);

    var hastaHorarioCompleto = (horaFinal * 60);

    var hayReserva = false;

    if (valorMin != 0) {

        for (i in reservaciones) {

            var fecha = reservaciones[i]['Fecha'];
            fechaReservacion = fecha.substring(0, 10);

            if (fechaReservacion == fechaSeleccionada) {

                hayReserva = true;

                for (var i = desde; i <= hasta; i += tiempoMinReservacion) {
                    horas = Math.floor(i / 60);
                    minutos = i % 60;
                    if (minutos < 10) {
                        minutos = '0' + minutos;
                    }
                    if (horas < 10) {
                        horas = '0' + horas;
                    }

                    arrayHorarioSalida.push(horas + ':' + minutos);
                }
            }
        }
    }

    if(!hayReserva) {

        for (var i = desde; i <= hastaHorarioCompleto; i += tiempoMinReservacion) {
            horas = Math.floor(i / 60);
            minutos = i % 60;
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            if (horas < 10) {
                horas = '0' + horas;
            }

            arrayHorarioSalida.push(horas + ':' + minutos);
        }
    }

    return arrayHorarioSalida;
}

// funcion que retorna la cantidad en minutos del inicio de la 
// siguiente reservacion

async function obtenerMinutosMin() {
    var valorMin = 0;
    var reservaciones = await getReservacionesEspacio();
    var horaEntrada = horaEntradaSeleccionada;
    var strHoraSeleccionada = horaEntrada.substring(0, 2);
    var horaSeleccionada = parseInt(strHoraSeleccionada);
    var strMinSeleccionados = horaEntrada.substring(3, 5);
    var minutosSeleccionados = parseInt(strMinSeleccionados);
    var arrayReservaciones = [];

    var minutosTotalesSeleccionados = horaSeleccionada * 60 + minutosSeleccionados;

    for (i in reservaciones) {
        var fecha = reservaciones[i]['Fecha'];
        fechaReservacion = fecha.substring(0, 10);

        if (fechaReservacion == fechaSeleccionada) {

            var hora_inicio_reserva = reservaciones[i]['Hora_Entrada'];
            var horaInicioReserva = hora_inicio_reserva.substring(0, 5);

            var strHoraInicio = horaInicioReserva.substring(0, 2);
            var horaInicio = parseInt(strHoraInicio);
            var strMinInicio = horaInicioReserva.substring(3, 5);
            var minutosInicio = parseInt(strMinInicio);

            var minutosInicioReservacion = horaInicio * 60 + minutosInicio;

            if (minutosInicioReservacion > minutosTotalesSeleccionados) {
                arrayReservaciones.push(minutosInicioReservacion);
                valorMin = Math.min.apply(null, arrayReservaciones);
            }
        }
    }

    return valorMin;
}

// funcion que llena el select con los horarios de salida disponibles
async function llenarSelectSalida(selector) {

    $('#selectHorarioSalida')
        .find('option')
        .remove()
        .end()
        .append('<option value="0">Horario de salida</option>')
        .val('0');

    var selectHoraSalida = $(selector);
    var arrayHorariosDisponiblesSalida = await obtenerHorarioSalida();

    for (var i = 0; i < arrayHorariosDisponiblesSalida.length; i++) {
        selectHoraSalida.append($('<option></option>')
            .attr('value', arrayHorariosDisponiblesSalida[i])
            .text(arrayHorariosDisponiblesSalida[i]));
        selectHoraSalida.removeAttr()
    }
}

// funcion que llena el select con los horarios de entrada disponibles
async function llenarSelectEntrada(selector) {

    $('#selectHorarioEntrada')
        .find('option')
        .remove()
        .end()
        .append('<option value="0">Horario de entrada</option>')
        .val('0');

    $('#selectHorarioSalida')
        .find('option')
        .remove()
        .end()
        .append('<option value="0">Horario de salida</option>')
        .val('0');

    var selectHoraInicio = $(selector);
    var arrayHorariosDisponibles = await compararHorarioReservaciones();

    for (var i = 0; i < arrayHorariosDisponibles.length; i++) {
        selectHoraInicio.append($('<option></option>')
            .attr('value', arrayHorariosDisponibles[i])
            .text(arrayHorariosDisponibles[i]));
        selectHoraInicio.removeAttr()
    }
}

$(document).ready(async function () {
    this.ctrlActions = new ControlActions();
    this.service = "espacio";
    this.serviceFoto = "documento";
    this.serviceFotoEspacio = "documentoespacio";
    let id_espacio_seleccionado = localStorage.getItem('idEspacioPerfil');

    let ctrlActions = new ControlActions();
    //CARGA EL FORM
    let serviceEspacio = "espacio/" + id_espacio_seleccionado;
    let espacio = ctrlActions.GetToApiFuncional(serviceEspacio);
    //OBTENER LAS FOTOS
    let fotos = this.ctrlActions.GetToApiFuncional(this.serviceFoto);
    let fotosEspacio = this.ctrlActions.GetToApiFuncional(this.serviceFotoEspacio);
    //console.log(fotos);
    let fotosCar = [];
    let fotoObj = {
        src: '',
        alt: 'No se puede cargar la imagen'
    }
    //console.log(fotos, fotosEspacio);
    //BUSCA LA FOTO RECIEN CREADA
    let carousel_indicators = document.getElementsByClassName('carousel-indicators')[0];
    let carousel_inner = document.getElementsByClassName('carousel-inner')[0];
    let contador_fotos = 0;
    Array.from(fotos.Data).forEach(foto => {
        Array.from(fotosEspacio.Data).forEach(fotoEsp => {
            //COMPARA EN DOCUMENTOS_ESPACIO SI ES EL MISMO ESPACIO
            if (fotoEsp.Id_Espacio == espacio.Data.Id_Espacio) {
                //console.log("Primera comparación");
                //COMPARA SI LA FOTO ES DEL ESPACIO
                if (foto.Id_Documento == fotoEsp.Id_Documento) {
                    //let img = document.getElementById('img-cnt');
                    //img.src = foto.URL;
                    /*
                    let list = document.createElement('li');
                    if (contador_fotos == 0) {
                        //list.className = "active";
                    }
                    list.setAttribute('data-target', '#carouselPerfilEspacio');
                    list.setAttribute('data-slide-to', contador_fotos);
                    
                    carousel_indicators.appendChild(list);
                        */

                    let div_item = document.createElement('div');
                    if (contador_fotos == 0) {
                        div_item.className = "carousel-item  active";
                    } else {
                        div_item.className = "carousel-item";
                    }
                    let imgEspacio = document.createElement('img');
                    imgEspacio.src = foto.URL;
                    //imgEspacio.className = "d-block";
                    imgEspacio.style = "width: 100%; height: 100%";
                    imgEspacio.alt = "Foto espacio";

                    div_item.appendChild(imgEspacio);
                    carousel_inner.appendChild(div_item);

                    contador_fotos++;
                    
                }
            }
        });
    });
    /*
    <div id="myCarousel" class="my-carousel center-block" tabindex="1">
        <p>This code requires JavaScript, please enable it.</p>
    </div>*/
    //$('#myCarousel').carouselize(fotosCar, true, 3000);

    /*
    for (let j = 0; j < 5; j++) {
        $('<div class="carousel-item"><img src="https://loremflickr.com/320/240" width="50%">   </div>').appendTo('.carousel-inner');
        $('<li data-target="#carousel" data-slide-to="' + j + '"></li>').appendTo('.carousel-indicators')
        
        $('<div class="carousel-item"><img'+ 
          'src = "'+fotosCar[j]+'" width = "50%" >'+   
          '</div > '+').appendTo('+'.carousel - inner'+');'+
        $('<li data-target="#carousel" data-slide-to="' + j + '">'+ 
          '</li>'+').appendTo('+'.carousel - indicators'+')'
          
    } 

    $('.carousel-item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel').carousel();
    */


    let idPropiedadEspacio = espacio.Data.Id_Propiedad;

    let servicePropiedad = "propiedad/" + idPropiedadEspacio;
    let nomPropiedad = ctrlActions.GetToApiFuncional(servicePropiedad);
    Array.from(nomPropiedad.Data).forEach(propiedadArray => {
        //console.log(propiedadArray, espacio.Data);
        //console.log(espacio);
        if (propiedadArray.IdPropiedad == espacio.Data.Id_Propiedad) {
            //console.log(propiedadArray);
            propiedadEspacio.innerHTML = "Propiedad: " + propiedadArray.Nombre;
        }
    });

    nombreEspacioCarta = espacio.Data.Nombre;
    nombre_espacio.innerHTML = "Nombre: " + espacio.Data.Nombre;
    precioCarta = espacio.Data.Precio;
    precio.innerHTML = "Precio: " + espacio.Data.Precio;
    //CANCELACION
    if (espacio.Data.Permite_Cancelacion == "true") {
        cancelacion.innerHTML = "Permite cancelación: Sí";
    } else if (espacio.Data.Permite_Cancelacion == "false") {
        cancelacion.innerHTML = "Permite cancelación: No";
    }

    //REEMBOLSO
    if (espacio.Data.Permite_Reembolso == "true") {
        reembolso.innerHTML = "Permite cancelación: Sí";
    } else if (espacio.Data.Permite_Reembolso == "false") {
        reembolso.innerHTML = "Permite cancelación: No";
    }

    tiempoReserva.innerHTML = "Tiempo reserva: " + espacio.Data.Tiempo_Minimo_Reservacion;
    localStorage.setItem('tiempoReservacion', espacio.Data.Tiempo_Minimo_Reservacion);


    //CARGAR LAS CARACTERÍSTICAS
    this.serviceCaracteristicas = 'caracteristicaespacio/caracteristicaespacio?idEspacio=' + id_espacio_seleccionado;
    let caracteristicas = this.ctrlActions.GetToApiFuncional(this.serviceCaracteristicas);
    Array.from(caracteristicas.Data).forEach(caract => {
        /*let info = '<p>' + caract.Nombre + '</p><br /><p>' + caract.Descripcion + '</p><br />';
        div_caract.appendChild(info);*/
        let main_div_caract = document.getElementById("div-caracteristicas");

        let divCaract = document.createElement('div');
        divCaract.id = "div-caract";

        let nombre = document.createElement('p');
        nombre.innerHTML = caract.Nombre;
        divCaract.appendChild(nombre);

        //divCaract.appendChild(document.createElement('br'));

        let desc = document.createElement('p');
        desc.innerHTML = caract.Descripcion;
        divCaract.appendChild(desc);

        divCaract.appendChild(document.createElement('br'));

        main_div_caract.appendChild(divCaract);

    });

    let carousel = "#carouselPerfilEspacio";
    $(carousel).show();

   
    $("#ctrl-prev").click(function (e) {
        e.stopPropagation();
        //console.log($('#carouselPerfilEspacio'));
        $('#carouselPerfilEspacio').carousel('prev');
        return false;
    });

    $("#ctrl-next").click(function (e) {
        e.stopPropagation();
        //console.log($('#carouselPerfilEspacio'));
        $('#carouselPerfilEspacio').carousel('next');
        return false;
    });
    


});

function load() {
    console.log("Se inicializa");
    let ctrlActions = new ControlActions();
    //CARGA EL FORM
    let serviceEspacio = "espacio/" + localStorage.getItem('espacioPerfil');
    let espacio = ctrlActions.GetToApiFuncional(serviceEspacio);
    let servicePropiedad = "propiedad/" + idPropiedadEspacio;
    let nomPropiedad = ctrlActions.GetToApiFuncional(servicePropiedad);
    Array.from(nomPropiedad.Data).forEach(propiedadArray => {
        if (propiedadArray.IdPropiedad == espacio.Data.Id_Propiedad) {

            propiedadEspacio.value = "Propiedad: " + propiedadArray.Nombre;
        }
    });

    nombre_espacio.value = "Nombre: " + espacio.Data.Nombre;
    precio.value = "Precio: " + espacio.Data.Precio;
    tiempoReserva.value = "Tiempo reserva: " + espacio.Data.Tiempo_Minimo_Reservacion;
}



