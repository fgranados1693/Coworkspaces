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
    public class TransaccionController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todas las transaccions registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas la transaccions registradas en la base de datos</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new TransaccionManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para listar todas las transaccions para una factura segun su id
        /// </summary>
        /// <param name="idFactura">id de la factura del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las transaccions para el id de la factura recibido</returns>
        public IHttpActionResult Get(string idFactura)
        {
            try
            {
                var mng = new TransaccionManager();
                var transaccion = new Transaccion
                {
                    Id_Factura = Int32.Parse(idFactura)
                };

                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveByIdFactura(transaccion);

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar una nueva transaccion en la base de datos
        /// </summary>
        /// <param name="transaccion">Instancia de la transaccion que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar registrar la transaccion</returns>
        public IHttpActionResult Post(Transaccion transaccion)
        {

            try
            {
                var mng = new TransaccionManager();
                mng.Create(transaccion);

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
        /// Metodo para actualizar una transaccion registrada en la base de datos
        /// </summary>
        /// <param name="transaccion">Instancia de la transaccion que se quiere actulizar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar actualizar la transaccion</returns>
        public IHttpActionResult Put(Transaccion transaccion)
        {
            try
            {
                var mng = new TransaccionManager();
                mng.Update(transaccion);

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
        /// Metodo para eliminar una transaccion registrada en la base de datos
        /// </summary>
        /// <param name="transaccion">Instancia de la transaccion que se quiere eliminar</param>
        /// <returns>Respuesta de exito o un error si ocurre un error al intentar eliminar la transaccion</returns>
        public IHttpActionResult Delete(Transaccion transaccion)
        {
            try
            {
                var mng = new TransaccionManager();
                mng.Delete(transaccion);

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