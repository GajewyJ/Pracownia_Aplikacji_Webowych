import { useEffect, useState } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Sale {
  id: string;
  client: number;
  price: number;
  dealer: number;
}

export default function SalesById() {
  const { id } = useParams<{ id: string }>();
  
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateSale, setUpdateSale] = useState({price: 0});

  const [sale, setSale] = useState<Sale | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [id2, setId2] = useState('');
  
  useEffect(() => {
    const fetchSale = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Sale>(`http://localhost:9000/sales/${id}`);
        setSale(response.data);
      } catch (error) {
        setSale(null);
        console.clear()
      } finally {
        setIsLoading(false);
      }
    };

    fetchSale();
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
      if (!sale) {
        console.error('There are no sales');
        return;
      }
  
      const saleToDelete = sale;

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
      setEditIndex(prev => prev !== null ? null : 0);
    }
  };

  const handleSaveClick = async () => {
    try {
      if (!sale) {
        console.error('There are no sales');
        return;
      }
  
      const saleToUpdate = sale;

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
      setEditIndex(prev => prev !== null ? null : 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateSale((prevUpdateSale) => ({ ...prevUpdateSale, [name]: parseFloat(value) }));
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/sales/${id2}`;
  };

  if(!sale){
    return(
      <section>
        <div>
          <p>Sale with this ID does not exist</p>
        </div>
      </section>
    )
  }
  else{
      return(
        <section>
          <div>
            <form onSubmit={handleSearch}>
              <input type='number' name='id' placeholder='ID of sale' value={id2} onChange={(e) => setId2(e.target.value)}/> 
              <input type='submit' value='Search' />
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
                <tr key={Number(sale.id)}>
                  <td>{String(sale.id)}.</td>
                  <td>{sale.client}</td>
                  <td>{editIndex === 1 ? <input type='number' name='price' defaultValue={sale.price} placeholder='Price' onChange={handleInputChange} step='0.01'/> : sale.price + " zł"}</td>
                  <td>{sale.dealer}</td>
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
