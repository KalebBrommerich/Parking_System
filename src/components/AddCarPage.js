import { useNavigate } from "react-router-dom";
import "../styles/AddVehicle.css";

const AddCarPage = () => {
    const navigate = useNavigate();

    const submitForm = (event) => {
        event.preventDefault();
        console.log(event.target.elements.type.value);
        console.log(event.target.elements.year.value);
        navigate('/');
    };

    return (
        <div className="main">
            <div className='header'>
                <button onClick={() => {navigate('/')}}>Cancel</button>
                <h1 style={{textAlign: 'center'}}>Add a Car</h1>
            </div>
            <div className="form-container">
                <h2>Enter Vehicle Information:</h2>
                <form onSubmit={submitForm} className="vehicle-form">
                    <label>Vehicle Type:</label>
                    <input type="text" name="type"/>
                    <br/>
                    <label>Year:</label>
                    <input type="number" name="year"/>
                    <br/>
                    <label>Liscense Plate:</label>
                    <input type="text"/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddCarPage;