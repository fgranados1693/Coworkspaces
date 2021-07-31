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
    public class SolicitudController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new SolicitudManager();

            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                var mng = new SolicitudManager();
                var solicitud = new Solicitud
                {
                    Id_Solicitud = id
                };

                solicitud = mng.RetrieveById(solicitud);
                apiResp = new ApiResponse();
                apiResp.Data = solicitud;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        public IHttpActionResult Post(Solicitud solicitud)
        {

            try
            {
                var mng = new SolicitudManager();
                mng.Create(solicitud);

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
        /// Metodo para actualizar una solicitud en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia la solicitud que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar la solicitud</returns>
        public IHttpActionResult Put(Solicitud solicitud)
        {
            try
            {
                var mng = new SolicitudManager();
                mng.Update(solicitud);

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