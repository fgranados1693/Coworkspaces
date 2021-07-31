

let id;
let lblId; 



function vMantenimientoImpuestos() {

	this.tblImpuestosId = 'tblImpuestos';
	let tblImpuestosId = 'tblImpuestos';
	this.service = 'impuesto';
	service = 'impuesto';
	this.ctrlActions = new ControlActions();
	let ctrlActions = new ControlActions();
	this.columns = "Id_Impuesto,Nombre,Valor";

	this.RetrieveAll = function () {
		this.ctrlActions.FillTable(this.service, this.tblImpuestosId, false);
	}

	this.ReloadTable = function () {
		this.ctrlActions.FillTable(this.service, this.tblImpuestosId, true);
	}

	function ReloadTable() {
		ctrlActions.FillTable(service, tblImpuestosId, true);
	}

	this.Create = function () {
		var impuestoData = {};
		impuestoData = this.ctrlActions.GetDataForm('frmEdition');
		//Hace el post al create
		this.ctrlActions.PostToAPI(this.service, impuestoData);
		
		setTimeout(function () {
			ReloadTable();
		}, 1200);
	}

	this.Update = function () {

		var impuestoData = {};
		impuestoData = this.ctrlActions.GetDataForm('frmEdition');
		//Hace el post al create
		this.ctrlActions.PutToAPI(this.service, impuestoData);

		setTimeout(function () {
			ReloadTable();
		}, 1200);
		//ReloadTable();

	}

	this.Delete = function () {

		var customerData = {};
		customerData = this.ctrlActions.GetDataForm('frmEdition');
		//Hace el post al create
		this.ctrlActions.DeleteToAPI(this.service, customerData);

		setTimeout(function () {
			ReloadTable();
		}, 1200);
	}

	this.BindFields = function (data) {
		this.ctrlActions.BindFields('frmEdition', data);
	}
}

//ON DOCUMENT READY
$(document).ready(function () {
	var vImpuesto = new vMantenimientoImpuestos();
	vImpuesto.RetrieveAll();

	id = document.getElementById("txtId");
	lblId = document.getElementById("lblId");
	id.classList.add('hide-profile');
	lblId.classList.add('hide-profile');

});

