using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class CaracteristicaEspacioMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_CARACTERISTICA = "Id_Caracteristica";
        private const string DB_COL_ID_ESPACIO = "Id_Espacio";
        private const string DB_COL_NOMBRE = "Nombre";
        private const string DB_COL_DESCRIPCION = "Descripcion";
        

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CARACTERISTICAS_ESPACIO_PR" };

            var ce = (CaracteristicaEspacio)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, ce.Id_Espacio);
            operation.AddVarcharParam(DB_COL_NOMBRE, ce.Nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, ce.Descripcion);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CARACTERISTICAS_ESPACIO_PR" };

            var ce = (CaracteristicaEspacio)entity;
            operation.AddIntParam(DB_COL_ID_CARACTERISTICA, ce.Id_Caracteristica);

            return operation;
        }

        public SqlOperation GetRetriveStatementByEspacio(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CARACTERISTICAS_ESPACIO_BY_ESPACIO_PR" };

            var ce = (CaracteristicaEspacio)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, ce.Id_Espacio);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CARACTERISTICAS_ESPACIO_PR" };
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CARACTERISTICAS_ESPACIOS_PR" };

            var ce = (CaracteristicaEspacio)entity;
            operation.AddIntParam(DB_COL_ID_CARACTERISTICA, ce.Id_Caracteristica);
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_CARACTERISTICAS_ESPACIO_PR" };

            var ce = (CaracteristicaEspacio)entity;
            operation.AddIntParam(DB_COL_ID_CARACTERISTICA, ce.Id_Caracteristica);
            operation.AddIntParam(DB_COL_ID_ESPACIO, ce.Id_Espacio);
            operation.AddVarcharParam(DB_COL_NOMBRE, ce.Nombre);
            operation.AddVarcharParam(DB_COL_DESCRIPCION, ce.Descripcion);

            return operation;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var caracteristicaEspacio = new CaracteristicaEspacio
            {
                Id_Caracteristica = GetIntValue(row, DB_COL_ID_CARACTERISTICA),
                Id_Espacio = GetIntValue(row, DB_COL_ID_ESPACIO),
                Nombre = GetStringValue(row, DB_COL_NOMBRE),
                Descripcion = GetStringValue(row, DB_COL_DESCRIPCION)
            };

            return caracteristicaEspacio;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var caracteristicaEspacio = BuildObject(row);
                lstResults.Add(caracteristicaEspacio);
            }

            return lstResults;
        }
    }
}
