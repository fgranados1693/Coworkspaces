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
    public class DocumentoController : ApiController
    {

        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los documentos registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los documentos registrados en la base de datos o un error si ocurre un error al intentar buscar los documentos</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new DocumentoManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar un documento en la base de datos
        /// </summary>
        /// <param name="id">id de un documento que se quiere buscar</param>
        /// <returns>Instancia completa de una parametro que se quiere buscar o un error si ocurre un error al intentar buscar un documento</returns>
        public IHttpActionResult Get(string idDocumento)
        {
            try
            {
                var mng = new DocumentoManager();
                var documento = new Documento
                {
                    Id_Documento = Convert.ToInt32(idDocumento)
                };

                documento = mng.RetrieveById(documento);
                apiResp = new ApiResponse();
                apiResp.Data = documento;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar un documento en la base de datos
        /// </summary>
        /// <param name="parametro">Objeto del documento que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el documento</returns>
        public IHttpActionResult Post(Documento documento)
        {

            try
            {
                var mng = new DocumentoManager();
                mng.Create(documento);

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
        /// Metodo para actualizar un documento en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de un documento que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar un documento</returns>
        public IHttpActionResult Put(Documento documento)
        {
            try
            {
                var mng = new DocumentoManager();
                mng.Update(documento);

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
        /// Metodo para eliminar un documento de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia el documento que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar un documento</returns>
        public IHttpActionResult Delete(Documento documento)
        {
            try
            {
                var mng = new DocumentoManager();
                mng.Delete(documento);

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