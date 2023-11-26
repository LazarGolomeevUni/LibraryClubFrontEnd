import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Post from '../../components/post/post';
import axios from 'axios';
import './home-page.css';
import AuthContext from '../../components/AuthContext/AuthContext';

type Post = {
    id: number;
    userID: number;
    moderatorId: number;
    status: string;
    timestamp:string;
    // include other properties of a post here
    title: string;
    text: string;
  };

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const { accessToken } =useContext(AuthContext) ?? {};
    

    useEffect(() => {
        console.log(accessToken)
        const fetchPosts = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:8000/posts/all',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                setPosts(response.data); // Save the posts in state
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Handle error (e.g., set an error state, show notification)
            }
        };

        if (accessToken) {
            fetchPosts();
        }
    }, [accessToken]); // The useEffect hook will run whenever the accessToken changes

    return (
        <div id='home-page-container'>
            {posts.map((post) => (
                <Post key={post.id} post={post}/> // Spread the post props to the Post component
            ))}
        </div>
    );
};

export default Home;
