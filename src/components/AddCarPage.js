import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
//import "../styles/AddVehicle.css";

const AddCarPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Verify user status:
        const username = sessionStorage.getItem('username'); // get username

        if (!username) {
            navigate('/login');
        }
    }, []);

    const submitForm = async (event) => {
        event.preventDefault();
        const make = event.target.elements.make.value;
        const model = event.target.elements.model.value;
        const color = event.target.elements.color.value;
        const plate = event.target.elements.plate.value;
        const state = event.target.elements.state.value;
        const permitNum = 100;
        const token = sessionStorage.getItem('token');

        try {
            const addCar = await axios.post('http://localhost:5000/api/add', { token, make, model, color, plate, state, permitNum });
            console.log(addCar);
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Endpoint not found:', error.response.config.url);
            } else if (error.response.status === 401) {
                console.error('Error', error.response.data.message);
                const message = error.response.data.message;
                if (message === "Invalid token") {
                    sessionStorage.removeItem('token');
                    navigate('/login');
                } else if (message === "Duplicate entry") {
                    setErrorMessage("Error: This car already exists, you cannot create a duplicate")
                }
            } else if (error.response.status === 403) {
                console.log('duplicate entry');
            }
            else {
                console.error('An error occurred:', error.message);
            }
        }

        //navigate('/');
    };

    return (
        <div className="main">
            <div className='header'>
                <button onClick={() => {navigate('/')}}>Cancel</button>
                <h1 style={{textAlign: 'center'}}>Add a Vehicle</h1>
            </div>
            <div className="container">
                <h2>Enter Vehicle Information:</h2>
                <form onSubmit={submitForm} className="vehicle-form">
                    <p className="errorMessage" style={{display: (errorMessage !== "") ? 'block' : 'none'}}>{errorMessage}</p>
                    <label>Make:</label>
                    <input type="text" name="make" required/>
                    <br/>
                    <label>Model:</label>
                    <input type="text" name="model" required/>
                    <br/>
                    <label>Color:</label>
                    <input type="text" name="color" required/>
                    <br/>
                    <label>Liscense Plate:</label>
                    <input type="text" name="plate" required/>
                    <br/>
                    <label>State:</label>
                    <input type="text" name="state" required/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddCarPage;