function load() { }

var idCaracteristica = localStorage.getItem('idCaracteristicaMod');

function vEliminarCaracteristicaEspacio() {

    this.service = 'caracteristicaEspacio';
    this.ctrlActions = new ControlActions();

    this.Mod = async function () {
        try {

            var caracteristicaData = {};
            caracteristicaData = this.ctrlActions.GetDataForm('formMod');

            if (this.ValidateForm(caracteristicaData)) {

                var result = await fetch('https://localhost:44302/api/caracteristicaEspacio', {
                    method: 'DELETE',
                    body: JSON.stringify(caracteristicaData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                var response = await result;
                var json = await response.json();

                console.log(json);

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {
                    this.ctrlActions.ShowMessage('I', "Cambios guardados");
                    setTimeout(function () {
                        window.location.href = "vListarCaracteristicasEspacio";
                    }, 3000);
                }

            }
            else {
                console.log("Error");
            }
        } catch (err) {
            console.log(err);
        }
    }

}