import Button from "../button/button";
import "./post.css";
import React, { useState } from 'react'

interface PostProps {
    post: {
        title: string;
        text: string;
    };
    children?: React.ReactNode; // Make children optional if not always passed
}

// Deconstruct props correctly
const Post = ({ post, children }: PostProps) => {
    return (
        <div className="post-contaier">
            <div className="profile-image"></div>
            <div className="post-content">
                <div >
                    <div className="post-header"><h1>{post.title}</h1></div>
                    <div className="post-text"><p>{post.text}</p></div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Post;
