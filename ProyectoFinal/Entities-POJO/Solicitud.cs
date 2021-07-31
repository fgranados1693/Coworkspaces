using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Solicitud : BaseEntity
    {
        public int Id_Solicitud { get; set; }
        public int Id_Usuario { get; set; }
        public string Revisada { get; set; }
        public string Resultado { get; set; }

        public Solicitud(){}

        public Solicitud(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Id_Usuario = Int32.Parse(infoArray[0]);
                Revisada = infoArray[1];
                Resultado = infoArray[2];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Solicitud(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {
                Id_Solicitud = Int32.Parse(id);
                Id_Usuario = Int32.Parse(infoArray[0]);
                Revisada = infoArray[1];
                Resultado = infoArray[2];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}

