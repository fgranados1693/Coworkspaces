

let id_caracteristica;
let lbl_caracteristica;
let id_espacio;
let lbl_espacio;
let espacio = localStorage.getItem('idEspacioCaracteristicas');


function vMantenimientoCaracteristicasEspacio() {
	this.tblCaracteristicasId = 'tblCaracteristicas';
	tblCaracteristicasId = 'tblCaracteristicas';
	this.servicePost = 'caracteristicaespacio';
	this.service = 'caracteristicaespacio/caracteristicaespacio?idEspacio='+espacio;
	let service = 'caracteristicaespacio/caracteristicaespacio?idEspacio='+espacio;
	let ctrlActions = new ControlActions();
	this.columns = "Id_Caracteristica,Id_Espacio,Nombre,Descripcion";

	this.RetrieveAll = function () {
		ctrlActions.FillTable(this.service, this.tblCaracteristicasId, false);
	}


	function ReloadTable() {
		ctrlActions.FillTable(service, tblCaracteristicasId, true);
	}

	this.Create = function () {
		if (this.ValidateForm() == true) {
			var caracteristicaData = {};
			caracteristicaData = ctrlActions.GetDataForm('frmEdition');
			caracteristicaData["Id_Espacio"] = espacio;
			console.log(caracteristicaData);
			//Hace el post al create
			ctrlActions.PostToAPI(this.servicePost, caracteristicaData);
			setTimeout(function () {
				ReloadTable();
			}, 1200);
		}
	}

	this.Update = function () {
		if (this.ValidateForm() == true) {
			var caracteristicaData = {};
			caracteristicaData = ctrlActions.GetDataForm('frmEdition');
			caracteristicaData["Id_Caracteristica"] = id_caracteristica.value;
			caracteristicaData["Id_Espacio"] = espacio;
			//Hace el post al create
			ctrlActions.PutToAPI(this.service, caracteristicaData);
			setTimeout(function () {
				ReloadTable();
			}, 1200);
		}
	}

	this.Delete = function () {
		if (this.ValidateForm() == true) {
			var caracteristicaData = {};
			caracteristicaData = ctrlActions.GetDataForm('frmEdition');
			console.log(caracteristicaData);
			//Hace el post al create
			ctrlActions.DeleteToAPI(this.servicePost, caracteristicaData);
			setTimeout(function () {
				ReloadTable();
			}, 1200);
		}

	}

	this.BindFields = function (data) {
		ctrlActions.BindFields('frmEdition', data);
	}

	this.ValidateForm = function () {

		var valid = true;
		var ctrlActions = new ControlActions();
		var alertMes = "";

		if (document.getElementById("Nombre") == "" || document.getElementById("Nombre") == null) {
			document.getElementById("Nombre").classList.remove("is-valid");
			document.getElementById("Nombre").classList.add("is-invalid");
			valid = false;
		} else {
			document.getElementById("Nombre").classList.remove("is-invalid");
			document.getElementById("Nombre").classList.add("is-valid");
		}

		if (document.getElementById("Descripcion") == "" || document.getElementById("Descripcion") == null) {
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
$(document).ready(function () {
	var vCaracteristicas = new vMantenimientoCaracteristicasEspacio();
	vCaracteristicas.RetrieveAll();

	//CARACTERISTICA
	id_caracteristica = document.getElementById("Id_Caracteristica");
	lbl_caracteristica = document.getElementById("lblCaracteristica");
	id_caracteristica.classList.add('hide-profile');
	lbl_caracteristica.classList.add('hide-profile');

	//ESPACIO
	id_espacio = document.getElementById("Id_Espacio");
	lbl_espacio = document.getElementById("lblEspacio");
	id_espacio.classList.add('hide-profile');
	lbl_espacio.classList.add('hide-profile');
});

