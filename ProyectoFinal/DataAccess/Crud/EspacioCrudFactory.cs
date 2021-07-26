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
    public class EspacioCrudFactory : CrudFactory
    {
        EspacioMapper mapper;

        public EspacioCrudFactory() : base()
        {
            mapper = new EspacioMapper();
            dao = SqlDao.GetInstance();
        }
        /// <summary>
        /// Metodo para registrar el Espacio en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del Espacio con la informacion recibida</param>
        public override void Create(BaseEntity entity)
        {
            var espacio = (Espacio)entity;
            var sqlOperation = mapper.GetCreateStatement(espacio);
            dao.ExecuteProcedure(sqlOperation);
        }
        /// <summary>
        ///  Metodo para buscar un Espacio por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Espacio con el id del usuario que se quiere buscar</param>
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
        ///  Metodo para buscar todos los horarios por Espacio en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Espacio con el id del espacio que se quiere buscar</param>
        /// <returns></returns>
        public List<T> RetrieveByEspacioHorarios<T>(BaseEntity entity)
        {
            var lstEspacios = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatementHorarios(entity));
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
        /// Metodo para listar todos los Espacios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los Espacios registrados en la base de datos</returns>
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
        /// Metodo para actualizar un Espacio en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Espacio con el id del Espacio que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var espacio = (Espacio)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(espacio));
        }
        /// <summary>
        /// Metodo para eliminar un Espacio de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de Espacio con el id del Espacio que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var espacio = (Espacio)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(espacio));
        }
    }
}
