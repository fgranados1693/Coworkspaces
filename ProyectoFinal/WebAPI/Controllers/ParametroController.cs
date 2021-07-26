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
    [ExceptionFilter]
    public class ParametroController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los parametros registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los parametros registrados en la base de datos o un error si ocurre un error al intentar buscar los parametros</returns>


        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new ParametroManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar un parametro en la base de datos
        /// </summary>
        /// <param name="id">id de una parametro que se quiere buscar</param>
        /// <returns>Instancia completa de una parametro que se quiere buscar o un error si ocurre un error al intentar buscar una parametro</returns>
        public IHttpActionResult Get(string idParametro)
        {
            try
            {
                var mng = new ParametroManager();
                var parametro = new Parametro
                {
                    IdParametro = Convert.ToInt32(idParametro)
                };

                parametro = mng.RetrieveById(parametro);
                apiResp = new ApiResponse();
                apiResp.Data = parametro;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar un parametro en la base de datos
        /// </summary>
        /// <param name="parametro">Objeto del parametro que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el parametro</returns>
        public IHttpActionResult Post(Parametro parametro)
        {

            try
            {
                var mng = new ParametroManager();
                mng.Create(parametro);

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
        /// Metodo para actualizar un parametro en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de un parametro que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar un parametro</returns>
        public IHttpActionResult Put(Parametro parametro)
        {
            try
            {
                var mng = new ParametroManager();
                mng.Update(parametro);

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
        /// Metodo para eliminar un parametro de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia el parametro que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar un parametro</returns>
        public IHttpActionResult Delete(Parametro parametro)
        {
            try
            {
                var mng = new ParametroManager();
                mng.Delete(parametro);

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

