const imgpreview = document.getElementById('img_preview');
const uploader_documento = document.getElementById('img_uploader_documento');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'cloudinary://365654675247362:VoINbzNYtWSgn5_xKACfLmvC4x8@coworkspaces';
const CLOUDINARY_UPLOAD_PRESET = 'xxkab0dx';

const img_uploader_documento = document.querySelector('#documento');

$(function () {
    let imagenUrl = '';

    //ConfiguracionCloudinary
    //with credentials available on
    // your cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'coworkspaces', api_key: '365654675247362' });

    //Upload button
    let uploadButton = $('#btnSeleccionarImagen');

    //Upload button event
    uploadButton.on('click', function (e) {
        //Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'coworkspaces', upload_preset: 'xxkab0dx', tags: ['cgal'] },
            function (error, result) {
                if (error) console.log(error);
                //if no Error, log img data to console
                let id = result[0].public_id;
                imagenUrl = 'https://res.cloudinary.com/coworkspaces/image/upload/' + id;
                document.querySelector('#documento').src = imagenUrl;
            });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return $.cloudinary.url(id, options);
};

