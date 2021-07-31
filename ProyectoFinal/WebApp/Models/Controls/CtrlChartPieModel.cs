using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Controls
{
    public class CtrlChartPieModel : CtrlBaseModel
    {
        public CtrlChartPieModel()
        {

        }

        public string Title { get; set; }
        public string Labels { get; set; }
        public string OnLoadFunction { get; set; }
        public string ChartType { get; set; }

    }
}