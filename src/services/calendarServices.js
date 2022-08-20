import axiosInstance from '../helpers/axios-orders';


export const calendarService = {
    ListEvents,
    AddEvent,
    UpdateEvent,
    DeleteEvent
};

async function ListEvents() { 
   return axiosInstance()
    .get('/api/crm_app/task/list');
  }

  async function AddEvent(event){
    const owner = JSON.parse(localStorage.getItem('user')).id;    
    const member = event.member.map((e) => e.id); 

    let formData = JSON.stringify({
        "title" : event.task_name,
        "estdate": event.est_time,
        "timespent": event.time_spent,
        "description": event.description,
        "priority" : event.priority,
        "start_date" : event.start,
        "finish_date" : event.end,
        "status" : event.status,
        "proyect":event.project,
        "types": event.type,
        "owner":owner,
        "tags": [1],
        "user": member,
        }) 
   
    //Falta corregir users  
    return axiosInstance()
    .post('api/crm_app/task/create', formData);
  
}

async function UpdateEvent(event){

    const owner = JSON.parse(localStorage.getItem('user')).id;    
    const member = event.member.map((e) => e.id); 
    
    let formData = JSON.stringify({
        "title" : event.task_name,
        "estdate": event.est_time,
        "timespent": event.time_spent,
        "description": event.description,
        "priority" : event.priority,
        "start_date" : event.start,
        "finish_date" : event.end,
        "status" : event.status,
        "proyect":event.project,
        "types": event.type,
        "owner":owner,
        "tags": [1],
        "user": member,
        })
        return axiosInstance()
       .put(`api/crm_app/task/list/${event.id}`, formData);
}

async function DeleteEvent(id){
    
        return axiosInstance()
       .delete(`api/crm_app/task/list/${id}`);
}
  