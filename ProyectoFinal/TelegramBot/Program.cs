using Entities_POJO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Telegram.Bot;
using WebAPI.Models;

namespace TelegramBot
{
    class Program
    {
        static HttpClient client = new HttpClient();

        static async Task RunAsync()
        {
            // Update port # in the following line.
            client.BaseAddress = new Uri("https://localhost:44302/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }
        static async Task<Reservacion> GetReservaAsync(string id)
        {
            string path = "api/reservacion/" + id;

            Reservacion reservacion = null;
            ApiResponse apiResp = new ApiResponse();

            try
            {
                HttpResponseMessage response = await client.GetAsync(path);
                if (response.IsSuccessStatusCode)
                {
                    apiResp = await response.Content.ReadAsAsync<ApiResponse>();
                    JObject json = (JObject)apiResp.Data;
                    reservacion = json.ToObject<Reservacion>();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
           
            return reservacion;
        }

        static async Task<Espacio> GetEspacioAsync(int id)
        {
            string path = "api/espacio/" + id;

            Espacio espacio = null;
            ApiResponse apiResp = new ApiResponse();

            try
            {
                HttpResponseMessage response = await client.GetAsync(path);
                if (response.IsSuccessStatusCode)
                {
                    apiResp = await response.Content.ReadAsAsync<ApiResponse>();
                    JObject json = (JObject)apiResp.Data;
                    espacio = json.ToObject<Espacio>();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return espacio;
        }

        private static readonly TelegramBotClient bot = new TelegramBotClient("1796489242:AAG4AwxzEueC6DL7BnZMx-Zos7UMo3WIP_g");
        static void Main(string[] args)
        {
            RunAsync().GetAwaiter().GetResult();

            bot.OnMessage += Bot_OnMessage;
            bot.OnMessageEdited += Bot_OnMessage;

            bot.StartReceiving();
            Console.ReadLine();
            bot.StopReceiving();
        }

        private static async void Bot_OnMessage(object sender, Telegram.Bot.Args.MessageEventArgs e)
        {
            if (e.Message.Type == Telegram.Bot.Types.Enums.MessageType.Text)
            {
                string id = e.Message.Text;

                if (IsDigitsOnly(id))
                {
                    string msg = "";

                    Reservacion reservacion = await GetReservaAsync(id);
                    Espacio espacio = await GetEspacioAsync(reservacion.Id_Espacio);

                    msg = "Espacio: " + espacio.Nombre + "\nFecha: " + reservacion.Fecha.ToShortDateString() + "\nHora entrada: " + reservacion.Hora_Entrada + "\nHora salida: " + reservacion.Hora_Salida + "\nEstado: " + reservacion.Estado;

                    bot.SendTextMessageAsync(e.Message.Chat.Id, msg);
                }
                else
                {
                    bot.SendTextMessageAsync(e.Message.Chat.Id, @"Envía el código de tu reserva para consultar su información.");
                }
            }
        }


        private static bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c < '0' || c > '9')
                    return false;
            }

            return true;
        }
    }
}

