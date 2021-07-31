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
    public class CategoriaCrudFactory : CrudFactory
    {
        CategoriaMapper mapper;

        public CategoriaCrudFactory() : base()
        {
            mapper = new CategoriaMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar la categoria en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la categoria con la informacion recibida</param>

        public override void Create(BaseEntity entity)
        {
            var categoria = (Categoria)entity;
            var sqlOperation = mapper.GetCreateStatement(categoria);
            dao.ExecuteProcedure(sqlOperation);
        }

        /// <summary>
        ///  Metodo para buscar una categoria por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de categoria con el id de la categoria que se quiere buscar</param>
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
        /// Metodo para listar todos las categorias registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos las categorias registrados en la base de datos</returns>

        public override List<T> RetrieveAll<T>()
        {
            var lstcategorias = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstcategorias.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstcategorias;
        }

        /// <summary>
        /// Metodo para actualizar una categoria en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de categoria con el id del categoria que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var categoria = (Categoria)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(categoria));
        }

        /// <summary>
        /// Metodo para eliminar una catgoria de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de uscatgoriauario con el id de la catgoria que se quiere eliminar</param>

        public override void Delete(BaseEntity entity)
        {
            var categoria = (Categoria)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(categoria));
        }
    }
}
