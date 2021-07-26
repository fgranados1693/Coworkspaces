using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Usuario : BaseEntity
    {
        public int Id_Usuario { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Identificacion { get; set; }
        public string Tipo_Identificacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public DateTime Fecha_Nacimiento { get; set; }
        public string URL_Foto { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Genero { get; set; }
        public string Estado { get; set; }
        public double Saldo { get; set; }
        public Usuario() { }
        public Usuario(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 11)
            {
                Email = infoArray[0];
                Telefono = infoArray[1];
                Identificacion = infoArray[2];
                Tipo_Identificacion = infoArray[3];
                Fecha_Creacion = DateTime.Parse(infoArray[4]);
                Fecha_Nacimiento = DateTime.Parse(infoArray[5]);
                URL_Foto = infoArray[6];
                Nombre = infoArray[7];
                Apellidos = infoArray[8];
                Genero = infoArray[9];
                Estado = infoArray[10];
                Saldo = Double.Parse(infoArray[11]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Usuario(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 11)
            {
                Id_Usuario = Int32.Parse(id);
                Email = infoArray[0];
                Telefono = infoArray[1];
                Identificacion = infoArray[2];
                Tipo_Identificacion = infoArray[3];
                Fecha_Creacion = DateTime.Parse(infoArray[4]);
                Fecha_Nacimiento = DateTime.Parse(infoArray[5]);
                URL_Foto = infoArray[6];
                Nombre = infoArray[7];
                Apellidos = infoArray[8];
                Genero = infoArray[9];
                Estado = infoArray[10];
                Saldo = Double.Parse(infoArray[11]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}
