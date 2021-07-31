using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Reservacion : BaseEntity
    {
        public int Id_Reservacion { get; set; }
        public int Id_Usuario { get; set; }
        public int Id_Espacio { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Hora_Entrada { get; set; }
        public TimeSpan Hora_Salida { get; set; }
        public int Calificacion_Usuario { get; set; }
        public int Calificacion_Propietario { get; set; }
        public int Calificacion_Propiedad { get; set; }
        public float Monto { get; set; }
        public string Estado { get; set; }

        public Reservacion() { }

        public Reservacion(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 10)
            {
                Id_Usuario = Int32.Parse(infoArray[0]);
                Id_Espacio = Int32.Parse(infoArray[1]);
                Fecha = DateTime.Parse(infoArray[2]);
                TimeSpan timeOfDay = DateTime.Parse(infoArray[3]).TimeOfDay;
                Hora_Entrada = timeOfDay;
                TimeSpan timeOfDay2 = DateTime.Parse(infoArray[4]).TimeOfDay;
                Hora_Salida = timeOfDay2;
                Calificacion_Usuario = Int32.Parse(infoArray[5]);
                Calificacion_Propietario = Int32.Parse(infoArray[6]);
                Calificacion_Propiedad = Int32.Parse(infoArray[7]);
                Monto = float.Parse(infoArray[8]);
                Estado = infoArray[9];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

        public Reservacion(string id, string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 11)
            {
                Id_Reservacion = Int32.Parse(id);
                Id_Usuario = Int32.Parse(infoArray[0]);
                Id_Usuario = Int32.Parse(infoArray[1]);
                Id_Espacio = Int32.Parse(infoArray[2]);
                Fecha = DateTime.Parse(infoArray[3]);
                TimeSpan timeOfDay = DateTime.Parse(infoArray[4]).TimeOfDay;
                Hora_Entrada = timeOfDay;
                TimeSpan timeOfDay2 = DateTime.Parse(infoArray[5]).TimeOfDay;
                Hora_Salida = timeOfDay2;
                Calificacion_Usuario = Int32.Parse(infoArray[6]);
                Calificacion_Propietario = Int32.Parse(infoArray[7]);
                Calificacion_Propiedad = Int32.Parse(infoArray[8]);
                Monto = float.Parse(infoArray[9]);
                Estado = infoArray[10];
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }

    }
}

