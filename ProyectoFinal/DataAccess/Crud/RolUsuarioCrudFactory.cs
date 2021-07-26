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
    public class RolUsuarioCrudFactory : CrudFactory
    {
        RolUsuarioMapper mapper;

        public RolUsuarioCrudFactory() : base()
        {
            mapper = new RolUsuarioMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar una nueva relacion rol usuario en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de RolUsuario que se quiere registrar</param>
        public override void Create(BaseEntity entity)
        {
            var rolUsuario = (RolUsuario)entity;
            var sqlOperation = mapper.GetCreateStatement(rolUsuario);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        /// Metodo para listar todas las relaciones RolUsuario para un usuario segun su id
        /// </summary>
        /// <param name="entity">Instancia de RolUsuario con el id del usuario del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las relaciones RolUsuario para el id de usuario recibido</returns>
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
        /// Metodo para listar todas las relaciones RolUsuario registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las relaciones RolUsuario registradas en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstRolUsuarios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstRolUsuarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstRolUsuarios;
        }
        /// <summary>
        /// Metodo para listar todas las relaciones RolUsuario para un usuario segun su id
        /// </summary>
        /// <param name="entity">Instancia de RolUsuario con el id del usuario del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las relaciones RolUsuario para el id de usuario recibido</returns>
        public List<T> RetrieveByIdUsuario<T>(BaseEntity entity)
        {
            var lstRolUsuarios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveByIdUsuarioStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstRolUsuarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstRolUsuarios;
        }
        /// <summary>
        /// Metodo para actualizar una relacion RolUsuario registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de RolUsuario que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var rolUsuario = (RolUsuario)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(rolUsuario));
        }
        /// <summary>
        /// Metodo para eliminar una relacion RolUsuario registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de RolUsuario que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var rolUsuario = (RolUsuario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(rolUsuario));
        }
    }
}
