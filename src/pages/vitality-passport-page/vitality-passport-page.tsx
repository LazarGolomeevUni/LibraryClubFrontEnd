import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import './vitality-passport-page.css';
import axios from "axios";
import AuthContext from '../../components/AuthContext/AuthContext';

const VitalityPassport: React.FC = () => {
  const { user } = useContext(AuthContext) ?? {};

  const [firstName, setFirstName] = useState("[First Name]");
  const [temperature, setTemperature] = useState(22);
  const [deskHeight, setDeskHeight] = useState(30);
  
  const [firstNameInput, setFirstNameInput] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [heightInput, setHeightInput] = useState("");

  const handleSave = () => {
    if (tempInput !== "") {
      setTemperature(parseFloat(tempInput));
    }
    if (heightInput !== "") {
      setDeskHeight(parseFloat(heightInput));
    }
    if (firstNameInput !== "") {
      setFirstName(firstNameInput);
    }
    setTempInput("");
    setHeightInput("");
    setFirstNameInput("");
  };

  return (
    <div className="passport-container">
      <p></p>
      <h1 className="title">Vitality Passport</h1>
      <p className="description">
        The Vitality Passport is used to store and edit personal information and preferences.
      </p>
      <div className="section">
        <h2 className="section-title">Personal Information</h2>
        <p>Username: {user?.username}</p>
        <p>Name: {firstName}</p>
        <input type="text" className="textbox" value={firstNameInput} onChange={(e) => setFirstNameInput(e.target.value)} />
        <button className="edit-button" onClick={handleSave}>Edit</button>
      </div>
      <div className="section">
        <h2 className="section-title">Preferences</h2>
        <p>Desk Height: {deskHeight}</p>
        <input type="text" className="textbox" value={heightInput} onChange={(e) => setHeightInput(e.target.value)} />
        <p>Preferred Room Temperature: {temperature}</p>
        <input type="text" className="textbox" value={tempInput} onChange={(e) => setTempInput(e.target.value)} />
        <p></p>
        <button className="edit-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default VitalityPassport;
