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
    public class MembresiaController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todas las membresias registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas la membresias registradas en la base de datos</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new MembresiaManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar una membresia registrada en la base de datos segun su id
        /// </summary>
        /// <param name="id">id de la membresia que se quiere buscar</param>
        /// <returns>Instancia de la membresia que se quiere buscar o un error si ocurre un error al intentar buscar la membresia</returns>
        public IHttpActionResult Get(string idUsuario)
        {
            try
            {
                var mng = new MembresiaManager();
                var membresia = new Membresia
                {
                    Id_Usuario = Int32.Parse(idUsuario)
                };

                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveById(membresia);

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para buscar una membresia por el id del usuario
        /// </summary>
        /// <param name="membresia">Instancia de membresia con el id del usuario del cual se quiere buscar la membresia</param>
        /// <returns>Instancia completa de la membresia o un error si ocurre un error al intentar buscar la membresia</returns>
        //public IHttpActionResult Get()
        //{
        //    try
        //    {
        //        var mng = new MembresiaManager();

        //        apiResp = new ApiResponse();
        //        apiResp.Data = mng.RetrieveAll(membresia);

        //        return Ok(apiResp);
        //    }
        //    catch (BussinessException bex)
        //    {
        //        return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
        //    }
        //}

        /// <summary>
        /// Metodo para registrar una nueva membresia en la base de datos
        /// </summary>
        /// <param name="membresia">Instancia de la membresia que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar registrar la membresia</returns>
        public IHttpActionResult Post(Membresia membresia)
        {

            try
            {
                var mng = new MembresiaManager();
                mng.Create(membresia);

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
        /// Metodo para actualizar una membresia registrada en la base de datos
        /// </summary>
        /// <param name="membresia">Instancia de la membresia que se quiere actulizar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar actualizar la membresia</returns>
        public IHttpActionResult Put(Membresia membresia)
        {
            try
            {
                var mng = new MembresiaManager();
                mng.Update(membresia);

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
        /// Metodo para eliminar una membresia registrada en la base de datos
        /// </summary>
        /// <param name="membresia">Instancia de la membresia que se quiere eliminar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar eliminar la membresia</returns>
        public IHttpActionResult Delete(Membresia membresia)
        {
            try
            {
                var mng = new MembresiaManager();
                mng.Delete(membresia);

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