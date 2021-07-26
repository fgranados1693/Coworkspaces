using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities_POJO
{
    public class RolUsuario : BaseEntity
    {
        public int Id_Usuario { get; set; }
        public int Id_Rol { get; set; }
        public RolUsuario() { }
        public RolUsuario(int idU, int idR)
        {
            Id_Usuario = idU;
            Id_Rol = idR;
        }
        public RolUsuario(string[] infoArray)
        {
            if (infoArray != null && infoArray.Length >= 1)
            {
                Id_Usuario = Int32.Parse(infoArray[0]);
                Id_Rol = Int32.Parse(infoArray[1]);
            }
            else
            {
                throw new Exception("Todos los valores son requeridos");
            }
        }
    }
}
