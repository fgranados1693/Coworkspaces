using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class SolicitudUsuario
    {
        public int Id_Solicitud { get; set; }
        public string Email { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Genero { get; set; }
        public string Tipo_Identificacion { get; set; }
        public string Identificacion { get; set; }
        public string Telefono { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public DateTime Fecha_Nacimiento { get; set; }
        public string URL_Foto { get; set; }

        public SolicitudUsuario() { }

        public SolicitudUsuario(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Email = infoArray[0];
                Nombre = infoArray[1];
                Apellidos = infoArray[2];
                Genero = infoArray[3];
                Tipo_Identificacion = infoArray[4];
                Identificacion = infoArray[5];
                Telefono = infoArray[6];
                Fecha_Creacion = DateTime.Parse(infoArray[7]);
                Fecha_Nacimiento = DateTime.Parse(infoArray[8]);
                URL_Foto = infoArray[9];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public SolicitudUsuario(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {
                Id_Solicitud = Int32.Parse(id);
                Email = infoArray[0];
                Nombre = infoArray[1];
                Apellidos = infoArray[2];
                Genero = infoArray[3];
                Tipo_Identificacion = infoArray[4];
                Identificacion = infoArray[5];
                Telefono = infoArray[6];
                Fecha_Creacion = DateTime.Parse(infoArray[7]);
                Fecha_Nacimiento = DateTime.Parse(infoArray[8]);
                URL_Foto = infoArray[9];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
