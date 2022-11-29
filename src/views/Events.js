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
import ImageUpload from 'components/fileUpload/FileUpload';

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
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")

    useEffect(()=>{
      if(event){
        const { memberCount, description, duration, budget,departureDate, latitude, longitude, url, url2 } = event
        
        setMemberCount(memberCount)
        setDepartureDate(departureDate)
        setBudget(budget)
        setDuration(duration)
        setDescription(description)
        setLatitude(latitude)
        setLongitude(longitude)
        setUrl1(url)
        setUrl2(url2)
      }
    }, [])

    const addOrUpdateEvent = async()=>{
      setIsLoading(true)
      const doc = {  memberCount, budget,  description,  departureDate, duration,  latitude, longitude, url, url2 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!event){
      await addData("events", JSON.parse(JSON.stringify(doc)))
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
        {isLoading && <CircularIndeterminate />}
        <InputComponent label="Member count" value={memberCount} setValue={setMemberCount} />
        <InputComponent label="Budget" value={budget} setValue={setBudget} />
        <InputComponent label="Departure Date" value={duration} setValue={setDuration} />
        <InputComponent label="Description" value={description} setValue={setDescription} />
        <InputComponent type="number" label="Latitude" value={latitude} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={longitude} setValue={setLongitude} />
        <ImageUpload url={url} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={url2} setUrl={setUrl2} name="Select Image 2" />

        <InputComponent rows={5} label="Description" value={departureDate} setValue={setDepartureDate} />


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
        { events.map((event, index)=> <CardComponent editHandler={editHandler} key={event.id} {...event} />
         ) }
      </div>
    )
}

export default EventManagement