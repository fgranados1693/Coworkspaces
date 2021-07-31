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
    public class TransaccionCrudFactory : CrudFactory
    {
        TransaccionMapper mapper;

        public TransaccionCrudFactory() : base()
        {
            mapper = new TransaccionMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar una nueva transaccion en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la transaccion que se quiere registrar</param>
        public override void Create(BaseEntity entity)
        {
            var transaccion = (Transaccion)entity;
            var sqlOperation = mapper.GetCreateStatement(transaccion);
            dao.ExecuteProcedure(sqlOperation);
        }

        /// <summary>
        /// Metodo para buscar una transaccion segun su id
        /// </summary>
        /// <param name="entity">Instancia de transaccion con en el id de la transaccion que se quiere buscar</param>
        /// <returns>Instancia completa de la transaccion que se quiere buscar</returns>
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
        /// Metodo para listar todas las transaccions registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las transaccions registradas en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstTransaccions = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstTransaccions.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstTransaccions;
        }

        /// <summary>
        /// Metodo para listar todas las transacciones para una factura segun su id
        /// </summary>
        /// <param name="entity">Instancia de transaccion con el id de la factura del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las transacciones para el id de factura recibido</returns>
        public List<T> RetrieveByIdFactura<T>(BaseEntity entity)
        {
            var lstTransaccions = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveByIdFacturaStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstTransaccions.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstTransaccions;
        }

        /// <summary>
        /// Metodo para actualizar una transaccion registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la transaccion que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var transaccion = (Transaccion)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(transaccion));
        }

        /// <summary>
        /// Metodo para eliminar una transaccion de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la transaccion que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var transaccion = (Transaccion)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(transaccion));
        }
    }
}
