function load() {
    loadSelectEspacios();
}

function loadSelectEspacios() {
    let service = "espacio";
    let controlActions = new ControlActions();

    let espacios = controlActions.GetToApiFuncional(service);
    console.log(espacios);

    Array.from(espacios.Data).forEach(prop => {
        
            console.log('entra en crear espacios');
            Id_Espacio.options.add(new Option(prop.Nombre, prop.Id_Espacio));
        /*
        var htmlOptions = "";
        htmlOptions += "<option value='" + option.Value + "'>" + option.Description + "</option>";
        */
    });
}

function vRegistrarCaracteristicaEspacio() {

    this.service = 'caracteristicaEspacio';
    this.ctrlActions = new ControlActions();

    this.EnviarDatos = async function () {
        try {

            var caracteristicaData = {};
            caracteristicaData = this.ctrlActions.GetDataForm('formCaracteristicaEspacio');

            console.log(caracteristicaData);

            if (this.ValidateForm(caracteristicaData)) {

                var result = await fetch('https://localhost:44302/api/caracteristicaEspacio', {
                    method: 'POST',
                    body: JSON.stringify(caracteristicaData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                var response = await result;
                console.log(response);

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

    this.ValidateForm = function (data) {

        var ctrlActions = new ControlActions();
        var valid = true;

        for (i in data) {
            if (data[i] == "" || data[i] == 0) {
                document.getElementById(i).classList.remove("is-valid");
                document.getElementById(i).classList.add("is-invalid");
                valid = false;
            } else {
                document.getElementById(i).classList.remove("is-invalid");
                document.getElementById(i).classList.add("is-valid");
            }
        }

        if (!valid) {
            ctrlActions.ShowMessage('E', "Complete todos los espacios");
            return false;
        } else {
            $('.alert').hide();
            return true;
        }
    }

}