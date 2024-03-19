import { useState } from 'react';
import './index.scss';
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Car {
  id: number;
  brand: string;
  model: string;
  productionYear: number;
  registrationNumber: string;
  dealer: number;
}

export default function Cars() {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateCar, setUpdateCar] = useState({brand: '-', model: '-', year: 0, registration: '-'});

  const {
    data: cars,
    error,
    isValidating,
    mutate,
  } = useSWR<Car[]>('http://localhost:9000/cars', fetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const brand = formData.get('submitBrand') as string;
    const model = formData.get('submitModel') as string;
    const productionYear = parseInt(formData.get('submitProductionYear') as string);
    const dealer = parseInt(formData.get('submitDealer') as string);
    const registrationNumber = formData.get('submitRegistrationNumber') as string;

    try {
      const response = await fetch('http://localhost:9000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand,
          model,
          productionYear,
          registrationNumber,
          dealer
        }),
      });

      if (response.ok) {
        mutate();
      } else {
        console.error('Failed to add new car!');
      }
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className='Loading'>Loading...</div>;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };
  
  const handleDeleteClick = async (index: number) => {
    try {
      if (!cars) {
        console.error('There are no cars');
        return;
      }
  
      const carToDelete = cars[index];

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
      setEditIndex(null);
      mutate();
    }
  };

  const handleSaveClick = async (index: number) => {
    try {
      if (!cars) {
        console.error('There are no cars');
        return;
      }
  
      const carToUpdate = cars[index];

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
      setEditIndex(null);
      mutate();
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

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Brand' name='submitBrand' required />
          <input type='text' placeholder='Model' name='submitModel' required />
          <input type='number' placeholder='Year' name='submitProductionYear' required />
          <input type='text' placeholder='Registration Number' name='submitRegistrationNumber' />
          <input type='number' placeholder='Dealer Id' name='submitDealer' />
          <input type='submit' value='Add new' />
        </form>
      </div>
      <div>
        <table>
          <tbody>
          {cars?.map((car, index) => (
            <tr key={car.id}>
              <td>{car.id}.</td>
              <td>{editIndex === index ? <input type='text' name='brand' defaultValue={car.brand} placeholder='Brand' onChange={handleInputChange} /> : car.brand}</td>
              <td>{editIndex === index ? <input type='text' name='model' defaultValue={car.model} placeholder='Model' onChange={handleInputChange} /> : car.model}</td>
              <td>{editIndex === index ? <input type='number' name='year' defaultValue={String(car.productionYear)} placeholder='Production Year' onChange={handleInputChange}/> : car.productionYear}</td>
              <td>{editIndex === index ? <input type='text' name='registration' defaultValue={car.registrationNumber} placeholder='Registration Number' onChange={handleInputChange}/> : car.registrationNumber}</td>
              <td>{car.dealer}</td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSaveClick(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                )}
              </td>
              <td><button onClick={() => handleDeleteClick(index)}>Delete</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
