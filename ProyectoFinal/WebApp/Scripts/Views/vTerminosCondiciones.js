function load() { };

//ON DOCUMENT READY
$(document).ready(async function () {

    var result = await fetch('https://localhost:44302/api/parametro', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var tCondiciones = json['Data']['1'];
    document.getElementById('tc').innerHTML = tCondiciones['Valor'];

});
