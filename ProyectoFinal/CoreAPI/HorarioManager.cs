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
    public class HorarioManager
    {

        private HorarioCrudFactory crudHorario;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public HorarioManager()
        {
            crudHorario = new HorarioCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar un horario en la base de datos
        /// </summary>
        /// <param name="horario">Instancia del objeto horario que se desea registrar</param>
        public void Create(Horario horario)
        {
            try
            {

               
                var h = crudHorario.Retrieve<Horario>(horario);
               
                {
                    if (h != null)
                    
                        {
                            // Horario ya se encuentra registrado
                            throw new BussinessException(16);
                        }
                    else
                {
                        
                        var h1 = crudHorario.RetrieveByEspacio<Horario>(horario);
                        foreach (var hora in h1)
                        if (hora.Dia_Semana == horario.Dia_Semana) 
                        {
                        // Horario ya se encuentra registrado
                         throw new BussinessException(16);
                        }
                    }
                    crudHorario.Create(horario);

            }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
           

        }

        /// <summary>
        /// Metodo para listar todos los Horarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los Horarios registrados en la base de datos</returns>
        public List<Horario> RetrieveAll()
        {
            List<Horario> lstResult = new List<Horario>();
            try
            {
                lstResult = crudHorario.RetrieveAll<Horario>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar un Horario por su id en la base de datos
        /// </summary>
        /// <param name="horario">Instancia de Horario con el id del Horario que se quiere buscar</param>
        /// <returns>Objeto completo del Horario que se quiere buscar</returns>
        public Horario RetrieveById(Horario horario)
        {
            Horario h = null;
            try
            {
                h = crudHorario.Retrieve<Horario>(horario);
                if (h == null)
                {
                    throw new BussinessException(17);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return h;
        }
        /// <summary>
        /// Metodo para buscar un Horario por su espacio y dia de la semana en la base de datos
        /// </summary>
        /// <param name="horario">Instancia de Horario con el id del espacio y el dia de la semana que se quiere buscar</param>
        /// <returns>Objeto completo del Horario que se quiere buscar</returns>
        public Horario RetrieveHorarioByEspacioDiaSemana(Horario horario)
        {
            Horario h = null;
            try
            {
                h = crudHorario.RetrieveByEspacioDiaSemana<Horario>(horario);
                if (h == null)
                {
                    throw new BussinessException(17);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return h;
        }

        /// <summary>
        /// Metodo para buscar un Horario por su espacio en la base de datos
        /// </summary>
        /// <param name="horario">Instancia de Horario con el id del espacio que se quiere buscar</param>
        /// <returns>Objeto completo del Horario que se quiere buscar</returns>
        public List<Horario> RetrieveHorarioByEspacio(Horario horario)
        {
            List<Horario> lstResult = new List<Horario>();
            try
            {
                lstResult = crudHorario.RetrieveByEspacio<Horario>(horario);
               
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para actualizar un Horario en la base de datos
        /// </summary>
        /// <param name="horario">Instancia de Horario con el id del Horario que se quiere actualizar</param>
        public void Update(Horario horario)
        {
            Horario h = null;
            try
            {
                h = crudHorario.Retrieve<Horario>(horario);
                if (h == null)
                {
                    throw new BussinessException(17);
                }

                crudHorario.Update(horario);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar un Horario de la base de datos
        /// </summary>
        /// <param name="horario">Instancia de Horario con el id del Horario que se quiere eliminar</param>
        public void Delete(Horario horario)
        {
            Horario h = null;

            try
            {
                h = crudHorario.Retrieve<Horario>(horario);
                if (h == null)
                {
                    throw new BussinessException(17);
                }

                crudHorario.Delete(horario);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
