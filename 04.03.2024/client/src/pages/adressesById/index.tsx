import { useState, useEffect} from 'react';
import './index.scss'
import axios from 'axios';
import { useParams } from "react-router-dom"

interface Adress {
  id: string;
  adress: string;
}

export default function AdressesById() {
  const { id } = useParams<{ id: string }>();
  
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateAdress, setUpdateAdress] = useState({adress: '-'});

  const [adress, setAdress] = useState<Adress | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [id2, setId2] = useState('');

  useEffect(() => {
    const fetchAdress = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Adress>(`http://localhost:9000/adresses/${id}`);
        setAdress(response.data);
      } catch (error) {
        setAdress(null);
        console.clear()
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdress();
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
      if (!adress) {
        console.error('There are no adresses');
        return;
      }
  
      const adressToDelete = adress;

      const response = await fetch(`http://localhost:9000/adresses/${adressToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: adressToDelete.id
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
      if (!adress) {
        console.error('There are no adresses');
        return;
      }
  
      const adressToUpdate = adress;

      let _adress = updateAdress.adress;

      if(_adress === '-'){
        _adress = adressToUpdate.adress
      }

      const response = await fetch(`http://localhost:9000/adresses/${adressToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adress: _adress
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
    setUpdateAdress((prevUpdateAdress) => ({ ...prevUpdateAdress, [name]: value }));
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/adresses/${id2}`;
  };

  if(!adress){
    return(
      <section>
        <div>
          <p>Adress with this ID does not exist</p>
        </div>
      </section>
    )
  }
  else{
    return (
      <section>
        <div>
          <form onSubmit={handleSearch}>
            <input type='number' name='id' placeholder='ID of adress' value={id2} onChange={(e) => setId2(e.target.value)}/> 
            <input type='submit' value='Search' />
          </form>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Adress</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr key={adress.id}>
                <td>{adress.id}.</td>
                <td>{editIndex === 1 ? <input type='text' name='adress' defaultValue={adress.adress} placeholder='Adress' onChange={handleInputChange} /> : adress.adress}</td>
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
};
