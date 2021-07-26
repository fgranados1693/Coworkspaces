using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //name: "Usuario",
            //routeTemplate: "api/{controller}/{email}",
            //defaults: new { controller = "usuario", email = RouteParameter.Optional }
            //);


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
            /*
            config.Routes.MapHttpRoute(
                name: "ActionApi",
                routeTemplate: "api/usuario/{action}/{email}",
                defaults: new { email = RouteParameter.Optional }
            );*/
        }
    }
}
