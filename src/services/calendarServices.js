import axiosInstance from '../helpers/axios-orders';


export const calendarService = {
    ListEvents,
    AddEvent,
    //UpdateEvent,
    //DeleteEvent
};

function ListEvents() { 
   return axiosInstance()
    .get('/api/crm_app/task/list');
  }

function AddEvent(event){
    let formData = JSON.stringify({
        "title" : event.task_name,
        "estdate": event.est_time,
        "timespent": event.time_spent,
        "description": event.description,
        "priority" : "Baja",
        "start_date" : event.start,
        "finish_date" : event.end,
        "status" : "Pendiente",
        "proyect": 1,
        "tags": [1],
        "user": [1],
        }) 
   
    //Falta corregir types y users  
    return axiosInstance()
    .post('api/crm_app/task/create', formData);
  
}
  