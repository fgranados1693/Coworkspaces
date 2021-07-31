using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    class SolicitudMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_SOLICIUTD = "Id_Solicitud";
        private const string DB_COL_ID_USUARIO = "Id_Usuario";
        private const string DB_COL_REVISADA = "Revisada";
        private const string DB_COL_RESULTADO = "Resultado";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var solicitud = new Solicitud
            {
                Id_Solicitud = GetIntValue(row, DB_COL_ID_SOLICIUTD),
                Id_Usuario = GetIntValue(row, DB_COL_ID_USUARIO),
                Revisada = GetStringValue(row, DB_COL_REVISADA),
                Resultado = GetStringValue(row, DB_COL_RESULTADO),
            };

            return solicitud;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var solicitud = BuildObject(row);
                lstResults.Add(solicitud);
            }

            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_SOLICITUD_PR" };

            var s = (Solicitud)entity;
            operation.AddIntParam(DB_COL_ID_USUARIO, s.Id_Usuario);
            operation.AddVarcharParam(DB_COL_REVISADA, s.Revisada);
            operation.AddVarcharParam(DB_COL_RESULTADO, s.Resultado);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_SOLICITUDES" };
            return operation;
        }

        public SqlOperation GetRetriveStatementById(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_SOLICITUDES_BY_ID_PR" };

            var s = (Solicitud)entity;
            operation.AddIntParam(DB_COL_ID_SOLICIUTD, s.Id_Solicitud);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_SOLICITUDES_PR" };

            var s = (Solicitud)entity;
            operation.AddIntParam(DB_COL_ID_SOLICIUTD, s.Id_Solicitud);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_SOLICITUDE_PR" };

            var s = (Solicitud)entity;
            operation.AddIntParam(DB_COL_ID_SOLICIUTD, s.Id_Solicitud);
            operation.AddIntParam(DB_COL_ID_USUARIO, s.Id_Usuario);
            operation.AddVarcharParam(DB_COL_REVISADA, s.Revisada);
            operation.AddVarcharParam(DB_COL_RESULTADO, s.Resultado);

            return operation;


        }
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_SOLICITUDES_PR" };

            var s = (Solicitud)entity;
            operation.AddIntParam(DB_COL_ID_SOLICIUTD, s.Id_Solicitud);
            return operation;
        }
    }
}

