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
    public class HorarioCrudFactory : CrudFactory
    {
        HorarioMapper mapper;

        public HorarioCrudFactory() : base()
        {
            mapper = new HorarioMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar el Horario en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del Horario con la informacion recibida</param>
        public override void Create(BaseEntity entity)
        {
            var usuario = (Horario)entity;
            var sqlOperation = mapper.GetCreateStatement(usuario);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        ///  Metodo para buscar un Horario por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Horario con el id del usuario que se quiere buscar</param>
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
        ///  Metodo para buscar un Horario por su espacio y dia de la semaan en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de horario con el dia de la semaan y espacio que se quiere buscar</param>
        /// <returns></returns>
        public T RetrieveByEspacioDiaSemana<T>(BaseEntity entity)
        {
            
            var sqlOperation = mapper.GetRetriveStatementHorariosDiaSemana(entity);
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
        ///  Metodo para buscar un Horario por su espacio en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de horario con el espacio que se quiere buscar</param>
        /// <returns></returns>
        public List<T> RetrieveByEspacio<T>(BaseEntity entity)
        {
            var lstHorarios = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementHorariosEspacio(entity));
            ///var sqlOperation = mapper.GetRetriveStatementHorariosEspacio(entity);
            ///var lstResult = dao.ExecuteQueryProcedure(sqlOperation);
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                ///dic = lstResult[0];
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstHorarios.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstHorarios;
        }

        /// <summary>
        /// Metodo para listar todos los Horarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los Horarios registrados en la base de datos</returns>
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
        /// Metodo para actualizar un Horario en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Horario con el id del Horario que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var horario = (Horario)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(horario));
        }
        /// <summary>
        /// Metodo para eliminar un Horario de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Horario con el id del Horario que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var horario = (Horario)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(horario));
        }
    }
}
