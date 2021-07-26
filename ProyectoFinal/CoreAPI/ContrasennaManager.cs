using DataAccess.Crud;
using Entities_POJO;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPI
{
    public class ContrasennaManager
    {

        private ContrasennaCrudFactory crudContrasenna;
        /// <summary>
        /// Constructor del objeto
        /// </summary>
        public ContrasennaManager()
        {
            crudContrasenna = new ContrasennaCrudFactory();
        }
        /// <summary>
        /// Metodo para registrar una nueva contrasenna en la base de datos
        /// </summary>
        /// <param name="contrasenna">Instancia de la contrasenna que se quiere registrar</param>
        public void Create(Contrasenna contrasenna)
        {
            try
            {
                List<Contrasenna> lstResult = new List<Contrasenna>();

                contrasenna.Valor = GetMD5(contrasenna.Valor);
                contrasenna.Fecha_Creacion = DateTime.Now;

                lstResult = crudContrasenna.RetrieveByIdUsuario<Contrasenna>(contrasenna);
                lstResult.Reverse();
                if (lstResult.Any())
                {
                    for (int i = 0; i < lstResult.Count; i++)
                    {
                        if(i < 5)
                        {
                            if (lstResult[i].Valor == contrasenna.Valor)
                                throw new BussinessException(26);
                        }
                    }
                }

                crudContrasenna.Create(contrasenna);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }
        /// <summary>
        /// Metodo para listar todas las contrasennas registradas en la base de datos
        /// </summary>
        /// <returns>Lista de todas las contrasennas registradas en la base de datos</returns>
        public List<Contrasenna> RetrieveAll()
        {
            List<Contrasenna> lstResult = new List<Contrasenna>();
            try
            {
                lstResult = crudContrasenna.RetrieveAll<Contrasenna>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para buscar todas las contrasennas segun el id de un usuario
        /// </summary>
        /// <param name="contrasenna">Instancia de contrasenna con el id del usuario</param>
        /// <returns>Lista de todas las contrasennas registradas con el id del usuario</returns>
        public List<Contrasenna> RetrieveByIdUsuario(Contrasenna contrasenna)
        {
            List<Contrasenna> lstResult = new List<Contrasenna>();
            try
            {
                lstResult = crudContrasenna.RetrieveByIdUsuario<Contrasenna>(contrasenna);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }
        /// <summary>
        /// Metodo para actualizar una contrasenna registrada en la base de datos
        /// </summary>
        /// <param name="contrasenna">Instancia de la contrasenna que se quiere actualizar</param>
        public void Update(Contrasenna contrasenna)
        {
            Contrasenna c = null;
            try
            {
                c = crudContrasenna.Retrieve<Contrasenna>(contrasenna);
                crudContrasenna.Update(contrasenna);
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para eliminar una contrasenna de la base de datos
        /// </summary>
        /// <param name="contrasenna">Instancia de la contrasenna que se quiere eliminar</param>
        public void Delete(Contrasenna contrasenna)
        {
            Contrasenna c = null;

            try
            {
                c = crudContrasenna.Retrieve<Contrasenna>(contrasenna);
                crudContrasenna.Delete(contrasenna);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
        /// <summary>
        /// Metodo para encriptar la contrasenna
        /// </summary>
        /// <param name="str">Contrasenna sin ecriptar</param>
        /// <returns>Contrasenna encriptada segun MD5</returns>
        public string GetMD5(string str)
        {
            MD5 md5 = MD5CryptoServiceProvider.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = md5.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
    }
}
