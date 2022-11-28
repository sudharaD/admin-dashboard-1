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

const TravelEquipment = () => {
    
    const [equipments, setEquipments] = useState([])
    const [equipment, setEquipment] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)

    const identifyEquipment = (id)=>{
      const specificEquipment = equipments.find((eqp)=> eqp.id === id)
      setEquipment(specificEquipment)
    }
  
    useEffect(() => {
      getEquipmentData()
    }, [dataUpdateToggle])

    const getEquipmentData = async()=>{
      setIsLoading(true)
      const response = await getAllData("equipments")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setEquipments(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }

  return (
    <Container fluid>
      {/* new users */}
      <ModalComponent setItem={setEquipment} open={open} setOpen={setOpen} name="Equipment Rent Shop Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} equipment={equipment} setOpen={setOpen} setEquipment={setEquipment} />
      </ModalComponent>

      {/* list of users */}
      <ListSection equipments={equipments} setOpen={setOpen} identifyEquipment={identifyEquipment} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const { setEquipment, setOpen, equipment, dataUpdateToggle, setDataUpdateToggle} = props

    const [equipmentName, setEquipmentName] = useState("")
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
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")

    useEffect(()=>{
      if(equipment){
        const { equipmentName, description, city, province, nearestTown, email, phoneNumber , district, address, latitude, longitude, url, url2 } = equipment
        setEquipmentName(equipmentName)
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
    }, [])

    const addOrUpdateEquipmentShop = async()=>{
      setIsLoading(true)
      const doc = { equipmentName, description, city, province, nearestTown, email, phoneNumber , district, address,  latitude, longitude, url, url2 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!equipment){
      await addData("equipments", doc)
      }else{
        await updateData('equipments', equipment.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setEquipment(null)
    }


    const deleteEqipment = async()=>{
      if(equipment){
        setIsLoading(true)
        await deleteData('equipments', equipment.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setEquipment(null)

    }

    return (
      <div>
        <InputComponent label="Equipment Name" value={equipmentName} setValue={setEquipmentName} />
        <InputComponent label="Address" value={address} setValue={setAddress} />
        <InputComponent label="Description" value={description} setValue={setDescription} />
        <InputComponent label="Province" value={province} setValue={setProvice} />
        <InputComponent label="District" value={district} setValue={setDistrict} />
        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent label="Email" value={email} setValue={setEmail} />
        <InputComponent label="Phone Number" value={phoneNumber} setValue={setPhoneNumber} />
        <InputComponent label="Latitude" value={latitude} setValue={setLatitude} />
        <InputComponent label="Longitude" value={longitude} setValue={setLongitude} />
        <ImageUpload url={url} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={url2} setUrl={setUrl2} name="Select Image 2" />

         <SpaceBoxComponent>
          { !isLoading && equipment && <Button color="secondary" onClick={deleteEqipment}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button onClick={addOrUpdateEquipmentShop}> { equipment ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  equipments, setOpen, identifyEquipment } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyEquipment(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { equipments.map((equipment, index)=> <CardComponent editHandler={editHandler} key={equipment.id} {...equipment} />
         ) }
      </div>
    )
}

export default TravelEquipment