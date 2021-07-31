using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class MembresiaMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_MEMBRESIA = "Id_Membresia";
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_FECHA_ULTIMO_PAGO = "Fecha_Ultimo_Pago";
        private const string DB_COL_COMISION_ADMIN = "Comision_Admin";
        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva membresia
        /// </summary>
        /// <param name="entity">Instancia de membresia que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva membresia</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_MEMBRESIA_PR" };

            var r = (Membresia)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            operation.AddDateTimeParam(DB_COL_FECHA_ULTIMO_PAGO, r.Fecha_Ultimo_Pago);
            operation.AddDoubleParam(DB_COL_COMISION_ADMIN, r.Comision_Admin);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una membresia segun su id
        /// </summary>
        /// <param name="entity">Instancia de una contrasenna con el id de la membresia que se quiere buscar</param>
        /// <returns>operacion sql para buscar una membresia segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_MEMBRESIA_PR" };

            var r = (Membresia)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las membresias segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de membresia con el id del usuario</param>
        /// <returns>Instancia de la membresia segun el id del usuario</returns>
        public SqlOperation GetByIdUsuarioRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_MEMBRESIA_BY_USUARIO_PR" };

            var r = (Membresia)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las membresias registradas en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todas las membresias registradas en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_MEMBRESIA_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una membresia registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la membresia que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar una membresia registrada en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_MEMBRESIA_PR" };

            var r = (Membresia)entity;
            operation.AddIntParam(DB_COL_ID_MEMBRESIA, r.Id_Membresia);
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            operation.AddDateTimeParam(DB_COL_FECHA_ULTIMO_PAGO, r.Fecha_Ultimo_Pago);
            operation.AddDoubleParam(DB_COL_COMISION_ADMIN, r.Comision_Admin);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una membresia de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la membresia que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar una membresia de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_MEMBRESIA_PR" };

            var r = (Membresia)entity;
            operation.AddIntParam(DB_COL_ID_MEMBRESIA, r.Id_Membresia);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos membresia de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos membresia</param>
        /// <returns>Lista de objetos membresia</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var membresia = BuildObject(row);
                lstResults.Add(membresia);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto membresia a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto membresia</param>
        /// <returns>Objeto membresia</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var membresia = new Membresia
            {
                Id_Membresia = GetIntValue(row, DB_COL_ID_MEMBRESIA),
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Fecha_Ultimo_Pago = GetDateValue(row, DB_COL_FECHA_ULTIMO_PAGO),
                Comision_Admin = GetDoubleValue(row, DB_COL_COMISION_ADMIN)
            };

            return membresia;
        }
    }
}
