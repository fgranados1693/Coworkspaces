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
    public class FacturaController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todas las facturas registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas la facturas registradas en la base de datos</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new FacturaManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar todas las factura registradas en la base de datos segun el id del usuario
        /// </summary>
        /// <param name="idUsuario">id del usuario del que se quiere buscar</param>
        /// <returns>Lista de todas la facturas registradas en la base de datos con el id del usuario</returns>
        public IHttpActionResult Get(string idUsuario)
        {
            try
            {
                var mng = new FacturaManager();
                var factura = new Factura
                {
                    Id_Usuario = Int32.Parse(idUsuario)
                };

                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveByIdUsuario(factura);

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar una nueva factura en la base de datos
        /// </summary>
        /// <param name="factura">Instancia de la factura que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar registrar la factura</returns>
        public IHttpActionResult Post(Factura factura)
        {

            try
            {
                var mng = new FacturaManager();
                mng.Create(factura);

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
        /// Metodo para actualizar una factura registrada en la base de datos
        /// </summary>
        /// <param name="factura">Instancia de la factura que se quiere actulizar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar actualizar la factura</returns>
        public IHttpActionResult Put(Factura factura)
        {
            try
            {
                var mng = new FacturaManager();
                mng.Update(factura);

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
        /// Metodo para eliminar una factura registrada en la base de datos
        /// </summary>
        /// <param name="factura">Instancia de la factura que se quiere eliminar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar eliminar la factura</returns>
        public IHttpActionResult Delete(Factura factura)
        {
            try
            {
                var mng = new FacturaManager();
                mng.Delete(factura);

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