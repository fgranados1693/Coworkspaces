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
    public class TransaccionManager
    {

        private TransaccionCrudFactory crudTransaccion;
        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public TransaccionManager()
        {
            crudTransaccion = new TransaccionCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar una nueva transaccion en la base de datos
        /// </summary>
        /// <param name="transaccion">Instancia de la transaccion que se quiere registrar</param>
        public void Create(Transaccion transaccion)
        {
            try
            {
                crudTransaccion.Create(transaccion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todas las transaccions registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las transaccions registradas en la base de datos</returns>
        public List<Transaccion> RetrieveAll()
        {
            List<Transaccion> lstResult = new List<Transaccion>();
            try
            {
                lstResult = crudTransaccion.RetrieveAll<Transaccion>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para buscar una transaccion segun su id
        /// </summary>
        /// <param name="transaccion">Instancia de transaccion con en el id de la transaccion que se quiere buscar</param>
        /// <returns>Instancia completa de la transaccion que se quiere buscar</returns>
        public Transaccion RetrieveById(Transaccion transaccion)
        {
            Transaccion m = null;
            try
            {
                m = crudTransaccion.Retrieve<Transaccion>(transaccion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return m;
        }

        /// <summary>
        /// Metodo para listar todas las transaccions para una factura segun su id
        /// </summary>
        /// <param name="transaccion">Instancia de transaccion con el id de la factura del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las transaccions para el id de la factura recibido</returns>
        public List<Transaccion> RetrieveByIdFactura(Transaccion transaccion)
        {
            List<Transaccion> lstResult = new List<Transaccion>();
            try
            {
                lstResult = crudTransaccion.RetrieveByIdFactura<Transaccion>(transaccion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para actualizar una transaccion registrada en la base de datos
        /// </summary>
        /// <param name="transaccion">Instancia de la transaccion que se quiere actualizar</param>
        public void Update(Transaccion transaccion)
        {
            Transaccion m = null;
            try
            {
                m = crudTransaccion.Retrieve<Transaccion>(transaccion);
                crudTransaccion.Update(transaccion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        /// <summary>
        /// Metodo para eliminar una transaccion de la base de datos
        /// </summary>
        /// <param name="transaccion">Instancia de la transaccion que se quiere eliminar</param>
        public void Delete(Transaccion transaccion)
        {
            Transaccion m = null;

            try
            {
                m = crudTransaccion.Retrieve<Transaccion>(transaccion);
                crudTransaccion.Delete(transaccion);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
