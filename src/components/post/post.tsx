import Button from "../button/button";
import "./post.css";
import React, { useState } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
// add { children, ...attributes }: Props
const Post = (post: any) => {
    console.log(post);
    return (
        <div className="post-contaier">
            <div className="profile-image"></div>
            <div className="post-content">
                <div >
                    <div className="post-header"><h1>{post.post.title}</h1></div>
                    <div className="post-text"><p>{post.post.text}</p></div>
                </div>
                <Button id="post-button">Review</Button>
            </div>
        </div>
    );
};

export default Post;
