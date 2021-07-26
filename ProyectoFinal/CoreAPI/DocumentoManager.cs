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
    public class DocumentoManager : BaseManager
    {
        private DocumentoCrudFactory crudDocumento;


        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public DocumentoManager()
        {
            crudDocumento = new DocumentoCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar la documento en la base de datos
        /// </summary>
        /// <param name="data">Diccionario con toda la informacion requerida para el registro de una documento</param>

        public void Create(Documento documento)
        {
            try
            {
                var c = crudDocumento.Retrieve<Documento>(documento);                

                if (c != null)
                {
                    // Documento ya se encuentra registrado
                     throw new BussinessException(30);
                }
                crudDocumento.Create(documento);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        /// <summary>
        /// Metodo para listar todos los documento registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los documento registrados en la base de datos</returns>
        public List<Documento> RetrieveAll()
        {
            return crudDocumento.RetrieveAll<Documento>();
        }

        /// <summary>
        /// Metodo para buscar un documento por su id en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de documento con el id del documento que se quiere buscar</param>
        /// <returns>Objeto completo del documento que se quiere buscar</returns>
        public Documento RetrieveById(Documento documento)
        {
            Documento c = null;
            try
            {
                c = crudDocumento.Retrieve<Documento> (documento);
                if (c == null)
                {
                    // documento no existe
                    throw new BussinessException(31);
                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return c;
        }

        /// <summary>
        /// Metodo para actualizar un documento en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de documento con el id del documento que se quiere actualizar</param>
        public void Update(Documento documento)
        {
            try
            {
                var c = crudDocumento.Retrieve<Documento>(documento);
                
                crudDocumento.Update(documento);


            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para eliminar un documento de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de documento con el id del documento que se quiere eliminar</param>
        public void Delete(Documento documento)
        {
            try
            {
                var c = crudDocumento.Retrieve<Documento>(documento);

                if (c == null)
                {
                    //Documento no existe
                   throw new BussinessException(31);
                }

                crudDocumento.Delete(documento);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
