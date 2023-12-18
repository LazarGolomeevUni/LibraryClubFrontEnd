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

    const { accessToken } = useContext(AuthContext) ?? {};
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");


    const handlePostCreation = async () => {
        const body = {
            title,
            text
        }
        try {
            const response = await axios.post("http://localhost:8000/posts/messaging", body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // Handle the response here, maybe clear the form or give user feedback
        } catch (error) {
            // Handle error here
            console.error('Error posting message:', error);
        }
    }

    return (
        <div className="post-contaier">
            <div className="profile-image"></div>
            <div className="post-content">

            <input
                    type="text"
                    className="create-header"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Set the title here
                />
                <textarea
                    className="create-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)} // Set the text here
                />

                <Button id="post-button" onClick={handlePostCreation}>Post</Button>
            </div>
        </div>
    );
};

export default Create;
