import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Post from '../../components/post/post';
import axios from 'axios';
import './home-page.css';
import AuthContext from '../../components/AuthContext/AuthContext';
import PopUp from '../../components/pop-up/pop-up';
import Button from '../../components/button/button';

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
    const handleReview = () => {
        console.log("REVIEW")
    }
    

    useEffect(() => {
        console.log(accessToken)
        const fetchPosts = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/posts/all',
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
                <Post key={post.id} post={post} ><PopUp trigger={<Button id="post-button">Review</Button>} /></Post> // Spread the post props to the Post component
            ))}
        </div>
    );
};

export default Home;
