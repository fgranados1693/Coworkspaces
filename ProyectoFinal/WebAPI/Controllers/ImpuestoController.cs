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
    public class ImpuestoController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los Impuestos registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los Impuestos registrados en la base de datos o si ocurre un error al intentar buscar los Impuestos</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new ImpuestoManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar un Impuesto en la base de datos
        /// </summary>
        /// <param name="id">id del Impuesto que se quiere buscar</param>
        /// <returns>Instancia completa del Impuesto que se quiere buscar o si ocurre un error al intentar buscar el Impuesto</returns>
        public IHttpActionResult Get(int id)
        {
            try
            {
                var mng = new ImpuestoManager();
                var impuesto = new Impuesto
                {
                    Id_Impuesto = id
                };

                impuesto = mng.RetrieveById(impuesto);
                apiResp = new ApiResponse();
                apiResp.Data = impuesto;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar un Impuesto en la base de datos
        /// </summary>
        /// <param name="horario">Objeto del Impuesto que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el Impuesto</returns>
        public IHttpActionResult Post(Impuesto impuesto)
        {
            try
            {
                var mng = new ImpuestoManager();
                mng.Create(impuesto);

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
        /// Metodo para actualizar un Impuesto en la base de datos
        /// </summary>
        /// <param name="impuesto">Instancia del Impuesto que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar el horario</returns>
        public IHttpActionResult Put(Impuesto impuesto)
        {
            try
            {
                var mng = new ImpuestoManager();
                mng.Update(impuesto);

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
        /// Metodo para eliminar un Impuesto de la base de datos
        /// </summary>
        /// <param name="horario">Instancia el Impuesto que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar el Impuesto</returns>
        public IHttpActionResult Delete(Impuesto impuesto)
        {
            try
            {
                var mng = new ImpuestoManager();
                mng.Delete(impuesto);

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