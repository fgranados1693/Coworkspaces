using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Mensaje : BaseEntity
    {
        public int Id_Mensaje{ get; set; }
        public int Id_Usuario_Emisor { get; set; }
        public int Id_Usuario_Receptor { get; set; }
        public string Texto { get; set; }
        public DateTime Fecha { get; set; }

        public Mensaje() { }
        public Mensaje(int idE, int idR, string texto, DateTime fecha)
        {
            Id_Usuario_Emisor = idE;
            Id_Usuario_Receptor = idR;
            Texto = texto;
            Fecha = fecha;
        }
        public Mensaje(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Id_Mensaje = Int32.Parse(infoArray[0]);
                Id_Usuario_Emisor = Int32.Parse(infoArray[1]);
                Id_Usuario_Receptor = Int32.Parse(infoArray[2]);
                Texto = infoArray[3];
                Fecha = DateTime.Parse(infoArray[4]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
