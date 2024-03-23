import { useState } from 'react';
import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Sale {
  id: string;
  client: number;
  price: number;
  dealer: number;
}

export default function Sales() {
  const [id, setId] = useState('');

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateSale, setUpdateSale] = useState({price: 0});

  const {
    data: sales,
    error,
    isValidating,
    mutate,
  } = useSWR<Sale[]>('http://localhost:9000/sales', fetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const client = Number(formData.get('clientSubmit') as string);
    const price = Number(formData.get('priceSubmit') as string);
    const dealer = Number(formData.get('dealerSubmit') as string);

    try {
      const response = await fetch('http://localhost:9000/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client,
          price,
          dealer
        }),
      });

      if (response.ok) {
        mutate();
      } else {
        console.error('Failed to add new sale!');
      }
    } catch (error) {
      console.error('Error adding new sale:', error);
    }
  };

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className='Loading'>Loading...</div>;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };
  
  const handleDeleteClick = async (index: number) => {
    try {
      if (!sales) {
        console.error('There are no sales');
        return;
      }
  
      const saleToDelete = sales[index];

      const response = await fetch(`http://localhost:9000/sales/${saleToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: saleToDelete.id
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
      if (!sales) {
        console.error('There are no sales');
        return;
      }
  
      const saleToUpdate = sales[index];

      let _price = updateSale.price;

      if(_price === 0){
        _price = saleToUpdate.price
      }

      const response = await fetch(`http://localhost:9000/sales/${saleToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: _price
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
    setUpdateSale((prevUpdateSale) => ({ ...prevUpdateSale, [name]: parseFloat(value) }));
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/sales/${id}`;
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSearch}>
          <input type='number' name='id' placeholder='ID of sale' value={id} onChange={(e) => setId(e.target.value)}/> 
          <input type='submit' value='Search' />
        </form>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='number' placeholder='Client Id' name='clientSubmit' required />
          <input type='number' placeholder='Price' name='priceSubmit' step='0.01' required />
          <input type='number' placeholder='Dealer Id' name='dealerSubmit' required />
          <input type='submit' value='Add new' />
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client's ID</th>
              <th>Price</th>
              <th>Dealer's ID</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {sales?.map((sale, index) => (
            <tr key={Number(sale.id)}>
              <td>{String(sale.id)}.</td>
              <td>{sale.client}</td>
              <td>{editIndex === index ? <input type='number' name='price' defaultValue={sale.price} placeholder='Price' onChange={handleInputChange} step='0.01'/> : sale.price + " zł"}</td>
              <td>{sale.dealer}</td>
              <td className='td1'>
                {editIndex === index ? (
                  <button onClick={() => handleSaveClick(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                )}
              </td>
              <td className='td2'><button onClick={() => handleDeleteClick(index)}>Delete</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
