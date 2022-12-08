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
import SearchComponent from 'components/search/SearchComponent';
import DropDown from 'components/dropdown/DropDown';
import { provinceList } from 'utils/province';
import { districtsList } from 'utils/districts';

const VehicleList = () => {
    
    const [vehicles, setVehicles] = useState([])
    const [allVehicles, setAllVehicles] = useState([])
    const [vehicle, setVehicle] = useState("")
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)
    const [search, setSearch] = useState("")


    const identifyVehicle = (id)=>{
      const specificVehicle = vehicles.find((vehicle)=> vehicle.id === id)
      setVehicle(specificVehicle)
    }
  
    useEffect(() => {
      getVehicleData()
    }, [dataUpdateToggle])

    useEffect(()=>{
      if(search){
        const searchedVehicles = allVehicles.filter(vehicle=> vehicle?.vehicleName?.toLowerCase().includes(search.toLowerCase()))
        setVehicles(()=>[...searchedVehicles])
      }else{
        setVehicles(allVehicles)
      }
    }, [search])

    const getVehicleData = async()=>{
      setIsLoading(true)
      const response = await getAllData("vehicles")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setVehicles(data)
        setAllVehicles(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }

  return (
    <Container fluid>
      {/* search  */}
      <SearchComponent search={search} setSearch={setSearch} />
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
    const [dis, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [vehicleCategory, setVehicleCategory] = useState("")
    const [numberOfSeats, setNumberOfSeats] = useState("")
    const [lat, setLatitude] = useState("")
    const [lng, setLongitude] = useState("")
    const [pic, setUrl1] = useState("")
    const [pic1, setUrl2] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(vehicle){
        const { hotelName, dis, city, province, nearestTown, email, phoneNumber , district, address, vehicleCategory, numberOfSeats, lat, lng, pic, pic1 } = vehicle
        setVehicleName(hotelName)
        setDescription(dis)
        setAddress(address)
        setProvice(province)
        setCity(city)
        setDistrict(district)
        setNearestTown(nearestTown)
        setEmail(email)
        setPhoneNumber(phoneNumber)
        setNumberOfSeats(numberOfSeats)
        setVehicleCategory(vehicleCategory)
        setLatitude(lat)
        setLongitude(lng)
        setUrl1(pic)
        setUrl2(pic1)
      }
    }, [vehicle])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = {  vehicleName, address, city, nearestTown, email, phoneNumber, dis, province, district, vehicleCategory, numberOfSeats,  lat, lng, pic, pic1 }
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
        <DropDown label="Province" select={province} setSelect={setProvice} items={provinceList} />
        <DropDown label="District" select={district} setSelect={setDistrict} items={districtsList} />
        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent label="Email" value={email} setValue={setEmail} />
        <InputComponent label="Phone Number" value={phoneNumber} setValue={setPhoneNumber} />
        <InputComponent label="Vehicle Category" value={vehicleCategory} setValue={setVehicleCategory} />
        <InputComponent label="Number Of Seats" value={numberOfSeats} setValue={setNumberOfSeats} />
        <InputComponent type="number" label="Latitude" value={lat} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={lng} setValue={setLongitude} />
        <ImageUpload url={pic} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={pic1} setUrl={setUrl2} name="Select Image 2" />

        <InputComponent rows={5} label="Description" value={dis} setValue={setDescription} />


        <SpaceBoxComponent>
          { !isLoading && vehicle && <Button color="error" variant="contained"   onClick={deleteHotel}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button variant="contained" onClick={addOrUpdateUser}> { vehicle ? 'Update Data' : 'Insert Data'} </Button>}
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