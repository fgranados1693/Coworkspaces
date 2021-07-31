using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class DocumentoEspacioMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_DOCUMENTO_ESPACIO = "Id_Documento_Espacio";
        private const string DB_COL_ID_DOCUMENTO = "Id_Documento";
        private const string DB_COL_ID_ESPACIO = "Id_Espacio";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar la relación de un documento con un espacio
        /// </summary>
        /// <param name="entity">Instancia de la relación de un documento con un espacio</param>
        /// <returns>operacion sql para registrar una relación de un documento con un espacio</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_DOCUMENTO_ESPACIO_PR" };

            var u = (DocumentoEspacio)entity;
            
            operation.AddIntParam(DB_COL_ID_DOCUMENTO, u.Id_Documento);
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);


            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una relación de un documento con un espacio
        /// </summary>
        /// <param name="entity">Instancia de la relación de un documento con un espacio</param>
        /// <returns>operacion sql para buscar una relación de un documento con un espacio</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_DOCUMENTO_ESPACIO_PR" };

            var u = (DocumentoEspacio)entity;
            operation.AddIntParam(DB_COL_ID_DOCUMENTO_ESPACIO, u.Id_Documento_Espacio);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos las relaciones de un documento con un espacio
        /// </summary>
        /// <returns>Operacion sql para listar todos las relaciones de un documento con un espacio</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_DOCUMENTOS_ESPACIO_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una relación de un documento con un espacio
        /// </summary>
        /// <param name="entity">Instancia de una relación de un documento con un espacio</param>
        /// <returns>Operacion sql para actualizar una relación de un documento con un espacio</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_DOCUMENTO_ESPACIO_PR" };

            var u = (DocumentoEspacio)entity;
            operation.AddIntParam(DB_COL_ID_DOCUMENTO_ESPACIO, u.Id_Documento_Espacio);
            operation.AddIntParam(DB_COL_ID_DOCUMENTO, u.Id_Documento);
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una relación de un documento con un espacio
        /// </summary>
        /// <param name="entity">Instancia de una relación de un documento con un espacio</param>
        /// <returns>Operacion sql para eliminar una relación de un documento con un espacio</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_DOCUMENTO_ESPACIO_PR" };

            var u = (DocumentoEspacio)entity;
            operation.AddIntParam(DB_COL_ID_DOCUMENTO_ESPACIO, u.Id_Documento_Espacio);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos DocumentoEspacio de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos DocumentoEspacio</param>
        /// <returns>Lista de objetos DocumentoEspacio</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var documentoEspacio = BuildObject(row);
                lstResults.Add(documentoEspacio);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto DocumentoEspacio a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto DocumentoEspacio</param>
        /// <returns>Objeto DocumentoEspacio</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var documentoEspacio = new DocumentoEspacio
            {
                Id_Documento_Espacio = GetIntValue(row, DB_COL_ID_DOCUMENTO_ESPACIO),
                Id_Documento = GetIntValue(row, DB_COL_ID_DOCUMENTO),
                Id_Espacio = GetIntValue(row, DB_COL_ID_ESPACIO)
            };

            return documentoEspacio;
        }
    }
}