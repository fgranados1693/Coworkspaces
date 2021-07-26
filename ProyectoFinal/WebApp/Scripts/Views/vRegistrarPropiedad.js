function load() {

}

function vRegistrarPropiedad() {

	this.service = 'propiedad';
	this.ctrlActions = new ControlActions();
	this.columns = "IdUsuario,Nombre,Descripcion,Latitud,Longitud";
	

	this.Create = function () {
		var propiedadData = {};

		propiedadData = this.ctrlActions.GetDataForm('frmEdition');
		propiedadData["IdUsuario"] = localStorage.getItem("idUsuario");
		propiedadData["Latitud"] = localStorage.getItem("latitud");
		propiedadData["Longitud"] = localStorage.getItem("longitud");	

		if (this.ValidateForm(propiedadData)) {

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

/*//ON DOCUMENT READY
$(document).ready(function () {
	var vregistrarpropiedad = new vRegistrarPropiedad();
	vregistrarpropiedad.RetrieveAll();
}); */

