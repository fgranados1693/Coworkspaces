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
    public class MensajeCrudFactory : CrudFactory
    {
        MensajeMapper mapper;

        public MensajeCrudFactory() : base()
        {
            mapper = new MensajeMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar un nuevo mensaje en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la mensaje que se quiere registrar</param>
        public override void Create(BaseEntity entity)
        {
            var mensaje = (Mensaje)entity;
            var sqlOperation = mapper.GetCreateStatement(mensaje);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Metodo para buscar un mensaje segun el id del usuario
        /// </summary>
        /// <param name="entity">Instancia de mensaje con el id del usuario</param>
        /// <returns>Lista de mensajes que se quieren buscar</returns>
        public List<T> RetrieveByIdUsuario<T>(BaseEntity entity)
        {
            var lstMensajes = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetByIdUsuarioRetriveStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstMensajes.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstMensajes;
        }

        /// <summary>
        /// Metodo para listar todos los mensajes registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los mensajes registrados en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstMensajes = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstMensajes.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstMensajes;
        }

        public override void Update(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Metodo para eliminar un mensaje de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del mensaje que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var mensaje = (Mensaje)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(mensaje));
        }
    }
}
