using DataAccess.Crud;
using Entities_POJO;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPI
{
    public class CategoriaManager : BaseManager
    {
        private CategoriaCrudFactory crudCategoria;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public CategoriaManager()
        {
            crudCategoria = new CategoriaCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar la categoria en la base de datos
        /// </summary>
        /// <param name="data">Diccionario con toda la informacion requerida para el registro de una categoria</param>
        public void Create(Categoria categoria)
        {
            try
            {
                var c = crudCategoria.RetrieveAll<Categoria>();

                foreach (var cate in c) {

                    if (cate.Nombre == categoria.Nombre) {

                        throw new BussinessException(18);

                    }
                }

                crudCategoria.Create(categoria);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        /// <summary>
        /// Metodo para listar todos los categorias registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los categorias registrados en la base de datos</returns>
        public List<Categoria> RetrieveAll()
        {
            if (crudCategoria.RetrieveAll<Categoria>() == null)
            {
                throw new BussinessException(1);
            }
            else
            {
                return crudCategoria.RetrieveAll<Categoria>();
            }
        }

        /// <summary>
        /// Metodo para buscar un categoria por su id en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de categoria con el id del categoria que se quiere buscar</param>
        /// <returns>Objeto completo del categoria que se quiere buscar</returns>

        public Categoria RetrieveById(Categoria categoria)
        {
            Categoria c = null;
            try
            {
                c = crudCategoria.Retrieve<Categoria>(categoria);
                if (c == null)
                {
                    // Categoria no existe
                   throw new BussinessException(19);
                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return c;
        }

        /// <summary>
        /// Metodo para actualizar un categoria en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de categoria con el id del categoria que se quiere actualizar</param>

        public void Update(Categoria categoria)
        {
            
            try
            {
                var c = crudCategoria.RetrieveAll<Categoria>();

                foreach (var cate in c)
                {
                    if (cate.Nombre == categoria.Nombre)
                    {
                        throw new BussinessException(18);

                    }
                }

                crudCategoria.Update(categoria);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para eliminar un categoria de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de categoria con el id del categoria que se quiere eliminar</param>

        public void Delete(Categoria categoria)
        {
            try
            {
                var c = crudCategoria.Retrieve<Categoria>(categoria);

                if (c == null)
                {
                    //Categoria no existe
                    throw new BussinessException(19);
                }

                crudCategoria.Delete(categoria);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
