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
    public class RolManager
    {
        private RolCrudFactory crudRol;
        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public RolManager()
        {
            crudRol = new RolCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar un nuevo rol en la base de datos
        /// </summary>
        /// <param name="rol">Instancia del rol que se quiere registrar en la base de datos</param>
        public void Create(Rol rol)
        {
            try
            {
                crudRol.Create(rol);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todos los roles registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los roles registrados en la base de datos</returns>
        public List<Rol> RetrieveAll()
        {
            List<Rol> lstResult = new List<Rol>();
            try
            {
                lstResult = crudRol.RetrieveAll<Rol>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar un rol segun su id
        /// </summary>
        /// <param name="rol">Instancia de Rol con el id del rol que se quiere buscar</param>
        /// <returns>Instancia del Rol que se quiere buscar</returns>
        public Rol RetrieveById(Rol rol)
        {
            Rol r = null;
            try
            {
                r = crudRol.Retrieve<Rol>(rol);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return r;
        }
        /// <summary>
        /// Metodo para actualizar un rol registrado en la base de datos
        /// </summary>
        /// <param name="rol">Instacia del rol que se quiere actualzar</param>
        public void Update(Rol rol)
        {
            Rol r = null;
            try
            {
                r = crudRol.Retrieve<Rol>(rol);
                crudRol.Update(rol);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar un rol de la base de datos
        /// </summary>
        /// <param name="rol">Instancia del rol que se quiere eliminar</param>
        public void Delete(Rol rol)
        {
            Rol r = null;

            try
            {
                r = crudRol.Retrieve<Rol>(rol);
                crudRol.Delete(rol);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
