using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class DocumentoEspacio : BaseEntity
    {
        public int Id_Documento_Espacio { get; set; }
        public int Id_Documento { get; set; }
        public int Id_Espacio { get; set; }
        public DocumentoEspacio() { }

        public DocumentoEspacio(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 2)
            {
                Id_Documento = Int32.Parse(infoArray[0]);
                Id_Espacio = Int32.Parse(infoArray[1]);
                

            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public DocumentoEspacio(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Id_Documento_Espacio = Int32.Parse(infoArray[0]);
                Id_Documento = Int32.Parse(infoArray[1]);
                Id_Espacio = Int32.Parse(infoArray[2]);
                
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
