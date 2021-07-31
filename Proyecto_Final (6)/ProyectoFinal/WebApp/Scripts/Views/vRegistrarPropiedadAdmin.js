function load() {

}

function vRegistrarPropiedadAdmin() {

	this.service = 'propiedad';
	this.ctrlActions = new ControlActions();
	this.columns = "IdUsuario,Nombre,Descripcion,Latitud,Longitud";
	

	this.Create = function () {
		var propiedadData = {};

		propiedadData = this.ctrlActions.GetDataForm('frmEdition');
		
		propiedadData["Latitud"] = localStorage.getItem("latitud");
		propiedadData["Longitud"] = localStorage.getItem("longitud");	

		if (this.ValidateForm(propiedadData)) {
			//Hace el post al create
			propiedadData["IdUsuario"] = document.getElementById("selectUsuarios").value;
			this.ctrlActions.PostToAPI(this.service, propiedadData);

			setTimeout(function () {
				window.location.href = "vMantenimientoPropiedades";
			}, 3000);
		}

		
	}

	this.BindFields = function (data) {
		this.ctrlActions.BindFields('frmEdition', data);
	}

	this.ValidateForm = function (data) {

		var valid = true;
		var ctrlActions = new ControlActions();
		var alertMes = "";

		for (i in data) {

			if ( i != "undefined") {

				if (data[i] == "" || data[i] == 0) {
					document.getElementById(i).classList.remove("is-valid");
					document.getElementById(i).classList.add("is-invalid");
					valid = false;
				} else {
					document.getElementById(i).classList.remove("is-invalid");
					document.getElementById(i).classList.add("is-valid");
				}

			}
		}

		if (document.getElementById("selectUsuarios").value == "0") {

			document.getElementById("selectUsuarios").classList.remove("is-valid");
			document.getElementById("selectUsuarios").classList.add("is-invalid");
			valid = false;

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

async function isPropietario(id) {
	var isPropietario = false;
	var ctrlActions = new ControlActions();

	if (id != "" && id != undefined) {
		var url = "https://localhost:44302/api/rolusuario?idUsuario=" + id;
		var result = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		var response = await result;
		var json = await response.json();

		if (response.status != 200) {
			ctrlActions.ShowMessage('E', json['ExceptionMessage']);
		}

		for (i = 0; i < json['Data'].length; i++) {

			var rol = json['Data'][i];

			if (rol['Id_Rol'] == 2) {
				isPropietario = true;
			}

		}
	}
	return isPropietario;
}

//ON DOCUMENT READY
$(document).ready(async function () {

	var result = await fetch('https://localhost:44302/api/usuario' , {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	var json = await result.json();

	var usuarios = json['Data'];

	var propietarios = [];

	for (i in usuarios) {

		if (await isPropietario(usuarios[i]["Id_Usuario"])) {

			propietarios.push(usuarios[i]);
		}
	}

	for (i in propietarios) {

		var select = document.getElementById("selectUsuarios");
		var option = document.createElement("option");
		option.text = propietarios[i]['Nombre'] + " " + propietarios[i]['Apellidos'];
		option.value = propietarios[i]['Id_Usuario'];
		select.add(option);
		
	}	
	
});

