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
    public class UsuarioCrudFactory : CrudFactory
    {
        UsuarioMapper mapper;

        public UsuarioCrudFactory() : base()
        {
            mapper = new UsuarioMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar el usuario en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del usuario con la informacion recibida</param>
        public override void Create(BaseEntity entity)
        {
            var usuario = (Usuario)entity;
            var sqlOperation = mapper.GetCreateStatement(usuario);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        ///  Metodo para buscar un usuario por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de usuario con el id del usuario que se quiere buscar</param>
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
        ///  Metodo para buscar un usuario por su correo en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de usuario con el correo del usuario que se quiere buscar</param>
        /// <returns></returns>
        public T RetrieveByEmail<T>(BaseEntity entity)
        {
            var sqlOperation = mapper.GetRetriveStatementByEmail(entity);
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
        /// Metodo para listar todos los usuarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los usuarios registrados en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstUsuarios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstUsuarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstUsuarios;
        }
        /// <summary>
        /// Metodo para actualizar un usuario en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de usuario con el id del usuario que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var usuario = (Usuario)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(usuario));
        }
        /// <summary>
        /// Metodo para eliminar un usuario de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de usuario con el id del usuario que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var usuario = (Usuario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(usuario));
        }
    }
}
