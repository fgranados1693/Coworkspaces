using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Parametro : BaseEntity
    {
        public int IdParametro { get; set; }
        public string Nombre { get; set; }
        public string Valor { get; set; }

        public Parametro() { }

        public Parametro(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                IdParametro = Int32.Parse(infoArray[0]);
                Nombre = infoArray[1];
                Valor = infoArray[2];                
            }

        }

    }
}
