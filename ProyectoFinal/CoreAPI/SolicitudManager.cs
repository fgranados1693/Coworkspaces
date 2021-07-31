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
    public class SolicitudManager
    {
        private SolicitudCrudFactory crudSolicitud;
        private UsuarioCrudFactory crudUsuario;
        private readonly Random _random = new Random();

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public SolicitudManager()
        {
            crudSolicitud = new SolicitudCrudFactory();
            crudUsuario = new UsuarioCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar una nueva solicitud en la base de datos
        /// </summary>
        /// <param name="solicitud">Instancia de la solicitud que se quiere registrar</param>
        public void Create(Solicitud solicitud)
        {
            try
            {
                List<Solicitud> lstSolicitud = new List<Solicitud>();
                lstSolicitud = crudSolicitud.RetrieveAll<Solicitud>();
                if (lstSolicitud.Any())
                {
                    foreach (var res in lstSolicitud)
                    {
                        if (res.Id_Usuario == solicitud.Id_Usuario)
                            throw new BussinessException(32);
                    }
                }
                crudSolicitud.Create(solicitud);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todos las solcitudes registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todos los solcitudes registradas en la base de datos</returns>
        public List<Solicitud> RetrieveAll()
        {
            List<Solicitud> lstResult = new List<Solicitud>();
            try
            {
                lstResult = crudSolicitud.RetrieveAll<Solicitud>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para listar todos los usuarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los usuarios registrados en la base de datos</returns>
        //public List<SolicitudUsuario> RetrieveAllSolicitudUsuario()
        //{
        //    List<Solicitud> lstSolicitud = new List<Solicitud>();
        //    List<Usuario> lstUsuario = new List<Usuario>();

        //    try
        //    {
        //        lstSolicitud = crudSolicitud.RetrieveAll<Solicitud>();
        //        lstUsuario = crudUsuario.RetrieveAll<Usuario>();

        //        // Create a collection of person-pet pairs. Each element in the collection
        //        // is an anonymous type containing both the person's name and their pet's name.
        //        var query = from solicitud in lstSolicitud
        //                    join usuario in lstUsuario on solicitud.Id_Solicitud equals usuario.Id_Usuario
        //                    select new
        //                    {
        //                        id_solicitud = solicitud.Id_Solicitud,
        //                        id_usuario = solicitud.Id_Usuario,
        //                        nombre = usuario.Nombre,
        //                        apellidos = usuario.Apellidos,
        //                        Email = usuario.Email,
        //                        genero = usuario.Genero,
        //                        tipo_identificacion = usuario.Tipo_Identificacion,
        //                        identificacion = usuario.Identificacion,
        //                        telefono = usuario.Telefono,
        //                        fecha_creacion = usuario.Fecha_Creacion,
        //                        fecha_nacimiento = usuario.Fecha_Nacimiento,
        //                        url_foto = usuario.URL_Foto,
        //                        revisada = solicitud.Revisada,
        //                        resultado = solicitud.Resultado
        //                    };

        //        var queryreturn = query.ToList();

        //        List<SolicitudUsuario> _solicitudUsuario = new List<SolicitudUsuario>();

        //        for (int i = 0; i < queryreturn.Count; i++)
        //        {
        //            SolicitudUsuario elemento = new SolicitudUsuario();

        //            elemento.Id_Solicitud = queryreturn[i].id_solicitud;
        //            elemento.Nombre = queryreturn[i].nombre;
        //            elemento.Apellidos = queryreturn[i].apellidos;
        //            elemento.Email = queryreturn[i].Email;
        //            elemento.Genero = queryreturn[i].genero;
        //            elemento.Tipo_Identificacion = queryreturn[i].tipo_identificacion;
        //            elemento.Identificacion = queryreturn[i].identificacion;
        //            elemento.Telefono = queryreturn[i].telefono;
        //            elemento.Fecha_Creacion = queryreturn[i].fecha_creacion;
        //            elemento.Fecha_Nacimiento = queryreturn[i].fecha_nacimiento;
        //            elemento.URL_Foto = queryreturn[i].url_foto;

        //            _solicitudUsuario.Add(elemento);
        //        }

        //        return _solicitudUsuario;
        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionManager.GetInstance().Process(ex);
        //        return null;
        //    }
        //}

        public Solicitud RetrieveById(Solicitud solicitud)
        {
            Solicitud s = null;
            try
            {
                s = crudUsuario.Retrieve<Solicitud>(solicitud);
                if (s == null)
                {
                    throw new BussinessException(24);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return s;
        }

        public void Update(Solicitud solicitud)
        {
            Solicitud s = null;
            try
            {
                s = crudSolicitud.Retrieve<Solicitud>(solicitud);
                if (s == null)
                {
                    throw new BussinessException(14);
                }

                crudSolicitud.Update(solicitud);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }




    }
}
