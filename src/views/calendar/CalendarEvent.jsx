import React from 'react'

export const CalendarEvent = ({event}) => {
    const {task_name, user} = event;
  return (
    <>
        <strong>{task_name}</strong>
        <strong> - {user.name}</strong>
    </>
  )
}
