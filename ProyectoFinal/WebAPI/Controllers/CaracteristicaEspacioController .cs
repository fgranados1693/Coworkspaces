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
using System.Web.Cors;

namespace WebAPI.Controllers
{
    public class CaracteristicaEspacioController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new CaracteristicaEspacioManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        public IHttpActionResult GetByEspacio(int idEspacio)
        {

            apiResp = new ApiResponse();
            var mng = new CaracteristicaEspacioManager();
            var caracteristicaEspacio = new CaracteristicaEspacio
            {
                Id_Espacio = idEspacio
            };
            apiResp.Data = mng.RetrieveByEspacio(caracteristicaEspacio);

            return Ok(apiResp);
        }

        public IHttpActionResult Get(int idCaracteristica)
        {
            try
            {
                var mng = new CaracteristicaEspacioManager();
                var caracteristicaEspacio = new CaracteristicaEspacio
                {
                    Id_Caracteristica = idCaracteristica
                };

                caracteristicaEspacio = mng.RetrieveById(caracteristicaEspacio);
                apiResp = new ApiResponse();
                apiResp.Data = caracteristicaEspacio;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        public IHttpActionResult Post(CaracteristicaEspacio caracteristicaEspacio)
        {

            try
            {
                var mng = new CaracteristicaEspacioManager();
                mng.Create(caracteristicaEspacio);

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

        public IHttpActionResult Put(CaracteristicaEspacio caracteristicaEspacio)
        {
            try
            {
                var mng = new CaracteristicaEspacioManager();
                mng.Update(caracteristicaEspacio);

                apiResp = new ApiResponse();
                apiResp.Message = "Action was executed.";

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        public IHttpActionResult Delete(CaracteristicaEspacio caracteristicaEspacio)
        {
            try
            {
                var mng = new CaracteristicaEspacioManager();
                mng.Delete(caracteristicaEspacio);

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

