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

const VehicleList = () => {
    
    const [vehicles, setVehicles] = useState([])
    const [vehicle, setVehicle] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)

    const identifyVehicle = (id)=>{
      const specificVehicle = vehicles.find((vehicle)=> vehicle.id === id)
      setVehicle(specificVehicle)
    }
  
    useEffect(() => {
      getVehicleData()
    }, [dataUpdateToggle])

    const getVehicleData = async()=>{
      setIsLoading(true)
      const response = await getAllData("vehicles")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setVehicles(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }

  return (
    <Container fluid>
      {/* new users */}
      <ModalComponent setItem={setVehicle} open={open} setOpen={setOpen} name="Vehicle Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} vehicle={vehicle} setOpen={setOpen} setVehicle={setVehicle} />
      </ModalComponent>

      {/* list of users */}
      <ListSection vehicles={vehicles} setOpen={setOpen} identifyVehicle={identifyVehicle} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const {  setVehicle, setOpen,  vehicle, dataUpdateToggle, setDataUpdateToggle} = props

    const [vehicleName, setVehicleName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [vehicleCategory, setVehicleCategory] = useState("")
    const [numberOfSeats, setNumberOfSeats] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [url, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(vehicle){
        const { hotelName, description, city, province, nearestTown, email, phoneNumber , district, address, vehicleCategory, numberOfSeats, latitude, longitude, url, url2 } = vehicle
        setVehicleName(hotelName)
        setDescription(description)
        setAddress(address)
        setProvice(province)
        setCity(city)
        setDistrict(district)
        setNearestTown(nearestTown)
        setEmail(email)
        setPhoneNumber(phoneNumber)
        setNumberOfSeats(numberOfSeats)
        setVehicleCategory(vehicleCategory)
        setLatitude(latitude)
        setLongitude(longitude)
        setUrl1(url)
        setUrl2(url2)
      }
    }, [])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = {  vehicleName, address, city, nearestTown, email, phoneNumber, description, province, district, vehicleCategory, numberOfSeats,  latitude, longitude, url, url2 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);
      if(!vehicle){
      await addData("vehicles", doc)
      }else{
        await updateData('vehicles', vehicle.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setVehicle(null)
    }


    const deleteHotel = async()=>{
      if(vehicle){
        setIsLoading(true)
        await deleteData('vehicles', vehicle.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setVehicle(null)
    }

    return (
      <div>
        {isLoading && <CircularIndeterminate />}
        <InputComponent label="Vehicle Name" value={vehicleName} setValue={setVehicleName} />
        <InputComponent label="Vehicle Address" value={address} setValue={setAddress} />
        <InputComponent label="Province" value={province} setValue={setProvice} />
        <InputComponent label="District" value={district} setValue={setDistrict} />
        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent label="Email" value={email} setValue={setEmail} />
        <InputComponent label="Phone Number" value={phoneNumber} setValue={setPhoneNumber} />
        <InputComponent label="Vehicle Category" value={vehicleCategory} setValue={setVehicleCategory} />
        <InputComponent label="Number Of Seats" value={numberOfSeats} setValue={setNumberOfSeats} />
        <InputComponent type="number" label="Latitude" value={latitude} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={longitude} setValue={setLongitude} />
        <ImageUpload url={url} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={url2} setUrl={setUrl2} name="Select Image 2" />

        <InputComponent rows={5} label="Description" value={description} setValue={setDescription} />


        <SpaceBoxComponent>
          { !isLoading && vehicle && <Button color="secondary" onClick={deleteHotel}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button onClick={addOrUpdateUser}> { vehicle ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  vehicles, setOpen, identifyVehicle } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyVehicle(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { vehicles.map((vehicle, index)=> <CardComponent mainHeader={vehicle.vehicleName} editHandler={editHandler} key={vehicle.id} {...vehicle} />
         ) }
      </div>
    )
}

export default VehicleList