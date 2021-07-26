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
    public class FacturaCrudFactory : CrudFactory
    {
        FacturaMapper mapper;

        public FacturaCrudFactory() : base()
        {
            mapper = new FacturaMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar una nueva factura en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la factura que se quiere registrar</param>
        public override void Create(BaseEntity entity)
        {
            var factura = (Factura)entity;
            var sqlOperation = mapper.GetCreateStatement(factura);
            dao.ExecuteProcedure(sqlOperation);
        }

        /// <summary>
        /// Metodo para buscar una factura segun su id
        /// </summary>
        /// <param name="entity">Instancia de factura con en el id de la factura que se quiere buscar</param>
        /// <returns>Instancia completa de la factura que se quiere buscar</returns>
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
        /// Metodo para listar todas las facturas registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las facturas registradas en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstFacturas = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstFacturas.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstFacturas;
        }

        /// <summary>
        /// Metodo para listar todas las facturas para un usuario segun su id
        /// </summary>
        /// <param name="entity">Instancia de facturas con el id del usuario del cual se quieren buscar sus relaciones</param>
        /// <returns>Lista de todas las facturas para el id de usuario recibido</returns>
        public List<T> RetrieveByIdUsuario<T>(BaseEntity entity)
        {
            var lstFacturas = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveByIdUsuarioStatement(entity));
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstFacturas.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstFacturas;
        }

        /// <summary>
        /// Metodo para actualizar una factura registrada en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la factura que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var factura = (Factura)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(factura));
        }

        /// <summary>
        /// Metodo para eliminar una factura de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la factura que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var factura = (Factura)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(factura));
        }
    }
}
