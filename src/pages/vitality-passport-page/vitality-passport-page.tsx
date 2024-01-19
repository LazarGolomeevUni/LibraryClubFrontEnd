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
  timestamp: string;
  // include other properties of a post here
  title: string;
  text: string;
};

const VitalityPassport: React.FC = () => {
  const { user } = useContext(AuthContext) ?? {};

  const [posts, setPosts] = useState<Post[]>([]);
  const { accessToken } = useContext(AuthContext) ?? {};

  const handleDelete = async () => {
    try {
      const responsePosts = await axios({
        method: 'delete',
        url: 'http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/posts/delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (responsePosts) {
        const responseAuth = await axios({
          method: 'delete',
          url: 'http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/authentication/delete',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          data: {
            userId: `${user?.id}`,
          }
        });

        console.log(responseAuth);
      }

    } catch (error) {
      console.log("There was an error deleting your account");
    }
  }

  useEffect(() => {
    console.log(accessToken)
    const fetchPosts = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://a4f6578b7b9884b57afd42efde583b01-1167281825.eu-north-1.elb.amazonaws.com:8000/posts/everything',
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
      <div>
        <h3>{user?.username}</h3>
        <h3>{user?.age}</h3>
      </div>
      <Button onClick={handleDelete}>Delete account</Button>
      {posts.map((post) => (
        <Post key={post.id} post={post} ><Button id="post-button">Review</Button></Post> // Spread the post props to the Post component
      ))}
    </div>
  );
};

export default VitalityPassport;
