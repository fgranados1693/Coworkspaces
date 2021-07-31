using Exceptions;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
namespace WebAPI.Controllers
{
    public class EmailController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        public async System.Threading.Tasks.Task<IHttpActionResult> PostAsync(Dictionary<string, string> data)
        {
            try
            {
                var apiKey = "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";
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("coworkspacesproyecto2@gmail.com", "Coworkspaces");
                var to = new EmailAddress(data["email"], "");
                var htmlContent = data["content"];
                var msg = MailHelper.CreateSingleEmail(from, to, data["subject"], data["content"], htmlContent);
                var response = await client.SendEmailAsync(msg);

                apiResp = new ApiResponse();
                apiResp.Message = "Action was executed.";

                return Ok(apiResp);
            }
            catch (BussinessException bex)
            {
                return InternalServerError(new Exception(bex.ExceptionId + "-"
                    + bex.AppMessage.Message));
            }
        }

    }
}