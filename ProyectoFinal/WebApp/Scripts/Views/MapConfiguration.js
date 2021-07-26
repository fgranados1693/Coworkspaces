function initMap() {
    let map;
    let latitude = 9.934739; 
    let longitude = -84.087502; 

    let myLatLng = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 10,
        disableDoubleClickZoom: true
    });

    let marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {

        let valuelatitud = marker.getPosition().lat();       
        document.getElementById("Latitud").value = valuelatitud;      
        localStorage.setItem("latitud", valuelatitud);

        let valuelongitud = marker.getPosition().lng();
        document.getElementById("Longitud").value = valuelongitud;
        localStorage.setItem("longitud", valuelongitud);

    });
}