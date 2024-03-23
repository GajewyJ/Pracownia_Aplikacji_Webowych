import { useEffect, useState } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Client {
  id: string;
  name: string;
}

export default function ClientsById() {
  const { id } = useParams<{ id: string }>();
  
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateClient, setUpdateClient] = useState({name: '-'});
  
  const [client, setClient] = useState<Client | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [id2, setId2] = useState('');

  
  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Client>(`http://localhost:9000/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        setClient(null);
        console.clear()
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
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
      if (!client) {
        console.error('There are no clients');
        return;
      }
  
      const clientToDelete = client;

      const response = await fetch(`http://localhost:9000/clients/${clientToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: clientToDelete.id
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
      if (!client) {
        console.error('There are no clients');
        return;
      }
  
      const clientToUpdate = client;

      let _name = updateClient.name;

      if(_name === '-'){
        _name = clientToUpdate.name
      }

      const response = await fetch(`http://localhost:9000/clients/${clientToUpdate.id}`, {
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
    setUpdateClient((prevUpdateClient) => ({ ...prevUpdateClient, [name]: value }));
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/clients/${id2}`;
  };

  if(!client){
    return(
      <section>
        <div>
          <p>Client with this ID does not exist</p>
        </div>
      </section>
    )
  }
  else{
    return (
      <section>
        <div>
          <form onSubmit={handleSearch}>
            <input type='number' name='id' placeholder='ID of client' value={id2} onChange={(e) => setId2(e.target.value)}/> 
            <input type='submit' value='Search' />
          </form>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr key={client.id}>
                <td>{client.id}.</td>
                <td>{editIndex === 1 ? <input type='text' name='name' defaultValue={client.name} placeholder='Name' onChange={handleInputChange} /> : client.name}</td>
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
