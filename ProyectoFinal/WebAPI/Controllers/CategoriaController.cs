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
    public class CategoriaController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos las categorias registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos las categorias registrados en la base de datos o un error si ocurre un error al intentar buscar las categorias</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new CategoriaManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar una categoria en la base de datos
        /// </summary>
        /// <param name="id">id de una categoria que se quiere buscar</param>
        /// <returns>Instancia completa de una propiedad que se quiere buscar o un error si ocurre un error al intentar buscar una categoria</returns>
        public IHttpActionResult Get(string idCategoria)
        {
            try
            {
                var mng = new CategoriaManager();
                var categoria = new Categoria
                {
                    IdCategoria = Convert.ToInt32(idCategoria)
                };

                categoria = mng.RetrieveById(categoria);
                apiResp = new ApiResponse();
                apiResp.Data = categoria;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar una categoria en la base de datos
        /// </summary>
        /// <param name="categoria">Objeto de la categoria que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar la categoria</returns>
        public IHttpActionResult Post(Categoria categoria)
        {

            try
            {
                var mng = new CategoriaManager();
                mng.Create(categoria);

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
        /// Metodo para actualizar una categoria en la base de datos
        /// </summary>
        /// <param name="categoria">Instancia de una categoria que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar una categoria</returns>
        public IHttpActionResult Put(Categoria categoria)
        {
            try
            {
                var mng = new CategoriaManager();
                mng.Update(categoria);

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
        /// Metodo para eliminar una categoria de la base de datos
        /// </summary>
        /// <param name="categoria">Instancia la categoria que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar categoria</returns>
        public IHttpActionResult Delete(Categoria categoria)
        {
            try
            {
                var mng = new CategoriaManager();
                mng.Delete(categoria);

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

