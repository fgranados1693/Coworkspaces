using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp.Security;

namespace WebApp.Controllers
{
    [SecurityFilter]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return PartialView();
        }

        //----RESERVAS----
        public ActionResult PagarReserva()
        {
            ViewBag.Message = "Página para pagar las reservas que se hayan solicitado";

            return View();
        }

        //----------------


        //----REPORTES----
        public ActionResult vReportes()
        {
            ViewBag.Message = "Página de reportes";

            return View();
        }
        public ActionResult vReporteEspacios()
        {
            ViewBag.Message = "Página de reporte de espacios";

            return View();
        }

        //---------------



        public ActionResult vContacto()
        {
            ViewBag.Message = "Página de contacto";

            return View();
        }
        public ActionResult vSobreNosotros()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult vRegistrarse()
        {
            ViewBag.Message = "Página de registro de usuarios.";

            return View();
        }
        public ActionResult vIniciarSesion()
        {
            ViewBag.Message = "Página de inicio de sesión.";

            return PartialView();
        }

        //--CAMBIO DE CONTRASEÑA--
        public ActionResult OlvidarContrasenna()
        {
            ViewBag.Message = "Página de olvido de contraseña.";

            return View();
        }
        public ActionResult CodigoOlvidoContrasenna()
        {
            ViewBag.Message = "Página de olvido de contraseña.";

            return View();
        }
        public ActionResult CambiarContrasenna()
        {
            ViewBag.Message = "Página de olvido de contraseña.";

            return View();
        }
        //--------------------------
        public ActionResult vPerfilUsuario()
        {
            ViewBag.Message = "Página de perfil del usuario.";

            return View();
        }


        //----PROPIEDADES----
        public ActionResult vPropiedades()
        {
            ViewBag.Message = "Página de propiedades para usuario provisional";

            return View();
        }


        //-------------------


        //----ESPACIOS----
        public ActionResult vRegistrarEspacio1() 
        {
            ViewBag.Message = "Primera página de registro de un espacio.";
            return View();
        }
        public ActionResult vRegistrarEspacio2()
        {
            ViewBag.Message = "Segunda página de registro de un espacio.";
            return View();
        }
        public ActionResult vRegistrarEspacio3()
        {
            ViewBag.Message = "Tercer página de registro de un espacio. Características";
            return View();
        }

        public ActionResult vMantenimientoCaracteristicasEspacio()
        {
            ViewBag.Message = "Página de mantenimiento de las caracteristicas de un espacio.";
            return View();
        }

       

        public ActionResult vMantenimientoEspacios()
        {
            ViewBag.Message = "Página de mantenimiento de espacios.";
            return View();
        }
        public ActionResult vPerfilEspacio()
        {
            ViewBag.Message = "Página de perfil del espacio.";
            return View();
        }
        public ActionResult vEspacios()
        {
            ViewBag.Message = "Página de listado de espacios.";
            return View();
        }
       
        public ActionResult vModificarEspacio()
        {
            ViewBag.Message = "Página de edición de espacio.";
            return View();
        }
        //----------------

        //-----IMPUESTOS-----
        public ActionResult vImpuestos()
        {
            ViewBag.Message = "Página de registro de un impuesto en la aplicación.";
            return View();
        }
        public ActionResult vMantenimientoImpuestos()
        {
            ViewBag.Message = "Página de de mantenimiento de impuestos en la aplicación.";
            return View();
        }

        //--------------------



        // Vista de registro de propiedades desde los perfiles de los usuarios.
        public ActionResult vRegistrarPropiedad()
        {
            ViewBag.Message = "Registro de propiedades desde los perfiles de los usuarios.";

            return View();
        }
        public ActionResult vRegistroUsuario()
        {
            ViewBag.Message = "Página de registro de usuarios.";

            return View();
        }
        public ActionResult vIngresarEmail()
        {
            ViewBag.Message = "Página para ingreso de email.";

            return View();
        }

        public ActionResult vVerificarEmail()
        {
            ViewBag.Message = "Página para verificar codigo de email.";

            return View();
        }
        public ActionResult vIngresarTelefono()
        {
            ViewBag.Message = "Página para ingreso de telefono.";

            return View();
        }

        public ActionResult vVerificarTelefono()
        {
            ViewBag.Message = "Página para verificar codigo de telefono.";

            return View();
        }

        public ActionResult vMantenimientoCategorias()
        {
            ViewBag.Message = "Página mantenimiento categorías, administrador.";

            return View();
        }

        public ActionResult vMantenimientoPropiedades()
        {
            ViewBag.Message = "Página mantenimiento categorías, administrador.";

            return View();
        }

        public ActionResult vMantenimientoParametros()
        {
            ViewBag.Message = "Página mantenimiento parámetros, administrador.";

            return View();
        }

        public ActionResult vModificarPropiedad()
        {
            ViewBag.Message = "Página modificación propiedad, administrador.";

            return View();
        }

        public ActionResult vPerfilPropiedad()
        {
            ViewBag.Message = "Página perfil propiedad. ";

            return View();
        }

        public ActionResult vCambiarContrasenna()
        {
            ViewBag.Message = "Página para cambiar contrasenna.";

            return View();
        }

        public ActionResult vPerfilUsuarioOtro()
        {
            ViewBag.Message = "Página para ver perfil de otro usuario.";

            return PartialView();
        }

        public ActionResult vModificarPerfilUsuario()
        {
            ViewBag.Message = "Página de modificar perfil del usuario.";

            return View();
        }

        public ActionResult vListarUsuarios()
        {
            ViewBag.Message = "Página de listar usuarios.";

            return View();
        }

        public ActionResult vRegistrarComision()
        {
            ViewBag.Message = "Página de registro de comision.";

            return View();
        }

        public ActionResult vListarMembresias()
        {
            ViewBag.Message = "Página de listado de membresias.";

            return View();
        }

        public ActionResult vPagarMembresia()
        {
            ViewBag.Message = "Página de pago de membresia.";

            return View();
        }
        public ActionResult vRegistroPropiedadSolicitud()
        {
            ViewBag.Message = "Página de registro de propiedad de solicitud.";
            return View();
        }
        public ActionResult vMantenimientoHorarios()
        {
            ViewBag.Message = "Página de mantenimiento de horarios.";

            return View();
        }

        public ActionResult vBitacora()
        {
            ViewBag.Message = "Página de descarga de la bitácora.";

            return View();
        }


        public ActionResult vRecargarMonedero()
        {
            ViewBag.Message = "Página para recargar monedero.";

            return View();
        }

        public ActionResult vRegistrarFotoPerfil()
        {
            ViewBag.Message = "Página de registro de foto de perfil.";

            return View();
        }

        public ActionResult vListarFacturas()
        {
            ViewBag.Message = "Página para listar facturas.";

            return View();
        }

        public ActionResult vPerfilFactura()
        {
            ViewBag.Message = "Página para perfil de facturas.";

            return View();
        }
        public ActionResult vModificarEmail1()
        {
            ViewBag.Message = "Página para modificar email.";

            return View();
        }
        public ActionResult vModificarEmail2()
        {
            ViewBag.Message = "Página para modificar email.";

            return View();
        }
        public ActionResult vModificarTelefono1()
        {
            ViewBag.Message = "Página para modificar telefono.";

            return View();
        }
        public ActionResult vModificarTelefono2()
        {
            ViewBag.Message = "Página para modificar telefono.";

            return View();
        }

        /**
         * 
         * Solicitudes
         * 
         **/
        public ActionResult vListarSolicitudes()
        {
            ViewBag.Message = "Página para listar solicitudes.";

            return View();
        }

        public ActionResult vRegistrarFotoPropiedad()
        {
            ViewBag.Message = "Página para registrar las fotos de una propiedad.";

            return View();
        }

        public ActionResult vRegistrarDocumentoPropiedad()
        {
            ViewBag.Message = "Página para registrar los documentos de una propiedad.";

            return View();
        }

        public ActionResult vRevisarSolicitud()
        {
            ViewBag.Message = "Página para revisar solicitud.";

            return View();
        }

        public ActionResult vResponderSolicitud()
        {
            ViewBag.Message = "Página para responder solicitud.";

            return View();
        }

        public ActionResult vRegistrarPropiedadAdmin()
        {
            ViewBag.Message = "Página para registrar propiedades admin.";

            return View();
        }

        public ActionResult vTerminosCondiciones()
        {
            ViewBag.Message = "Página para de terminos y condiciones.";

            return View();
        }

        public ActionResult vRegistrarFotoPropiedadSolicitud()
        {
            ViewBag.Message = "Página para registrar las fotos de una propiedad.";

            return View();
        }

        public ActionResult vRegistrarDocumentoPropiedadSolicitud()
        {
            ViewBag.Message = "Página para registrar los documentos de una propiedad.";

            return View();
        }

        public ActionResult vPerfilSolicitud()
        {
            ViewBag.Message = "Página para responder solicitud.";

            return View();
        }

        public ActionResult vPerfilUsuarioPublico()
        {
            ViewBag.Message = "Página de perfil de usuario publico.";

            return View();
        }

        public ActionResult vModificarComision()
        {
            ViewBag.Message = "Página para modificar comision.";

            return View();
        }

        public ActionResult vListarConversaciones()
        {
            ViewBag.Message = "Página para listar conversaciones.";

            return View();
        }

        public ActionResult vConversacion()
        {
            ViewBag.Message = "Página de una conversacion.";

            return View();
        }

        public ActionResult vEnviarQRTest()
        {
            ViewBag.Message = "Test de envío de QR via email.";

            return View();
        }

        public ActionResult vPerfilPropiedadPublico()
        {
            ViewBag.Message = "Perfil propiedad publico";

            return View();
        }

        public ActionResult vListarReservas()
        {
            ViewBag.Message = "Página de listar reservas.";

            return View();
        }

        public ActionResult vReporteIngresos()
        {
            ViewBag.Message = "Página de reporte de ingresos.";

            return View();
        }

        public ActionResult vReporteIngresosPropietario()
        {
            ViewBag.Message = "Página de reporte de ingresos de un propietario.";

            return View();
        }

        public ActionResult vCalificarUsuario()
        {
            ViewBag.Message = "Página para calificar usuario.";

            return View();
        }
        public ActionResult vCalificarPropiedad()
        {
            ViewBag.Message = "Página para calificar propiedad.";

            return View();
        }
        public ActionResult vReporteUsuarios()
        {
            ViewBag.Message = "Página de reporte de usuarios.";

            return View();
        }

    }
}