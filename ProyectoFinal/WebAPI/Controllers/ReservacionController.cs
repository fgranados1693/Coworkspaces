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
    public class ReservacionController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos las Reservaciones registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todos las Reservaciones registradas en la base de datos o si ocurre un error al intentar buscar las Reservaciones</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new ReservacionManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }
        /*
        [HttpGet]
        public IHttpActionResult GetStatistic(string type)
        {

            apiResp = new ApiResponse();
            var mng = new EspacioManager();
            var mngProp = new PropiedadManager();
            //ESPACIOS REGISTRADOS. HACER UNO SEGUN LAS FECHAS
            if (type.Equals("espaciosReport"))
            {
                var registrosEsp = 0;
                foreach (Espacio e in mng.RetrieveAll())
                {
                    registrosEsp++;
                }
                var registrosProp = 0;
                foreach (Propiedad p in mngProp.RetrieveAll())
                {
                    registrosProp++;
                }
                var lst = new List<int>
            {
                registrosEsp,
                registrosProp
            };

                apiResp.Data = lst;

            }
            else
            {
                apiResp.Message = "Statistic not found";
            }

            //REEMBOLSO
            if (type.Equals("reembolso"))
            {
                var reembolsoTrue = 0;
                var reembolsoFalse = 0;
                foreach (Espacio e in mng.RetrieveAll())
                {

                    if (e.Permite_Reembolso == "true")
                    {
                        reembolsoTrue++;
                    }
                    else if (e.Permite_Reembolso == "false")
                    {
                        reembolsoFalse++;
                    }
                    /*
                    else
                    {
                        noMillenias++;
                    }
                }
                var lst = new List<int>
            {
                reembolsoTrue,
                reembolsoFalse
            };

                apiResp.Data = lst;

            }
            else
            {
                apiResp.Message = "Statistic not found";
            }

            //CANCELACION
            if (type.Equals("cancelacion"))
            {
                var cancelacionTrue = 0;
                var cancelacionFalse = 0;
                foreach (Espacio e in mng.RetrieveAll())
                {

                    if (e.Permite_Cancelacion == "true")
                    {
                        cancelacionTrue++;
                    }
                    else if (e.Permite_Cancelacion == "false")
                    {
                        cancelacionFalse++;
                    }
                    /*
                    else
                    {
                        noMillenias++;
                    }
                }
                var lst = new List<int>
            {
                cancelacionTrue,
                cancelacionFalse
            };

                apiResp.Data = lst;

            }
            else
            {
                apiResp.Message = "Statistic not found";
            }


            return Ok(apiResp);
        }*/

        /// <summary>
        /// Metodo para buscar una Reservacion en la base de datos
        /// </summary>
        /// <param name="id">id de la Reservacion que se quiere buscar</param>
        /// <returns>Instancia completa de la Reservacion que se quiere buscar o si ocurre un error al intentar buscar la Reservacion</returns>
        public IHttpActionResult Get(int id)
        {
            try
            {
                var mng = new ReservacionManager();
                var reservacion = new Reservacion
                {
                    Id_Reservacion = id
                };

                reservacion = mng.RetrieveById(reservacion);
                apiResp = new ApiResponse();
                apiResp.Data = reservacion;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }
        /// <summary>
        /// Metodo para buscar reservacion por espacio en la base de datos
        /// </summary>
        /// <param name="idEspacio">id del espacio de la reservacion que se quiere buscar</param>
        /// <returns>Instancia completa de la Reservacion que se quiere buscar o si ocurre un error al intentar buscar la Reservacion</returns>
        public IHttpActionResult GetByEspacio(string idEspacio)
        {

            apiResp = new ApiResponse();
            var mng = new ReservacionManager();
            var reservacion = new Reservacion
            {
                Id_Espacio = Int32.Parse(idEspacio)
            };
            apiResp.Data = mng.RetrieveByEspacio(reservacion);

            return Ok(apiResp);
        }
        /// <summary>
        /// Metodo para buscar reservacion por fecha en la base de datos
        /// </summary>
        /// <param name="fecha">fecha de la reservacion que se quiere buscar</param>
        /// <returns>Instancia completa de la Reservacion que se quiere buscar o si ocurre un error al intentar buscar la Reservacion</returns>
        public IHttpActionResult GetByFecha(string fecha)
        {

            apiResp = new ApiResponse();
            var mng = new ReservacionManager();
            var reservacion = new Reservacion
            {
                Fecha = DateTime.Parse(fecha)
            };
            apiResp.Data = mng.RetrieveByFecha(reservacion);

            return Ok(apiResp);
        }
        /// <summary>
        /// Metodo para buscar reservacion por usuario en la base de datos
        /// </summary>
        /// <param name="idUsuario">id del usuario de la reservacion que se quiere buscar</param>
        /// <returns>Instancia completa de la Reservacion que se quiere buscar o si ocurre un error al intentar buscar la Reservacion</returns>
        public IHttpActionResult GetByUsuario(string idUsuario)
        {

            apiResp = new ApiResponse();
            var mng = new ReservacionManager();
            var reservacion = new Reservacion
            {
                Id_Usuario = Int32.Parse(idUsuario)
            };
            apiResp.Data = mng.RetrieveByUsuario(reservacion);

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para registrar una Reservacion en la base de datos
        /// </summary>
        /// <param name="reservacion">Objeto de la Reservacion que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar la Reservacion</returns>
        public IHttpActionResult Post(Reservacion reservacion)
        {
            try
            {
                var mng = new ReservacionManager();
                mng.Create(reservacion);

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
        /// Metodo para actualizar una reservacion en la base de datos
        /// </summary>
        /// <param name="reservacion">Instancia de la Reservacion que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar la Reservacion</returns>
        public IHttpActionResult Put(Reservacion reservacion)
        {
            try
            {
                var mng = new ReservacionManager();
                mng.Update(reservacion);

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
        /// Metodo para eliminar una Reservacion de la base de datos
        /// </summary>
        /// <param name="reservacion">Instancia de la Reservacion que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar la Reservacion</returns>
        public IHttpActionResult Delete(Reservacion reservacion)
        {
            try
            {
                var mng = new ReservacionManager();
                mng.Delete(reservacion);

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