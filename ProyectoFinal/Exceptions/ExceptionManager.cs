using DataAccess.Crud;
using Entities_POJO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web;

namespace Exceptions
{
    public class ExceptionManager
    {

        public string PATH = "";

        private static ExceptionManager instance;

        private static Dictionary<int, string> messages = new Dictionary<int, string>();

        private ExceptionManager()
        {
            LoadMessages();
            PATH = ConfigurationManager.AppSettings.Get("LOG_PATH");
        }

        public static ExceptionManager GetInstance()
        {
            if (instance == null)
                instance = new ExceptionManager();

            return instance;
        }

        public void Process(Exception ex)
        {

            var bex = new BussinessException();


            if (ex.GetType() == typeof(BussinessException))
            {
                bex = (BussinessException)ex;
                bex.ExceptionDetails = GetMessage(bex).Message;
            }
            else
            {
                bex = new BussinessException(0, ex);
            }

            ProcessBussinesException(bex);

        }

        private void ProcessBussinesException(BussinessException bex)
        {
            var today = DateTime.Now.ToString("yyyyMMdd_HH");
            var logName = PATH + today + "_" + "log.txt";

            var message = bex.ExceptionDetails + "\n" + bex.StackTrace + "\n";

            using (StreamWriter w = File.AppendText(logName))
            {
                Log(message, w);
            }

            bex.AppMessage = GetMessage(bex);

            throw bex;

        }

        public ApplicationMessage GetMessage(BussinessException bex)
        {

            var appMessage = new ApplicationMessage
            {
                Message = "Message not found!"
            };

            if (messages.ContainsKey(bex.ExceptionId))
            {
                appMessage.Id = bex.ExceptionId;
                appMessage.Message = messages[bex.ExceptionId];
            }

            return appMessage;

        }

        private void LoadMessages()
        {
            var path = HttpContext.Current.Server.MapPath(@"~/Excepciones.json");


            using (StreamReader r = new StreamReader(path))
            {

                string json = r.ReadToEnd();
                List<ApplicationMessage> list = JsonConvert.DeserializeObject<List<ApplicationMessage>>(json);
                foreach (var appMessage in list)
                {
                    messages.Add(appMessage.Id, appMessage.Message);
                }


            }
        }

        private void Log(string logMessage, TextWriter w)
        {
            w.Write("\r\nLog Entry : ");
            w.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                DateTime.Now.ToLongDateString());
            w.WriteLine("  :");
            w.WriteLine("  :{0}", logMessage);
            w.WriteLine("-------------------------------");
        }

    }
}
