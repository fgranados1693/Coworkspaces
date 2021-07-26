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
    public class RolUsuarioController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todas las relaciones de rol usuario registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las relaciones de rol usuario registradas en la base de datos o un error si ocurre un error al intentar buscar las relaciones</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new RolUsuarioManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar todas las relaciones rol usuario de un usuario en especifico
        /// </summary>
        /// <param name="idUsuario">id del usuario cuyas relaciones se quieren buscar</param>
        /// <returns>Lista de todas las relaciones del usuario  o un error si ocurre un error al intentar buscar las relaciones</returns>
        public IHttpActionResult Get(string idUsuario)
        {
            try
            {
                var mng = new RolUsuarioManager();
                var rolUsuario = new RolUsuario
                {
                    Id_Usuario = Int32.Parse(idUsuario)
                };

                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveByIdUsuario(rolUsuario);

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar una nueva relacion rol usuario en la base de datos
        /// </summary>
        /// <param name="rolUsuario">Instancia de un objeto RolUsuario que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar registrar la relacion</returns>
        public IHttpActionResult Post(RolUsuario rolUsuario)
        {

            try
            {
                var mng = new RolUsuarioManager();
                mng.Create(rolUsuario);

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
        /// Metodo para actualizar una relacion rol usuario registrada en la base de datos
        /// </summary>
        /// <param name="rolUsuario">Instancia de rol usuario que se quiere actualizar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar actualizar la relacion</returns>
        public IHttpActionResult Put(RolUsuario rolUsuario)
        {
            try
            {
                var mng = new RolUsuarioManager();
                mng.Update(rolUsuario);

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
        /// Metodo para eliminar una relacion rol usuario de la base de datos
        /// </summary>
        /// <param name="rolUsuario">Instacia de RolUsuario que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar eliminar la relacion</returns>
        public IHttpActionResult Delete(RolUsuario rolUsuario)
        {
            try
            {
                var mng = new RolUsuarioManager();
                mng.Delete(rolUsuario);

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