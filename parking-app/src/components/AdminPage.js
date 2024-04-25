import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/AdminPage.css";

const AdminPage = () => {
    const navigate = useNavigate();
    const [pendingVehicles, setPendingVehicles] = useState([]);
    const [acceptedVehicles, setAcceptedVehicles] = useState([]);
    const [deniedVehicles, setDeniedVehicles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        // Verify admin status:
        const token = sessionStorage.getItem('token'); // get token
        generateCars(token);
    }, []);


    const  generateCars = async (token) => {
        //temp, get from token?
        //returns JSON in format pending <space> accepted <space> rejected

        try {
            const generatedVehicles = await axios.post('http://199.17.162.16:5000/api/genCarsAdmin', { token });
            
            // Clear UI:
            let pending = [];
            let accepted = [];
            let denied = [];

            console.log(generatedVehicles.data)
            JSON.parse(generatedVehicles.data).forEach(vehicle => {
                if (vehicle.status === 'pending') {
                    pending.push(<AdminVehicle key={vehicle.permitNum} username={vehicle.username} type={vehicle.make + " " + vehicle.model} liscensePlate={vehicle.plate} color={vehicle.color} state={vehicle.state} moveVehicle={moveVehicle}/>);
                } else if (vehicle.status === 'accepted') {
                    accepted.push(<AdminVehicle key={vehicle.permitNum} username={vehicle.username} type={vehicle.make + " " + vehicle.model} liscensePlate={vehicle.plate} color={vehicle.color} state={vehicle.state} accepted={true} moveVehicle={moveVehicle}/>);
                } else if (vehicle.status === 'denied') {
                    denied.push(<AdminVehicle key={vehicle.permitNum} username={vehicle.username} type={vehicle.make + " " + vehicle.model} liscensePlate={vehicle.plate} color={vehicle.color} state={vehicle.state} denied={true} moveVehicle={moveVehicle}/>)
                }
            });

            console.log(pending);

            setPendingVehicles(pending);
            setAcceptedVehicles(accepted);
            setDeniedVehicles(denied);
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
                setErrorMessage("Error: unable to reach server");
            } else  if (error.response.status === 401) {
                console.error('bad token', error.response.config.url);
                sessionStorage.removeItem('token');
                navigate('/login');
            }
            else {
                console.error('An error occurred:', error.message);
                setErrorMessage("An unexpected error occured, please try again later");
            }
        }
    }

    const moveVehicle = (vehicle) => {
        // console.log("move " + vehicle);
        // if (pendingVehicles.entries.includes(vehicle)) {
        //     console.log(includes);
        //     pendingVehicles.removeItem(vehicle);
        //     acceptedVehicles.push(vehicle);
        //     setPendingVehicles(pendingVehicles);
        //     setAcceptedVehicles(acceptedVehicles);
        // }
    }

    const logoutUser = () => {
        //remove user token and return to login
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div className='main'>
            <div className='header'>
                <h1>Welcome Admin</h1>
                <button onClick={logoutUser}>Logout</button>
            </div>

            <div className="count-container">
                <div className="car-counter">Car Count: <span style={{fontWeight: "bold"}}>{pendingVehicles.length+acceptedVehicles.length+deniedVehicles.length}</span></div>
            </div>

            <div className='vehicles-container' style={{marginTop: 0}}>
                <div className='vehicles-header'>
                    <h1 style={{textAlign: 'center'}}>Pending Vehicles:</h1>
                </div>

                <p className="errorMessage" style={{display: (errorMessage !== "") ? 'block' : 'none'}}>{errorMessage}</p>
                {pendingVehicles}
            </div>

            <div className="accepted-denied-container">
                <div className="vehicles-container">
                    <div className='vehicles-header' style={{textAlign: 'center'}}>
                        <h1>Accepted Vehicles:</h1>
                    </div>

                    {acceptedVehicles}
                </div>
                <div className="vehicles-container">
                    <div className='vehicles-header' style={{textAlign: 'center'}}>
                        <h1>Denied Vehicles:</h1>
                    </div>

                    {deniedVehicles}
                </div>
            </div>

        </div>
    );
}

const AdminVehicle = ({username, type, liscensePlate, color, state, permitNum, accepted, denied, moveVehicle}) => {
    const acceptVehicle = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const generatedVehicles = await axios.post('http://199.17.162.16:5000/api/accept', { token, user: username, plate: liscensePlate });
            window.location.reload();
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
            } else  if (error.response.status === 401) {
                console.error('bad token', error.response.config.url);
            }
            else {
                console.error('An error occurred:', error.message);
            }
        }
    }

    //
    const rejectVehicle = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const generatedVehicles = await axios.post('http://199.17.162.16:5000/api/reject', { token, user: username, plate: liscensePlate });
            window.location.reload();
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
            } else  if (error.response.status === 401) {
                console.error('bad token', error.response.config.url);
            }
            else {
                console.error('An error occurred:', error.message);
            }
        }
    }

    return (
        <div className='admin-vehicle'>
            <div className='car-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <p className='vehicle-type'>{username} | {type} | {liscensePlate} | {color} | {state} </p>
            { // remove accept button
                !accepted ? 
                    <div className='approve-button' onClick={acceptVehicle}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div> : <></>
            }
            
            { // remove deny button
                !denied ? 
                    <div className='deny-button' onClick={rejectVehicle} style={{fontSize: 20, fontWeight: "bold"}}>
                        X
                    </div> : <></>
            }
        </div>
    );
}

export default AdminPage;