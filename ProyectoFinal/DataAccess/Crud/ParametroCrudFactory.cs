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
    public class ParametroCrudFactory : CrudFactory
    {
        ParametroMapper mapper;

        public ParametroCrudFactory() : base()
        {
            mapper = new ParametroMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar el documento en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del documento con la informacion recibida</param>

        public override void Create(BaseEntity entity)
        {
            var parametro = (Parametro)entity;
            var sqlOperation = mapper.GetCreateStatement(parametro);
            dao.ExecuteProcedure(sqlOperation);
        }

        /// <summary>
        ///  Metodo para buscar un parametro por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de parametro con el id del parametro que se quiere buscar</param>
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
        /// Metodo para listar todos los parametros registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los parametros registrados en la base de datos</returns>

        public override List<T> RetrieveAll<T>()
        {
            var lstParametros = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstParametros.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstParametros;
        }

        /// <summary>
        /// Metodo para actualizar un parametro en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de parametro con el id del parametro que se quiere actualizar</param>

        public override void Update(BaseEntity entity)
        {
            var parametro = (Parametro)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(parametro));
        }

        /// <summary>
        /// Metodo para eliminar un parametro de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de parametro con el id del parametro que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var parametro = (Parametro)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(parametro));
        }
    }
}
