
function vMantenimientoCategorias() {

	this.tblCategoriasId = 'tblCategorias';
	this.service = 'categoria';
	this.ctrlActions = new ControlActions();
	this.columns = "IdCategoria,Nombre";

	this.RetrieveAll = function () {
		this.ctrlActions.FillTable(this.service, this.tblCategoriasId, false);
	}

	this.ReloadTable = function () {
		this.ctrlActions.FillTable(this.service, this.tblCategoriasId, true);
	}

	this.Create = function () {
		var categoriaData = {};
		categoriaData = this.ctrlActions.GetDataForm('frmEdition');

		if (this.ValidateForm(categoriaData)) {
			this.ctrlActions.PostToAPI(this.service, categoriaData);
		}

	}

	this.Update = function () {

		var categoriaData = {};
		console.log("categoria data" + categoriaData);
		categoriaData = this.ctrlActions.GetDataForm('frmEdition');

		if (this.ValidateForm(categoriaData)) {
			this.ctrlActions.PutToAPI(this.service, categoriaData);
		}
	}

	this.Delete = function () {

		var categoriaData = {};
		categoriaData = this.ctrlActions.GetDataForm('frmEdition');
		//Hace el post al create
		this.ctrlActions.DeleteToAPI(this.service, categoriaData);
		//Refresca la tabla
		this.ReloadTable();
	}

	this.BindFields = function (data) {
		this.ctrlActions.BindFields('frmEdition', data);
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
	var vcategorias = new vMantenimientoCategorias();
	vcategorias.RetrieveAll();
});

