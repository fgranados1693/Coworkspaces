using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class DocumentoMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_DOCUMENTO = "Id_Documento";
        private const string DB_COL_ID_PROPIEDAD = "Id_Propiedad";
        private const string DB_COL_URL = "URL";
        private const string DB_COL_TIPO = "Tipo";
        private const string DB_COL_NOMBRE = "Nombre";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo documento
        /// </summary>
        /// <param name="entity">Instancia del documento que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo documento</returns>

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_DOCUMENTO_PR" };

            var c = (Documento)entity;
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, c.Id_Propiedad);
            operation.AddVarcharParam(DB_COL_URL, c.URL);
            operation.AddVarcharParam(DB_COL_TIPO, c.Tipo);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para buscar un documento segun su id
        /// </summary>
        /// <param name="entity">Instancia de documento con el id del documento que se quiere buscar</param>
        /// <returns>operacion sql para buscar un documento segun su id</returns>

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_DOCUMENTO_PR" };

            var c = (Documento)entity;
            operation.AddIntParam(DB_COL_ID_DOCUMENTO, c.Id_Documento);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los documentos registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los documentos registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_DOCUMENTOS_PR" };
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un documento registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del documento que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un documento registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_DOCUMENTO_PR" };

            var c = (Documento)entity;
            operation.AddIntParam(DB_COL_ID_DOCUMENTO, c.Id_Documento);
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, c.Id_Propiedad);
            operation.AddVarcharParam(DB_COL_URL, c.URL);
            operation.AddVarcharParam(DB_COL_TIPO, c.Tipo);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un documento de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del documento que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un documento de la base de datos</returns>


        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_DOCUMENTO_PR" };

            var c = (Documento)entity;
            operation.AddIntParam(DB_COL_ID_DOCUMENTO, c.Id_Documento);
            return operation;
        }

        /// <summary>
        /// Metodo para construir todos los objetos Documento de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos Documento</param>
        /// <returns>Lista de objetos Documento</returns>

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var documento = BuildObject(row);
                lstResults.Add(documento);
            }

            return lstResults;
        }

        /// <summary>
        /// Metodo para construir un objeto documento a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto documento</param>
        /// <returns>Objeto documento</returns>

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var documento = new Documento
            {
                Id_Documento = GetIntValue(row, DB_COL_ID_DOCUMENTO),
                Id_Propiedad = GetIntValue(row, DB_COL_ID_PROPIEDAD),
                URL = GetStringValue(row, DB_COL_URL),
                Tipo = GetStringValue(row, DB_COL_TIPO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE)
            };

            return documento;
        }

    }
}

