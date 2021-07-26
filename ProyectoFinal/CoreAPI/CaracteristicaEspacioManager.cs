using DataAccess.Crud;
using Entities_POJO;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPI
{
    public class CaracteristicaEspacioManager : BaseManager
    {

        private CaracteristicaEspacioCrudFactory crudCaracteristicaEspacio;
        private readonly Random _random = new Random();

        public CaracteristicaEspacioManager()
        {
            crudCaracteristicaEspacio = new CaracteristicaEspacioCrudFactory();
        }

        public void Create(CaracteristicaEspacio caracteristicaEspacio)
        {
            try
            {
                var ce = crudCaracteristicaEspacio.Retrieve<CaracteristicaEspacio>(caracteristicaEspacio);

                if (ce != null)
                {
                    // Caracteristica Espacio ya se encuentra registrada
                    throw new BussinessException(2);
                }

                crudCaracteristicaEspacio.Create(caracteristicaEspacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }

        public List<CaracteristicaEspacio> RetrieveAll()
        {
            List<CaracteristicaEspacio> lstResult = new List<CaracteristicaEspacio>();
            try
            {
                lstResult = crudCaracteristicaEspacio.RetrieveAll<CaracteristicaEspacio>();
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        public List<CaracteristicaEspacio> RetrieveByEspacio(CaracteristicaEspacio caracteristicaEspacio)
        {
            List<CaracteristicaEspacio> lstResult = new List<CaracteristicaEspacio>();
            try
            {
                lstResult = crudCaracteristicaEspacio.RetrieveByEspacio<CaracteristicaEspacio>(caracteristicaEspacio);
                
            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return lstResult;
        }

        public CaracteristicaEspacio RetrieveById(CaracteristicaEspacio caracteristicaEspacio)
        {
            CaracteristicaEspacio ce = null;
            try
            {
                ce = crudCaracteristicaEspacio.Retrieve<CaracteristicaEspacio>(caracteristicaEspacio);
                if (ce == null)
                {
                    // Caracteristica Espacio no existe
                    throw new BussinessException(3);
                }

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

            return ce;
        }

        public void Update(CaracteristicaEspacio caracteristicaEspacio)
        {
            CaracteristicaEspacio ce = null;
            try
            {
                ce = crudCaracteristicaEspacio.Retrieve<CaracteristicaEspacio>(caracteristicaEspacio);
                if (ce == null)
                {
                    throw new BussinessException(14);
                }

                crudCaracteristicaEspacio.Update(caracteristicaEspacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
         
        public void Delete(CaracteristicaEspacio caracteristicaEspacio)
        {
            CaracteristicaEspacio ce = null;

            try
            {
                ce = crudCaracteristicaEspacio.Retrieve<CaracteristicaEspacio>(caracteristicaEspacio);
                if (ce == null)
                {
                    throw new BussinessException(14);
                }

                crudCaracteristicaEspacio.Delete(caracteristicaEspacio);

            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
        }
    }
}
