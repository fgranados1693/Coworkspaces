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
    public class HorarioController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los Horarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los espacios registrados en la base de datos o si ocurre un error al intentar buscar los Horarios</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new HorarioManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar un Horario en la base de datos
        /// </summary>
        /// <param name="id">id del Horario que se quiere buscar</param>
        /// <returns>Instancia completa del Horario que se quiere buscar o si ocurre un error al intentar buscar el Horario</returns>
        public IHttpActionResult Get(string idEspacio)
        {
            try
            {
                var mng = new HorarioManager();
                var horario = new Horario
                {
                    Id_Espacio = Int32.Parse(idEspacio)
                };

                ///horario = mng.RetrieveHorarioByEspacio(horario);
                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveHorarioByEspacio(horario);
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para buscar un Horario en la base de datos
        /// </summary>
        /// <param name="id">id del Horario que se quiere buscar</param>
        /// <param name="dia_semana">dia de la semana del horario que se quiere buscar</param>
        /// <returns>Instancia completa del Horario del cual se quiere buscar sus horarios o un error si ocurre un error al intentar buscar los horarios</returns>
        /*
        [HttpGet]
        [Route("{correo:string}")]
        */
        public IHttpActionResult Get(string id, string dia_semana)
        {
            try
            {
                var mng = new HorarioManager();
                var horario = new Horario
                {
                    Id_Espacio= Int32.Parse(id),
                    Dia_Semana = dia_semana
                };


                apiResp = new ApiResponse();
                apiResp.Data = mng.RetrieveHorarioByEspacioDiaSemana(horario);
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar un horario en la base de datos
        /// </summary>
        /// <param name="horario">Objeto del horario que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el horario</returns>
        public IHttpActionResult Post(Horario horario)
        {
            try
            {
                var mng = new HorarioManager();
                mng.Create(horario);

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
        /// Metodo para actualizar un horario en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia del horario que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar el horario</returns>
        public IHttpActionResult Put(Horario horario)
        {
            try
            {
                var mng = new HorarioManager();
                mng.Update(horario);

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
        /// Metodo para eliminar un horario de la base de datos
        /// </summary>
        /// <param name="horario">Instancia el horario que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar el horario</returns>
        public IHttpActionResult Delete(Horario horario)
        {
            try
            {
                var mng = new HorarioManager();
                mng.Delete(horario);

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