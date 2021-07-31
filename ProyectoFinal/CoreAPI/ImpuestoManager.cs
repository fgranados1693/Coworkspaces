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
    public class ImpuestoManager
    {

        private ImpuestoCrudFactory crudImpuesto;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public ImpuestoManager()
        {
            crudImpuesto = new ImpuestoCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar un Impuesto en la base de datos
        /// </summary>
        /// <param name="impuesto">Instancia del objeto Impuesto que se desea registrar</param>
        public void Create(Impuesto impuesto)
        {
            try
            {
                var i = crudImpuesto.Retrieve<Impuesto>(impuesto);

                if (i != null)
                {
                    // Impuesto ya se encuentra registrado
                    throw new BussinessException(22);
                }
                crudImpuesto.Create(impuesto);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }


        }

        /// <summary>
        /// Metodo para listar todos los Impuestos registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los Impuestos registrados en la base de datos</returns>
        public List<Impuesto> RetrieveAll()
        {
            List<Impuesto> lstResult = new List<Impuesto>();
            try
            {
                lstResult = crudImpuesto.RetrieveAll<Impuesto>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar un Impuesto por su id en la base de datos
        /// </summary>
        /// <param name="impuesto">Instancia de Impuesto con el id del Impuesto que se quiere buscar</param>
        /// <returns>Objeto completo del Impuesto que se quiere buscar</returns>
        public Impuesto RetrieveById(Impuesto impuesto)
        {
            Impuesto i = null;
            try
            {
                i = crudImpuesto.Retrieve<Impuesto>(impuesto);
                if (i == null)
                {
                    // No existe el impuesto
                    throw new BussinessException(23);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return i;
        }

        /// <summary>
        /// Metodo para actualizar un Impuesto en la base de datos
        /// </summary>
        /// <param name="impuesto">Instancia de Impuesto con el id del Impuesto que se quiere actualizar</param>
        public void Update(Impuesto impuesto)
        {
            Impuesto i = null;
            try
            {
                i = crudImpuesto.Retrieve<Impuesto>(impuesto);
                if (i == null)
                {
                    // No existe el impuesto
                    throw new BussinessException(23);
                }

                crudImpuesto.Update(impuesto);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar un Impuesto de la base de datos
        /// </summary>
        /// <param name="horario">Instancia de Impuesto con el id del Impuesto que se quiere eliminar</param>
        public void Delete(Impuesto impuesto)
        {
            Impuesto i = null;

            try
            {
                i = crudImpuesto.Retrieve<Impuesto>(impuesto);
                if (i == null)
                {
                    // No existe el impuesto
                    throw new BussinessException(23);
                }

                crudImpuesto.Delete(impuesto);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
