using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class FacturaMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_FACTURA = "Id_Factura";
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_FECHA = "Fecha";
        private const string DB_COL_NOMBRE_USUARIO = "Nombre_Usuario";
        private const string DB_COL_DETALLE = "Detalle";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva factura
        /// </summary>
        /// <param name="entity">Instancia de factura que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva factura</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_FACTURA_PR" };

            var f = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, f.Id_Usuario);
            operation.AddDateTimeParam(DB_COL_FECHA, f.Fecha);
            operation.AddVarcharParam(DB_COL_NOMBRE_USUARIO, f.Nombre_Usuario);
            operation.AddVarcharParam(DB_COL_DETALLE, f.Detalle);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una factura segun su id
        /// </summary>
        /// <param name="entity">Instancia de una contrasenna con el id de la factura que se quiere buscar</param>
        /// <returns>operacion sql para buscar una factura segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_FACTURA_PR" };

            var r = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, r.Id_Factura);

            return operation;
        }
        
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las facturas registradas en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todas las facturas registradas en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_FACTURA_PR" };
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las facturas segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de facturas con el id del usuario</param>
        /// <returns>Lista de todas las facturas segun el id del usuario</returns>
        public SqlOperation GetRetriveByIdUsuarioStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_FACTURA_BY_ID_USUARIO_PR" };
            var r = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una factura registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la factura que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar una factura registrada en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_FACTURA_PR" };

            var f = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, f.Id_Factura);
            operation.AddIntParam(DB_COL_ID_USUARIO, f.Id_Usuario);
            operation.AddDateTimeParam(DB_COL_FECHA, f.Fecha);
            operation.AddVarcharParam(DB_COL_NOMBRE_USUARIO, f.Nombre_Usuario);
            operation.AddVarcharParam(DB_COL_DETALLE, f.Detalle);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una factura de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la factura que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar una factura de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_FACTURA_PR" };

            var r = (Factura)entity;
            operation.AddIntParam(DB_COL_ID_FACTURA, r.Id_Factura);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos factura de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos factura</param>
        /// <returns>Lista de objetos factura</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var factura = BuildObject(row);
                lstResults.Add(factura);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto factura a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto factura</param>
        /// <returns>Objeto factura</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var factura = new Factura
            {
                Id_Factura = GetIntValue(row, DB_COL_ID_FACTURA),
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                Nombre_Usuario = GetStringValue(row, DB_COL_NOMBRE_USUARIO),
                Detalle = GetStringValue(row, DB_COL_DETALLE)
            };

            return factura;
        }
    }
}
