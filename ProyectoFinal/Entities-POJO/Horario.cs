using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Horario : BaseEntity
    {
        public int Id_Horario { get; set; }
        public int Id_Espacio { get; set; }
        public string Dia_Semana { get; set; }
        public TimeSpan Hora_Inicio { get; set; }
        public TimeSpan Hora_Fin { get; set; }
        public Horario() { }
        public Horario(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {
                Id_Espacio = Int32.Parse(infoArray[0]);
                Dia_Semana = infoArray[1];
                TimeSpan timeOfDay = DateTime.Parse(infoArray[2]).TimeOfDay;
                Hora_Inicio = timeOfDay;
                TimeSpan timeOfDay2 = DateTime.Parse(infoArray[3]).TimeOfDay;
                Hora_Fin = timeOfDay2;
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Horario(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 11)
            {
                Id_Horario = Int32.Parse(id);
                Id_Espacio = Int32.Parse(infoArray[0]);
                Dia_Semana = infoArray[1];
                TimeSpan timeOfDay = DateTime.Parse(infoArray[2]).TimeOfDay;
                Hora_Inicio = timeOfDay;
                TimeSpan timeOfDay2 = DateTime.Parse(infoArray[3]).TimeOfDay;
                Hora_Fin = timeOfDay2;
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}
