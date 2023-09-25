import React, { useState } from 'react'
import Slider from '@mui/material/Slider'
import './room-control-page.css'
import PopUp from '../../components/pop-up/pop-up';

const RoomControl = () => {

    const marks = [
        { value: 1, label: "Closed" },
        { value: 2, label: "Half-Way" },
        { value: 3, label: "Opened" }

    ]

    return (
        <div className='blinds-container'>
            <h3>Blinds control</h3>
            <PopUp trigger={<Slider
                defaultValue={3}
                step={1}
                marks={marks}
                min={1}
                max={3}
                className='blinds-slider'
            />} />

        </div>
    );
};

export default RoomControl;
