import React from 'react';
import { DEPARTMENTS } from '../../Constant';


import {Card, ListGroup, CardSubtitle, CardTitle, CardText, ListGroupItem, CardBody} from 'reactstrap';


const RDashItem = ({
  candprofile: {
       name, email, mobile, exp, dept, quali, posi
        },        
}) => {
  return (
    
    
    <div>
    <Card> 
    <CardBody>
                <CardTitle > DOCTOR DETAILS </CardTitle>
                <CardSubtitle> </CardSubtitle>  
                <CardText>
                  <ListGroup>
                  
                      <ListGroupItem className='bg-lime-300'> {name} </ListGroupItem>                                    
                      <ListGroupItem> {quali}  </ListGroupItem>
                      <ListGroupItem> {posi}  </ListGroupItem>
                      <ListGroupItem className='bg-orange-300'> {DEPARTMENTS.filter(e => e.key.toString() === dept.toString()).map(e => e.label)[0]}  </ListGroupItem>
                      <ListGroupItem>  {exp} Years of Experience  </ListGroupItem>
                  </ListGroup>
                  </CardText>
                  </CardBody>   
    </Card>    

      </div>
  );
};

export default RDashItem;
