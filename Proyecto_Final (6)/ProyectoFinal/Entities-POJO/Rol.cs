using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Rol : BaseEntity
    {
        public int Id_Rol { get; set; }
        public string Nombre { get; set; }
        public Rol() { }
        public Rol(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 1)
            {
                Nombre = infoArray[0];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Rol(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 1)
            {
                Id_Rol = Int32.Parse(id);
                Nombre = infoArray[0];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
