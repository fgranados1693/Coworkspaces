function vMantenimientoHorarios() {
	let espacio_logeado = localStorage.getItem('idEspacioHorarios');
	this.tblHorariosId = 'tblHorarios';
	let tblHorariosId = 'tblHorarios';
	this.service = 'horario';
	let service = 'horario';
	this.ctrlActions = new ControlActions();
	let ctrlActions = new ControlActions();
	this.columns = "IdHorario,IdEspacio,Dia_Semana,Hora_Inicio,Hora_Fin";

	this.RetrieveAll = function () {
		var url = 'horario?idEspacio=' + espacio_logeado;
		this.ctrlActions.FillTable(url, this.tblHorariosId, false);
		var firstCells = document.querySelectorAll('td:nth-child(4)');
		console.log(firstCells);
		var cellValues = [];
		firstCells.forEach(celda => {
			console.log(celda.innerHtml);
			var time = celda.innerHtml.toLocaleTimeString(undefined, {
				hour: '2-digit',
				minute: '2-digit'
			});
			celda.innerHtml = time;
			console.log(celda.innerHtml);
		});
		console.log(cellValues);
	}

	this.ReloadTable = function () {
		this.ctrlActions.FillTable(this.service, this.tblHorariosId, true);
	}

	function ReloadTable() {
		ctrlActions.FillTable(service, tblHorariosId, true);
	}

	this.Create = function () {
		
		var horarioData = {};
		horarioData = this.ctrlActions.GetDataForm('frmEdition');
		horarioData['Id_Espacio'] = espacio_logeado;
		if (this.ValidateForm(horarioData)) {
		//Hace el post al create
			this.ctrlActions.PostToAPI(this.service, horarioData);
		}
		//Refresca la tabla
		setTimeout(function () {
			ReloadTable();
		}, 1200);
	}

	this.Update = async function () {

		var horarioData = {};
		horarioData = this.ctrlActions.GetDataForm('frmEdition');
		if (this.ValidateForm(horarioData)) {
		//Hace el post al create
			//this.ctrlActions.PutToAPI(this.service, horarioData);
			var result = await fetch('https://localhost:44302/api/horario', {
				method: 'PUT',
				body: JSON.stringify(horarioData),
				headers: { 'Content-Type': 'application/json' }
			});
			var response = await result;
			var json = await response.json();

			if (response.status != 200) {
				this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
			} else {
				this.ctrlActions.ShowMessage('I', "Cambios guardados");
				ReloadTable();

			}
		}

	}

	this.Delete = function () {

		var horarioData = {};
		horarioData = this.ctrlActions.GetDataForm('frmEdition');
		//Hace el post al create
		this.ctrlActions.DeleteToAPI(this.service, horarioData);
		//Refresca la tabla
		setTimeout(function () {
			ReloadTable();
		}, 1200);

	}

	this.BindFields = function (data) {
		this.ctrlActions.BindFields('frmEdition', data);
	}
	this.ValidateForm = function (data) {

		var valid = true;
		var ctrlActions = new ControlActions();
		var alertMes = "";

		if (data["Dia_Semana"] == 0) {
			document.getElementById("Dia_Semana").classList.remove("is-valid");
			document.getElementById("Dia_Semana").classList.add("is-invalid");
			valid = false;
		} else {
			document.getElementById("Dia_Semana").classList.remove("is-invalid");
			document.getElementById("Dia_Semana").classList.add("is-valid");
		}

		if (data["Hora_Inicio"] == "") {
			document.getElementById("Hora_Inicio").classList.remove("is-valid");
			document.getElementById("Hora_Inicio").classList.add("is-invalid");
			valid = false;
		} else {
			document.getElementById("Hora_Inicio").classList.remove("is-invalid");
			document.getElementById("Hora_Inicio").classList.add("is-valid");
		}

		if (data["Hora_Fin"] == "") {
			document.getElementById("Hora_Fin").classList.remove("is-valid");
			document.getElementById("Hora_Fin").classList.add("is-invalid");
			valid = false;
		} else {
			document.getElementById("Hora_Fin").classList.remove("is-invalid");
			document.getElementById("Hora_Fin").classList.add("is-valid");
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
	Dia_Semana.value = 0;
	var vhorario = new vMantenimientoHorarios();
	vhorario.RetrieveAll();
	document.getElementById('IdHorario').classList.add('visually-hidden');
	document.getElementById('IdEspacio').classList.add('visually-hidden');
	document.getElementById('labelHorario').classList.add('visually-hidden');
	document.getElementById('labelEspacio').classList.add('visually-hidden');
});