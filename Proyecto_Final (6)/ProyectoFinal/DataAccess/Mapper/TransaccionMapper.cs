using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class TransaccionMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_TRANSACCION = "Id_Transaccion";
        private const string DB_COL_ID_FACTURA = "Id_Factura";
        private const string DB_COL_TIPO = "Tipo";
        private const string DB_COL_DETALLE = "Detalle";
        private const string DB_COL_MONTO = "Monto";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva transaccion
        /// </summary>
        /// <param name="entity">Instancia de transaccion que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva transaccion</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_TRANSACCION_PR" };

            var t = (Transaccion)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, t.Id_Factura);
            operation.AddVarcharParam(DB_COL_TIPO, t.Tipo);
            operation.AddVarcharParam(DB_COL_DETALLE, t.Detalle);
            operation.AddDoubleParam(DB_COL_MONTO, t.Monto);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una transaccion segun su id
        /// </summary>
        /// <param name="entity">Instancia de una contrasenna con el id de la transaccion que se quiere buscar</param>
        /// <returns>operacion sql para buscar una transaccion segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_TRANSACCION_PR" };

            var t = (Transaccion)entity;
            operation.AddIntParam(DB_COL_ID_TRANSACCION, t.Id_Transaccion);

            return operation;
        }
        
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las transacciones registradas en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todas las transacciones registradas en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_TRANSACCION_PR" };
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las transacciones segun el id de la factura
        /// </summary>
        /// <param name="entity">Instancia de transaccion con el id de la factura</param>
        /// <returns>Lista de todas las transacciones segun el id de la factura</returns>
        public SqlOperation GetRetriveByIdFacturaStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_TRANSACCION_BY_ID_FACTURA_PR" };
            var r = (Transaccion)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, r.Id_Factura);
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una transaccion registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la transaccion que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar una transaccion registrada en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_TRANSACCION_PR" };

            var t = (Transaccion)entity;
            operation.AddIntParam(DB_COL_ID_TRANSACCION, t.Id_Transaccion);
            operation.AddIntParam(DB_COL_ID_FACTURA, t.Id_Factura);
            operation.AddVarcharParam(DB_COL_TIPO, t.Tipo);
            operation.AddVarcharParam(DB_COL_DETALLE, t.Detalle);
            operation.AddDoubleParam(DB_COL_MONTO, t.Monto);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una transaccion de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la transaccion que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar una transaccion de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_TRANSACCION_PR" };

            var r = (Transaccion)entity;
            operation.AddIntParam(DB_COL_ID_TRANSACCION, r.Id_Transaccion);
            return operation;
        }

        /// <summary>
        /// Metodo para construir todos los objetos transaccion de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos transaccion</param>
        /// <returns>Lista de objetos transaccion</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var transaccion = BuildObject(row);
                lstResults.Add(transaccion);
            }

            return lstResults;
        }

        /// <summary>
        /// Metodo para construir un objeto transaccion a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto transaccion</param>
        /// <returns>Objeto transaccion</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var transaccion = new Transaccion
            {
                Id_Transaccion = GetIntValue(row, DB_COL_ID_TRANSACCION),
                Id_Factura = GetIntValue(row, DB_COL_ID_FACTURA),
                Tipo = GetStringValue(row, DB_COL_TIPO),
                Detalle = GetStringValue(row, DB_COL_DETALLE),
                Monto = GetDoubleValue(row, DB_COL_MONTO)
            };

            return transaccion;
        }
    }
}
