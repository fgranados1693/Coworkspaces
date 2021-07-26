using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Espacio : BaseEntity
    {
        public int Id_Espacio { get; set; }
        public int Id_Categoria { get; set; }
        public int Id_Propiedad { get; set; }
        public string Nombre { get; set; }
        public float Precio { get; set; }
        public string Estado { get; set; }
        public string Permite_Reembolso { get; set; }
        public string Permite_Cancelacion { get; set; }
        public int Tiempo_Minimo_Previo_Cancelacion { get; set; }
        public Double Tiempo_Minimo_Reservacion{ get; set; }
        public string Mensaje_Reservacion { get; set; }
        public Espacio() { }
        public Espacio(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 10)
            {
                Id_Categoria = Int32.Parse(infoArray[0]);
                Id_Propiedad = Int32.Parse(infoArray[1]);
                Nombre = infoArray[2];
                Precio = float.Parse(infoArray[3]);
                Estado = infoArray[4];
                Permite_Reembolso = infoArray[5];
                Permite_Cancelacion = infoArray[6];
                Tiempo_Minimo_Previo_Cancelacion = Int32.Parse(infoArray[7]);
                Tiempo_Minimo_Reservacion = Double.Parse(infoArray[8]);
                Mensaje_Reservacion = infoArray[9];
                //Fecha_Creacion = DateTime.Parse(infoArray[4]);

            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Espacio(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 11)
            {
                Id_Espacio = Int32.Parse(id);
                Id_Categoria = Int32.Parse(infoArray[0]);
                Id_Propiedad = Int32.Parse(infoArray[1]);
                Nombre = infoArray[2];
                Precio = float.Parse(infoArray[3]);
                Estado = infoArray[4];
                Permite_Reembolso = infoArray[5];
                Permite_Cancelacion = infoArray[6];
                Tiempo_Minimo_Previo_Cancelacion = Int32.Parse(infoArray[7]);
                Tiempo_Minimo_Reservacion = Double.Parse(infoArray[8]);
                Mensaje_Reservacion = infoArray[9];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}
