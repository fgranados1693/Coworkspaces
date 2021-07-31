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
    public class PropiedadCrudFactory : CrudFactory
    {
        PropiedadMapper mapper;

        public PropiedadCrudFactory() : base()
        {
            mapper = new PropiedadMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar la propiedad en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la propiedad con la informacion recibida</param>

        public override void Create(BaseEntity entity)
        {
            var propiedad = (Propiedad)entity;
            var sqlOperation = mapper.GetCreateStatement(propiedad);
            dao.ExecuteProcedure(sqlOperation);
        }

        /// <summary>
        ///  Metodo para buscar una propiedad por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia una propiedad  con el id de la propiedad que se quiere buscar</param>
        /// <returns></returns>

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

        /// <summary>
        /// Metodo para listar todos las propiedades registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos las propiedades registradas en la base de datos</returns>

        public override List<T> RetrieveAll<T>()
        {
            var lstpropiedades = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstpropiedades.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstpropiedades;
        }

        /// <summary>
        /// Metodo para actualizar una propiedad en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de una propiedad con el id de la propiedad que se quiere actualizar</param>

        public override void Update(BaseEntity entity)
        {
            var propiedad = (Propiedad)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(propiedad));
        }

        /// <summary>
        /// Metodo para eliminar una propiedad de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de una propiedad con el id de la propiedad que se quiere eliminar</param>

        public override void Delete(BaseEntity entity)
        {
            var propiedad = (Propiedad)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(propiedad));
        }
    }
}
