import React, { useEffect, useState } from 'react'
import {getAllData, addData, updateData, deleteData} from '../http/api-requests'

import {
    Button,
    Container,
  } from "react-bootstrap";

import InputComponent from 'components/InputComponent/InputComponent';
import SpaceBoxComponent from 'components/SpaceBox/SpaceBox';
import ModalComponent from 'components/modal/Modal';
import CardComponent from 'components/card/CardComponent';
import CircularIndeterminate from 'components/progress/CircularIndeterminate';

const EventManagement = () => {
    
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)

    const identifyEvent = (id)=>{
      const specificEvent = events.find((event)=> event.id === id)
      setEvent(specificEvent)
    }
  
    useEffect(() => {
      getEventsData()
    }, [dataUpdateToggle])

    const getEventsData = async()=>{
      setIsLoading(true)
      const response = await getAllData("events")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setEvents(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }

  return (
    <Container fluid>
      {/* new users */}
      <ModalComponent setItem={setEvent} open={open} setOpen={setOpen} name="Event Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} event={event} setOpen={setOpen} setEvent={setEvent} />
      </ModalComponent>

      {/* list of users */}
      <ListSection events={events} setOpen={setOpen} identifyEvent={identifyEvent} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const { setEvent, setOpen, event, dataUpdateToggle, setDataUpdateToggle} = props

    const [memberCount, setMemberCount] = useState("")
    const [budget, setBudget] = useState("")
    const [departureDate, setDepartureDate] = useState("")
    const [duration, setDuration] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(event){
        const { memberCount, description, duration, budget,departureDate } = event
        setMemberCount(memberCount)
        setDepartureDate(departureDate)
        setBudget(budget)
        setDuration(duration)
        setDescription(description)
      }
    }, [])

    const addOrUpdateEvent = async()=>{
      setIsLoading(true)
      const doc = {  memberCount, budget,  description,  departureDate, duration }
      if(!event){
      await addData("events", doc)
      }else{
        await updateData('events', event.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setEvent(null)
    }


    const deleteHotel = async()=>{
      if(event){
        setIsLoading(true)
        await deleteData('events', event.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setEvent(null)


    }

    

    return (
      <div>
        <InputComponent label="Member count" value={memberCount} setValue={setMemberCount} />
        <InputComponent label="Budget" value={budget} setValue={setBudget} />
        <InputComponent label="Description" value={departureDate} setValue={setDepartureDate} />
        <InputComponent label="Departure Date" value={duration} setValue={setDuration} />
        <InputComponent label="Description" value={description} setValue={setDescription} />
        <SpaceBoxComponent>
          { !isLoading && event && <Button color="secondary" onClick={deleteHotel}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button onClick={addOrUpdateEvent}> { event ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  events, setOpen, identifyEvent } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyEvent(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { events.map((hotel, index)=> <CardComponent editHandler={editHandler} key={hotel.id} {...hotel} />
         ) }
      </div>
    )
}

export default EventManagement