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
    public class MensajeManager
    {

        private MensajeCrudFactory crudMensaje;

        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public MensajeManager()
        {
            crudMensaje = new MensajeCrudFactory();
        }

        /// <summary>
        /// Metodo para registrar un nuevo mensaje en la base de datos
        /// </summary>
        /// <param name="mensaje">Instancia del mensaje que se quiere registrar</param>
        public void Create(Mensaje mensaje)
        {
            try
            {
                crudMensaje.Create(mensaje);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

        /// <summary>
        /// Metodo para listar todos los mensajes registrados en la base de datos
        /// </summary>
        /// <returns>Lista de todos los mensajes registrados en la base de datos</returns>
        public List<Mensaje> RetrieveAll()
        {
            List<Mensaje> lstResult = new List<Mensaje>();
            try
            {
                lstResult = crudMensaje.RetrieveAll<Mensaje>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        /// <summary>
        /// Metodo para buscar todas las conversaciones de un usuario
        /// </summary>
        /// <param name="mensaje">Instancia de mensaje con el id del usuario</param>
        /// <returns>Lista de conversaciones de un usuario</returns>
        public List<List<Mensaje>> RetrieveByIdUsuario(Mensaje mensaje)
        {
            List<List<Mensaje>> conversaciones = new List<List<Mensaje>>();
            try
            {
                List<Mensaje> lstResult = new List<Mensaje>();
                lstResult = crudMensaje.RetrieveByIdUsuario<Mensaje>(mensaje);

                List<Mensaje> enviados = new List<Mensaje>();
                List<Mensaje> recibidos = new List<Mensaje>();

                foreach (Mensaje m in lstResult)
                {
                    if (m.Id_Usuario_Emisor == mensaje.Id_Usuario_Emisor)
                        enviados.Add(m);
                    if (m.Id_Usuario_Receptor == mensaje.Id_Usuario_Receptor)
                        recibidos.Add(m);
                }

                enviados.Sort((x, y) => x.Id_Usuario_Receptor.CompareTo(y.Id_Usuario_Receptor));
                recibidos.Sort((x, y) => x.Id_Usuario_Emisor.CompareTo(y.Id_Usuario_Emisor));

                List<int> userIds = new List<int>();

                foreach (Mensaje m in enviados)
                {
                    if (!userIds.Contains(m.Id_Usuario_Receptor))
                        userIds.Add(m.Id_Usuario_Receptor);
                }

                foreach (Mensaje m in recibidos)
                {
                    if (!userIds.Contains(m.Id_Usuario_Emisor))
                        userIds.Add(m.Id_Usuario_Emisor);
                }

                foreach (int i in userIds)
                {

                    List<Mensaje> conversacion = new List<Mensaje>();

                    foreach (Mensaje m in enviados)
                    {
                        if (m.Id_Usuario_Receptor == i)
                            conversacion.Add(m);
                    }

                    foreach (Mensaje m in recibidos)
                    {
                        if (m.Id_Usuario_Emisor == i)
                            conversacion.Add(m);
                    }

                    conversacion.Sort((x, y) => x.Fecha.CompareTo(y.Fecha));
                    conversaciones.Add(conversacion);

                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return conversaciones;
        }

        /// <summary>
        /// Metodo para eliminar una conversacion de la base de datos
        /// </summary>
        /// <param name="mensaje">Instancia de mensaje con los id de los usuarios</param>
        public void Delete(Mensaje mensaje)
        {

            try
            {
                int idE = mensaje.Id_Usuario_Emisor;
                int idR = mensaje.Id_Usuario_Receptor;

                crudMensaje.Delete(mensaje);

                mensaje.Id_Usuario_Emisor = idR;
                mensaje.Id_Usuario_Receptor = idE;

                crudMensaje.Delete(mensaje);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
