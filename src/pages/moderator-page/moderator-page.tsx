import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from "axios";
import AuthContext from '../../components/AuthContext/AuthContext';
import Post from '../../components/post/post';
import Button from '../../components/button/button';
import './moderator-page.css';

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

const Moderator: React.FC = () => {
  const { user } = useContext(AuthContext) ?? {};

  const [posts, setPosts] = useState<Post[]>([]);
  const { accessToken } = useContext(AuthContext) ?? {};
  const [id, setId] = useState<number>();

  const handleModerate = async () => {
    if (Array.isArray(posts)) {
      setId(posts[0].id)
    }
    const body = {
      id: posts[0].id,
      status: "approved"
    }
    console.log(posts)
    console.log(posts[0].id)
    console.log("body", body)
    const response = await axios.post("http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/moderator", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/moderator/queue',
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
        <Post key={post.id} post={post} ><Button id="post-button" onClick={handleModerate}>Moderate Post</Button></Post> // Spread the post props to the Post component
      ))}
      {/* {Array.isArray(posts) ?
        <Post post={posts[0]} ><Button id="post-button" onClick={handleModerate}>Moderate Post</Button></Post> : <p>No posts for moderating currently</p>} */}
    </div>
  );
};

export default Moderator;
