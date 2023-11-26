import React, { useContext, useEffect, useState } from 'react'
import Dropdown from '../../components/dropdown/dropdown';
import Button from '../../components/button/button';
import axios from 'axios';
import AuthContext from '../../components/AuthContext/AuthContext';
import jwtInterceptor from '../../helpers/jwt-interceptor';

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [field, setField] = useState('');
    const [consent, setConsent] = useState(false);

    const [employee, setEmployee] = useState('');
    const { user } = useContext(AuthContext) ?? {};
    const [permissions, setPermissions] = useState('');
    const [role, setRole] = useState('')
    console.log(consent);

    // API Registration things:
    // "age": 24,
    // "field": "ICT",
    // "consent": 1
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Age:', age)
        let payload = {
            username: email,
            password: password,
            age: age,
            consent: 1
        };
        let apiResponse = await axios.post("http://localhost:8000/authentication/register", payload);
        console.log(apiResponse)
    };

    const handleRole = (selectedValue: string) => {
        setRole(selectedValue)
    }
    const handlePermission = (selectedValue: string) => {
        setPermissions(selectedValue)
    }
    const handleUser = (selectedValue: string) => {
        setEmployee(selectedValue)
    }




    // TODO add call to backend
    const roles = ['Developer', 'Manager', 'User']
    const users = ['Plamen', 'Marina', 'Ivo', 'Lazar Golomeev', 'Bernard']

    const defaultPermissions = ['Control Blinds', 'Change Temperature', 'Create User', 'Manage Permissions']


    // API Registration things:
    // "age": 24,
    // "field": "ICT",
    // "consent": 1
    return (
        <div className='management-container'>
            <h2>Add a new user</h2>
            <div className='form-container'>
                <form onSubmit={handleSubmit} className="add-user-form">
                    <div className='input-container'>
                        <div className='padded-div'>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='padded-div'>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='padded-div'>
                            <label htmlFor="age">Age: </label>
                            <input
                                type="age"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className='padded-div'>
                            <label htmlFor="checkbox">Do you give your consent for the collection of data by our application?</label>
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                            />
                        </div>
                        <div id='dropdown-role'>
                            <label htmlFor="dropdown-menu">What would you like to register as? If you are not sure stay as a normal user for now and cchange it later in the profile page.</label>
                            <Dropdown content={roles} onSelectedValue={handleRole} />
                        </div>
                    </div>
                    <div id='dropdown-role'>
                        <label htmlFor="dropdown-menu">Choose a role:</label>
                        <Dropdown content={roles} onSelectedValue={handleRole} />
                    </div>
                    <Button type='submit'>Register</Button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
