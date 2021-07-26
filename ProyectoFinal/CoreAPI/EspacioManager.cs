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
    public class EspacioManager
    {

        private EspacioCrudFactory crudEspacio;
        private readonly Random _random = new Random();

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public EspacioManager()
        {
            crudEspacio = new EspacioCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar el Espacio en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia del objeto espacio que se desea registrar</param>
        public void Create(Espacio espacio)
        {
            try
            {
                var e = crudEspacio.Retrieve<Espacio>(espacio);

                if (e != null)
                {
                    // Espacio ya se encuentra registrado
                    throw new BussinessException(15);
                }
                crudEspacio.Create(espacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
            /*
            List<Espacio> lstResult = new List<Espacio>();
            try
            {
                Espacio espacio = new Espacio
                {
                    Id_Propiedad = Int32.Parse(data["Id_Propiedad"]),
                    Nombre = data["Nombre"],
                    Precio = Int32.Parse(data["Precio"]),
                    Estado = "solicitud",
                    Permite_Reembolso = data["Permite_Reembolso"],
                    Permite_Cancelacion = data["Permite_Cancelacion"],
                    Tiempo_Minimo_Previo_Cancelacion = Int32.Parse(data["Tiempo_Minimo_Previo_Cancelacion"]),
                    Tiempo_Minimo_Reservacion = (float)Double.Parse(data["Tiempo_Minimo_Reservacion"])
                    
                };


                lstResult = crudEspacio.RetrieveAll<Espacio>();
                if (lstResult.Any())
                {
                    foreach (var res in lstResult)
                    {
                        if (res.Nombre == espacio.Nombre && res.Id_Propiedad == espacio.Id_Propiedad)
                            throw new BussinessException(12);
                    }
                }

                crudEspacio.Create(espacio);

                Espacio e = null;

                lstResult = crudEspacio.RetrieveAll<Espacio>();
                if (lstResult.Any())
                {
                    foreach (var res in lstResult)
                    {
                        if (res.Id_Espacio == espacio.Id_Espacio)
                            e = res;
                    }
                }

                if (e == null)
                    throw new BussinessException(13);

                
                Horario horario = new Horario
                {
                    Id_Usuario = u.Id_Usuario,
                    Valor = data["Contrasenna"]
                };

                ContrasennaManager mngCont = new ContrasennaManager();
                mngCont.Create(contrasenna);
                */


        }

        /// <summary>
        /// Metodo para listar todos los espacios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los espacios registrados en la base de datos</returns>
        public List<Espacio> RetrieveAll()
        {
            List<Espacio> lstResult = new List<Espacio>();
            try
            {
                lstResult = crudEspacio.RetrieveAll<Espacio>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar un espacio por su id en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia de espacio con el id del espacio que se quiere buscar</param>
        /// <returns>Objeto completo del espacio que se quiere buscar</returns>
        public Espacio RetrieveById(Espacio espacio)
        {
            Espacio e = null;
            try
            {
                e = crudEspacio.Retrieve<Espacio>(espacio);
                if (e == null)
                {
                    throw new BussinessException(14);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return e;
        }
        /// <summary>
        /// Metodo para listar todos los horarios registrados de un espacio en la base de datos
        /// </summary>
        /// <returns>Lista de todos los espacios registrados en la base de datos</returns>
        public List<Horario> RetrieveAllHorarios(Espacio espacio)
        {
            List<Horario> lstResult = new List<Horario>();
            try
            {
                lstResult = crudEspacio.RetrieveByEspacioHorarios<Horario>(espacio);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para actualizar un espacio en la base de datos
        /// </summary>
        /// <param name="espacio">Instancia de espacio con el id del espacio que se quiere actualizar</param>
        public void Update(Espacio espacio)
        {
            Espacio e = null;
            try
            {
                e = crudEspacio.Retrieve<Espacio>(espacio);
                if (e == null)
                {
                    throw new BussinessException(14);
                }

                crudEspacio.Update(espacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar un espacio de la base de datos
        /// </summary>
        /// <param name="espacio">Instancia de espacio con el id del espacio que se quiere eliminar</param>
        public void Delete(Espacio espacio)
        {
            Espacio e = null;

            try
            {
                e = crudEspacio.Retrieve<Espacio>(espacio);
                if (e == null)
                {
                    throw new BussinessException(14);
                }

                crudEspacio.Delete(espacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
