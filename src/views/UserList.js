import React, { useEffect, useState } from 'react'
import {getAllData, addData, updateData, deleteData} from '../http/api-requests'

import {  Container } from "react-bootstrap";
import Button from '@mui/material/Button';

import InputComponent from 'components/InputComponent/InputComponent';
import SpaceBoxComponent from 'components/SpaceBox/SpaceBox';
import ModalComponent from 'components/modal/Modal';
import CardComponent from 'components/card/CardComponent';
import CircularIndeterminate from 'components/progress/CircularIndeterminate';
import ImageUpload from 'components/fileUpload/FileUpload';

const UserList = () => {
    
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)

    const identifyUser = (index)=>{
      const specificUser = users.find((user)=> user.id === index)
      setUser(specificUser)
    }
  
    useEffect(() => {
      getUserData()
    }, [dataUpdateToggle])

    const getUserData = async()=>{
      setIsLoading(true)
      const response = await getAllData("screens")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setUsers(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }

  return (
    <Container fluid>
      {/* new users */}
      <ModalComponent setItem={setUser} open={open} setOpen={setOpen} name="Add New Screen">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} user={user} setOpen={setOpen} setUser={setUser} />
      </ModalComponent>

      {/* list of users */}
      <ListSection users={users} setOpen={setOpen} identifyUser={identifyUser} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const {setUser, setOpen, user, dataUpdateToggle, setDataUpdateToggle} = props

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(user){
        const { title, description, city, district, nearestTown, latitude, longitude, url, province} = user
        setTitle(title)
        setDescription(description)
        setCity(city)
        setDistrict(district)
        setNearestTown(nearestTown)
        setProvice(province)
        setLatitude(latitude)
        setLongitude(longitude)
        setUrl(url)
      }
    }, [user])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = { title, description, city, district, latitude, longitude, nearestTown, url, province }
      if(!user){
      await addData("screens", doc)
      }else{
        await updateData('screens', user.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setUser(null)
    }


    const deleteUser = async()=>{
      if(user){
        setIsLoading(true)
        await deleteData('screens', user.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setUser(null)
    }

    return (
      <div>

       { isLoading && <CircularIndeterminate />}

        <InputComponent label="Title" value={title} setValue={setTitle} />
        <InputComponent label="Province" value={province} setValue={setProvice} />
        <InputComponent label="District" value={district} setValue={setDistrict} />
        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent type="number" label="Latitude" value={latitude} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={longitude} setValue={setLongitude} />
        <ImageUpload url={url} setUrl={setUrl} />
        <InputComponent label="Description" value={description} setValue={setDescription} rows={5}/>

        <SpaceBoxComponent>
          { !isLoading && user && <Button variant="contained" color="error" onClick={deleteUser}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button variant="contained" onClick={addOrUpdateUser}> { user ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const { users, setOpen, identifyUser } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyUser(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { users.map((user, index)=> <CardComponent mainHeader={user.title} editHandler={editHandler} key={user.id} {...user} />
         ) }
      </div>
    )
}

export default UserList