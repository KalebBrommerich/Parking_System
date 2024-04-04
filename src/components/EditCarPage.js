import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditCarPage = () => {
    // get edit data:
    const location = useLocation();
    const data = location.state;

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
        const token = sessionStorage.getItem('token');

        try {
            const editCar = await axios.post('http://localhost:5000/api/update', { token, make, model, color, plate, state, originalLiscense: data.plate });
            console.log(editCar);
            navigate('/');
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
    };

    return (
        <div className="main">
            <div className='header'>
                <button onClick={() => {navigate('/')}}>Cancel</button>
                <h1 style={{textAlign: 'center'}}>Edit a Vehicle</h1>
            </div>
            <div className="container">
                <h2>Enter Vehicle Information:</h2>
                <form onSubmit={submitForm} className="vehicle-form">
                    <p className="errorMessage" style={{display: (errorMessage !== "") ? 'block' : 'none'}}>{errorMessage}</p>
                    <label>Make:</label>
                    <input type="text" name="make" defaultValue={data.make} required/>
                    <br/>
                    <label>Model:</label>
                    <input type="text" name="model" defaultValue={data.model} required/>
                    <br/>
                    <label>Color:</label>
                    <input type="text" name="color" defaultValue={data.color} required/>
                    <br/>
                    <label>Liscense Plate:</label>
                    <input type="text" name="plate" defaultValue={data.plate} required/>
                    <br/>
                    <label>State:</label>
                    <input type="text" name="state" defaultValue={data.state} required/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditCarPage;