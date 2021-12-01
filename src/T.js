import React from 'react';
import Client from 'utils/Client'

export default function T(){
    //Client.user.newUser('77','77').then(console.log())
    Client.user.newUser('7789','7789').then(console.log())
    Client.session.getAccount().then(console.log()).catch(console.log())
    //Client.session.deleteSession().then(console.log())
    //Client.session.newSession('77','77').then(console.log())

    return (
        <>
            TEST
        </>
      );
}