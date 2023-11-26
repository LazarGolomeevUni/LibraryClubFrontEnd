import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Post from '../../components/post/post';
import axios from 'axios';

import AuthContext from '../../components/AuthContext/AuthContext';
import Button from '../../components/button/button';
import './create-page.css'

type Post = {
    id: number;
    userID: number;
    moderatorId: number;
    status: string;
    timestamp: string;
    // include other properties of a post here
    title: string;
    text: string;
};

const Create = () => {


    return (
        <div className="post-contaier">
            <div className="profile-image"></div>
            <div className="post-content">

                <input type="text" className="create-header" />
                <textarea className="create-text" />

                <Button id="post-button">Post</Button>
            </div>
        </div>
    );
};

export default Create;
