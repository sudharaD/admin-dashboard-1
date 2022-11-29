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

const HotelManagement = () => {
    
    const [hotels, setHotels] = useState([])
    const [hotel, setHotel] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)

    const identifyHotel = (id)=>{
      const specificUser = hotels.find((hotel)=> hotel.id === id)
      setHotel(specificUser)
    }
  
    useEffect(() => {
      getHotelData()
    }, [dataUpdateToggle])

    const getHotelData = async()=>{
      setIsLoading(true)
      const response = await getAllData("hotels")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setHotels(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }

  return (
    <Container fluid>
      {/* new users */}
      <ModalComponent setItem={setHotel} open={open} setOpen={setOpen} name="Hotel Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} hotel={hotel} setOpen={setOpen} setHotel={setHotel} />
      </ModalComponent>

      {/* list of users */}
      <ListSection hotels={hotels} setOpen={setOpen} identifyHotel={identifyHotel} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const { setHotel, setOpen, hotel, dataUpdateToggle, setDataUpdateToggle} = props

    const [hotelName, setHotelName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [url, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
      if(hotel){
        const { hotelName, description, city, province, nearestTown, email, phoneNumber , district, address, latitude, longitude, url, url2 } = hotel
        setHotelName(hotelName)
        setDescription(description)
        setAddress(address)
        setProvice(province)
        setCity(city)
        setDistrict(district)
        setNearestTown(nearestTown)
        setEmail(email)
        setPhoneNumber(phoneNumber)
        setLatitude(latitude)
        setLongitude(longitude)
        setUrl1(url)
        setUrl2(url2)
      }
    }, [hotel])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = { hotelName, address, city, nearestTown, email, phoneNumber, description, province, district,  latitude, longitude, url, url2 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!hotel){
      await addData("hotels", doc)
      }else{
        await updateData('hotels', hotel.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setHotel(null)
    }


    const deleteHotel = async()=>{
      if(hotel){
        setIsLoading(true)
        await deleteData('hotels', hotel.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setHotel(null)
    }

    

    return (
      <div>
        {isLoading && <CircularIndeterminate />}
        <InputComponent label="Hotel Name" value={hotelName} setValue={setHotelName} />
        <InputComponent label="Hotel Address" value={address} setValue={setAddress} />
        <InputComponent label="Province" value={province} setValue={setProvice} />
        <InputComponent label="District" value={district} setValue={setDistrict} />
        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent label="Email" value={email} setValue={setEmail} />
        <InputComponent label="Phone Number" value={phoneNumber} setValue={setPhoneNumber} />
        <InputComponent type="number" label="Latitude" value={latitude} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={longitude} setValue={setLongitude} />
        <ImageUpload url={url} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={url2} setUrl={setUrl2} name="Select Image 2" />

        <InputComponent rows={5} label="Description" value={description} setValue={setDescription} />


        <SpaceBoxComponent>
          { !isLoading && hotel && <Button color="secondary" onClick={deleteHotel}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button onClick={addOrUpdateUser}> { hotel ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  hotels, setOpen, identifyHotel } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyHotel(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { hotels.map((hotel, index)=> <CardComponent mainHeader={hotel.hotelName} editHandler={editHandler} key={hotel.id} {...hotel} />
         ) }
      </div>
    )
}

export default HotelManagement