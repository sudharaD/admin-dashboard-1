import { httpRequest } from 'http/Http';
import React, { useEffect, useState } from 'react'

import {
    Button,
    Container,
  } from "react-bootstrap";

import {useHistory} from 'react-router'
import InputComponent from 'components/InputComponent/InputComponent';
import SpaceBoxComponent from 'components/SpaceBox/SpaceBox';
import ModalComponent from 'components/modal/Modal';
import CardComponent from 'components/card/CardComponent';

const UserList = () => {
    
    const router = useHistory()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    console.log(users);


    const getUsers = async ()=>{
      // default get users
      // setUsers(defaultUsers)
      return;
      const reauest = await httpRequest({ url : 'users/find-users', method :'get'})
      if(reauest.success){
        // setUsers(reauest.users)
      }
    }

    const identifyUser = (index)=>{
      const specificUser = users.find((user)=> user.id === index)
      setUser(specificUser)
    }
  
    useEffect(() => {
      getUsers()
    }, [])


  return (
    <Container fluid>
      {/* new users */}
      <ModalComponent setUser={setUser} open={open} setOpen={setOpen} name="Add New Screen">
        <CreateAndUpdateSection user={user} setOpen={setOpen} setUsers={setUsers} />
      </ModalComponent>

      {/* list of users */}
      <ListSection users={users} setOpen={setOpen} identifyUser={identifyUser} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const {setUsers, setOpen, user} = props

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [location, setLocation] = useState("")

    useEffect(()=>{
      if(user){
        const { title, description} = user
        setTitle(title)
        setDescription(description)
      }
    }, [])

    const addOrUpdateUser = ()=>{

      if(user){  
        setUsers(users =>{
          const filteredUsers = users.filter(curUser=> curUser.id !== user.id)
          console.log(filteredUsers, 'filteredUsers');
          const editableUser = {...user, title, description}
          const returnArr = [...filteredUsers, editableUser]

          return returnArr.sort((a, b)=> a.id - b.id )
        })
      }else{
        setUsers(users=> [...users, { id : (users.length + 1),  title, description}])
      }

      setOpen(false)
    }

    const deleteUser = ()=>{
      if(user){
        setUsers(users =>{
          const filteredUsers = users.filter(curUser=> curUser.id !== user.id)
          return filteredUsers.sort((a, b)=> a.id - b.id )
        })
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
          { user && <Button color="secondary" onClick={deleteUser}> Delete User </Button>}
          <Button onClick={addOrUpdateUser}> { user ? 'Update Data' : 'Insert Data'} </Button>
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