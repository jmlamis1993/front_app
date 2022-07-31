import {React,useState} from 'react'
import moment from 'moment'

export const prepareEvent = ( events = []) => {

   const eventos = events.map(function(e){
      return {
         "id": e.id,
         "task_name": e.title,
         "project": e.proyect,
         "time_spent": e.timespent,   
         "est_time": e.estdate,  
         "description": e.description,  
         "tags": e.tags,  
         "priority": e.priority,  
         "type": e.types,      
         "status": e.status,         
         "start": moment(e.start_date).toDate(),         
         "end": moment(e.finish_date).toDate(),    
         "user":{
         _id : e.owner.id,
         name: e.owner.email,
        }
      }
   });     
   return eventos;
}
