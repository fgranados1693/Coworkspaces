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
    //[RoutePrefix("api/usuario")]
    public class UsuarioController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        /// <summary>
        /// Metodo para listar todos los usuarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los usuarios registrados en la base de datos o un error si ocurre un error al intentar buscar los usuarios</returns>
        public IHttpActionResult Get()
        {

            apiResp = new ApiResponse();
            var mng = new UsuarioManager();
            apiResp.Data = mng.RetrieveAll();

            return Ok(apiResp);
        }

        /// <summary>
        /// Metodo para buscar un usuario en la base de datos
        /// </summary>
        /// <param name="id">id del usuario que se quiere buscar</param>
        /// <returns>Instancia completa del usuario que se quiere buscar o un error si ocurre un error al intentar buscar el usuario</returns>
        public IHttpActionResult Get(int id)
        {
            try
            {
                var mng = new UsuarioManager();
                var usuario = new Usuario
                {
                    Id_Usuario = id
                };

                usuario = mng.RetrieveById(usuario);
                apiResp = new ApiResponse();
                apiResp.Data = usuario;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para buscar un usuario en la base de datos
        /// </summary>
        /// <param name="correo">id del usuario que se quiere buscar</param>
        /// <returns>Instancia completa del usuario que se quiere buscar o un error si ocurre un error al intentar buscar el usuario</returns>
        /*
        [HttpGet]
        [Route("{correo:string}")]
        */
        public IHttpActionResult Get(string correo)
        {
            try
            {
                var mng = new UsuarioManager();
                var usuario = new Usuario
                {
                    Email = correo
                };

                usuario = mng.RetrieveByEmail(usuario);
                apiResp = new ApiResponse();
                apiResp.Data = usuario;
                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-" + bex.AppMessage.Message));
            }
        }

        /// <summary>
        /// Metodo para registrar un usuario en la base de datos
        /// </summary>
        /// <param name="usuario">Objeto del usuario que se quiere registrar en la base de datos</param>
        /// <param name="rol">Rol de usuario que se quiere registrar en la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar registrar el usuario</returns>
        public IHttpActionResult Post(Dictionary<string, string> data)
        {
            try
            {
                var mng = new UsuarioManager();
                mng.Create(data);

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
        /// Metodo para actualizar un usuario en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia del usuario que se quiere actualizar</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar actualizar el usuario</returns>
        public IHttpActionResult Put(Usuario usuario)
        {
            try
            {
                var mng = new UsuarioManager();
                mng.Update(usuario);

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
        /// Metodo para eliminar un usuario de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia el usuario que se quiere eliminar de la base de datos</param>
        /// <returns>Respuesta de exito si no hay errores o un error si ocurre un error al intentar eliminar el usuario</returns>
        public IHttpActionResult Delete(Usuario usuario)
        {
            try
            {
                var mng = new UsuarioManager();
                mng.Delete(usuario);

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