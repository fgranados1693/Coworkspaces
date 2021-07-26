using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Dao;
using DataAccess.Mapper;

namespace DataAccess.Crud
{
    public class CaracteristicaEspacioCrudFactory : CrudFactory
    {
        CaracteristicaEspacioMapper mapper;

        public CaracteristicaEspacioCrudFactory() : base()
        {
            mapper = new CaracteristicaEspacioMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            var caracteristicaEspacio = (CaracteristicaEspacio)entity;
            var sqlOperation = mapper.GetCreateStatement(caracteristicaEspacio);
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

        public List<T> RetrieveByEspacio<T>(BaseEntity entity)
        {
            var lstcaracteristicasEspacio = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementByEspacio(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstcaracteristicasEspacio.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstcaracteristicasEspacio;
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstcaracteristicasEspacio = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstcaracteristicasEspacio.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstcaracteristicasEspacio;
        }

        public override void Update(BaseEntity entity)
        {
            var caracteristicaEspacio = (CaracteristicaEspacio)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(caracteristicaEspacio));
        }

        public override void Delete(BaseEntity entity)
        {
            var caracteristicaEspacio = (CaracteristicaEspacio)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(caracteristicaEspacio));
        }
    }
}
