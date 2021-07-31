using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class EspacioMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_ESPACIO = "Id_Espacio";
        private const string DB_COL_ID_CATEGORIA = "Id_Categoria";
        private const string DB_COL_ID_PROPIEDAD = "Id_Propiedad";
        private const string DB_COL_NOMBRE = "Nombre";
        private const string DB_COL_PRECIO = "Precio";
        private const string DB_COL_ESTADO = "Estado";
        private const string DB_COL_PERMITE_REEMBOLSO = "Permite_Reembolso";
        private const string DB_COL_PERMITE_CANCELACION = "Permite_Cancelacion";
        private const string DB_COL_TIEMPO_MINIMO_PREVIO_CANCELACION = "Tiempo_Minimo_Previo_Cancelacion";
        private const string DB_COL_TIEMPO_MINIMO_RESERVACION = "Tiempo_Minimo_Reservacion";
        private const string DB_COL_MENSAJE_RESERVACION = "Mensaje_Reservacion";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo espacio
        /// </summary>
        /// <param name="entity">Instancia del espacio que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo espacio</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_ESPACIO_PR" };

            var u = (Espacio)entity;
            operation.AddIntParam(DB_COL_ID_CATEGORIA, u.Id_Categoria);
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, u.Id_Propiedad);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddDoubleParam(DB_COL_PRECIO, u.Precio);
            operation.AddVarcharParam(DB_COL_ESTADO, u.Estado);
            operation.AddVarcharParam(DB_COL_PERMITE_REEMBOLSO, u.Permite_Reembolso);
            operation.AddVarcharParam(DB_COL_PERMITE_CANCELACION, u.Permite_Cancelacion);
            operation.AddIntParam(DB_COL_TIEMPO_MINIMO_PREVIO_CANCELACION, u.Tiempo_Minimo_Previo_Cancelacion);
            operation.AddDoubleParam(DB_COL_TIEMPO_MINIMO_RESERVACION, u.Tiempo_Minimo_Reservacion);
            operation.AddVarcharParam(DB_COL_MENSAJE_RESERVACION, u.Mensaje_Reservacion);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar un espacio segun su id
        /// </summary>
        /// <param name="entity">Instancia de espacio con el id del espacio que se quiere buscar</param>
        /// <returns>operacion sql para buscar un espacio segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ESPACIO_PR" };

            var u  = (Espacio)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar horarios de un espacio con su id
        /// </summary>
        /// <param name="entity">Instancia de espacio con el id del espacio que se quiere horarios</param>
        /// <returns>operacion sql para buscar horarios de un espacio con su id</returns>
        public SqlOperation GetRetriveStatementHorarios(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_HORARIOS_ID_ESPACIO_PR" };

            var u = (Espacio)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los espacios registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los espacios registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_ESPACIOS_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un espacio registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del espacio que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un espacio registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_ESPACIO_PR" };

            var u = (Espacio)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, u.Id_Propiedad);
            operation.AddIntParam(DB_COL_ID_CATEGORIA, u.Id_Categoria);
            operation.AddVarcharParam(DB_COL_NOMBRE, u.Nombre);
            operation.AddDoubleParam(DB_COL_PRECIO, u.Precio);
            operation.AddVarcharParam(DB_COL_ESTADO, u.Estado);
            operation.AddVarcharParam(DB_COL_PERMITE_REEMBOLSO, u.Permite_Reembolso);
            operation.AddVarcharParam(DB_COL_PERMITE_CANCELACION, u.Permite_Cancelacion);
            operation.AddIntParam(DB_COL_TIEMPO_MINIMO_PREVIO_CANCELACION, u.Tiempo_Minimo_Previo_Cancelacion);
            operation.AddDoubleParam(DB_COL_TIEMPO_MINIMO_RESERVACION, u.Tiempo_Minimo_Reservacion);
            operation.AddVarcharParam(DB_COL_MENSAJE_RESERVACION, u.Mensaje_Reservacion);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un espacio de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del espacio que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un espacio de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_ESPACIO_PR" };

            var u = (Espacio)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos Espacio de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos espacio</param>
        /// <returns>Lista de objetos usuario</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var espacio = BuildObject(row);
                lstResults.Add(espacio);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto espacio a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto espacio</param>
        /// <returns>Objeto espacio</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var espacio = new Espacio
            {
                Id_Espacio = GetIntValue(row, DB_COL_ID_ESPACIO),
                Id_Categoria = GetIntValue(row, DB_COL_ID_CATEGORIA),
                Id_Propiedad = GetIntValue(row, DB_COL_ID_PROPIEDAD),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Precio = (float)GetDoubleValue(row, DB_COL_PRECIO),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                Permite_Reembolso = GetStringValue(row, DB_COL_PERMITE_REEMBOLSO),
                Permite_Cancelacion = GetStringValue(row, DB_COL_PERMITE_CANCELACION),
                Tiempo_Minimo_Previo_Cancelacion = GetIntValue(row, DB_COL_TIEMPO_MINIMO_PREVIO_CANCELACION),
                Tiempo_Minimo_Reservacion = GetDoubleValue(row, DB_COL_TIEMPO_MINIMO_RESERVACION),
                Mensaje_Reservacion = GetStringValue(row, DB_COL_MENSAJE_RESERVACION)

            };

            return espacio;
        }
    }
}