using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Factura : BaseEntity
    {
        public int Id_Factura{ get; set; }
        public int Id_Usuario { get; set; }
        public DateTime Fecha { get; set; }
        public string Nombre_Usuario { get; set; }
        public string Detalle { get; set; }


        public Factura() { }
        public Factura(int idU, DateTime fecha, string nombreUsuario, string detalle)
        {
            Id_Usuario = idU;
            Fecha = fecha;
            Nombre_Usuario = nombreUsuario;
            Detalle = detalle;
        }
        public Factura(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Id_Factura = Int32.Parse(infoArray[0]);
                Id_Usuario = Int32.Parse(infoArray[1]);
                Fecha = DateTime.Parse(infoArray[2]);
                Nombre_Usuario = infoArray[3];
                Detalle = infoArray[4];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
