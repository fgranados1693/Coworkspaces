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
    public class DocumentoEspacioController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los DocumentoEspacio registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los DocumentoEspacio registrados en la base de datos o si ocurre un error al intentar buscar los espacios</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new DocumentoEspacioManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar un DocumentoEspacio en la base de datos
        /// </summary>
        /// <param name="id">id del DocumentoEspacio que se quiere buscar</param>
        /// <returns>Instancia completa del DocumentoEspacio que se quiere buscar </returns>
        public IHttpActionResult Get(int id)
        {
            try
            {
                var mng = new DocumentoEspacioManager();
                var espacio = new DocumentoEspacio
                {
                    Id_Documento_Espacio = id
                };

                espacio = mng.RetrieveById(espacio);
                apiResp = new ApiResponse();
                apiResp.Data = espacio;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }



        /// <summary>
        /// Metodo para registrar un DocumentoEspacio en la base de datos
        /// </summary>
        /// <param name="espacio">Objeto del DocumentoEspacio que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el DocumentoEspacio</returns>
        public IHttpActionResult Post(DocumentoEspacio espacio)
        {
            try
            {
                var mng = new DocumentoEspacioManager();
                mng.Create(espacio);

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
        /// Metodo para actualizar un DocumentoEspacio en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia del DocumentoEspacio que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar el DocumentoEspacio</returns>
        public IHttpActionResult Put(DocumentoEspacio espacio)
        {
            try
            {
                var mng = new DocumentoEspacioManager();
                mng.Update(espacio);

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
        /// Metodo para eliminar un DocumentoEspacio de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia el DocumentoEspacio que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar el DocumentoEspacio</returns>
        public IHttpActionResult Delete(DocumentoEspacio espacio)
        {
            try
            {
                var mng = new DocumentoEspacioManager();
                mng.Delete(espacio);

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