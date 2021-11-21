import React, { useState } from 'react';
import { Tab, Tabs, Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import Client from 'utils/Client'
import { SingIn } from 'components';
import { SingUp } from 'components';

export function UserForm({setUser}) {
    return (    
        <Container>   
            <Tabs
            defaultActiveKey="SingIn"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            >
                <Tab eventKey="SingIn" title="SingIn">
                    <SingIn setUser={setUser}/>
                </Tab>
                <Tab eventKey="SingUp" title="SingUp">
                    <SingUp setUser={setUser}/>
                </Tab>
            </Tabs>    
        </Container>     
    )
}

UserForm.prototype ={ 
    setUser: PropTypes.func.isRequired
}