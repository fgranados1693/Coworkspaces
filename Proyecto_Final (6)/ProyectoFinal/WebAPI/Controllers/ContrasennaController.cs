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
    public class ContrasennaController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todas las contrasennas registradas en la aplicacion
        /// </summary>
        /// <returns>Lista de todas las contrasennas registradas en la aplicacion</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new ContrasennaManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar todas las contrasennas segun el id del usuario
        /// </summary>
        /// <param name="idUsuario">id del usuario del cual se quieren buscar la contrasennas</param>
        /// <returns>Lista de todas las contrasennas registradas con el id del usuario recibido</returns>
        public IHttpActionResult Get(int idUsuario)
        {
            try
            {
                var mng = new ContrasennaManager();
                var contrasenna = new Contrasenna
                {
                    Id_Usuario = idUsuario
                };

                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveByIdUsuario(contrasenna);

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar una nueva contrasenna 
        /// </summary>
        /// <param name="contrasenna">Instancia de la contrasenna que se quiere registrar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar registrar la contrasenna</returns>
        public IHttpActionResult Post(Contrasenna contrasenna)
        {

            try
            {
                var mng = new ContrasennaManager();
                mng.Create(contrasenna);

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
        /// Metodo para actualizar una contrasenna registrada en la base de datos
        /// </summary>
        /// <param name="contrasenna">Instancia de la contrasenna que se quiere actualizar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar actualizar la contrasenna</returns>
        public IHttpActionResult Put(Contrasenna contrasenna)
        {
            try
            {
                var mng = new ContrasennaManager();
                mng.Update(contrasenna);

                apiResp = new ApiResponse();
                apiResp.Message = "Action was executed.";

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para eliminar una contrasenna de la base de datos
        /// </summary>
        /// <param name="contrasenna">Instancia de la contrasenna que se quiere eliminar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar eliminar la contrasenna</returns>
        public IHttpActionResult Delete(Contrasenna contrasenna)
        {
            try
            {
                var mng = new ContrasennaManager();
                mng.Delete(contrasenna);

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