using Entities_POJO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace WebApp.Models.Controls
{
    public class CtrlDropDownModel : CtrlBaseModel
    {

        public string Label { get; set; }
        public string ListId { get; set; }
        public string PlaceHolder { get; set; }
        public string ColumnDataName { get; set; }


        private string URL_API_LISTs = "https://localhost:44302/api/List/";

        public string ListOptions
        {
            get
            {
                var htmlOptions = "";
                var lst = GetOptionsFromAPI();

                foreach (var option in lst)
                {
                    htmlOptions += "<option value='" + option.Value + "'>" + option.Description + "</option>";
                }
                return htmlOptions;
            }
            set
            {

            }
        }


        private List<OptionList> GetOptionsFromAPI()
        {
            //URL_API_LISTs = "http://localhost/api_web/api/List/";

            var client = new WebClient();
            client.Encoding = Encoding.UTF8;
            var response = client.DownloadString(URL_API_LISTs + ListId);
            var options = JsonConvert.DeserializeObject<List<OptionList>>(response);
            return options;
        }



        public CtrlDropDownModel()
        {
            ViewName = "";
        }
    }
}