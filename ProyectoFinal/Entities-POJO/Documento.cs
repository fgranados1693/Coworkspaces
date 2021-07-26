using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Documento : BaseEntity
    {
        public int Id_Documento { get; set; }
        public int Id_Propiedad { get; set; }
        public string URL { get; set; }
        public string Tipo { get; set; }
        public string Nombre { get; set; }
        public Documento() { }

        public Documento(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {                
                Id_Propiedad = Int32.Parse(infoArray[1]);               
                URL = infoArray[2];
                Tipo = infoArray[3];
                Nombre = infoArray[4];
            }
        }

        public Documento(int idDocumento, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {

                Id_Documento = idDocumento;
                Id_Propiedad = Int32.Parse(infoArray[1]);
                URL = infoArray[2];
                Tipo = infoArray[3];
                Nombre = infoArray[4];
            }
        }
    }
}
