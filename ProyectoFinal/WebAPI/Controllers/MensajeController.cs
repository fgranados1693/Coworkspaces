using CoreAPI;
using Entities_POJO;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
namespace WebAPI.Controllers
{
    public class MensajeController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los mensajes registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los mensajes registrados en la base de datos</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new MensajeManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar todas las conversaciones de un usuario
        /// </summary>
        /// <param name="mensaje">Instancia de mensaje con el id del usuario</param>
        /// <returns>Lista de conversaciones de un usuario</returns>
        public IHttpActionResult Get(string idUsuario)
        {
            try
            {
                var mng = new MensajeManager();
                var mensaje = new Mensaje
                {
                    Id_Usuario_Emisor = Int32.Parse(idUsuario),
                    Id_Usuario_Receptor = Int32.Parse(idUsuario)
                };

                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveByIdUsuario(mensaje);

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar un nuevo mensaje en la base de datos
        /// </summary>
        /// <param name="mensaje">Instancia del mensaje que se quiere registrar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar registrar la mensaje</returns>
        public IHttpActionResult Post(Mensaje mensaje)
        {

            try
            {
                var mng = new MensajeManager();
                mng.Create(mensaje);

                apiResp = new ApiResponse();
                apiResp.Message = "Action was executed.";

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-"
                    + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para eliminar una conversacion de la base de datos
        /// </summary>
        /// <param name="mensaje">Instancia de mensaje con los id de los usuarios</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar eliminar la mensaje</returns>
        public IHttpActionResult Delete(Mensaje mensaje)
        {
            try
            {
                var mng = new MensajeManager();
                mng.Delete(mensaje);

                apiResp = new ApiResponse();
                apiResp.Message = "Action was executed.";

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }

        }
    }
}