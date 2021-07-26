using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Categoria : BaseEntity
    {
        public int IdCategoria { get; set; }
        public string Nombre { get; set; }

        public Categoria() { }

        public Categoria(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 2)
            {
                IdCategoria = Int32.Parse(infoArray[0]);
                Nombre = infoArray[1];
            }
        }
    }
}
