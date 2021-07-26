using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class PropiedadMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_PROPIEDAD = "Id_Propiedad";
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_NOMBRE = "Nombre";
        private const string DB_COL_ESTADO = "Estado";
        private const string DB_COL_DESCRIPCION = "Descripcion";
        private const string DB_COL_LATITUD = "Latitud";
        private const string DB_COL_LONGITUD = "Longitud";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar una nueva propiedad
        /// </summary>
        /// <param name="entity">Instancia de la propiedad que se quiere registrar</param>
        /// <returns>operacion sql para registrar una nueva propiedad</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_PROPIEDAD_PR" };

            var p = (Propiedad)entity;
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, p.IdPropiedad);
            operation.AddIntParam(DB_COL_ID_USUARIO, p.IdUsuario);
            operation.AddVarcharParam(DB_COL_NOMBRE, p.Nombre);
            operation.AddVarcharParam(DB_COL_ESTADO, p.Estado);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, p.Descripcion);
            operation.AddDoubleParam(DB_COL_LATITUD, p.Latitud);
            operation.AddDoubleParam(DB_COL_LONGITUD, p.Longitud);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para buscar una propiedad segun su id
        /// </summary>
        /// <param name="entity">Instancia de propiedad con el id del propiedad que se quiere buscar</param>
        /// <returns>operacion sql para buscar un propiedad segun su id</returns>


        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_PROPIEDAD_PR" };

            var p = (Propiedad)entity;
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, p.IdPropiedad);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos las propiedades registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los propiedades registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_PROPIEDADES_PR" };
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una propiedad registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del propiedad que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un propiedad registrado en la base de datos</returns>

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_PROPIEDAD_PR" };

            var p = (Propiedad)entity;
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, p.IdPropiedad);
            operation.AddIntParam(DB_COL_ID_USUARIO, p.IdUsuario);
            operation.AddVarcharParam(DB_COL_NOMBRE, p.Nombre);
            operation.AddVarcharParam(DB_COL_ESTADO, p.Estado);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, p.Descripcion);
            operation.AddDoubleParam(DB_COL_LATITUD, p.Latitud);
            operation.AddDoubleParam(DB_COL_LONGITUD, p.Longitud);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para eliminar una propiedad de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del propiedad que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un propiedad de la base de datos</returns>

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_PROPIEDAD_PR" };

            var p = (Propiedad)entity;
            operation.AddIntParam(DB_COL_ID_PROPIEDAD, p.IdPropiedad);
            return operation;
        }

        /// <summary>
        /// Metodo para construir todos los objetos Propeidad de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos Propeidad</param>
        /// <returns>Lista de objetos Propeidad</returns>

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var propiedad = BuildObject(row);
                lstResults.Add(propiedad);
            }

            return lstResults;
        }

        /// <summary>
        /// Metodo para construir un objeto propiedad a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto propiedad</param>
        /// <returns>Objeto propiedad</returns>

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var propiedad = new Propiedad
            {
                IdPropiedad = GetIntValue(row, DB_COL_ID_PROPIEDAD),
                IdUsuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Estado = GetStringValue(row, DB_COL_ESTADO),
                Descripcion = GetStringValue(row, DB_COL_DESCRIPCION),
                Latitud = GetDoubleValue(row, DB_COL_LATITUD),
                Longitud = GetDoubleValue(row, DB_COL_LONGITUD)
            };

            return propiedad;
        }

    }
}

