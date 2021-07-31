using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class CategoriaMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_CATEGORIA = "Id_Categoria";
        private const string DB_COL_NOMBRE = "Nombre";

        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo categoria
        /// </summary>
        /// <param name="entity">Instancia del categoria que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo categoria</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_CATEGORIA_PR" };

            var p = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID_CATEGORIA, p.IdCategoria);           
            operation.AddVarcharParam(DB_COL_NOMBRE, p.Nombre);
            
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para buscar una categoria segun su id
        /// </summary>
        /// <param name="entity">Instancia de usuario con el id del categoria que se quiere buscar</param>
        /// <returns>operacion sql para buscar un categoria segun su id</returns>

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_CATEGORIA_PR" };

            var p = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID_CATEGORIA, p.IdCategoria);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos las categorias registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos las categorias registrados en la base de datos</returns>

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_CATEGORIAS_PR" };
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para actualizar una categoria registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia de la categoria que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un categoria registrado en la base de datos</returns>

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_CATEGORIA_PR" };

            var p = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID_CATEGORIA, p.IdCategoria);
            operation.AddVarcharParam(DB_COL_NOMBRE, p.Nombre);
            
            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un cateogria de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del cateogria que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un cateogria de la base de datos</returns>

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_CATEGORIA_PR" };

            var p = (Categoria)entity;
            operation.AddIntParam(DB_COL_ID_CATEGORIA, p.IdCategoria);
            return operation;
        }

        /// <summary>
        /// Metodo para construir todos los objetos Categoria de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos Categoria</param>
        /// <returns>Lista de objetos Categoria</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var categoria = BuildObject(row);
                lstResults.Add(categoria);
            }

            return lstResults;
        }

        /// <summary>
        /// Metodo para construir un objeto categoria a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto categoria</param>
        /// <returns>Objeto categoria</returns>

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var categoria = new Categoria
            {
                IdCategoria= GetIntValue(row, DB_COL_ID_CATEGORIA),                
                Nombre = GetStringValue(row, DB_COL_NOMBRE)                
            };

            return categoria;
        }

    }
}

