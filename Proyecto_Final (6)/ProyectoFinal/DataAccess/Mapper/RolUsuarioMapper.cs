using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class RolUsuarioMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_ID_ROL = "Id_Rol";
        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva relacion RolUsuario
        /// </summary>
        /// <param name="entity">Instancia de relacion RolUsuario que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva relacion RolUsuario</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ROL_USUARIO_PR" };

            var r = (RolUsuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una relacion RolUsuario segun su id
        /// </summary>
        /// <param name="entity">Instancia de una relacion RolUsuario con el id del usuario y rol que se quiere buscar</param>
        /// <returns>operacion sql para buscar un RolUsuario segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ROL_USUARIO_PR" };

            var r = (RolUsuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las relaciones RolUsuario registradas en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todas las relaciones RolUsuario registradas en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_ROL_USUARIO_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todas las relaciones RolUsuario segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de RolUsuario con el id del usuario</param>
        /// <returns>Lista de todas las relaciones RolUsuario segun el id del usuario</returns>
        public SqlOperation GetRetriveByIdUsuarioStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET__ROL_USUARIO_BY_ID_USUARIO_PR" };
            var r = (RolUsuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un RolUsuario registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del RolUsuario que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un RolUsuario registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_ROL_USUARIO_PR" };

            var r = (RolUsuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un RolUsuario de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del RolUsuario que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un RolUsuario de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ROL_USUARIO_PR" };

            var r = (RolUsuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, r.Id_Usuario);
            operation.AddIntParam(DB_COL_ID_ROL, r.Id_Rol);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos RolUsuario de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos RolUsuario</param>
        /// <returns>Lista de objetos RolUsuario</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var rolUsuario = BuildObject(row);
                lstResults.Add(rolUsuario);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto RolUsuario a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto RolUsuario</param>
        /// <returns>Objeto RolUsuario</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var rolUsuario = new RolUsuario
            {
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Id_Rol = GetIntValue(row, DB_COL_ID_ROL)
            };

            return rolUsuario;
        }
    }
}
