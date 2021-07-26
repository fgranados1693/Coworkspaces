function vRegistroPropiedadSolicitud() {

	this.ctrlActions = new ControlActions();

	this.Create = async function () {
		var propiedadData = {};

		propiedadData = this.ctrlActions.GetDataForm('frmReg');
		propiedadData["Latitud"] = localStorage.getItem("latitud");
		propiedadData["Longitud"] = localStorage.getItem("longitud");	

		if (this.ValidateForm(propiedadData)) {
			propiedadData["IdUsuario"] = localStorage.getItem("idUsuarioSolicitud");
			var result = await fetch('https://localhost:44302/api/propiedad', {
				method: 'POST',
				body: JSON.stringify(propiedadData),
				headers: { 'Content-Type': 'application/json' }
			});
			var response = await result;
			var json = await response.json();

			if (response.status != 200) {
				this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
			} else {
				await this.SetIdPropiedad();
				window.location.href = "vRegistrarFotoPropiedadSolicitud";
            }

		}

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

	this.SetIdPropiedad = async function(){
		try {

			var url = "https://localhost:44302/api/propiedad";
			var result = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			var response = await result;
			var json = await response.json();

			if (response.status != 200) {
				this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
			} else {
				var propiedades = json['Data'];
				for (i in propiedades) {

					if (propiedades[i]['IdUsuario'] == localStorage.getItem("idUsuarioSolicitud"))
						localStorage.setItem('idPropiedadSeleccionada', propiedades[i]['IdPropiedad']);

				}
			}

		} catch (err) {
			console.log(err);
		}
    }

}


