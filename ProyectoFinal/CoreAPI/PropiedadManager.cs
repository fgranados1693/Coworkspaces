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
    public class PropiedadManager : BaseManager
    {
        private PropiedadCrudFactory crudPropiedad;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public PropiedadManager()
        {
            crudPropiedad = new PropiedadCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar la propiedad en la base de datos
        /// </summary>
        /// <param name="data">Diccionario con toda la informacion requerida para el registro de una propiedad</param>

        public void Create(Propiedad propiedad)
        {
            try
            {
                var p = crudPropiedad.Retrieve<Propiedad>(propiedad);

                if (p != null)
                {
                  // Propiedad ya se encuentra registrada
                   throw new BussinessException(2);
                }

                propiedad.Estado = "activa";
                crudPropiedad.Create(propiedad);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        /// <summary>
        /// Metodo para listar todos los propiedades registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los propiedades registrados en la base de datos</returns>
        public List<Propiedad> RetrieveAll()
        {
            if (crudPropiedad.RetrieveAll<Propiedad>() == null)
            {
                throw new BussinessException(1);
            }
            else {
                return crudPropiedad.RetrieveAll<Propiedad>();
            }            
        }

        /// <summary>
        /// Metodo para buscar un propiedad por su id en la base de datos
        /// </summary>
        /// <param name="propiedad">Instancia de propiedad con el id del propiedad que se quiere buscar</param>
        /// <returns>Objeto completo del propiedad que se quiere buscar</returns>
        public Propiedad RetrieveById(Propiedad propiedad)
        {
            Propiedad p = null;
            try
            {
                p = crudPropiedad.Retrieve<Propiedad>(propiedad);
                if (p == null)
                {
                    // propiedad no existe
                    throw new BussinessException(3);
                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return p;
        }

        /// <summary>
        /// Metodo para actualizar un propiedad en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de propiedad con el id del propiedad que se quiere actualizar</param>

        public void Update(Propiedad propiedad)
        {
            try
            {
                var p = crudPropiedad.Retrieve<Propiedad>(propiedad);
               
                crudPropiedad.Update(propiedad);               

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para eliminar un propiedad de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de propiedad con el id del propiedad que se quiere eliminar</param>

        public void Delete(Propiedad propiedad)
        {
            try
            {
                var p = crudPropiedad.Retrieve<Propiedad>(propiedad);

                if (p == null)
                {
                    //Propiedad no existe
                    throw new BussinessException(3);
                }

                crudPropiedad.Delete(propiedad);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
