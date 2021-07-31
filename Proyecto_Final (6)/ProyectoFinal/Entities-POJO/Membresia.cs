using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Membresia : BaseEntity
    {
        public int Id_Membresia{ get; set; }
        public int Id_Usuario { get; set; }
        public DateTime Fecha_Ultimo_Pago { get; set; }
        public double Comision_Admin { get; set; }

        public Membresia() { }
        public Membresia(int idU, DateTime fechaUltimoPago, double comisionAdmin)
        {
            Id_Usuario = idU;
            Fecha_Ultimo_Pago = fechaUltimoPago;
            Comision_Admin = comisionAdmin;
        }
        public Membresia(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 3)
            {
                Id_Membresia = Int32.Parse(infoArray[0]);
                Id_Usuario = Int32.Parse(infoArray[1]);
                Fecha_Ultimo_Pago = DateTime.Parse(infoArray[2]);
                Comision_Admin = Double.Parse(infoArray[3]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
