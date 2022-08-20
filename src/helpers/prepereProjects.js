import moment from 'moment'

export const prepareProjects = ( events = []) => {

   const eventos = events.map(function(e){
    
      return {
         "id": e.id,
         "name": e.name,
         "description": e.description,
         "startDate": moment(e.start_date).toDate(),     
         "EndDate": moment(e.finish_date).toDate(),
         "description": e.description,            
         "companie": e.description,
         "members": e.members,          
        "user":{
         id : e.owner.id,
         name: e.owner.name,
         email: e.owner.email,
        }
      }
   });     
   return eventos;
}