let numero_pagina = 1;
let pagina_actual = 1;
let cant_paginas = 0;
let cantidad_espacios;
let contador_paginas = 0;
let contador_cartas = 0;
let cociente_paginas;
let residuo_paginas;

let pagination_cnt;

let previousBtn = '<li class="page-item"><a class="page-link"  id="previousBtn"> << </a></li>'

let nextBtn = '<li class="page-item"><a class="page-link" href="#" id="nextBtn"> >> </a></li>';

//SIRVEN PARA GUARDAR LAS FOTOS DE UN ESPACIO PARA EL CARROUSEL 
//let arrayFotosEspacio = [];

//CARROUSEL
var slidesId = [];

//PERMITE GUARDAR ARRAYS Y OBJETOS EN LOCALSTORAGE
Storage.prototype.setObj = function (key, obj) {

    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let reservas_local = [];

let reserva_template = {
    Id_Usuario: "",
    Id_Espacio: "",
    Nombre_Espacio: "",
    Fecha: "",
    Hora_Entrada: "",
    Hora_Salida: "",
    Calificacion_Usuario: "0",
    Calificacion_Propietario: "0",
    Calificacion_Propiedad: "0",
    Monto: "",
    Estado: ""
};

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 9.934739, lng: -84.087502 },
        zoom: 10,
    });
}

function load() {
    
    
}
//RUEDA DE CARGA DE LA PÁGINA
if ($(".append-here").length != 0) {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function () {

        setTimeout(removeLoader, 2500); //carga la página y agrega 2 segundos y medio
    });
    function removeLoader() {
        //console.log("si");

        $("#loadingDiv").fadeOut(500, function () {

            // fadeOut complete. Remove the loading div
            $("#loadingDiv").remove(); //makes page more lightweight 
        });
    }
}

$(document).ready(async function () {

    

    console.log("load ejecutado");
    pagination_cnt = document.getElementById('pg-cnt');

    this.ctrlActions = new ControlActions();
    this.servicePropiedad = "propiedad";
    this.service = "espacio";
    this.serviceFoto = "documento";
    this.serviceFotoEspacio = "documentoespacio";
    this.serviceCategoria = "categoria";

    this.espacios = this.ctrlActions.GetToApiFuncional(this.service);

    cociente_paginas = Math.floor(this.espacios.Data.length / 9);
    residuo_paginas = this.espacios.Data.length % 9
    cantidad_espacios = this.espacios.Data.length;
    //console.log(this.espacios.Data.length);
    let cardContentForFilling = '<div class="d-flex flex-col-md-4"><div class="card mb-4 box-shadow"><div class="card-body"><p class="card-text"> </p></div></div></div>';
    let cardExample = '<div class="card" style="width: 10rem;"><img class="card-img-top" src = "" alt = "Card image cap"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p></div><ul class="list-group list-group-flush"><li class="list-group-item">Cras justo odio</li><li class="list-group-item">Dapibus ac facilisis in</li><li class="list-group-item">Vestibulum at eros</li></ul><div class="card-body"><a href="#" class="card-link">Card link</a><a href="#" class="card-link">Another link</a></div></div >';

    let contadorEspacios = 0;
    let arrayCardsEspacios = [];

    let latitud;
    let longitud;
    //FOTO
    for (let i = 0; i < this.espacios.Data.length; i++) {
        contadorEspacios += 1;
        //ASIGNAR NOMBRE PROPIEDAD
        this.propiedades = this.ctrlActions.GetToApiFuncional(this.servicePropiedad);
        Array.from(this.propiedades.Data).forEach(propiedad => {
            if (this.espacios.Data[i].Id_Propiedad == propiedad.IdPropiedad) {
                this.espacios.Data[i]["Propiedad"] = propiedad.Nombre;
                latitud = propiedad.Latitud;
                longitud = propiedad.Longitud;
            }
        });


        //OBTENER LAS FOTOS
        let fotos = this.ctrlActions.GetToApiFuncional(this.serviceFoto);
        let fotosEspacio = this.ctrlActions.GetToApiFuncional(this.serviceFotoEspacio);
        //console.log(fotos);

        let arrayFotosEsp = [];
        
        //BUSCA LA FOTO RECIEN CREADA
        Array.from(fotos.Data).forEach(foto => {
            Array.from(fotosEspacio.Data).forEach(fotoEsp => {
                let contadorFotos = 1;
                //COMPARA EN DOCUMENTOS_ESPACIO SI ES EL MISMO ESPACIO
                if (fotoEsp.Id_Espacio == this.espacios.Data[i].Id_Espacio) {
                    
                    //COMPARA SI LA FOTO ES DEL ESPACIO
                    if (foto.Id_Documento == fotoEsp.Id_Documento) {
                        //console.log(foto, fotoEsp);
                        let objFotoEspacio = {};
                        this.espacios.Data[i]["Foto_URL"] = foto.URL;

                        objFotoEspacio["Id_Espacio"] = fotoEsp.Id_Espacio;
                        objFotoEspacio["Foto"] = contadorFotos;
                        objFotoEspacio["URL"] = foto.URL;
                        //console.log(objFotoEspacio);
                        //arrayFotosEspacio.push(objFotoEspacio);
                        
                        arrayFotosEsp.push(objFotoEspacio);
                        
                        contadorFotos += 1;
                    }
                }
            });
            //console.log(arrayFotosEspacio);
        });

        //CATEGORIAS
        this.categorias = this.ctrlActions.GetToApiFuncional(this.serviceCategoria);
        for (let c = 0; c < this.categorias.Data.length; c++) {
            //console.log(this.espacios.Data[i]);
            //console.log(cat);

            if (this.espacios.Data[i].Id_Categoria == this.categorias.Data[c].IdCategoria) {
                this.espacios.Data[i]["Categoria"] = this.categorias.Data[c].Nombre;
                break;
            } else {
                this.espacios.Data[i]["Categoria"] = "Estándar";
            }
        }


        //CARACTERISTICAS
        this.serviceCaracteristicas = 'caracteristicaespacio/caracteristicaespacio?idEspacio=' + this.espacios.Data[i].Id_Espacio;
        this.caracteristicas = this.ctrlActions.GetToApiFuncional(this.serviceCaracteristicas);

        //console.log(arrayFotosEsp);
        let card = await BuildContent(this.espacios.Data[i], i, arrayFotosEsp, latitud, longitud);
        arrayCardsEspacios.push(card);
        //console.log(arrayFotosEsp);
        $('.append-here').append(card);

        let carousel = '#CarouselEspacio_' + i;
        $(carousel).show();
        //$(carousel).carousel();
        //$('.carousel').carousel();

        /*
        let cards = $('.card-text');
        cards.eq(i).html((this.espacios.Data[i]["Nombre"]));
        */
    }

    

    //---PAGINACIÓN---

    if (residuo_paginas == 0) {
        cant_paginas = cociente_paginas;
    } else {
        cant_paginas = cociente_paginas + 1;
    }



    //Esconder las demas Cartas
    for (let i = 9; i < this.espacios.Data.length; i++) {
        $('#carta' + i).hide();
    }

    //Botones paginación
    //console.log(pagination_cnt);
    $("#pg-cnt").append(previousBtn);
    //pagination_cnt.append(previousBtn);
    for (let i = 1; i <= cant_paginas; i++) {
        let pageItem = '<li class="page-item"><a class="page-link" href="#" id="number-item">' + i + '</a></li>';
        $("#pg-cnt").append(pageItem);
        //pagination_cnt.append(pageItem);
    }
    $("#pg-cnt").append(nextBtn);
    //pagination_cnt.append(nextBtn);


    /*
    $('.carousel').carousel({
        
        interval: 2000
    });*/
    //FUNCIONALIDAD BOTON PREVIOUS
    $('#pg-cnt').on("click", '#previousBtn', function (e) {
        previousBtnAction();
    });
    //FUNCIONALIDAD BOTON DE PAGINA 
    $('#pg-cnt').on("click", '#number-item', function (e) {
        btnPaginaAction($(this).text());
    });
    //FUNCIONALIDAD BOTON NEXT
    $('#pg-cnt').on("click", '#nextBtn', function (e) {
        nextBtnAction();
    });

    //PROPIEDADES EN EL MAPA
    await FillMap();

});

//AGREGA LAS PROPIEDADES AL MAPA
async function FillMap() {
    var propiedades = await getPropiedades();
    console.log(propiedades)
    for (i in propiedades) {
        var myLatlng = new google.maps.LatLng(propiedades[i]['Latitud'], propiedades[i]['Longitud']);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: propiedades[i]['Nombre'],
            id: propiedades[i]['IdPropiedad']
        });

        google.maps.event.addListener(marker, 'click', function (marker) {
            return function () {
                console.log(marker.id);
                localStorage.setItem("idPropiedadPerfil", marker.id);
                window.location.href = "vPerfilPropiedadPublico";
            }
        }(marker));

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    }

}

function PerfilPropiedad(marker) {
    console.log(marker);
    //var id = e.id;
    //localStorage.setItem("idPropiedadPerfil", id);
    //window.location.href = "vPerfilPropiedadPublico";
}

async function getPropiedades() {

    var result = await fetch('https://localhost:44302/api/propiedad', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];

}

//BOTON DE PAGINA ANTERIOR
function previousBtnAction() {
    document.getElementById("searchPrecio").value = "";
    //console.log(pagina_actual);
    if (pagina_actual != 1) {
        //QUITAMOS LAS CARTAS ACTUALES
        for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
            //console.log(i);
            $('#carta' + i).hide();
        }

        //AÑADIMOS LAS ANTERIORES
        for (let i = 9 * (pagina_actual - 2); i < 9 * (pagina_actual - 1); i++) {
            $('#carta' + i).show();
            //let carousel = '#CarouselEspacio_' + i;
            //$(carousel).show();
        }
        pagina_actual -= 1;
    }
}

//BOTON DE PAGINA ESPECIFICA
function btnPaginaAction(anchorValue) {
    //console.log(anchorValue);
    //console.log(pagina_actual);
    
    document.getElementById("searchPrecio").value = "";
    if (pagina_actual != anchorValue) {
        //console.log("entra");
        //QUITAMOS LAS CARTAS ACTUALES
        for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
            $('#carta' + i).hide();
        }

        //AÑADIMOS LAS CARTAS DE LA PAGINA SELECCIONADA
        for (let i = 9 * (anchorValue - 1); i < 9 * anchorValue; i++) {
            let carousel = '#CarouselEspacio_' + i;
            //console.log(carousel);
            //$(carousel).show();
            $('#carta' + i).show();
            
        }

        pagina_actual = anchorValue;
        
    }
   
}
//BOTON DE PAGINA POSTERIOR
function nextBtnAction() {
    //e.preventDefault();
    document.getElementById("searchPrecio").value = "";
    //console.log(pagina_actual, cant_paginas);
    if (pagina_actual != cant_paginas) {
        
        //QUITAMOS LAS CARTAS ACTUALES
        for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
            $('#carta' + i).hide();
        }

        //AÑADIMOS LAS SIGUIENTES
        for (let i = 9 * pagina_actual; i < 9 * (pagina_actual + 1); i++) {
            $('#carta' + i).show();
            //let carousel = '#CarouselEspacio_' + i;
            //$(carousel).show();
        }

        pagina_actual += 1;
    }

}

//FILTROS
function filtro() {
    document.getElementById("searchPrecio").value = "";
    var input, filter, cards, cardContainer, h5, title, i, propiedad, categoria;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    cardContainer = document.querySelector(".append-here");
    cards = cardContainer.getElementsByClassName("card");
    //for (i = 0; i < cards.length; i++) {
    for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
        if (i < cantidad_espacios) {
            
            propiedad = cards[i].querySelector(".card-body p.card-text.propiedad");
            title = cards[i].querySelector(".card-body h5.card-title");
            categoria = cards[i].querySelector(".list-group li.list-group-item.categoria");
            let categoriaExtraida = categoria.innerText.substr(11);
            //console.log(categoriaExtraida);
            if (title.innerText.toUpperCase().indexOf(filter) > -1 || propiedad.innerText.toUpperCase().indexOf(filter) > -1 || categoriaExtraida.toUpperCase().indexOf(filter) > -1) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        }
    }
    
}
function quitarFiltro() {
    document.getElementById("search").value = "";
    var input, filter, cards, cardContainer, h5, precio, i, propiedad;
    input = document.getElementById("search");
    input.value = "";
    cardContainer = document.querySelector(".append-here");
    cards = cardContainer.getElementsByClassName("card");
    //for (i = 0; i < cards.length; i++) {
    for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
        if (i < cantidad_espacios) {
            cards[i].style.display = "";
        }
    }
}


//filtro por precio
function filtroPrecio() {
    document.getElementById("search").value = "";
    var input, filter, cards, cardContainer, h5, precio, i, propiedad;
    input = document.getElementById("searchPrecio");
    cardContainer = document.querySelector(".append-here");
    cards = cardContainer.getElementsByClassName("card");
    //for (i = 0; i < cards.length; i++) {
    
    for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
        
        if (i < cantidad_espacios) {
            precio = cards[i].querySelector(".list-group li.list-group-item.precio");
            
            let precioExtraido = parseInt(precio.innerText.substr(9));
            //console.log(precio.innerText);
            //console.log(precioExtraido, input.value);
            if (precioExtraido <= parseInt(input.value)) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        }

    }
}
function quitarFiltroPrecio() {

    var input, filter, cards, cardContainer, h5, precio, i, propiedad;
    input = document.getElementById("searchPrecio");
    input.value = "";
    cardContainer = document.querySelector(".append-here");
    cards = cardContainer.getElementsByClassName("card");
    //for (i = 0; i < cards.length; i++) {
    for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
        if (i < cantidad_espacios) {
            cards[i].style.display = "";
        }
    }
}



/*
function filtroPrecio() {
    var input, filter, cards, cardContainer, h5, precio, i, propiedad;
    input = document.getElementById("searchPrecio");
    filter = input.value.toUpperCase();
    cardContainer = document.querySelector(".append-here");
    cards = cardContainer.getElementsByClassName("card");
    //for (i = 0; i < cards.length; i++) {
    for (let i = 9 * (pagina_actual - 1); i < 9 * pagina_actual; i++) {
        precio = cards[i].querySelector(".list-group li.list-group-item");
        console.log(precio.innerText.toUpperCase().indexOf(filter));
        if (precio.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }

}*/


//CREA LAS CARTAS
async function BuildContent(data, contador, arrayFotosEspacio, latitud, longitud) {
    var cardTemplate = "";
    var idEspacio = data['Id_Espacio'];
    var idPropiedad = data['Id_Propiedad'];
    var fotoEspacio = data['Foto_URL'];
    //console.log(fotoEspacio);
    //PARA QUE NO TIRE ERROR POR URL
    if (typeof fotoEspacio == "undefined" || fotoEspacio.length <= 50 ) {
        fotoEspacio = ""
    }
    var categoria = data['Categoria'];
    var nombre = data['Nombre'];
    var propiedad = data['Propiedad'];
    var reembolso = data['Permite_Reembolso'];
    if (reembolso == "true") {
        reembolso = "Sí";
    } else if(reembolso == "false"){
        reembolso = "No"
    }
    var cancelacion = data['Permite_Cancelacion'];
    if (cancelacion == "true") {
        cancelacion = "Sí";
    } else if (cancelacion == "false") {
        cancelacion = "No"
    }
    var precio = data['Precio'];

    
    var ubicacion = await getUbicacion(latitud, longitud);;
    //console.log(ubicacion);

    //IMPLEMENTACIÓN CARROUSEL
    let divCarruselPrueba = '<div id="CarouselEspacio_' + data["Id_Espacio"] + '" class="carousel slide carousel-fade" data-ride="carousel style="display: block;">';
    divCarruselPrueba += '<div class="carousel-inner>';
    let imagenCarrusel = "";

    //<div class="card" style="width: 20rem;" id="carta' + contador + '">'
    let divCard = document.createElement('div');
    divCard.className = "card";
    divCard.style = "width: 20rem;";
    divCard.id = "carta" + contador;

    //let idCarrusel = 'CarouselEspacio_' + data["Id_Espacio"] + '';
    //ID DEL CAROUSEL MEJOR CON EL MISMO CONTADOR QUE LA CARTA Y NO CON EL ID DEL ESPACIO
    let idCarrusel = 'CarouselEspacio_' + contador + '';
    let divCarrusel = document.createElement('div');
    
    divCarrusel.id = idCarrusel;
    divCarrusel.className = "carousel slide carousel-fade";
    divCarrusel.setAttribute('data', "ride: 'carousel'");

    let innerDivCarousel = document.createElement('div');
    innerDivCarousel.className = "carousel-inner";

    //console.log(arrayFotosEspacio);
    for (let i = 0; i < arrayFotosEspacio.length; i++) {
        
        if (arrayFotosEspacio[i]["Id_Espacio"] == idEspacio) {
            //console.log(arrayFotosEspacio[i]["Id_Espacio"], idEspacio);
            let divImg = document.createElement('div');
            if (i == 0) {
                divImg.className = "carousel-item active";
            } else {
                divImg.className = "carousel-item  ";
            }
            

            let img = document.createElement('img');
            img.id = "Foto" + i;
            img.src = arrayFotosEspacio[i]["URL"];
            //console.log(arrayFotosEspacio);
            img.className = "d-block";
            img.style = "height: 15rem; width: 20rem;";

            divImg.append(img);
            innerDivCarousel.appendChild(divImg);
            

        }
    }

    divCarrusel.appendChild(innerDivCarousel);
    //divCard.appendChild(divCarrusel);

    //PREVIOUS BTN
    let idCarruselJquery = "#" + idCarrusel;
    let previousBtn = document.createElement('a');
    previousBtn.href = "#" +idCarrusel;
    previousBtn.className = "carousel-control-prev";
    
    previousBtn.onclick = function (e) {
        e.stopPropagation();
        //console.log("evento prev");
        $(idCarruselJquery).carousel("prev");
        return false;
    }
    previousBtn.dataset.target = idCarrusel;
    let span1Prev = document.createElement('span');
    span1Prev.className = "carousel-control-prev-icon";
    span1Prev.setAttribute('aria-hidden', 'true');
    let span2Prev = document.createElement('span');
    span2Prev.className = "sr-only";
    span2Prev.innerHTML = "Previous";

    previousBtn.appendChild(span1Prev);
    previousBtn.appendChild(span2Prev);

    //NEXT BTN
    let nextBtn = document.createElement('a');
    nextBtn.href = "#"+idCarrusel;
    nextBtn.className = "carousel-control-next";
    nextBtn.onclick = function (e) {
        //console.log("evento next");
        e.stopPropagation();
        $(idCarruselJquery).carousel("next");
        return false;
    }
    nextBtn.dataset.target = idCarrusel;
    let span1Next = document.createElement('span');
    span1Next.className = "carousel-control-next-icon";
    span1Next.setAttribute('aria-hidden', 'true');
    let span2Next = document.createElement('span');
    span2Next.className = "sr-only";
    span2Next.innerHTML = "Next";

    nextBtn.appendChild(span1Next);
    nextBtn.appendChild(span2Next);

    //SE AÑADEN A EL CAROUSEL LOS BOTONES DE NAVEGACION
    divCarrusel.appendChild(previousBtn);
    divCarrusel.appendChild(nextBtn);

    //SE AÑADE EL CAROUSEL A LA CARTA
    divCard.appendChild(divCarrusel);

    //SE PROCEDE A AÑADIR EL RESTO DE LA INFO DE LA CARTA
    let divBodyTitulos = document.createElement('div');
    divBodyTitulos.className = "card-body";
    let nombreCard = document.createElement('h5');
    nombreCard.className = "card-title";
    nombreCard.innerHTML = nombre;
    let propiedadCard = document.createElement('p');
    propiedadCard.className = "card-text propiedad";
    propiedadCard.innerHTML = "Propiedad: " + propiedad;

    divBodyTitulos.appendChild(nombreCard);
    divBodyTitulos.appendChild(propiedadCard);

    divCard.appendChild(divBodyTitulos);

    let listaItemsEspacio = document.createElement('ul');
    listaItemsEspacio.className = "list-group list-group-flush";
    let itemCategoria = document.createElement('li');
    itemCategoria.className = "list-group-item categoria";
    itemCategoria.innerHTML = "Categoría: " + categoria;
    let itemPrecio = document.createElement('li');
    itemPrecio.className = "list-group-item precio";
    itemPrecio.innerHTML = "Precio: ₡" + precio;
    let itemUbicacion = document.createElement('li');
    itemUbicacion.className = "list-group-item ubicacion";
    itemUbicacion.innerHTML = "Ubicación: " + ubicacion;

    listaItemsEspacio.appendChild(itemCategoria);
    listaItemsEspacio.appendChild(itemPrecio);
    listaItemsEspacio.appendChild(itemUbicacion);

    divCard.appendChild(listaItemsEspacio);

    //LINKS A LOS PERFILES DEL ESPACIO Y PROPIEDAD
    let divBodyLinks = document.createElement('div');
    divBodyLinks.className = "card-body";
    let linkPerfilEspacio = document.createElement('a');
    linkPerfilEspacio.href = "vPerfilEspacio";
    linkPerfilEspacio.className = "card-link espacio";
    linkPerfilEspacio.id = idEspacio;
    linkPerfilEspacio.innerHTML = "Ver espacio";
    let linkPerfilPropiedad = document.createElement('a');
    linkPerfilPropiedad.href = "vPerfilPropiedadPublico";
    linkPerfilPropiedad.className = "card-link propiedad";
    linkPerfilPropiedad.id = idPropiedad;
    linkPerfilPropiedad.innerHTML = "Ver propiedad";

    divBodyLinks.append(linkPerfilEspacio);
    divBodyLinks.appendChild(linkPerfilPropiedad);
    divCard.appendChild(divBodyLinks);


    /*
    cardTemplate = '<div class="card" style="width: 20rem;" id="carta'+contador+'">' +
        '<img class="card-img-top" src="' + fotoEspacio + '" alt="No se puede mostrar la imagen">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + nombre + '</h5>' +
        '<p class="card-text propiedad">Propiedad: ' + propiedad + '</p>' +
        
        '</div>' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item categoria">Categoría: ' + categoria + '</li>' +
        '<li class="list-group-item precio">Precio: ₡' + precio + '</li>' +
        '<li class="list-group-item">Ubicación:' + ubicacion + '</li>' +
        '</ul>' +
        '<div class="card-body">' +
        '<a href="vPerfilEspacio" class="card-link espacio" id="' + idEspacio +'">Ver espacio</a>' +
        '<a href="vPerfilPropiedad" class="card-link propiedad" id="' + idPropiedad +'">Ver propiedad</a>' +
        '</div>' +
        '</div>'
        */
    return divCard;
}

async function getUbicacion(lat, long) {
    //https://api.opencagedata.com/geocode/v1/json?q=9.92290267509513%2C+-84.1369404765625&key=8adb04afd7674fb18345c5f2e3726aad&pretty=1
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=9.92290267509513,-84.1369404765625&key=AIzaSyBnFaIV-ILZlQ8HjnY3x0DwfG3MP2lkj30
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
        + lat + "," + long + "&key=AIzaSyBnFaIV-ILZlQ8HjnY3x0DwfG3MP2lkj30";
    //8adb04afd7674fb18345c5f2e3726aad

    var result = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
    var json = await result.json();
    console.log(json);
    var loc1;
    loc1 = json.results[0];
    console.log(lat, long);
    
    return loc1["formatted_address"];
}

//ESTABLECE EL ID DEL ESPACIO O PROPIEDAD EN QUE SE HIZO CLICK
$(document).on('click', 'a', function () {
    //alert(this.id);
    //alert(this.href);
    if (this.href == "https://localhost:44376/Home/vPerfilEspacio") {
        localStorage.setItem('idEspacioPerfil', this.id);
    }
    if (this.href == "https://localhost:44376/Home/vPerfilPropiedadPublico") {
        localStorage.setItem('idPropiedadPerfil', this.id);
    }
    
});


