
function vMantenimientoEspacios() {

    this.ctrlActions = new ControlActions();

    this.EspacioNuevo = async function () {
        try {

            window.location.href = "vRegistrarEspacio1";

        } catch (err) {
            console.log(err);
        }
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {
    this.usuarioLogeado = localStorage.getItem('idUsuario');
    this.rolUsuario = localStorage.getItem('rolUsuario');
    
    //SI ES ADMIN CARGA TODOS LOS ESPACIOS
    if (this.rolUsuario == 1) {
        this.ctrlActions = new ControlActions();
        this.service = "espacio";
        this.espacios = this.ctrlActions.GetToApiFuncional(this.service);
        console.log(this.espacios.Data);
        
        await fillTable(this.espacios.Data);

        $('#tblEspacios').DataTable();
    }

    //SI ES PROPIETARIO CARGA SOLO LOS DE LAS PROPIEDADES QUE TENGA
    if (this.rolUsuario == 2) {
        this.ctrlActions = new ControlActions();
        let servicePropiedad = "propiedad";
        let propiedadesIds = [];
        let nomPropiedad = this.ctrlActions.GetToApiFuncional(servicePropiedad);
        console.log(nomPropiedad);
        Array.from(nomPropiedad.Data).forEach(propiedadArray => {
            //console.log(propiedadArray);
            //console.log(espacio);
            if (propiedadArray.IdUsuario == this.usuarioLogeado) {
                propiedadesIds.push(propiedadArray.IdPropiedad);
            }
        });

        console.log(propiedadesIds);

        this.ctrlActions = new ControlActions();
        this.service = "espacio";
        this.espacios = this.ctrlActions.GetToApiFuncional(this.service);
        console.log(this.espacios.Data);
        this.espaciosPropiedadesUsuario = [];

        for (var i = 0; i < this.espacios.Data.length; i++) {
            
            propiedadesIds.forEach(prop => {
                //console.log(this.espacios.Data[i], prop);
                if (this.espacios.Data[i].Id_Propiedad == prop) {
                    this.espaciosPropiedadesUsuario.push(this.espacios.Data[i]);
                }
            });
        }
        console.log(this.espaciosPropiedadesUsuario);
        await fillTable(this.espaciosPropiedadesUsuario);

        $('#tblEspacios').DataTable();
    }

    //USUARIO FINAL. NO ES NECESARIO PERO POR SI ACASO
    if (this.rolUsuario == 3) {
        this.ctrlActions = new ControlActions();
        this.ctrlActions.ShowMessage('E', "No hay espacios porque no es un propietario");
            
    }
    
});



async function fillTable(data) {
    this.ctrlActions = new ControlActions();
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var propiedad = document.createElement("td");
        var nombre = document.createElement("td");
        var precio = document.createElement("td");
        var estado = document.createElement("td");
        var reembolso = document.createElement("td");
        var cancelacion = document.createElement("td");
        var tiempoCancelacion = document.createElement("td");
        var tiempoReservacion = document.createElement("td");
        var modFotos = document.createElement("td");
        var modHorarios = document.createElement("td");
        var modCaracteristicas = document.createElement("td");
        var editar = document.createElement("td");
        //var eliminar = document.createElement("td");

        //NOMBRE DE PROPIEDAD
        let servicePropiedad = "propiedad/" + data[i]['Id_Propiedad'];
        let nomPropiedad = this.ctrlActions.GetToApiFuncional(servicePropiedad);
        Array.from(nomPropiedad.Data).forEach(propiedadArray => {
            
            //console.log(espacio);
            if (propiedadArray.IdPropiedad == data[i]['Id_Propiedad']) {
                propiedad.appendChild(document.createTextNode(propiedadArray.Nombre));
            }
        });
        
        


        var a = document.createElement("a");
        var textNombre = document.createTextNode(data[i]['Nombre']);
        a.appendChild(textNombre);
        a.href = "#";
        a.id = data[i]['Id_Espacio'];
        a.addEventListener('click', perfilEspacio);

        nombre.appendChild(a);
        precio.appendChild(document.createTextNode(data[i]['Precio']));
        estado.appendChild(document.createTextNode(data[i]['Estado']));

        //CONVIERTE EL TRUE O FALSE A SI O NO
        if (data[i]['Permite_Reembolso'] == "true") {
            reembolso.appendChild(document.createTextNode("Sí"));
        } else if (data[i]['Permite_Reembolso'] == "false") {
            reembolso.appendChild(document.createTextNode("No"));
        }
        
        if (data[i]['Permite_Cancelacion'] == "true") {
            cancelacion.appendChild(document.createTextNode("Sí"));
        } else if (data[i]['Permite_Cancelacion'] == "false") {
            cancelacion.appendChild(document.createTextNode("No"));
        }

        //reembolso.appendChild(document.createTextNode(data[i]['Permite_Reembolso']));
        //cancelacion.appendChild(document.createTextNode(data[i]['Permite_Cancelacion']));
        tiempoCancelacion.appendChild(document.createTextNode(data[i]['Tiempo_Minimo_Previo_Cancelacion']));
        tiempoReservacion.appendChild(document.createTextNode(data[i]['Tiempo_Minimo_Reservacion']));

        //FOTOS
        var aEditarFotos = document.createElement("a");
        aEditarFotos.href = "#";
        aEditarFotos.id = data[i]['Id_Espacio'];
        aEditarFotos.addEventListener('click', modificarFotos);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-camera");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Espacio'];
        aEditarFotos.appendChild(iconEditar);
        modFotos.appendChild(aEditarFotos);

        //HORARIOS
        var aEditarHorarios = document.createElement("a");
        aEditarHorarios.href = "#";
        aEditarHorarios.id = data[i]['Id_Espacio'];
        aEditarHorarios.addEventListener('click', modificarHorarios);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-calendar-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Espacio'];
        aEditarHorarios.appendChild(iconEditar);
        modHorarios.appendChild(aEditarHorarios);

        //CARACTERISTICAS
        var aEditarCaracteristicas = document.createElement("a");
        aEditarCaracteristicas.href = "#";
        aEditarCaracteristicas.id = data[i]['Id_Espacio'];
        aEditarCaracteristicas.addEventListener('click', modificarCaracteristicas);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-info");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Espacio'];
        aEditarCaracteristicas.appendChild(iconEditar);
        modCaracteristicas.appendChild(aEditarCaracteristicas);

        var aEditar = document.createElement("a");
        aEditar.href = "#";
        aEditar.id = data[i]['Id_Espacio'];
        aEditar.addEventListener('click', modEspacio);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-pencil-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Espacio'];
        aEditar.appendChild(iconEditar);
        editar.appendChild(aEditar);

        //SE AGREGAN A LAS CELDAS
        tr.appendChild(propiedad);
        tr.appendChild(nombre);
        tr.appendChild(precio);
        tr.appendChild(estado);
        tr.appendChild(reembolso);
        tr.appendChild(cancelacion);
        tr.appendChild(tiempoCancelacion);
        tr.appendChild(tiempoReservacion);
        tr.appendChild(modFotos);
        tr.appendChild(modHorarios);
        tr.appendChild(modCaracteristicas);
        tr.appendChild(editar);
        //tr.appendChild(eliminar);

        document.getElementById("tblBodyEspacios").appendChild(tr);
    }
}

function perfilEspacio(e) {
    var a = e.target;
    var id = a.id;
    console.log(a.id);
    localStorage.setItem("idEspacioPerfil", id);
    window.location.href = "vPerfilEspacio";
}

function modificarFotos(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idEspacioFotos", id);
    //window.location.href = "vModificarFotosEspacio";
}
function modificarHorarios(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idEspacioHorarios", id);
    window.location.href = "vMantenimientoHorarios";
}
function modificarCaracteristicas(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idEspacioCaracteristicas", id);
    window.location.href = "vMantenimientoCaracteristicasEspacio";
}

function modEspacio(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idEspacioMod", id);
    window.location.href = "vModificarEspacio";
}