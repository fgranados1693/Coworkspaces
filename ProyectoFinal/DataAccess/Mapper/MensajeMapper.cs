using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class MensajeMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_MENSAJE = "Id_Mensaje";
        private const string DB_COL_ID_USUARIO_EMISOR = "Id_Usuario_Emisor";
        private const string DB_COL_ID_USUARIO_RECEPTOR = "Id_Usuario_Receptor";
        private const string DB_COL_TEXTO = "Texto";
        private const string DB_COL_FECHA = "Fecha";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo mensaje
        /// </summary>
        /// <param name="entity">Instancia de mensaje que se quiere registrar</param>
        /// <returns>operacion sql para registrar  un nuevo mensaje</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_MENSAJE_PR" };

            var m = (Mensaje)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO_EMISOR, m.Id_Usuario_Emisor);
            operation.AddIntParam(DB_COL_ID_USUARIO_RECEPTOR, m.Id_Usuario_Receptor);
            operation.AddVarcharParam(DB_COL_TEXTO, m.Texto);
            operation.AddDateTimeParam(DB_COL_FECHA, m.Fecha);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los mensajes segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de mensaje con el id del usuario</param>
        /// <returns>Lista de mensajes segun el id del usuario</returns>
        public SqlOperation GetByIdUsuarioRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_MENSAJE_BY_USUARIO_PR" };

            var m = (Mensaje)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO_EMISOR, m.Id_Usuario_Emisor);
            operation.AddIntParam(DB_COL_ID_USUARIO_RECEPTOR, m.Id_Usuario_Receptor);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los mensajes registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los mensajes registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_MENSAJE_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una conversacion de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de mensaje con los id de los usuarios de la conversacion que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar una conversacion de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_MENSAJE_PR" };

            var m = (Mensaje)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO_EMISOR, m.Id_Usuario_Emisor);
            operation.AddIntParam(DB_COL_ID_USUARIO_RECEPTOR, m.Id_Usuario_Receptor);
            return operation;
        }

        /// <summary>
        /// Metodo para construir todos los objetos mensaje de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos mensaje</param>
        /// <returns>Lista de objetos mensaje</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var mensaje = BuildObject(row);
                lstResults.Add(mensaje);
            }

            return lstResults;
        }

        /// <summary>
        /// Metodo para construir un objeto mensaje a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto mensaje</param>
        /// <returns>Objeto mensaje</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var mensaje = new Mensaje
            {
                Id_Mensaje = GetIntValue(row, DB_COL_ID_MENSAJE),
                Id_Usuario_Emisor = GetIntValue(row, DB_COL_ID_USUARIO_EMISOR),
                Id_Usuario_Receptor = GetIntValue(row, DB_COL_ID_USUARIO_RECEPTOR),
                Texto = GetStringValue(row, DB_COL_TEXTO),
                Fecha = GetDateValue(row, DB_COL_FECHA)
            };

            return mensaje;
        }
    }
}
