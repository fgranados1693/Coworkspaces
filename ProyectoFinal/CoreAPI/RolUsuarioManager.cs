using DataAccess.Crud;
using Entities_POJO;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPI
{
    public class RolUsuarioManager
    {

        private RolUsuarioCrudFactory crudRolUsuario;
        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public RolUsuarioManager()
        {
            crudRolUsuario = new RolUsuarioCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar una nueva relacion rol usuario en la base de datos
        /// </summary>
        /// <param name="rolUsuario">Instancia de RolUsuario que se quiere registrar</param>
        public void Create(RolUsuario rolUsuario)
        {
            try
            {
                crudRolUsuario.Create(rolUsuario);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todas las relaciones RolUsuario registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las relaciones RolUsuario registradas en la base de datos</returns>
        public List<RolUsuario> RetrieveAll()
        {
            List<RolUsuario> lstResult = new List<RolUsuario>();
            try
            {
                lstResult = crudRolUsuario.RetrieveAll<RolUsuario>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para listar todas las relaciones RolUsuario para un usuario segun su id
        /// </summary>
        /// <param name="rolUsuario">Instancia de RolUsuario con el id del usuario del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las relaciones RolUsuario para el id de usuario recibido</returns>
        public List<RolUsuario> RetrieveByIdUsuario(RolUsuario rolUsuario)
        {
            List<RolUsuario> lstResult = new List<RolUsuario>();
            try
            {
                lstResult = crudRolUsuario.RetrieveByIdUsuario<RolUsuario>(rolUsuario);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para actualizar una relacion RolUsuario registrada en la base de datos
        /// </summary>
        /// <param name="rolUsuario">Instancia de RolUsuario que se quiere actualizar</param>
        public void Update(RolUsuario rolUsuario)
        {
            RolUsuario r = null;
            try
            {
                r = crudRolUsuario.Retrieve<RolUsuario>(rolUsuario);
                crudRolUsuario.Update(rolUsuario);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar una relacion RolUsuario registrada en la base de datos
        /// </summary>
        /// <param name="rolUsuario">Instancia de RolUsuario que se quiere eliminar</param>
        public void Delete(RolUsuario rolUsuario)
        {
            RolUsuario r = null;

            try
            {
                r = crudRolUsuario.Retrieve<RolUsuario>(rolUsuario);
                crudRolUsuario.Delete(rolUsuario);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
