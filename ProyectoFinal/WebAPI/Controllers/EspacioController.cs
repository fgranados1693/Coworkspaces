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
    public class EspacioController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los espacios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los espacios registrados en la base de datos o si ocurre un error al intentar buscar los espacios</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new EspacioManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

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
                    } else if (e.Permite_Reembolso == "false")
                    {
                        reembolsoFalse++;
                    }
                    /*
                    else
                    {
                        noMillenias++;
                    }*/
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
                    }*/
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

            //CATEGORIAS
            if (type.Equals("categorias"))
            {
                var mngCategorias = new CategoriaManager();

                var salasReuniones = 0;
                var oficinas = 0;
                var salasEntretenimiento = 0;
                var cocina = 0;
                var auditorios = 0;
                foreach (Espacio e in mng.RetrieveAll())
                {
                    foreach (Categoria c in mngCategorias.RetrieveAll())
                    {
                        //Verifica que tenga un id valido
                        if (e.Id_Categoria == c.IdCategoria)
                        {
                            switch (e.Id_Categoria)
                            {
                                case 1:
                                    salasReuniones++;
                                    break;
                                case 2:
                                    oficinas++;
                                    break;
                                case 3:
                                    salasEntretenimiento++;
                                    break;
                                case 4:
                                    cocina++;
                                    break;
                                case 5:
                                    auditorios++;
                                    break;
                            }
                        }

                    }
                }
                var lst = new List<int>
            {
                salasReuniones,
                oficinas,
                salasEntretenimiento,
                cocina,
                auditorios
            };

                apiResp.Data = lst;

            }
            else
            {
                apiResp.Message = "Statistic not found";
            }


            return Ok(apiResp);
        }
        /// <summary>
        /// Metodo para buscar un Espacio en la base de datos
        /// </summary>
        /// <param name="id">id del Espacio que se quiere buscar</param>
        /// <returns>Instancia completa del Espacio que se quiere buscar o si ocurre un error al intentar buscar el Espacio</returns>
        public IHttpActionResult Get(int id)
        {
            try
            {
                var mng = new EspacioManager();
                var espacio = new Espacio
                {
                    Id_Espacio = id
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
        /// Metodo para registrar un espacio en la base de datos
        /// </summary>
        /// <param name="espacio">Objeto del espacio que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el espacio</returns>
        public IHttpActionResult Post(Espacio espacio)
        {
            try
            {
                var mng = new EspacioManager();
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
        /// Metodo para actualizar un espacio en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia del espacio que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar el espacio</returns>
        public IHttpActionResult Put(Espacio espacio)
        {
            try
            {
                var mng = new EspacioManager();
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
        /// Metodo para eliminar un espacio de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia el espacio que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar el espacio</returns>
        public IHttpActionResult Delete(Espacio espacio)
        {
            try
            {
                var mng = new EspacioManager();
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