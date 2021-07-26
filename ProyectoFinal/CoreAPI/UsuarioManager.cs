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
    public class UsuarioManager
    {

        private UsuarioCrudFactory crudUsuario;
        private readonly Random _random = new Random();

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public UsuarioManager()
        {
            crudUsuario = new UsuarioCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar el usuario en la base de datos
        /// </summary>
        /// <param name="data">Diccionario con toda la informacion requerida para el registro de un usuario</param>
        public void Create(Dictionary<string, string> data)
        {
            List<Usuario> lstResult = new List<Usuario>();
            try
            {
                Usuario usuario = new Usuario
                {
                    Email = data["Email"],
                    Telefono = data["Telefono"],
                    Identificacion = data["Identificacion"],
                    Tipo_Identificacion = data["Tipo_Identificacion"],
                    Fecha_Nacimiento = DateTime.Parse(data["Fecha_Nacimiento"]),
                    Nombre = data["Nombre"],
                    Apellidos = data["Apellidos"],
                    Genero = data["Genero"],
                    Estado = data["Estado"],
                    Fecha_Creacion = DateTime.Today,
                    URL_Foto = "https://res.cloudinary.com/imgproyecto1/image/upload/v1618533622/suyzfhrrlz1wkwa5qajd.jpg",
                    Saldo = 0
                };

                if(Int32.Parse(data["Rol"]) == 1)
                {
                    Usuario adminQ = new Usuario
                    {
                        Id_Usuario = 1
                    };
                    Usuario admin = RetrieveById(adminQ);

                    usuario.Saldo = admin.Saldo;
                }


                lstResult = crudUsuario.RetrieveAll<Usuario>();
                if (lstResult.Any())
                {
                    foreach (var res in lstResult)
                    {
                        if(res.Id_Usuario == usuario.Id_Usuario)
                            throw new BussinessException(6);
                        if (res.Identificacion == usuario.Identificacion)
                            throw new BussinessException(7);
                        if (res.Email == usuario.Email)
                            throw new BussinessException(8);
                        if (res.Telefono == usuario.Telefono)
                            throw new BussinessException(9);
                    }
                }

                if ((DateTime.Today.Year - usuario.Fecha_Nacimiento.Year) < 18)
                {
                    throw new BussinessException(10);
                }

                crudUsuario.Create(usuario);

                Usuario u = null;

                lstResult = crudUsuario.RetrieveAll<Usuario>();
                if (lstResult.Any())
                {
                    foreach (var res in lstResult)
                    {
                        if (res.Identificacion == usuario.Identificacion)
                            u = res;
                    }
                }

                if (u == null)
                    throw new BussinessException(11);

                Contrasenna contrasenna = new Contrasenna
                {
                    Id_Usuario = u.Id_Usuario,
                    Valor = data["Contrasenna"]
                };

                ContrasennaManager mngCont = new ContrasennaManager();
                mngCont.Create(contrasenna);

                RolUsuario rolUsuario = new RolUsuario
                {
                    Id_Usuario = u.Id_Usuario,
                    Id_Rol = Int32.Parse(data["Rol"])
                };

                RolUsuarioManager mngRol = new RolUsuarioManager();
                mngRol.Create(rolUsuario);

                if(rolUsuario.Id_Rol == 2)
                {
                    MembresiaManager mngMem = new MembresiaManager();
                    mngMem.Create(new Membresia(u.Id_Usuario, DateTime.Today.AddYears(-1),0));
                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todos los usuarios registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los usuarios registrados en la base de datos</returns>
        public List<Usuario> RetrieveAll()
        {
            List<Usuario> lstResult = new List<Usuario>();
            try
            {
                lstResult = crudUsuario.RetrieveAll<Usuario>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar un usuario por su id en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de usuario con el id del usuario que se quiere buscar</param>
        /// <returns>Objeto completo del usuario que se quiere buscar</returns>
        public Usuario RetrieveById(Usuario usuario)
        {
            Usuario u = null;
            try
            {
                u = crudUsuario.Retrieve<Usuario>(usuario);
                if (u == null)
                {
                    throw new BussinessException(24);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return u;
        }
        /// <summary>
        /// Metodo para buscar un usuario por su correo en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de usuario con el correo del usuario que se quiere buscar</param>
        /// <returns>Objeto completo del usuario que se quiere buscar</returns>
        public Usuario RetrieveByEmail(Usuario usuario)
        {
            Usuario u = null;
            try
            {
                u = crudUsuario.RetrieveByEmail<Usuario>(usuario);
                if (u == null)
                {
                    throw new BussinessException(24);
                }
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return u;
        }
        /// <summary>
        /// Metodo para actualizar un usuario en la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de usuario con el id del usuario que se quiere actualizar</param>
        public void Update(Usuario usuario)
        {
            Usuario u = null;
            try
            {
                u = crudUsuario.Retrieve<Usuario>(usuario);
                if (u == null)
                {
                    throw new BussinessException(24);
                }

                List<Usuario> lstResult = new List<Usuario>();
                lstResult = crudUsuario.RetrieveAll<Usuario>();
                if (lstResult.Any())
                {
                    foreach (var res in lstResult)
                    {
                        if(res.Id_Usuario != usuario.Id_Usuario)
                        {
                            if (res.Identificacion == usuario.Identificacion)
                                throw new BussinessException(7);
                            if (res.Email == usuario.Email)
                                throw new BussinessException(8);
                            if (res.Telefono == usuario.Telefono)
                                throw new BussinessException(9);
                        }
                    }
                }

                if ((DateTime.Today.Year - usuario.Fecha_Nacimiento.Year) < 18)
                {
                    throw new BussinessException(10);
                }

                crudUsuario.Update(usuario);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar un usuario de la base de datos
        /// </summary>
        /// <param name="usuario">Instancia de usuario con el id del usuario que se quiere eliminar</param>
        public void Delete(Usuario usuario)
        {
            Usuario u = null;

            try
            {
                u = crudUsuario.Retrieve<Usuario>(usuario);
                if (u == null)
                {
                    throw new BussinessException(24);
                }

                crudUsuario.Delete(usuario);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
