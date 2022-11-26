import InputComponent from "components/InputComponent/InputComponent";
import { httpRequest } from "http/Http";
import React, { Fragment, useEffect, useState } from "react";
import logo from '../assets/img/faces/face-3.jpg'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Table,
  Row,
  Col,
} from "react-bootstrap";


import { useParams} from 'react-router'
import { useHistory } from "react-router-dom";

function User() {

    const params = useParams()
    const router = useHistory()

    const [title, setTitle] = useState("")
    const [year, setyear] = useState("")
    const [image, setimage] = useState("default")
    const [price, setprice] = useState("")
    const [description, setdescription] = useState("")
    const [transmission, settransmission] = useState("")
    const [fuelType, setfuelType] = useState("")
    const [seats, setseats] = useState("")
    const [ac, setac] = useState("")

    const [firstName, setfirstName] = useState("")
    const [_id, setId] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setemail] = useState("")
    const [defaultPassword, setdefaultPassword] = useState("")

    useEffect(() => {
      if(params.id){
        getUser()
      }
    }, [params.id])

    const getUser = async ()=>{
      const request = await httpRequest({url :`users/find-user-and-car/${params.id}`, method:'get'})
      if(request.success){
        const {firstName, secondName, email, _id} = request.user

        setId(_id)
        // setimage(image)
        setfirstName(firstName)
        setlastName(secondName)
        setemail(email)
      }
    }

    

    const [list, setlist] = useState([])
  
  const getUsers = async ()=>{
    const reauest = await httpRequest({ url : `cars/booked/${params.id}`, method :'get'})
    if(reauest.success){
      setlist(reauest.data)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])


    const sendEmail = ()=>{
      router.push(`/admin/emails/${email}`)
    }

    const deleteUser = async()=>{
      const request = await httpRequest({url: `user/delete/${_id}`, method:'delete'})
      if(request.success){
        router.push('/admin/user')
      }
    }
    

  return (
    <Fragment>
      <Container fluid>
        <InputComponent label="Title" value={title} setValue={setTitle} />
      </Container>
    </Fragment>
  );
}

export default User;
