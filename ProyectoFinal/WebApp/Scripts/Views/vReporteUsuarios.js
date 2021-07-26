
$(document).ready(async function () {
   
});

async function getTotales(data) {
    var administradores = 0;
    var propietarios = 0;
    var finales = 0;
    var totales = [];
    


    for (var i = 0; i < data.length; i++) {

        
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + data[i]['Id_Usuario'];
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();
        var rolUsuario = {};
        var rol = 0;
        for (var j = 0; j < json['Data'].length; j++) {
            rolUsuario = json['Data'][j];
            rol = rolUsuario['Id_Rol'];
          
            if (rol == 1) 
                administradores += 1;
            if (rol == 2) 
                propietarios += 1;
            if (rol == 3) 
                finales += 1;
        }

            
    }
    totales.push(administradores);
    totales.push(propietarios);
    totales.push(finales);

    return totales;
}




function vReporteUsuarios() {

    this.chartRegistros = 'chartRegistros';
   
    this.ctrlActions = new ControlActions();

    this.GetDataToChartRegistros = async function (initializeChartFunction) {

        var result = await fetch('https://localhost:44302/api/usuario', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var totales = await getTotales(json['Data']);

        var data = [];
        data.push(totales[0]);
        data.push(totales[1]);
        data.push(totales[2]);
       

        initializeChartFunction(data);


      
   

    }

}