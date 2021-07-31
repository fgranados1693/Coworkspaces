using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace WebAPI.Controllers
{
    public class SMSController : ApiController
    {
        ApiResponse apiResp = new ApiResponse();

        public IHttpActionResult Post(Dictionary<string, string> data)
        {
            try
            {
                string accountSid = "ACf1764958398bbb33559a7afb0882ec8b";
                string authToken = "540d5be771ec522631752d8b1acd7e33";

                TwilioClient.Init(accountSid, authToken);

                var message = MessageResource.Create(
                    body: data["content"],
                    from: new Twilio.Types.PhoneNumber("+12567153218"),
                    to: new Twilio.Types.PhoneNumber(data["telefono"])
                );

                Console.WriteLine(message.Sid);

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