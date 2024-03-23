import { useState, useEffect } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Dealer {
  id: Number;
  name: string;
  adress: Number;
}

export default function DealersById() {
  const { id } = useParams<{ id: string }>();
  
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateDealer, setUpdateDealer] = useState({name: '-'});

  const [dealer, setDealer] = useState<Dealer | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [id2, setId2] = useState('');
  
  useEffect(() => {
    const fetchDealer = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Dealer>(`http://localhost:9000/dealers/${id}`);
        setDealer(response.data);
      } catch (error) {
        setDealer(null);
        console.clear()
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealer();
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
      if (!dealer) {
        console.error('There are no dealers');
        return;
      }
  
      const dealerToDelete = dealer;

      const response = await fetch(`http://localhost:9000/dealers/${dealerToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: dealerToDelete.id
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
      if (!dealer) {
        console.error('There are no dealers');
        return;
      }
  
      const dealerToUpdate = dealer;

      let _name = updateDealer.name;

      if(_name === '-'){
        _name = dealerToUpdate.name
      }

      const response = await fetch(`http://localhost:9000/dealers/${dealerToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: _name
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
    if(name == 'adress'){
      setUpdateDealer((prevUpdateDealer) => ({ ...prevUpdateDealer, [name]:  parseInt(value) }));
    }
    else{
      setUpdateDealer((prevUpdateDealer) => ({ ...prevUpdateDealer, [name]: value }));
    }
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/dealers/${id2}`;
  };

  if(!dealer){
    return(
      <section>
        <div>
          <p>Dealer with this ID does not exist</p>
        </div>
      </section>
    )
  }
  else{
    return (
      <section>
        <div>
          <form onSubmit={handleSearch}>
            <input type='number' name='id' placeholder='ID of dealer' value={id2} onChange={(e) => setId2(e.target.value)}/> 
            <input type='submit' value='Search' />
          </form>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Adresses ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr key={Number(dealer.id)}>
                <td>{String(dealer.id)}.</td>
                <td>{editIndex === 1 ? <input type='text' name='name' defaultValue={dealer.name} placeholder='Name' onChange={handleInputChange} /> : dealer.name}</td>
                <td>{String(dealer.adress)}</td>
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
