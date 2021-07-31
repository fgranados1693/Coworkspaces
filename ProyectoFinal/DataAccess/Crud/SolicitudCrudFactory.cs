using DataAccess.Dao;
using DataAccess.Mapper;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Crud
{
    public class SolicitudCrudFactory : CrudFactory
    {
        SolicitudMapper mapper;

        public SolicitudCrudFactory() : base()
        {
            mapper = new SolicitudMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var solicitud = (Solicitud)entity;
            var sqlOperation = mapper.GetCreateStatement(solicitud);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var sqlOperation = mapper.GetRetriveStatement(entity);
            var lstResult = dao.ExecuteQueryProcedure(sqlOperation);
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public T RetrieveById<T>(BaseEntity entity)
        {
            var sqlOperation = mapper.GetRetriveStatementById(entity);
            var lstResult = dao.ExecuteQueryProcedure(sqlOperation);
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var objs = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(objs, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstSolicitudes = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstSolicitudes.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstSolicitudes;
        }

        public override void Update(BaseEntity entity)
        {
            var solicitud = (Solicitud)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(solicitud));
        }


        public override void Delete(BaseEntity entity)
        {
            var solicitud = (Solicitud)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(solicitud));
        }
    }
}