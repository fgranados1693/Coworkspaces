using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Controls
{
    public class CtrlCardModel : CtrlBaseModel
    {
        public CtrlCardModel()
        {

        }

        public string NombreEspacio { get; set; }
        public string PropiedadEspacio { get; set; }
        public string Permite_Reembolso { get; set; }
        public string Permite_Cancelacion { get; set; }
        public string Precio { get; set; }
        public string latitud { get; set; }
        public string longitud { get; set; }

    }
}