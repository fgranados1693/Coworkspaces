using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    
    public class Propiedad : BaseEntity
    {
        public int IdPropiedad { get; set; }
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Estado { get; set; }
        public string Descripcion { get; set; }
        public double Latitud { get; set; }
        public double Longitud { get; set; }

        public Propiedad (){}

        // Constructor con los parámetros de formulario
        public Propiedad(string idUsuario, string estado, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 5)
            {
                IdUsuario = Int32.Parse(idUsuario);
                Nombre = infoArray[0];
                Estado = estado;
                Descripcion = infoArray[1];
                Latitud = double.Parse(infoArray[3]);
                Longitud = double.Parse(infoArray[4]);
            }
        }

        // Constructor con todos los parámetros
        public Propiedad(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 7)
            {
                IdPropiedad = Int32.Parse(id);
                IdUsuario = Int32.Parse(infoArray[0]);
                Nombre = infoArray[1];
                Estado = infoArray[2]; ;
                Descripcion = infoArray[3];
                Latitud = double.Parse(infoArray[4]);
                Longitud = double.Parse(infoArray[5]);
            }
        }
    }
}
