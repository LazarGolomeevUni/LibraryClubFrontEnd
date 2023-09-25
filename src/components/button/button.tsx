import React, { useState } from 'react'
import './button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = ({ children, ...attributes }: Props) => {
    return (
        <button className='styled-button' {...attributes}>{children}</button>
    );
};

export default Button;
