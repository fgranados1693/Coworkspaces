using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class ImpuestoMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_IMPUESTO = "Id_Impuesto";
        private const string DB_COL_NOMBRE = "Nombre";
        private const string DB_COL_VALOR = "Valor";


        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo Impuesto de espacio
        /// </summary>
        /// <param name="entity">Instancia del Impuesto que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo Impuesto</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            //operation.AddIntParam(DB_COL_ID_IMPUESTO, i.Id_Impuesto);
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            operation.AddDoubleParam(DB_COL_VALOR, i.Valor);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar un Impuesto segun su id
        /// </summary>
        /// <param name="entity">Instancia de Impuesto con el id del Impuesto que se quiere buscar</param>
        /// <returns>operacion sql para buscar un horario segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_IMPUESTO_BY_ID_PR" };

            var i = (Impuesto)entity;
            operation.AddIntParam(DB_COL_ID_IMPUESTO, i.Id_Impuesto);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los Impuestos registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los Impuestos registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_IMPUESTOS_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un Impuesto registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del Impuesto que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un Impuesto registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            operation.AddIntParam(DB_COL_ID_IMPUESTO, i.Id_Impuesto);
            operation.AddVarcharParam(DB_COL_NOMBRE, i.Nombre);
            operation.AddDoubleParam(DB_COL_VALOR, i.Valor);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un Impuesto de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del Impuesto que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un Impuesto de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_IMPUESTO_PR" };

            var i = (Impuesto)entity;
            operation.AddIntParam(DB_COL_ID_IMPUESTO, i.Id_Impuesto);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos Impuesto de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos Impuesto</param>
        /// <returns>Lista de objetos Impuesto</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var horario = BuildObject(row);
                lstResults.Add(horario);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto Impuesto a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto Impuesto</param>
        /// <returns>Objeto Impuesto</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var impuesto = new Impuesto
            {
                Id_Impuesto = GetIntValue(row, DB_COL_ID_IMPUESTO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Valor = (float)GetDoubleValue(row, DB_COL_VALOR)

            };

            return impuesto;
        }
    }
}