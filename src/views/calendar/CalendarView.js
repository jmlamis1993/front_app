
import {React, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/calendar-sms-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './style.css'
import 'moment/locale/es'
import moment from 'moment'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/event'
import { AddNewFab } from '../../components/AddNewFab'
const localizer = momentLocalizer(moment)

export const CalendarView = () => {  
  
  const [lastView, setlastView] = useState(localStorage.getItem('lastView')|| 'month');
  const dispatch = useDispatch();
  moment.locale('es');
  const { events , activeEvent} = useSelector(state => state.calendar)

  /*const onDoubleClickEvent = (e) => {
    dispatch(uiOpenModal()); 
  }*/

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    dispatch(uiOpenModal()); 
  }

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView',e);
  }  

  const eventStyleGetter = (event, start, end, isSelecter) =>{
     const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity:'0.8',
      display:'block',
      color: 'white'
     }
     return {
      style
     }
  }

  return (
    <>
    <Calendar
      localizer={localizer}
      messages={messages}
      events={events}
      startAccessor="start"
      endAccessor="end"
      components={
        {event : CalendarEvent}
      }
      eventPropGetter = {eventStyleGetter}
      onSelectEvent = { onSelectEvent}
      onView={onViewChange}
      view={lastView}
    />
    <AddNewFab/>
    
    <CalendarModal/>
  </>
  )
}


