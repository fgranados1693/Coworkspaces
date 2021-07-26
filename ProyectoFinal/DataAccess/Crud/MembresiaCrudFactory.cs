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
    public class MembresiaCrudFactory : CrudFactory
    {
        MembresiaMapper mapper;

        public MembresiaCrudFactory() : base()
        {
            mapper = new MembresiaMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar una nueva membresia en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la membresia que se quiere registrar</param>
        public override void Create(BaseEntity entity)
        {
            var membresia = (Membresia)entity;
            var sqlOperation = mapper.GetCreateStatement(membresia);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        /// Metodo para buscar una membresia segun su id
        /// </summary>
        /// <param name="entity">Instancia de membresia con en el id de la membresia que se quiere buscar</param>
        /// <returns>Instancia completa de la membresia que se quiere buscar</returns>
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
        /// Metodo para buscar una membresia segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de membresia con el id del usuario</param>
        /// <returns>Instancia completa de la membresia que se quiere buscar</returns>
        public T RetrieveByIdUsuario<T>(BaseEntity entity)
        {
            var sqlOperation = mapper.GetByIdUsuarioRetriveStatement(entity);
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
        /// Metodo para listar todas las membresias registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las membresias registradas en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstMembresias = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstMembresias.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstMembresias;
        }
        /// <summary>
        /// Metodo para actualizar una membresia registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la membresia que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var membresia = (Membresia)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(membresia));
        }
        /// <summary>
        /// Metodo para eliminar una membresia de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la membresia que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var membresia = (Membresia)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(membresia));
        }
    }
}
