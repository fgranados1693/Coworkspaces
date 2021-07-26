using AForge.Video;
using AForge.Video.DirectShow;
using Entities_POJO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WebAPI.Models;
using ZXing;

namespace LectorCodigosQR
{
    public partial class Form1 : Form
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

        public Form1()
        {
            InitializeComponent();
        }
        FilterInfoCollection filterInfoCollection;
        VideoCaptureDevice captureDevice;

        private void Form1_Load(object sender, EventArgs e)
        {            
            filterInfoCollection = new FilterInfoCollection(FilterCategory.VideoInputDevice);
            foreach (FilterInfo filterInfo in filterInfoCollection)
                cboDevice.Items.Add(filterInfo.Name);
            cboDevice.SelectedIndex = 0;
            RunAsync().GetAwaiter().GetResult();
        }

        private void startButton_Click(object sender, EventArgs e)
        {
            captureDevice = new VideoCaptureDevice(filterInfoCollection[cboDevice.SelectedIndex].MonikerString);
            captureDevice.NewFrame += CaptureDecive_NewFrame;
            captureDevice.Start();
            timer1.Start();
        }

        private void CaptureDecive_NewFrame(object sender, NewFrameEventArgs eventArgs)
        {
            pictureBox.Image = (Bitmap)eventArgs.Frame.Clone();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (captureDevice.IsRunning)
                captureDevice.Stop();
        }

        private async void timer1_Tick(object sender, EventArgs e)
        {
            if (pictureBox.Image != null)
            {

                BarcodeReader barcodeReader = new BarcodeReader();
                Result result = barcodeReader.Decode((Bitmap)pictureBox.Image);

                if (result != null)
                {                    
                    string id;
                    id = result.ToString();
                   
                    Reservacion reservacion = await GetReservaAsync(id);
                    if (reservacion != null)
                    {
                        if (reservacion.Estado != "cancelada" && reservacion.Estado != "reembolso") {
                            Espacio espacio = await GetEspacioAsync(reservacion.Id_Espacio);

                            txtQRCode.Text = "Espacio: " + espacio.Nombre +" | Fecha: " + reservacion.Fecha.ToShortDateString() + " | Hora entrada: " + reservacion.Hora_Entrada + " | Hora salida: " + reservacion.Hora_Salida + " | Estado: " + reservacion.Estado + " | Información importante: " + espacio.Mensaje_Reservacion;
                            // hacer put
                        }
                        else {
                            txtQRCode.Text = "La reservación no está activa";
                        }
                        
                    }

                    timer1.Stop();

                    if (captureDevice.IsRunning)
                        captureDevice.Stop();                    
                }
            }
        }       

    }
}
