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
    public class FacturaManager
    {

        private FacturaCrudFactory crudFactura;
        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public FacturaManager()
        {
            crudFactura = new FacturaCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar una nueva factura en la base de datos
        /// </summary>
        /// <param name="factura">Instancia de la factura que se quiere registrar</param>
        public void Create(Factura factura)
        {
            try
            {
                crudFactura.Create(factura);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todas las facturas registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las facturas registradas en la base de datos</returns>
        public List<Factura> RetrieveAll()
        {
            List<Factura> lstResult = new List<Factura>();
            try
            {
                lstResult = crudFactura.RetrieveAll<Factura>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para buscar una factura segun su id
        /// </summary>
        /// <param name="factura">Instancia de factura con en el id de la factura que se quiere buscar</param>
        /// <returns>Instancia completa de la factura que se quiere buscar</returns>
        public Factura RetrieveById(Factura factura)
        {
            Factura m = null;
            try
            {
                m = crudFactura.Retrieve<Factura>(factura);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return m;
        }

        /// <summary>
        /// Metodo para listar todas las facturas para un usuario segun su id
        /// </summary>
        /// <param name="factura">Instancia de facturas con el id del usuario del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las facturas para el id de usuario recibido</returns>
        public List<Factura> RetrieveByIdUsuario(Factura factura)
        {
            List<Factura> lstResult = new List<Factura>();
            try
            {
                lstResult = crudFactura.RetrieveByIdUsuario<Factura>(factura);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para actualizar una factura registrada en la base de datos
        /// </summary>
        /// <param name="factura">Instancia de la factura que se quiere actualizar</param>
        public void Update(Factura factura)
        {
            Factura m = null;
            try
            {
                m = crudFactura.Retrieve<Factura>(factura);
                crudFactura.Update(factura);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        /// <summary>
        /// Metodo para eliminar una factura de la base de datos
        /// </summary>
        /// <param name="factura">Instancia de la factura que se quiere eliminar</param>
        public void Delete(Factura factura)
        {
            Factura m = null;

            try
            {
                m = crudFactura.Retrieve<Factura>(factura);
                crudFactura.Delete(factura);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
