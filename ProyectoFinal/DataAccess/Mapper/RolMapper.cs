using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class RolMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_ROL = "Id_Rol";
        private const string DB_COL_NOMBRE = "Nombre";
        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo rol
        /// </summary>
        /// <param name="entity">Instancia del rol que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo rol</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ROL_PR" };

            var r = (Rol)entity;
            operation.AddVarcharParam(DB_COL_NOMBRE, r.Nombre);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar un rol segun su id
        /// </summary>
        /// <param name="entity">Instancia de rol con el id del rol que se quiere buscar</param>
        /// <returns>operacion sql para buscar un rol segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ROL_PR" };

            var r = (Rol)entity;
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los roles registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los roles registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_ROL_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un rol registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del rol que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un rol registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_ROL_PR" };

            var r = (Rol)entity;
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);
            operation.AddVarcharParam(DB_COL_NOMBRE, r.Nombre);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un rol de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del rol que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un rol de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ROL_PR" };

            var r = (Rol)entity;
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos rol de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos rol</param>
        /// <returns>Lista de objetos rol</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var rol = BuildObject(row);
                lstResults.Add(rol);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto rol a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto rol</param>
        /// <returns>Objeto rol</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var rol = new Rol
            {
                Id_Rol = GetIntValue(row, DB_COL_ID_ROL),
                Nombre = GetStringValue(row, DB_COL_NOMBRE)
            };

            return rol;
        }
    }
}
