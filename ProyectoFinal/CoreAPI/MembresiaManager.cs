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
    public class MembresiaManager
    {

        private MembresiaCrudFactory crudMembresia;
        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public MembresiaManager()
        {
            crudMembresia = new MembresiaCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar una nueva membresia en la base de datos
        /// </summary>
        /// <param name="membresia">Instancia de la membresia que se quiere registrar</param>
        public void Create(Membresia membresia)
        {
            try
            {
                crudMembresia.Create(membresia);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todas las membresias registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las membresias registradas en la base de datos</returns>
        public List<Membresia> RetrieveAll()
        {
            List<Membresia> lstResult = new List<Membresia>();
            try
            {
                lstResult = crudMembresia.RetrieveAll<Membresia>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar una membresia segun su id
        /// </summary>
        /// <param name="membresia">Instancia de membresia con en el id de la membresia que se quiere buscar</param>
        /// <returns>Instancia completa de la membresia que se quiere buscar</returns>
        public Membresia RetrieveById(Membresia membresia)
        {
            Membresia m = null;
            try
            {
                m = crudMembresia.Retrieve<Membresia>(membresia);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return m;
        }
        /// <summary>
        /// Metodo para buscar una membresia segun el id del usuario
        /// </summary>
        /// <param name="membresia">Instancia de membresia con el id del usuario</param>
        /// <returns>Instancia completa de la membresia que se quiere buscar</returns>
        public Membresia RetrieveByIdUsuario(Membresia membresia)
        {
            Membresia m = null;
            try
            {
                m = crudMembresia.RetrieveByIdUsuario<Membresia>(membresia);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return m;
        }
        /// <summary>
        /// Metodo para actualizar una membresia registrada en la base de datos
        /// </summary>
        /// <param name="membresia">Instancia de la membresia que se quiere actualizar</param>
        public void Update(Membresia membresia)
        {
            Membresia m = null;
            try
            {
                m = crudMembresia.Retrieve<Membresia>(membresia);
                crudMembresia.Update(membresia);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar una membresia de la base de datos
        /// </summary>
        /// <param name="membresia">Instancia de la membresia que se quiere eliminar</param>
        public void Delete(Membresia membresia)
        {
            Membresia m = null;

            try
            {
                m = crudMembresia.Retrieve<Membresia>(membresia);
                crudMembresia.Delete(membresia);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
