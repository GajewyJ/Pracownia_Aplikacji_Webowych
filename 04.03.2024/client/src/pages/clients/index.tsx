import { useState } from 'react';
import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Client {
  id: string;
  name: string;
}

export default function Clients() {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateClient, setUpdateClient] = useState({name: '-'});

  const {
    data: clients,
    error,
    isValidating,
    mutate,
  } = useSWR<Client[]>('http://localhost:9000/clients', fetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('nameSubmit') as string;

    try {
      const response = await fetch('http://localhost:9000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name
        }),
      });

      if (response.ok) {
        mutate();
      } else {
        console.error('Failed to add new client!');
      }
    } catch (error) {
      console.error('Error adding new client:', error);
    }
  };

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className='Loading'>Loading...</div>;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };
  
  const handleDeleteClick = async (index: number) => {
    try {
      if (!clients) {
        console.error('There are no clients');
        return;
      }
  
      const clientToDelete = clients[index];

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
      setEditIndex(null);
      mutate();
    }
  };

  const handleSaveClick = async (index: number) => {
    try {
      if (!clients) {
        console.error('There are no clients');
        return;
      }
  
      const clientToUpdate = clients[index];

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
      setEditIndex(null);
      mutate();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateClient((prevUpdateClient) => ({ ...prevUpdateClient, [name]: value }));
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' name='nameSubmit' required />
          <input type='submit' value='Add new' />
        </form>
      </div>
      <div>
        <table>
          <tbody>
          {clients?.map((client, index) => (
            <tr key={client.id}>
              <td>{client.id}.</td>
              <td>{editIndex === index ? <input type='text' name='name' defaultValue={client.name} placeholder='Name' onChange={handleInputChange} /> : client.name}</td>
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
};
