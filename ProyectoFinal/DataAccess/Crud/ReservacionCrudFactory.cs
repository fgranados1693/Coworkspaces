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
    public class ReservacionCrudFactory : CrudFactory
    {
        ReservacionMapper mapper;

        public ReservacionCrudFactory() : base()
        {
            mapper = new ReservacionMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar la Reservacion  en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la Reservacion con la informacion recibida</param>
        public override void Create(BaseEntity entity)
        {
            var reservacion = (Reservacion)entity;
            var sqlOperation = mapper.GetCreateStatement(reservacion);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        ///  Metodo para buscar una Reservacion por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id de la Reservacion que se quiere buscar</param>
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
        ///  Metodo para buscar todos las Reservaciones por Espacio en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id del espacio que se quiere buscar</param>
        /// <returns></returns>
        public List<T> RetrieveByEspacioReservaciones<T>(BaseEntity entity)
        {
            var lstEspacios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementByEspacio(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEspacios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEspacios;

        }
        /// <summary>
        ///  Metodo para buscar todos las Reservaciones por fecha en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con la fecha que se quiere buscar</param>
        /// <returns></returns>
        public List<T> RetrieveByFechaReservaciones<T>(BaseEntity entity)
        {
            var lstEspacios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementByFecha(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEspacios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEspacios;

        }
        /// <summary>
        ///  Metodo para buscar todos las Reservaciones por usuario en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id del usuario que se quiere buscar</param>
        /// <returns></returns>
        public List<T> RetrieveByUsuarioReservaciones<T>(BaseEntity entity)
        {
            var lstEspacios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementByUsuario(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstEspacios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstEspacios;

        }
        /// <summary>
        /// Metodo para listar todos las reservaciones registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos las reservaciones registrados en la base de datos</returns>
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
        /// Metodo para actualizar una reservacion en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id de la reservacion que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var reservacion = (Reservacion)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(reservacion));
        }
        /// <summary>
        /// Metodo para eliminar una reservacion de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Reservacion con el id de la reservacion que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var reservacion = (Reservacion)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(reservacion));
        }
    }
}
