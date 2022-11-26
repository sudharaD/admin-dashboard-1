import { httpRequest } from "http/Http";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function FavouriteCars() {
  

  const [list, setlist] = useState([])
  
  const getUsers = async ()=>{
    const reauest = await httpRequest({ url : 'cars/fav-list', method :'get'})
    if(reauest.success){
      setlist(reauest.cars)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return <div></div>
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Favourite Cars</Card.Title>
                
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Favourite Count</th>

                    </tr>
                  </thead>
                  <tbody>
                  { list.map((l, i)=> <tr key={l.id} 
                  >
                      <td>{i + 1}</td>
                      <td> {l.vehicleName} </td>
                      <td>{l.fav.length}</td>
                    </tr> ) }
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

export default FavouriteCars;
