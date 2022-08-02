

export const prepareBranch = ( events = []) => {    
   const branch = events.map(function(e){    
      return {
         "id": e.id,
         "name": e.name,
         "category": e.category,
         "description": e.description,         
         "avatar": e.avatar,   
         "address": e.address,         
         "phone": e.phone_number,                  
         "tags": e.tags,
         "website": e.website,         
         "contact": [],
         "user": {
            _id : e.owner.id,
            name: e.owner.name,
            email: e.owner.email,
            }
        }});     
   return branch;
}