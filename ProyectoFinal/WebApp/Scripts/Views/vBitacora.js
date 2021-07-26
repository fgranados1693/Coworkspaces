function vBitacora() {
	
	this.service = 'bitacora';
	this.ctrlActions = new ControlActions();
	var botton = document.querySelector('button');
	var input = document.querySelector('input');
	

		

	
	this.Abrir = function () {
		var abc = 'C:/_temp/ulogs/';
		
		var file = document.getElementById("fileBitacora").value;
		
		
	}
	this.Descargar = function () {
		var abc = 'C:/_temp/ulogs/';

		
	}

    const [input, select, textarea, reader] = [
        document.querySelector("input[type=file]")
        , document.querySelector("select")
        , document.querySelector("textarea")
        , new FileReader
    ];
    let [files, data, fn] = [
        [],
        [], (file, reader) => new Promise((resolve, reject) => {
            reader.onload = () => {
                reader.onload = reader.onerror = null;
                resolve(reader.result);
            }
            reader.onerror = reject;
            reader.readAsText(file);
        })
    ];
    input.onchange = async () => {
        select.innerHTML = "";
        files.length = data.length = 0;
        for (const file of input.files) {
            const {
                name
            } = file;
            const option = new Option(name, files.length);
            files.push(file);
            select.appendChild(option);
            let result = await fn(file, reader);
            data.push(result);
        }
    }

    select.onchange = () => {
        textarea.value = data[select.value];
    }

	}