using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class UsuarioMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_EMAIL = "Email";
        private const string DB_COL_TELEFONO = "Telefono";
        private const string DB_COL_IDENTIFICACION = "Identificacion";
        private const string DB_COL_TIPO_IDENTIFICACION = "Tipo_Identificacion";
        private const string DB_COL_FECHA_CREACION = "Fecha_Creacion";
        private const string DB_COL_FECHA_NACIMIENTO = "Fecha_Nacimiento";
        private const string DB_COL_URL_FOTO = "URL_Foto";
        private const string DB_COL_NOMBRE = "Nombre";
        private const string DB_COL_APELLIDOS = "Apellidos";
        private const string DB_COL_GENERO = "Genero";
        private const string DB_COL_ESTADO = "Estado";
        private const string DB_COL_SALDO = "Saldo";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo usuario
        /// </summary>
        /// <param name="entity">Instancia del usuario que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo usuario</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_USUARIO_PR" };

            var u = (Usuario)entity;
            operation.AddVarcharParam(DB_COL_EMAIL, u.Email);
            operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);
            operation.AddVarcharParam(DB_COL_IDENTIFICACION, u.Identificacion);
            operation.AddVarcharParam(DB_COL_TIPO_IDENTIFICACION, u.Tipo_Identificacion);
            operation.AddDateTimeParam(DB_COL_FECHA_CREACION, u.Fecha_Creacion);
            operation.AddDateTimeParam(DB_COL_FECHA_NACIMIENTO, u.Fecha_Nacimiento);
            operation.AddVarcharParam(DB_COL_URL_FOTO, u.URL_Foto);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDOS, u.Apellidos);
            operation.AddVarcharParam(DB_COL_GENERO, u.Genero);
            operation.AddVarcharParam(DB_COL_ESTADO, u.Estado);
            operation.AddDoubleParam(DB_COL_SALDO, u.Saldo);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar un usuario segun su id
        /// </summary>
        /// <param name="entity">Instancia de usuario con el id del usuario que se quiere buscar</param>
        /// <returns>operacion sql para buscar un usuario segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_USUARIO_PR" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, u.Id_Usuario);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar un usuario segun su correo
        /// </summary>
        /// <param name="entity">Instancia de usuario con el correo del usuario que se quiere buscar</param>
        /// <returns>operacion sql para buscar un usuario segun su correo</returns>
        public SqlOperation GetRetriveStatementByEmail(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_USUARIO_BY_EMAIL_PR" };

            var u = (Usuario)entity;
            operation.AddVarcharParam(DB_COL_EMAIL, u.Email);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los usuarios registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los usuario registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_USUARIO_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un usuario registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del usuario que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un usuario registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_USUARIO_PR" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, u.Id_Usuario);
            operation.AddVarcharParam(DB_COL_EMAIL, u.Email);
            operation.AddVarcharParam(DB_COL_TELEFONO, u.Telefono);
            operation.AddVarcharParam(DB_COL_IDENTIFICACION, u.Identificacion);
            operation.AddVarcharParam(DB_COL_TIPO_IDENTIFICACION, u.Tipo_Identificacion);
            operation.AddDateTimeParam(DB_COL_FECHA_CREACION, u.Fecha_Creacion);
            operation.AddDateTimeParam(DB_COL_FECHA_NACIMIENTO, u.Fecha_Nacimiento);
            operation.AddVarcharParam(DB_COL_URL_FOTO, u.URL_Foto);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddVarcharParam(DB_COL_APELLIDOS, u.Apellidos);
            operation.AddVarcharParam(DB_COL_GENERO, u.Genero);
            operation.AddVarcharParam(DB_COL_ESTADO, u.Estado);
            operation.AddDoubleParam(DB_COL_SALDO, u.Saldo);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un usuario de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del usuario que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un usuario de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_USUARIO_PR" };

            var u = (Usuario)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, u.Id_Usuario);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos Usuario de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos usuario</param>
        /// <returns>Lista de objetos usuario</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var usuario = BuildObject(row);
                lstResults.Add(usuario);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto usuario a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto usuario</param>
        /// <returns>Objeto usuario</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var usuario = new Usuario
            {
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Email = GetStringValue(row, DB_COL_EMAIL),
                Telefono = GetStringValue(row, DB_COL_TELEFONO),
                Identificacion = GetStringValue(row, DB_COL_IDENTIFICACION),
                Tipo_Identificacion = GetStringValue(row, DB_COL_TIPO_IDENTIFICACION),
                Fecha_Creacion = GetDateValue(row, DB_COL_FECHA_CREACION),
                Fecha_Nacimiento = GetDateValue(row, DB_COL_FECHA_NACIMIENTO),
                URL_Foto = GetStringValue(row, DB_COL_URL_FOTO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Apellidos = GetStringValue(row, DB_COL_APELLIDOS),
                Genero = GetStringValue(row, DB_COL_GENERO),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                Saldo = GetDoubleValue(row, DB_COL_SALDO)
            };

            return usuario;
        }
    }
}