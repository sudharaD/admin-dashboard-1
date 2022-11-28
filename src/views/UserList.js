import React, { useEffect, useState } from 'react'
import {getAllData, addData, updateData, deleteData} from '../http/api-requests'

import {
    Button,
    Container,
  } from "react-bootstrap";

import {useHistory} from 'react-router'
import InputComponent from 'components/InputComponent/InputComponent';
import SpaceBoxComponent from 'components/SpaceBox/SpaceBox';
import ModalComponent from 'components/modal/Modal';
import CardComponent from 'components/card/CardComponent';
import CircularIndeterminate from 'components/progress/CircularIndeterminate';

const UserList = () => {
    
    const router = useHistory()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(null);
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
      <ModalComponent setUser={setUser} open={open} setOpen={setOpen} name="Add New Screen">
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
    const [location, setLocation] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(user){
        const { title, description} = user
        setTitle(title)
        setDescription(description)
      }
    }, [])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = { title, description }
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

    }

    

    return (
      <div>
        <InputComponent label="Title" value={title} setValue={setTitle} />
        <InputComponent label="Description" value={description} setValue={setDescription} />
        <InputComponent label="Province" value={province} setValue={setProvice} />
        <InputComponent label="District" value={province} setValue={setProvice} />
        <InputComponent label="City" value={province} setValue={setProvice} />
        <InputComponent label="Nearest Town" value={province} setValue={setProvice} />
        <SpaceBoxComponent>
          { !isLoading && user && <Button color="secondary" onClick={deleteUser}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button onClick={addOrUpdateUser}> { user ? 'Update Data' : 'Insert Data'} </Button>}
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
        { users.map((user, index)=> <CardComponent editHandler={editHandler} key={user.id} {...user} />
         ) }
      </div>
    )
}

export default UserList