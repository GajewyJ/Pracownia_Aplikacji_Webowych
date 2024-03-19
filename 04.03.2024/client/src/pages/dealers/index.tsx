import { useState } from 'react';
import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Dealer {
  id: Number;
  name: string;
  adress: Number;
}

export default function Dealers() {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateDealer, setUpdateDealer] = useState({name: '-'});

  const {
    data: dealers,
    error,
    isValidating,
    mutate,
  } = useSWR<Dealer[]>('http://localhost:9000/dealers', fetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('nameSubmit') as string;
    const adress = parseInt(formData.get('adressSubmit') as string);

    try {
      const response = await fetch('http://localhost:9000/dealers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          adress
        }),
      });

      if (response.ok) {
        mutate();
      } else {
        console.error('Failed to add new dealer!');
      }
    } catch (error) {
      console.error('Error adding new dealer:', error);
    }
  };

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className='Loading'>Loading...</div>;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };
  
  const handleDeleteClick = async (index: number) => {
    try {
      if (!dealers) {
        console.error('There are no dealers');
        return;
      }
  
      const dealerToDelete = dealers[index];

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
      setEditIndex(null);
      mutate();
    }
  };

  const handleSaveClick = async (index: number) => {
    try {
      if (!dealers) {
        console.error('There are no dealers');
        return;
      }
  
      const dealerToUpdate = dealers[index];

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
      setEditIndex(null);
      mutate();
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

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' name='nameSubmit' required />
          <input type='number' placeholder='Adress Id' name='adressSubmit' required />
          <input type='submit' value='Add new' />
        </form>
      </div>
      <div>
        <table>
          <tbody>
          {dealers?.map((dealer, index) => (
            <tr key={Number(dealer.id)}>
              <td>{String(dealer.id)}.</td>
              <td>{editIndex === index ? <input type='text' name='name' defaultValue={dealer.name} placeholder='Name' onChange={handleInputChange} /> : dealer.name}</td>
              <td>{String(dealer.adress)}</td>
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
