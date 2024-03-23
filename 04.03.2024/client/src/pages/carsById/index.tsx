import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { useParams } from "react-router-dom"

interface Car {
  id: number;
  brand: string;
  model: string;
  productionYear: number;
  registrationNumber: string;
  dealer: number;
}

export default function CarsById(){
  const { id } = useParams<{ id: string }>();

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateCar, setUpdateCar] = useState({brand: '-', model: '-', year: 0, registration: '-'});

  const [car, setCar] = useState<Car | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [id2, setId2] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Car>(`http://localhost:9000/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        setCar(null);
        console.clear()
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [id, editIndex]);

  if (isLoading) {
    return(
      <section>
        <div>Loading data...</div>
      </section>
    );
  }

  const handleEditClick = () => {
    setEditIndex(1);
  };
  
  const handleDeleteClick = async () => {
    try {
      if (!car) {
        console.error('There are no cars');
        return;
      }
  
      const carToDelete = car;

      const response = await fetch(`http://localhost:9000/cars/${carToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: carToDelete.id
        }),
      });
  
      if (!response.ok) {
        console.error('Error.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEditIndex(prev => prev !== null ? null : 0);
    }
  };

  const handleSaveClick = async () => {
    try {
      if (!car) {
        console.error('There are no cars');
        return;
      }
  
      const carToUpdate = car;

      let _brand = updateCar.brand;
      let _model = updateCar.model;
      let _year = updateCar.year;
      let _registration = updateCar.registration;

      if(_brand === '-'){
        _brand = carToUpdate.brand
      }
      if(_model === '-'){
        _model = carToUpdate.model
      }
      if(_year === 0){
        _year = carToUpdate.productionYear
      }
      if(_registration === '-'){
        _registration = carToUpdate.registrationNumber
      }

      const response = await fetch(`http://localhost:9000/cars/${carToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: _brand,
          model: _model,
          productionYear: _year,
          registrationNumber: _registration
        }),
      });
  
      if (!response.ok) {
        console.error('Error.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEditIndex(prev => prev !== null ? null : 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name == 'year'){
      setUpdateCar((prevUpdateCar) => ({ ...prevUpdateCar, [name]: parseInt(value) }));
    }
    else{
      setUpdateCar((prevUpdateCar) => ({ ...prevUpdateCar, [name]: value }));
    }
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/cars/${id2}`;
  };

  if(!car){
    return(
      <section>
        <div>
          <p>Car with this ID does not exist</p>
        </div>
      </section>
    )
  }
  else{
    return (
      <section>
        <div>
          <form onSubmit={handleSearch}>
            <input type='number' name='id' placeholder='ID of car' value={id2} onChange={(e) => setId2(e.target.value)}/> 
            <input type='submit' value='Search' />
          </form>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Production Year</th>
                <th>Registration Number</th>
                <th>Dealer's ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr key={car.id}>
                <td>{car.id}.</td>
                <td>{editIndex === 1 ? <input type='text' name='brand' defaultValue={car.brand} placeholder='Brand' onChange={handleInputChange} /> : car.brand}</td>
                <td>{editIndex === 1 ? <input type='text' name='model' defaultValue={car.model} placeholder='Model' onChange={handleInputChange} /> : car.model}</td>
                <td>{editIndex === 1 ? <input type='number' name='year' defaultValue={String(car.productionYear)} placeholder='Production Year' onChange={handleInputChange}/> : car.productionYear}</td>
                <td>{editIndex === 1 ? <input type='text' name='registration' defaultValue={car.registrationNumber} placeholder='Registration Number' onChange={handleInputChange}/> : car.registrationNumber}</td>
                <td>{car.dealer}</td>
                <td className='td1'>
                  {editIndex === 1 ? (
                    <button onClick={() => handleSaveClick()}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick()}>Edit</button>
                  )}
                </td>
                <td className='td2'><button onClick={() => handleDeleteClick()}>Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}