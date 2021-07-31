//VALIDA LOS CAMPOS VACÍOS. ES NECESARIO QUE LOS TAGS DE HTML TENGAN EL "REQUIRED"
let validarEspacios = () => {
    let error;
    let campos_requeridos = document.querySelectorAll('[required]');

    campos_requeridos.forEach(campo => {
        if (campo.value == '') {
            campo.classList.add('error');
            error = true;
        } else {
            campo.classList.remove('error');
        }
    });
    return error;
};


//VALIDA EL FORMATO DEL EMAIL
const validarEmail = (email) => {
    let error = false;
    if (!(/@+/.test(email))) {
        error = true;
    }

    return error;
}

//VALIDAR CONTRASEÑA
function validar_clave(contrasenna) {
	if (contrasenna.length >= 8) {
		var mayuscula = false;
		var minuscula = false;
		var numero = false;
		var caracter_raro = false;

		for (var i = 0; i < contrasenna.length; i++) {
			if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
				mayuscula = true;
			}
			else if (contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122) {
				minuscula = true;
			}
			else if (contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57) {
				numero = true;
			}
			else {
				caracter_raro = true;
			}
		}
		if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
			return true;
		}
	}
	return false;
}