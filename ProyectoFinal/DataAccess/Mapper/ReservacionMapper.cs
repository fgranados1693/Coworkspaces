using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class ReservacionMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_RESERVACION = "Id_Reservacion";
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_ID_ESPACIO = "Id_Espacio";
        private const string DB_COL_FECHA = "Fecha";
        private const string DB_COL_HORA_ENTRADA = "Hora_Entrada";
        private const string DB_COL_HORA_SALIDA = "Hora_Salida";
        private const string DB_COL_CALIFICACION_USUARIO = "Calificacion_Usuario";
        private const string DB_COL_CALIFICACION_PROPIETARIO = "Calificacion_Propietario";
        private const string DB_COL_CALIFICACION_PROPIEDAD = "Calificacion_Propiedad";
        private const string DB_COL_MONTO = "Monto";
        private const string DB_COL_ESTADO = "Estado";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva Reservacion
        /// </summary>
        /// <param name="entity">Instancia de la Reservacion que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva Reservacion</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_RESERVACION_PR" };

            var u = (Reservacion)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, u.Id_Usuario);
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            operation.AddDateTimeParam(DB_COL_FECHA, u.Fecha);
            operation.AddTimeParam(DB_COL_HORA_ENTRADA, u.Hora_Entrada);
            operation.AddTimeParam(DB_COL_HORA_SALIDA, u.Hora_Salida);
            operation.AddIntParam(DB_COL_CALIFICACION_USUARIO, u.Calificacion_Usuario);
            operation.AddIntParam(DB_COL_CALIFICACION_PROPIETARIO, u.Calificacion_Propietario);
            operation.AddIntParam(DB_COL_CALIFICACION_PROPIEDAD, u.Calificacion_Propiedad);
            operation.AddDoubleParam(DB_COL_MONTO, u.Monto);
            operation.AddVarcharParam(DB_COL_ESTADO, u.Estado);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una Reservacion segun su id
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id de la Reservacion que se quiere buscar</param>
        /// <returns>operacion sql para buscar una Reservacion segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_RESERVACION_PR" };

            var u = (Reservacion)entity;
            operation.AddIntParam(DB_COL_ID_RESERVACION, u.Id_Reservacion);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una Reservacion segun su espacio
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id del espacio que se quiere buscar</param>
        /// <returns>operacion sql para buscar una Reservacion segun su espacio</returns>
        public SqlOperation GetRetriveStatementByEspacio(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_RESERVACION_BY_ESPACIO_PR" };

            var u = (Reservacion)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una Reservacion segun una fecha
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id de la fecha que se quiere buscar</param>
        /// <returns>operacion sql para buscar una Reservacion segun una fecha</returns>
        public SqlOperation GetRetriveStatementByFecha(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_RESERVACION_BY_FECHA_PR" };

            var u = (Reservacion)entity;
            operation.AddDateTimeParam(DB_COL_FECHA, u.Fecha);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar una Reservacion segun un usuario
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id del usuario que se quiere buscar</param>
        /// <returns>operacion sql para buscar una Reservacion segun un usuario</returns>
        public SqlOperation GetRetriveStatementByUsuario(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_RESERVACION_BY_USUARIO_PR" };

            var u = (Reservacion)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, u.Id_Usuario);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos las Reservaciones registradas en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos las reservaciones registradas en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_RESERVACIONES_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una reservacion registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la reservacion que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar una reservacion registrada en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_RESERVACION_PR" };

            var u = (Reservacion)entity;
            operation.AddIntParam(DB_COL_ID_RESERVACION, u.Id_Reservacion);
            operation.AddIntParam(DB_COL_ID_USUARIO, u.Id_Usuario);
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            operation.AddDateTimeParam(DB_COL_FECHA, u.Fecha);
            operation.AddTimeParam(DB_COL_HORA_ENTRADA, u.Hora_Entrada);
            operation.AddTimeParam(DB_COL_HORA_SALIDA, u.Hora_Salida);
            operation.AddIntParam(DB_COL_CALIFICACION_USUARIO, u.Calificacion_Usuario);
            operation.AddIntParam(DB_COL_CALIFICACION_PROPIETARIO, u.Calificacion_Propietario);
            operation.AddIntParam(DB_COL_CALIFICACION_PROPIEDAD, u.Calificacion_Propiedad);
            operation.AddDoubleParam(DB_COL_MONTO, u.Monto);
            operation.AddVarcharParam(DB_COL_ESTADO, u.Estado);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una Reservacion de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la Reservacion que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar una Reservacion de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_RESERVACION_PR" };

            var u = (Reservacion)entity;
            operation.AddIntParam(DB_COL_ID_RESERVACION, u.Id_Reservacion);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos Reservacion de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos Reservacion</param>
        /// <returns>Lista de objetos Reservacion</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var reservacion = BuildObject(row);
                lstResults.Add(reservacion);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto reservacion a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto reservacion</param>
        /// <returns>Objeto reservacion</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var reservacion = new Reservacion
            {
                Id_Reservacion = GetIntValue(row, DB_COL_ID_RESERVACION),
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Id_Espacio = GetIntValue(row, DB_COL_ID_ESPACIO),
                Fecha = GetDateValue(row, DB_COL_FECHA),
                Hora_Entrada = GetDateSpanValue(row, DB_COL_HORA_ENTRADA),
                Hora_Salida = GetDateSpanValue(row, DB_COL_HORA_SALIDA),
                Calificacion_Usuario = GetIntValue(row, DB_COL_CALIFICACION_USUARIO),
                Calificacion_Propietario = GetIntValue(row, DB_COL_CALIFICACION_PROPIETARIO),
                Calificacion_Propiedad = GetIntValue(row, DB_COL_CALIFICACION_PROPIEDAD),
                Monto = (float)GetDoubleValue(row, DB_COL_MONTO),
                Estado = GetStringValue(row, DB_COL_ESTADO)
                

            };

            return reservacion;
        }
    }
}