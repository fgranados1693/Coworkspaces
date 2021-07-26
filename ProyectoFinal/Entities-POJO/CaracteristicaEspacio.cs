using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class CaracteristicaEspacio : BaseEntity
    {
        public int Id_Caracteristica { get; set; }
        public int Id_Espacio { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public CaracteristicaEspacio() { }
        public CaracteristicaEspacio(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Id_Espacio = Int32.Parse(infoArray[0]);
                Nombre = infoArray[1];
                Descripcion = infoArray[2];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public CaracteristicaEspacio(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {
                Id_Caracteristica = Int32.Parse(id);
                Id_Espacio = Int32.Parse(infoArray[0]);
                Nombre = infoArray[1];
                Descripcion = infoArray[2];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}
