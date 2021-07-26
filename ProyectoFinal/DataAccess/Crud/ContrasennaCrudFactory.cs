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
    public class ContrasennaCrudFactory : CrudFactory
    {
        ContrasennaMapper mapper;

        public ContrasennaCrudFactory() : base()
        {
            mapper = new ContrasennaMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar una nueva contrasenna en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la contrasenna que se quiere registrar</param>
        public override void Create(BaseEntity entity)
        {
            var contrasenna = (Contrasenna)entity;
            var sqlOperation = mapper.GetCreateStatement(contrasenna);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        /// Metodo para buscar todas las contrasennas segun el id de la contrasenna
        /// </summary>
        /// <param name="entity">Instancia de contrasenna con el id de la contrasenna</param>
        /// <returns>Instancia de la contrasenna que se quiere buscar</returns>
        public override T Retrieve<T>(BaseEntity entity)
        {
            var sqlOperation = mapper.GetRetriveByIdUsuarioStatement(entity);
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
        /// Metodo para listar todas las contrasennas registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las contrasennas registradas en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstContrasennas = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstContrasennas.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstContrasennas;
        }
        /// <summary>
        /// Metodo para buscar todas las contrasennas segun el id de un usuario
        /// </summary>
        /// <param name="entity">Instancia de contrasenna con el id del usuario</param>
        /// <returns>Lista de todas las contrasennas registradas con el id del usuario</returns>
        public List<T> RetrieveByIdUsuario<T>(BaseEntity entity)
        {
            var lstContrasennas = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveByIdUsuarioStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstContrasennas.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstContrasennas;
        }
        /// <summary>
        /// Metodo para actualizar una contrasenna registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la contrasenna que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var contrasenna = (Contrasenna)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(contrasenna));
        }
        /// <summary>
        /// Metodo para eliminar una contrasenna de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la contrasenna que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var contrasenna = (Contrasenna)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(contrasenna));
        }
    }
}
