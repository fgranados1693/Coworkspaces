using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class ParametroMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_PARAMETRO = "Id_Parametro";
        private const string DB_COL_NOMBRE = "Nombre";
        private const string DB_COL_VALOR = "Valor";


        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo parametro
        /// </summary>
        /// <param name="entity">Instancia del parametro que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo parametro</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_PARAMETRO_PR" };

            var c = (Parametro)entity;
            operation.AddIntParam(DB_COL_ID_PARAMETRO, c.IdParametro);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_VALOR, c.Valor);           

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para buscar un parametro segun su id
        /// </summary>
        /// <param name="entity">Instancia de parametro con el id del parametro que se quiere buscar</param>
        /// <returns>operacion sql para buscar un parametro segun su id</returns>

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_PARAMETRO_PR" };

            var c = (Parametro)entity;
            operation.AddIntParam(DB_COL_ID_PARAMETRO, c.IdParametro);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los parametros registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los parametros registrados en la base de datos</returns>

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_PARAMETROS_PR" };
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un parametro registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del parametro que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un parametro registrado en la base de datos</returns>

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_PARAMETRO_PR" };

            var c = (Parametro)entity;
            operation.AddIntParam(DB_COL_ID_PARAMETRO, c.IdParametro);
            operation.AddVarcharParam(DB_COL_NOMBRE, c.Nombre);
            operation.AddVarcharParam(DB_COL_VALOR, c.Valor);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un parametro de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del usuario que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un parametro de la base de datos</returns>

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_PARAMETRO_PR" };

            var c = (Parametro)entity;
            operation.AddIntParam(DB_COL_ID_PARAMETRO, c.IdParametro);
            return operation;
        }

        /// <summary>
        /// Metodo para construir todos los objetos parametro de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos parametro</param>
        /// <returns>Lista de objetos parametro</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var parametro = BuildObject(row);
                lstResults.Add(parametro);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto parametro a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto parametro</param>
        /// <returns>Objeto parametro</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var parametro = new Parametro
            {
                IdParametro = GetIntValue(row, DB_COL_ID_PARAMETRO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Valor = GetStringValue(row, DB_COL_VALOR)
            };

            return parametro;
        }

    }
}

