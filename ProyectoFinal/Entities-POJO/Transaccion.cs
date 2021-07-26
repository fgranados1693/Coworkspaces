using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class Transaccion : BaseEntity
    {
        public int Id_Transaccion{ get; set; }
        public int Id_Factura { get; set; }
        public string Tipo { get; set; }
        public string Detalle { get; set; }
        public double Monto { get; set; }

        public Transaccion() { }
        public Transaccion(int idF, string tipo, string detalle, double monto)
        {
            Id_Factura = idF;
            Tipo = tipo;
            Detalle = detalle;
            Monto = monto;
        }
        public Transaccion(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 4)
            {
                Id_Transaccion = Int32.Parse(infoArray[0]);
                Id_Factura = Int32.Parse(infoArray[1]);
                Tipo = infoArray[2];
                Detalle = infoArray[3];
                Monto = Double.Parse(infoArray[4]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
