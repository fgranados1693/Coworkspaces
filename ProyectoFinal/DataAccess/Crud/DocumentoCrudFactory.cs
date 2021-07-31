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
    public class DocumentoCrudFactory : CrudFactory
    {
        DocumentoMapper mapper;

        public DocumentoCrudFactory() : base()
        {
            mapper = new DocumentoMapper();
            dao = SqlDao.GetInstance();
        }

        /// <summary>
        /// Metodo para registrar el documento en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del documento con la informacion recibida</param>
        public override void Create(BaseEntity entity)
        {
            var documento = (Documento)entity;
            var sqlOperation = mapper.GetCreateStatement(documento);
            dao.ExecuteProcedure(sqlOperation);
        }

        /// <summary>
        ///  Metodo para buscar un documento por su id en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de documento con el id del documento que se quiere buscar</param>
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
        /// Metodo para listar todos los documentos registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los documentos registrados en la base de datos</returns>
        public override List<T> RetrieveAll<T>()
        {
            var lstDocumentos = new List<T>();

            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();
            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var c in objs)
                {
                    lstDocumentos.Add((T)Convert.ChangeType(c, typeof(T)));
                }
            }

            return lstDocumentos;
        }

        /// <summary>
        /// Metodo para actualizar un documento en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de documento con el id del documento que se quiere actualizar</param>
        public override void Update(BaseEntity entity)
        {
            var documento = (Documento)entity;
            dao.ExecuteProcedure(mapper.GetUpdateStatement(documento));
        }

        /// <summary>
        /// Metodo para eliminar un documento de la base de datos
        /// </summary>
        /// <param name="entity">Instancia de documento con el id del documento que se quiere eliminar</param>
        public override void Delete(BaseEntity entity)
        {
            var documento = (Documento)entity;
            dao.ExecuteProcedure(mapper.GetDeleteStatement(documento));
        }
    }
}
