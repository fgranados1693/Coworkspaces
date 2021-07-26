function load() {
}



function vReportes() {

    this.vReporteEspacios = function () {
        window.location.href = "vReporteEspacios";
    };

    this.vReporteTransaccionesAdmin = function () {
        window.location.href = "vReporteIngresos";
    };

    this.vReporteTransaccionesProp = function () {
        window.location.href = "vReporteIngresosProp";
    };
    this.vReporteUsuarios = function () {
        window.location.href = "vReporteUsuarios";
    };
}
    
//ON DOCUMENT READY
$(document).ready(async function () {
    if (await isAdmin()) {
        document.getElementById('btnReporteIngresosProp').classList.add('visually-hidden');
    } else {
        document.getElementById('btnReporteIngresosAdmin').classList.add('visually-hidden');
    }
});