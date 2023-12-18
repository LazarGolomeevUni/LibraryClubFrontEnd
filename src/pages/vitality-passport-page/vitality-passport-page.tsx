import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import './vitality-passport-page.css';
import axios from "axios";
import AuthContext from '../../components/AuthContext/AuthContext';
import Post from '../../components/post/post';
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

const VitalityPassport: React.FC = () => {
  const { user } = useContext(AuthContext) ?? {};

  const [posts, setPosts] = useState<Post[]>([]);
  const { accessToken } =useContext(AuthContext) ?? {};
  
  const empruFunc = () => {

  }

  useEffect(() => {
      console.log(accessToken)
      const fetchPosts = async () => {
          try {
              const response = await axios({
                  method: 'get',
                  url: 'http://localhost:8000/posts/everything',
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
  }, [accessToken]);

  return (
    <div id='home-page-container'>
      {posts.map((post) => (
        <Post key={post.id} post={post} ><Button id="post-button">Review</Button></Post> // Spread the post props to the Post component
      ))}
    </div>
  );
};

export default VitalityPassport;
