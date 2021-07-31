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
    public class ReservacionManager
    {

        private ReservacionCrudFactory crudReservacion;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public ReservacionManager()
        {
            crudReservacion = new ReservacionCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar una Reservacion en la base de datos
        /// </summary>
        /// <param name="reservacion">Instancia del objeto Reservacion que se desea registrar</param>
        public void Create(Reservacion reservacion)
        {
            try
            {
                var e = crudReservacion.Retrieve<Reservacion>(reservacion);

                if (e != null)
                {
                    // Reservacion ya se encuentra registrada
                    throw new BussinessException(33);
                }
                crudReservacion.Create(reservacion);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
            


        }

        /// <summary>
        /// Metodo para listar todos las Reservaciones registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todos las Reservaciones registradas en la base de datos</returns>
        public List<Reservacion> RetrieveAll()
        {
            List<Reservacion> lstResult = new List<Reservacion>();
            try
            {
                lstResult = crudReservacion.RetrieveAll<Reservacion>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar una Reservacion por su id en la base de datos
        /// </summary>
        /// <param name="reservacion">Instancia de Reservacion con el id de la Reservacion que se quiere buscar</param>
        /// <returns>Objeto completo de la Reservacion que se quiere buscar</returns>
        public Reservacion RetrieveById(Reservacion reservacion)
        {
            Reservacion e = null;
            try
            {
                e = crudReservacion.Retrieve<Reservacion>(reservacion);
                if (e == null)
                {
                    throw new BussinessException(34);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return e;
        }
        /// <summary>
        /// Metodo para listar todos las Reservaciones registradas de un espacio en la base de datos
        /// </summary>
        /// <returns>Lista de todos las Reservaciones registradas por espacio en la base de datos</returns>
        public List<Reservacion> RetrieveByEspacio(Reservacion reservacion)
        {
            List<Reservacion> lstResult = new List<Reservacion>();
            try
            {
                lstResult = crudReservacion.RetrieveByEspacioReservaciones<Reservacion>(reservacion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para listar todos las Reservaciones registradas por una fecha en la base de datos
        /// </summary>
        /// <returns>Lista de todos las Reservaciones registradas por una fecha en la base de datos</returns>
        public List<Reservacion> RetrieveByFecha(Reservacion reservacion)
        {
            List<Reservacion> lstResult = new List<Reservacion>();
            try
            {
                lstResult = crudReservacion.RetrieveByFechaReservaciones<Reservacion>(reservacion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para listar todos las Reservaciones registradas por un usuario en la base de datos
        /// </summary>
        /// <returns>Lista de todos las Reservaciones registradas por un usuario en la base de datos</returns>
        public List<Reservacion> RetrieveByUsuario(Reservacion reservacion)
        {
            List<Reservacion> lstResult = new List<Reservacion>();
            try
            {
                lstResult = crudReservacion.RetrieveByUsuarioReservaciones<Reservacion>(reservacion);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para actualizar una Reservacion en la base de datos
        /// </summary>
        /// <param name="reservacion">Instancia de Reservacion con el id de la Reservacion que se quiere actualizar</param>
        public void Update(Reservacion reservacion)
        {
            Reservacion e = null;
            try
            {
                e = crudReservacion.Retrieve<Reservacion>(reservacion);
                if (e == null)
                {
                    throw new BussinessException(34);
                }

                crudReservacion.Update(reservacion);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar una Reservacion de la base de datos
        /// </summary>
        /// <param name="reservacion">Instancia de Reservacion con el id de la Reservacion que se quiere eliminar</param>
        public void Delete(Reservacion reservacion)
        {
            Reservacion e = null;

            try
            {
                e = crudReservacion.Retrieve<Reservacion>(reservacion);
                if (e == null)
                {
                    throw new BussinessException(14);
                }

                crudReservacion.Delete(reservacion);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
