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
    public class PropiedadController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos las propiedades registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos las propiedade registrados en la base de datos o un error si ocurre un error al intentar buscar las propiedades</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new PropiedadManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar una propiedad en la base de datos
        /// </summary>
        /// <param name="id">id de una propiedad que se quiere buscar</param>
        /// <returns>Instancia completa de una propiedad que se quiere buscar o un error si ocurre un error al intentar buscar una propiedad</returns>
        public IHttpActionResult Get(string idPropiedad)
        {
            try
            {
                var mng = new PropiedadManager();
                var propiedad = new Propiedad
                {
                    IdPropiedad = Convert.ToInt32(idPropiedad)
                };

                propiedad = mng.RetrieveById(propiedad);
                apiResp = new ApiResponse();
                apiResp.Data = propiedad;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar una propiedad en la base de datos
        /// </summary>
        /// <param name="propiedad">Objeto del propieda que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el propiedad</returns>
        public IHttpActionResult Post(Propiedad propiedad)
        {

            try
            {
                var mng = new PropiedadManager();
                mng.Create(propiedad);

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
        /// Metodo para actualizar una propiedad en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de una propiedad que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar una propiedad</returns>
        public IHttpActionResult Put(Propiedad propiedad)
        {
            try
            {
                var mng = new PropiedadManager();
                mng.Update(propiedad);

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
        /// Metodo para eliminar una propiedad de la base de datos
        /// </summary>
        /// <param name="propiedad">Instancia la propiedad que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar propiedad</returns>
        public IHttpActionResult Delete(Propiedad propiedad)
        {
            try
            {
                var mng = new PropiedadManager();
                mng.Delete(propiedad);

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

