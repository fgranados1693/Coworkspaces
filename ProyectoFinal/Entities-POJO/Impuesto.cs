using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Impuesto : BaseEntity
    {
        public int Id_Impuesto { get; set; }
        public string Nombre { get; set; }
        public float Valor { get; set; }
        
        public Impuesto() { }
        public Impuesto(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 2)
            {
                Nombre = infoArray[1];
                Valor = (float)Double.Parse(infoArray[2]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Impuesto(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 11)
            {
                Id_Impuesto = Int32.Parse(infoArray[0]);
                Nombre = infoArray[1];
                Valor = (float)Double.Parse(infoArray[2]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}
