using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class ApplicationMessageMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID = "ID";
        private const string DB_COL_MESSAGE = "MESSAGE";

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_APPLICATION_MESSAGE_PR" };

            var a = (ApplicationMessage)entity;
            operation.AddIntParam(DB_COL_ID, a.Id);
            operation.AddVarcharParam(DB_COL_MESSAGE, a.Message);

            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_APPLICATION_MESSAGE_PR" };

            var a = (ApplicationMessage)entity;
            operation.AddIntParam(DB_COL_ID, a.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_APPLICATION_MESSAGE_PR" };
            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_APPLICATION_MESSAGE_PR" };

            var a = (ApplicationMessage)entity;
            operation.AddIntParam(DB_COL_ID, a.Id);
            operation.AddVarcharParam(DB_COL_MESSAGE, a.Message);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_APPLICATION_MESSAGE_PR" };

            var a = (ApplicationMessage)entity;
            operation.AddIntParam(DB_COL_ID, a.Id);
            return operation;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var applicationMessage = BuildObject(row);
                lstResults.Add(applicationMessage);
            }

            return lstResults;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var applicationMessage = new ApplicationMessage
            {
                Id = GetIntValue(row, DB_COL_ID),
                Message = GetStringValue(row, DB_COL_MESSAGE),
            };

            return applicationMessage;
        }

    }
}
