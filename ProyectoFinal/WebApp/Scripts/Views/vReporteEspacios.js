$(document).ready(function () {
    this.divEspacios = document.querySelector('.div-registros');
    //console.log(this.divEspacios);
    this.divReembolso = document.querySelector('.div-reembolso');
    this.divCancelacion = document.querySelector('.div-cancelacion');
    this.divCategorias = document.querySelector('.div-categorias');

    //APLICA HIDE
    this.divEspacios.classList.add('hide-profile');
    this.divReembolso.classList.add('hide-profile');
    this.divCancelacion.classList.add('hide-profile');
    this.divCategorias.classList.add('hide-profile');
});


function vReportes() {
    this.btnEspacios = document.getElementById('btnReporteEspacios');
    this.btnReembolso = document.getElementById('btnReporteEspaciosReembolso');
    this.btnCancelacion = document.getElementById('btnReporteEspaciosCancelacion');
    this.btnCategorias = document.getElementById('btnReporteEspaciosCategorias');

    this.divEspacios = document.querySelector('.div-registros');
    //console.log(this.divEspacios);
    this.divReembolso = document.querySelector('.div-reembolso');
    this.divCancelacion = document.querySelector('.div-cancelacion');
    this.divCategorias = document.querySelector('.div-categorias');

    

    this.ShowEspacios = function () {
        this.divEspacios.classList.remove('hide-profile');
        this.divReembolso.classList.add('hide-profile');
        this.divCancelacion.classList.add('hide-profile');
        this.divCategorias.classList.add('hide-profile');
    }
    this.ShowReembolso = function () {
        this.divEspacios.classList.add('hide-profile');
        this.divReembolso.classList.remove('hide-profile');
        this.divCancelacion.classList.add('hide-profile');
        this.divCategorias.classList.add('hide-profile');
    }
    this.ShowCancelacion = function () {
        this.divEspacios.classList.add('hide-profile');
        this.divReembolso.classList.add('hide-profile');
        this.divCancelacion.classList.remove('hide-profile');
        this.divCategorias.classList.add('hide-profile');
    }
    this.ShowCategorias = function () {
        this.divEspacios.classList.add('hide-profile');
        this.divReembolso.classList.add('hide-profile');
        this.divCancelacion.classList.add('hide-profile');
        this.divCategorias.classList.remove('hide-profile');
    }
}



function vReporteEspacios() {

    this.chartRegistros = 'chartRegistros';
    this.chartReembolso = 'chartReembolso';
    this.chartCancelacion = 'chartCancelacion';

    this.service = 'espacio';
    this.ctrlActions = new ControlActions();

    this.GetDataToChartRegistros = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=espaciosReport', initializeChartFunction);
    };
    this.GetDataToChartReembolso = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=reembolso', initializeChartFunction);
    };
    this.GetDataToChartCancelacion = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=cancelacion', initializeChartFunction);
    };
    this.GetDataToChartCategorias = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=categorias', initializeChartFunction);
    };

}

/*
 function vChart1() {

    this.chartRegistros = 'chartRegistros';

    this.service = 'espacio';
    this.ctrlActions = new ControlActions();

    this.GetDataToChartRegistros = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=espaciosReport', initializeChartFunction);
    };

 }
function vChart2() {
    this.GetDataToChartReembolso = function () { };
}

    function vChart3() {
        this.GetDataToChartCancelacion = function () { };
    }

function vChart2() {

    this.chartReembolso = 'chartReembolso';

    this.service = 'espacio';
    this.ctrlActions = new ControlActions();

    this.GetDataToChartReembolso = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=reembolso', initializeChartFunction);
    };
 

}
function vChart3() {

    this.chartCancelacion = 'chartCancelacion';

    this.service = 'espacio';
    this.ctrlActions = new ControlActions();
    this.GetDataToChartCancelacion = function (initializeChartFunction) {

        this.ctrlActions.GetToApi(this.service + '?type=cancelacion', initializeChartFunction);
    };

}*/