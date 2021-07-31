
function vMantenimientoParametros() {

	this.tblParametrosId = 'tblParametros';
	this.service = 'parametro';
	this.ctrlActions = new ControlActions();
	this.columns = "IdParametro,Nombre,Valor";

	this.RetrieveAll = function () {
		this.ctrlActions.FillTable(this.service, this.tblParametrosId, false);
	}

	this.ReloadTable = function () {
		this.ctrlActions.FillTable(this.service, this.tblParametrosId, true);
	}

	this.Create = function () {
		var parametroData = {};
		parametroData = this.ctrlActions.GetDataForm('frmEdition');

		if (this.ValidateForm(parametroData)) {
			this.ctrlActions.PostToAPI(this.service, parametroData);
		}

	}

	this.Update = function () {

		var parametroData = {};
		parametroData = this.ctrlActions.GetDataForm('frmEdition');

		if (this.ValidateForm(parametroData)) {
			this.ctrlActions.PutToAPI(this.service, parametroData);
		}
	}

	this.Delete = function () {

		var parametroData = {};
		parametroData = this.ctrlActions.GetDataForm('frmEdition');
		//Hace el post al create
		this.ctrlActions.DeleteToAPI(this.service, parametroData);
		//Refresca la tabla
		this.ReloadTable();
	}

	this.BindFields = function (data) {
		this.ctrlActions.BindFields('frmEdition', data);
		var nombreDropdown = document.getElementById("Nombre");
		//nombreDropdown.disabled = true;
	}

	this.ValidateForm = function (data) {

		var valid = true;
		var ctrlActions = new ControlActions();
		var alertMes = "";


		if (data["Valor"] == "") {
			document.getElementById("Valor").classList.remove("is-valid");
			document.getElementById("Valor").classList.add("is-invalid");
			valid = false;
		} else {
			document.getElementById("Valor").classList.remove("is-invalid");
			document.getElementById("Valor").classList.add("is-valid");
		}


		if (!valid) {
			alertMes += "Complete todos los espacios";
			ctrlActions.ShowMessage('E', alertMes);
			return false;
		}

		var validNum = this.ValidateNum(data['Valor']);

		if (!validNum && data["Nombre"] == "Precio Membresia") {
			document.getElementById("alert_message_num").innerHTML = "El valor ingresado debe ser un número";
		}

		if (!validNum && data["Nombre"] == "Precio Membresia") {
			ctrlActions.ShowMessage('E', alertMes);
			return false;
		}

		if (!valid) {
			ctrlActions.ShowMessage('E', alertMes);
			return false;
		}
		else {
			$('.alert').hide();
			return true;
		}
	}

	this.ValidateNum = function (num) {

		var valid = true;

		if (isNaN(num)) {
			valid = false;
		}

		return valid;
	}
}

//ON DOCUMENT READY
$(document).ready(function () {
	var vparametros = new vMantenimientoParametros();
	vparametros.RetrieveAll();
});

