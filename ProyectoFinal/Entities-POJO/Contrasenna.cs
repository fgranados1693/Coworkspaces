using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Contrasenna : BaseEntity
    {
        public int Id_Contrasenna { get; set; }
        public int Id_Usuario { get; set; }
        public string Valor { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public Contrasenna() { }
        public Contrasenna(int idU, string valor, DateTime fechaCreacion)
        {
            Id_Usuario = idU;
            Valor = valor;
            Fecha_Creacion = fechaCreacion;
        }
        public Contrasenna(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 1)
            {
                Id_Usuario = Int32.Parse(infoArray[0]);
                Id_Usuario = Int32.Parse(infoArray[1]);
                Valor = infoArray[2];
                Fecha_Creacion = DateTime.Parse(infoArray[3]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
