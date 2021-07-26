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
    public class ParametroManager : BaseManager
    {
        private ParametroCrudFactory crudParametro;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public ParametroManager()
        {
            crudParametro = new ParametroCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar el parametro en la base de datos
        /// </summary>
        /// <param name="data">Diccionario con toda la informacion requerida para el registro de un parametro</param>
        public void Create(Parametro parametro)
        {
            try
            {
                var c = crudParametro.RetrieveAll<Parametro>();

                foreach (var param in c)
                {
                    if (param.Nombre == parametro.Nombre)
                    {
                        throw new BussinessException(25);
                    }

                }
                crudParametro.Create(parametro);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        /// <summary>
        /// Metodo para listar todos los parametros registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los parametros registrados en la base de datos</returns>

        public List<Parametro> RetrieveAll()
        {
            return crudParametro.RetrieveAll<Parametro>();
        }

        /// <summary>
        /// Metodo para buscar un parametro por su id en la base de datos
        /// </summary>
        /// <param name="parametro">Instancia de parametro con el id del parametro que se quiere buscar</param>
        /// <returns>Objeto completo del parametro que se quiere buscar</returns>
        public Parametro RetrieveById(Parametro parametro)
        {
            Parametro c = null;
            try
            {
                c = crudParametro.Retrieve<Parametro>(parametro);
                if (c == null)
                {
                    // parametro no existe
                    //throw new BussinessException(3);
                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return c;
        }

        /// <summary>
        /// Metodo para actualizar un parametro en la base de datos
        /// </summary>
        /// <param name="parametro">Instancia de parametro con el id del parametro que se quiere actualizar</param>

        public void Update(Parametro parametro)
        {
            try
            {
                var c = crudParametro.Retrieve<Parametro>(parametro);

                crudParametro.Update(parametro);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para eliminar un parametro de la base de datos
        /// </summary>
        /// <param name="parametro">Instancia de parametro con el id del parametro que se quiere eliminar</param>

        public void Delete(Parametro parametro)
        {
            try
            {
                var c = crudParametro.Retrieve<Parametro>(parametro);

                if (c == null)
                {
                    //Cliente no existe
                    throw new BussinessException(3);
                }

                crudParametro.Delete(parametro);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
