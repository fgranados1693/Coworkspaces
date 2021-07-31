using DataAccess.Dao;
using Entities_POJO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class HorarioMapper : EntityMapper, ISqlStatements, IObjectMapper
    {
        private const string DB_COL_ID_HORARIO = "Id_Horario";
        private const string DB_COL_ID_ESPACIO = "Id_Espacio";
        private const string DB_COL_DIA_SEMANA = "Dia_Semana";
        private const string DB_COL_HORA_INICIO = "Hora_Inicio";
        private const string DB_COL_HORA_FIN = "Hora_Fin";
        

        /// <summary>
        /// Metodo para definir la operacion sql para registrar un nuevo horario de espacio
        /// </summary>
        /// <param name="entity">Instancia del horario que se quiere registrar</param>
        /// <returns>operacion sql para registrar un nuevo horario</returns>
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "CRE_HORARIO_PR" };

            var u = (Horario)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            operation.AddVarcharParam(DB_COL_DIA_SEMANA, u.Dia_Semana);
            operation.AddTimeParam(DB_COL_HORA_INICIO, u.Hora_Inicio);
            operation.AddTimeParam(DB_COL_HORA_FIN, u.Hora_Fin);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar un horario segun su id
        /// </summary>
        /// <param name="entity">Instancia de horario con el id del horario que se quiere buscar</param>
        /// <returns>operacion sql para buscar un horario segun su id</returns>
        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_HORARIO_PR" };

            var u = (Horario)entity;
            operation.AddIntParam(DB_COL_ID_HORARIO, u.Id_Horario);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para buscar horarios de un espacio con su id y segun el dia de la semana
        /// </summary>
        /// <param name="entity">Instancia de horario con el id y dia semana del espacio que se quiere el horario respectivo</param>
        /// <returns>operacion sql para buscar horarios de un espacio con su id y dia de la semana</returns>
        public SqlOperation GetRetriveStatementHorariosEspacio(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_HORARIOS_ID_ESPACIO_PR" };

            var u = (Horario)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
           

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para buscar horarios de un espacio con su id y segun el dia de la semana
        /// </summary>
        /// <param name="entity">Instancia de horario con el id y dia semana del espacio que se quiere el horario respectivo</param>
        /// <returns>operacion sql para buscar horarios de un espacio con su id y dia de la semana</returns>
        public SqlOperation GetRetriveStatementHorariosDiaSemana(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "RET_HORARIO_BY_ID_ESPACIO_DIA_SEMANA_PR" };

            var u = (Horario)entity;
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            operation.AddVarcharParam(DB_COL_DIA_SEMANA, u.Dia_Semana);

            return operation;
        }

        /// <summary>
        /// Metodo para definir la operacion sql para listar todos los horarios registrados en la base de datos
        /// </summary>
        /// <returns>Operacion sql para listar todos los horarios registrados en la base de datos</returns>
        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "RET_ALL_HORARIOS_PR" };
            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para actualizar un horario registrado en la base de datos
        /// </summary>
        /// <param name="entity">Instancia del horario que se quiere actualizar</param>
        /// <returns>Operacion sql para actualizar un horario registrado en la base de datos</returns>
        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "UPD_HORARIO_PR" };

            var u = (Horario)entity;
            operation.AddIntParam(DB_COL_ID_HORARIO, u.Id_Horario);
            operation.AddIntParam(DB_COL_ID_ESPACIO, u.Id_Espacio);
            operation.AddVarcharParam(DB_COL_DIA_SEMANA, u.Dia_Semana);
            operation.AddTimeParam(DB_COL_HORA_INICIO, u.Hora_Inicio);
            operation.AddTimeParam(DB_COL_HORA_FIN, u.Hora_Fin);

            return operation;
        }
        /// <summary>
        /// Metodo para definir la operacion sql para eliminar un horario de la base de datos
        /// </summary>
        /// <param name="entity">Instancia del horario que se quiere eliminar</param>
        /// <returns>Operacion sql para eliminar un horario de la base de datos</returns>
        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "DEL_HORARIO_PR" };

            var u = (Horario)entity;
            operation.AddIntParam(DB_COL_ID_HORARIO, u.Id_Horario);
            return operation;
        }
        /// <summary>
        /// Metodo para construir todos los objetos Horario de una lista de diccionarios
        /// </summary>
        /// <param name="lstRows">Lista de diccionarios de objetos horario</param>
        /// <returns>Lista de objetos horario</returns>
        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var horario = BuildObject(row);
                lstResults.Add(horario);
            }

            return lstResults;
        }
        /// <summary>
        /// Metodo para construir un objeto horario a partir de un diccionario
        /// </summary>
        /// <param name="row">Diccionario de un objeto horario</param>
        /// <returns>Objeto horario</returns>
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var horario = new Horario
            {
                Id_Horario= GetIntValue(row, DB_COL_ID_HORARIO),
                Id_Espacio = GetIntValue(row, DB_COL_ID_ESPACIO),
                Dia_Semana = GetStringValue(row, DB_COL_DIA_SEMANA),
                Hora_Inicio = GetDateSpanValue(row, DB_COL_HORA_INICIO),
                Hora_Fin = GetDateSpanValue(row, DB_COL_HORA_FIN)

            };

            return horario;
        }
    }
}