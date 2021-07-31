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
    public class RolCrudFactory : CrudFactory
    {
        RolMapper mapper;

        public RolCrudFactory() : base()
        {
            mapper = new RolMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar un nuevo rol en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del rol que se quiere registrar en la base de datos</param>
        public override void Create(BaseEntity entity)
        {
            var rol = (Rol)entity;
            var sqlOperation = mapper.GetCreateStatement(rol);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        /// Metodo para buscar un rol segun su id
        /// </summary>
        /// <param name="entity">Instancia de Rol con el id del rol que se quiere buscar</param>
        /// <returns>Instancia del Rol que se quiere buscar</returns>
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
        /// Metodo para listar todos los roles registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los roles registrados en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstRols = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstRols.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstRols;
        }
        /// <summary>
        /// Metodo para actualizar un rol registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instacia del rol que se quiere actualzar</param>
        public override void Update(BaseEntity entity)
        {
            var rol = (Rol)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(rol));
        }
        /// <summary>
        /// Metodo para eliminar un rol de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del rol que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var rol = (Rol)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(rol));
        }
    }
}
