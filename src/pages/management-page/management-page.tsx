import React, { useContext, useEffect, useState } from 'react'
import './management-page.css'
import Dropdown from '../../components/dropdown/dropdown';
import Button from '../../components/button/button';
import axios from 'axios';
import AuthContext from '../../components/AuthContext/AuthContext';
import jwtInterceptor from '../../helpers/jwt-interceptor';

interface MyObject {
    id: number;
    name: string;
}


const getPermissions = async (callback: any) => {
    const permissions = await axios.get("http://localhost:8090/permissions/", {
        withCredentials: true,
    })
    callback(permissions);
    console.log(permissions)
}

const Management = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [employee, setEmployee] = useState('');
    const { user } = useContext(AuthContext) ?? {};
    const [permissions, setPermissions] = useState('');
    const [role, setRole] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:')
        let payload = {
            username: email,
            passwordHash: password,
            role: role.toUpperCase()
        };
        let apiResponse = await axios.post("http://localhost:8090/auth/register", payload, {
            withCredentials: true,
        });
        console.log(apiResponse)
    };

    useEffect(() => {
        axios
            .get("http://localhost:8090/permissions/", { withCredentials: true })
            .then((response) => {

                const results = response.data;

                console.log(results);
                console.log(permissions)
            });
    }, []);

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
                    </div>
                    <div id='dropdown-role'>
                        <label htmlFor="dropdown-menu">Choose a role:</label>
                        <Dropdown content={roles} onSelectedValue={handleRole} />
                    </div>
                    <Button type='submit'>Add a new user</Button>
                </form>


            </div>
            <h2>Users and Permissions</h2>
            <div className='permissions-container'>
                <div className='permissions-item'>
                    <label htmlFor="dropdown-menu"> Choose a user: </label>
                    <Dropdown content={users} onSelectedValue={setEmployee} />
                    <Button type='submit'>Delete Selected User</Button>
                </div>
                <div className='permissions-item'>
                    <label htmlFor="dropdown-menu"> Active permissions: </label>
                    <Dropdown content={defaultPermissions} onSelectedValue={setPermissions} />
                    <Button type='submit'>Take User Permission</Button>
                </div>
                <div className='permissions-item'>
                    <label htmlFor="dropdown-menu"> Inactive permissions: </label>
                    <Dropdown content={defaultPermissions} onSelectedValue={setPermissions} />
                    <Button type='submit'>Give User permission</Button>
                </div>
            </div>
            <div className='actions'>
            </div>
        </div>
    );
};

export default Management;
