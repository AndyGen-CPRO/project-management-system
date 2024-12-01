import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../utils/auth';
import './Inbox.css' ;









const InboxPage = ()  => {


    return(
        <div class = "column">
            
            <div class = "Inbox">
            <h1>Inbox</h1>

            </div>

            <div>
                <h1>send</h1>
            </div>


        </div>
    )

}


export default InboxPage