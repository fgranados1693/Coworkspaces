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
    public class DocumentoEspacioManager
    {

        private DocumentoEspacioCrudFactory crudEspacio;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public DocumentoEspacioManager()
        {
            crudEspacio = new DocumentoEspacioCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar el DocumentoEspacio en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia del objeto DocumentoEspacio que se desea registrar</param>
        public void Create(DocumentoEspacio espacio)
        {
            try
            {
                var e = crudEspacio.Retrieve<DocumentoEspacio>(espacio);

                if (e != null)
                {
                    // Documento espacio ya se encuentra registrado
                    throw new BussinessException(29);
                }
                crudEspacio.Create(espacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
            

        }

        /// <summary>
        /// Metodo para listar todos los DocumentoEspacio registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los DocumentoEspacio registrados en la base de datos</returns>
        public List<DocumentoEspacio> RetrieveAll()
        {
            List<DocumentoEspacio> lstResult = new List<DocumentoEspacio>();
            try
            {
                lstResult = crudEspacio.RetrieveAll<DocumentoEspacio>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar un DocumentoEspacio por su id en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia de DocumentoEspacio con el id del DocumentoEspacio que se quiere buscar</param>
        /// <returns>Objeto completo del DocumentoEspacio que se quiere buscar</returns>
        public DocumentoEspacio RetrieveById(DocumentoEspacio espacio)
        {
            DocumentoEspacio e = null;
            try
            {
                e = crudEspacio.Retrieve<DocumentoEspacio>(espacio);
                if (e == null)
                {
                    throw new BussinessException(28);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return e;
        }

        /// <summary>
        /// Metodo para actualizar un DocumentoEspacio en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia de DocumentoEspacio con el id del espacio que se quiere actualizar</param>
        public void Update(DocumentoEspacio espacio)
        {
            DocumentoEspacio e = null;
            try
            {
                e = crudEspacio.Retrieve<DocumentoEspacio>(espacio);
                if (e == null)
                {
                    throw new BussinessException(28);
                }

                crudEspacio.Update(espacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar un DocumentoEspacio de la base de datos
        /// </summary>
        /// <param name="espacio">Instancia de DocumentoEspacio con el id del DocumentoEspacio que se quiere eliminar</param>
        public void Delete(DocumentoEspacio espacio)
        {
            DocumentoEspacio e = null;

            try
            {
                e = crudEspacio.Retrieve<DocumentoEspacio>(espacio);
                if (e == null)
                {
                    throw new BussinessException(28);
                }

                crudEspacio.Delete(espacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
