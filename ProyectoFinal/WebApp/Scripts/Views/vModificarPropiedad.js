function load() { }

var idPropiedad = localStorage.getItem('idPropiedadMod');
var idUsuario = "";
var estado = "";

function vModificarPropiedad() {

	this.service = 'propiedad';
	this.ctrlActions = new ControlActions();
   
    this.Mod = async function () {

        try {
            var propiedadData = {};
            propiedadData = this.ctrlActions.GetDataForm('frmModificarPropiedad');

            console.log(propiedadData);

            if (this.ValidateForm(propiedadData)) {
                propiedadData['IdPropiedad'] = idPropiedad;
                propiedadData["IdUsuario"] = idUsuario;
                //propiedadData["Estado"] = estado;
                
                var result = await fetch('https://localhost:44302/api/propiedad', {
                    method: 'PUT',
                    body: JSON.stringify(propiedadData),
                    headers: { 'Content-Type': 'application/json' }
                });

                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {
                    this.ctrlActions.ShowMessage('I', "Cambios guardados");
                    setTimeout(function () {
                        window.location.href = "vMantenimientoPropiedades";
                    }, 2000);
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

	this.ValidateForm = function (data) {

		var valid = true;
		var ctrlActions = new ControlActions();
		var alertMes = "";

        if (data["Nombre"] == "") {
            document.getElementById("Nombre").classList.remove("is-valid");
            document.getElementById("Nombre").classList.add("is-invalid");
            valid = false;
        } else {
            document.getElementById("Nombre").classList.remove("is-invalid");
            document.getElementById("Nombre").classList.add("is-valid");
        }

        if (data["Descripcion"] == "") {
            document.getElementById("Descripcion").classList.remove("is-valid");
            document.getElementById("Descripcion").classList.add("is-invalid");
            valid = false;
        } else {
            document.getElementById("Descripcion").classList.remove("is-invalid");
            document.getElementById("Descripcion").classList.add("is-valid");
        }

		if (!valid) {
			alertMes += "Complete todos los espacios";
			ctrlActions.ShowMessage('E', alertMes);
			return false;
		}

		else {
			$('.alert').hide();
			return true;
		}
	}

}

//ON DOCUMENT READY
$(document).ready(async function () {

    try {

        if (idPropiedad != "" && idPropiedad != undefined) {
            var url = "https://localhost:44302/api/propiedad?idPropiedad=" + idPropiedad;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var json = await result.json();
            console.log(json['Data']);
            for (i in json['Data']) {
                if (i != 'IdPropiedad' && i != 'IdUsuario' && i != 'Estado')
                    document.getElementById(i).value = json['Data'][i];
                if (i == 'IdUsuario')
                    IdUsuario = json['Data'][i];                
            }
        }

    } catch (err) {
        console.log(err);
    }
});

