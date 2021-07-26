const btn = document.querySelector("button")


//var idReservacion = 2;
let idReservacion = localStorage.getItem('idReservacion');
var id_usuario_logeado = localStorage.getItem('idUsuario');

//INPUTS
//let inp_rate_5 = document.getElementById('rate_5');
//let inp_rate_4 = document.getElementById('rate_4');
//let inp_rate_3 = document.getElementById('rate_3');
//let inp_rate_2 = document.getElementById('rate_2');
//let inp_rate_1 = document.getElementById('rate_1');
let calificacion = null;

let btn_enviar = document.getElementById('btnEnviar');

let espacio_data = {};

var reservacion = {};
var rol = 0;

function vCalificarUsuario() { 

    const widget = document.querySelector(".star-widget");

//this.Update = function () {
//btn.onclick = () => {
   // widget.style.display = "none"; 

    //VERIFICAR CUAL RADIO DE CALIFICACION FUE SELECCIONADO
    //if (rate_5.checked) {
        //espacio_data["Permite_Cancelacion"] = "true";
        //cancelacion = "true";
     //   calificacion = 5
    //} else if (rate_4.checked) {
    //    calificacion = 4
    //} else if (rate_3.checked) {
   //     calificacion = 3
   // } else if (rate_2.checked) {
   //     calificacion = 2
   // } else calificacion = 1

    
    

    
//}

   // }

   

    this.Update = async function () {

        widget.style.display = "none";

        //VERIFICAR CUAL RADIO DE CALIFICACION FUE SELECCIONADO
        if (rate_5.checked) {
            //espacio_data["Permite_Cancelacion"] = "true";
            //cancelacion = "true";
            calificacion = 5
        } else if (rate_4.checked) {
            calificacion = 4
        } else if (rate_3.checked) {
            calificacion = 3
        } else if (rate_2.checked) {
            calificacion = 2
        } else calificacion = 1

        var ctrlActions = new ControlActions();


            try {
                if (rol == 2) {
                var data = reservacion;
                data['Calificacion_Usuario'] = calificacion;
                var result = await fetch('https://localhost:44302/api/reservacion', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                }
                else {
                    ctrlActions.ShowMessage('I', "Calificación registrada con éxito");
                    setTimeout(function () {
                        window.location.href = "vListarReservas";
                    }, 3000);
                    }
                } else {
                    if (rol !== 2) {
                        var data = reservacion;
                        data['Calificacion_Propietario'] = calificacion;
                        var result = await fetch('https://localhost:44302/api/reservacion', {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        var response = await result;
                        var json = await response.json();

                        if (response.status != 200) {
                            ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                        }
                        else {
                            ctrlActions.ShowMessage('I', "Calificación registrada con éxito");
                            
                            setTimeout(function () {
                                window.location.href = "vListarReservas";
                            }, 3000);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }

        }
}

async function getReservacion() {
    try {

        var ctrlActions = new ControlActions();

        if (idReservacion != "" && idReservacion != undefined) {
            var url = "https://localhost:44302/api/reservacion/" + idReservacion;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }
            reservacion = json['Data'];

        }

    } catch (err) {
        console.log(err);
    }
}

async function getRol() {
    
    
    

    if (id_usuario_logeado != "" && id_usuario_logeado != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + id_usuario_logeado;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        for (i = 0; i < json['Data'].length; i++) {

            var rol1 = json['Data'][i];

            rol = rol1['Id_Rol'];

        }
        
    }    ;
}

$(document).ready(async function () {
    try {

        await getReservacion();

        await getRol();


    } catch (err) {
        console.log(err);
    }

});
