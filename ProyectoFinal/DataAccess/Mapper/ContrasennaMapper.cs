using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class ContrasennaMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_CONTRASENNA = "Id_Contrasenna";
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_VALOR = "Valor";
        private const string DB_COL_FECHA_CREACION = "Fecha_Creacion";
        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva contrasenna
        /// </summary>
        /// <param name="entity">Instancia de contrasenna que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva contrasenna</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, c.Id_Usuario);
            operation.AddVarcharParam(DB_COL_VALOR, c.Valor);
            operation.AddDateTimeParam(DB_COL_FECHA_CREACION, c.Fecha_Creacion);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una contrasenna segun su id
        /// </summary>
        /// <param name="entity">Instancia de una contrasenna con el id de la contrasenna que se quiere buscar</param>
        /// <returns>operacion sql para buscar una contrasenna segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID_CONTRASENNA, c.Id_Contrasenna);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las contrasennas registradas en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todas las contrasennas registradas en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CONTRASENNA_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las contrasennas segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de contrasenna con el id del usuario</param>
        /// <returns>Lista de todas las contrasennas segun el id del usuario</returns>
        public SqlOperation GetRetriveByIdUsuarioStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CONTRASENNA_BY_ID_USUARIO_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, c.Id_Usuario);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una contrasenna registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la contrasenna que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar una contrasenna registrada en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID_CONTRASENNA, c.Id_Contrasenna);
            operation.AddVarcharParam(DB_COL_VALOR, c.Valor);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una contrasenna de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la contrasenna que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar una contrasenna de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CONTRASENNA_PR" };

            var c = (Contrasenna)entity;
            operation.AddIntParam(DB_COL_ID_CONTRASENNA, c.Id_Contrasenna);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos contrasenna de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos contrasenna</param>
        /// <returns>Lista de objetos contrasenna</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var contrasenna = BuildObject(row);
                lstResults.Add(contrasenna);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto contrasenna a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto contrasenna</param>
        /// <returns>Objeto contrasenna</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var contrasenna = new Contrasenna
            {
                Id_Contrasenna = GetIntValue(row, DB_COL_ID_CONTRASENNA),
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Valor = GetStringValue(row, DB_COL_VALOR),
                Fecha_Creacion = GetDateValue(row, DB_COL_FECHA_CREACION),
            };

            return contrasenna;
        }
    }
}
