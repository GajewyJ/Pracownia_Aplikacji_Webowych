import { useState } from 'react';
import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Adress {
  id: string;
  adress: string;
}

export default function Adresses() {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateAdress, setUpdateAdress] = useState({adress: '-'});

  const {
    data: adresses,
    error,
    isValidating,
    mutate,
  } = useSWR<Adress[]>('http://localhost:9000/adresses', fetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const adress = formData.get('adressSubmit') as string;

    try {
      const response = await fetch('http://localhost:9000/adresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adress
        }),
      });

      if (response.ok) {
        mutate();
      } else {
        console.error('Failed to add new adress!');
      }
    } catch (error) {
      console.error('Error adding new adress:', error);
    }
  };

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className='Loading'>Loading...</div>;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };
  
  const handleDeleteClick = async (index: number) => {
    try {
      if (!adresses) {
        console.error('There are no adresses');
        return;
      }
  
      const adressToDelete = adresses[index];

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
      setEditIndex(null);
      mutate();
    }
  };

  const handleSaveClick = async (index: number) => {
    try {
      if (!adresses) {
        console.error('There are no adresses');
        return;
      }
  
      const adressToUpdate = adresses[index];

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
      setEditIndex(null);
      mutate();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateAdress((prevUpdateAdress) => ({ ...prevUpdateAdress, [name]: value }));
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Adress' name='adressSubmit' required />
          <input type='submit' value='Add new' />
        </form>
      </div>
      <div>
        <table>
          <tbody>
          {adresses?.map((adress, index) => (
            <tr key={adress.id}>
              <td>{adress.id}.</td>
              <td>{editIndex === index ? <input type='text' name='adress' defaultValue={adress.adress} placeholder='Adress' onChange={handleInputChange} /> : adress.adress}</td>
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
