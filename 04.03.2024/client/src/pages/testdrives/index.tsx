import { useState } from 'react';
import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface TestDrive {
  id: string;
  clientsId: number;
  carsId: number;
  drivesDate: Date;
}

export default function TestDrives() {
  const [id, setId] = useState('');

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateTestDrive, setUpdateTestDrive] = useState({drivesDate: new Date('1999-12-31')});

  const {
    data: testdrives,
    error,
    isValidating,
    mutate,
  } = useSWR<TestDrive[]>('http://localhost:9000/testdrives', fetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const client = Number(formData.get('clientSubmit') as string);
    const car = Number(formData.get('carSubmit') as string);
    const drivesDate = formData.get('dateSubmit') as string;

    const drivesDateObject = new Date(drivesDate);
    let isoFormattedDate = drivesDateObject.toISOString();

    try {
      const response = await fetch('http://localhost:9000/testdrives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientsId: client,
          carsId: car,
          drivesDate: isoFormattedDate
        }),
      });

      if (response.ok) {
        mutate();
      } else {
        console.error('Failed to add new test drive!');
      }
    } catch (error) {
      console.error('Error adding new test drive:', error);
    }
  };

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className='Loading'>Loading...</div>;

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };
  
  const handleDeleteClick = async (index: number) => {
    try {
      if (!testdrives) {
        console.error('There are no test drives');
        return;
      }
  
      const testDriveToDelete = testdrives[index];

      const response = await fetch(`http://localhost:9000/testdrives/${testDriveToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: testDriveToDelete.id
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
      if (!testdrives) {
        console.error('There are no test drives');
        return;
      }
  
      const testDriveToUpdate = testdrives[index];

      let _date = updateTestDrive.drivesDate;

      if(_date === new Date('1999-12-31')){
        _date = testDriveToUpdate.drivesDate
      }
      
      let isoFormattedDate = _date.toISOString();

      const response = await fetch(`http://localhost:9000/testdrives/${testDriveToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drivesDate: isoFormattedDate
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
    
    let _value = new Date(value)

    setUpdateTestDrive((prevUpdateTestDrive) => ({ ...prevUpdateTestDrive, [name]: _value }));
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/testdrives/${id}`;
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSearch}>
          <input type='number' name='id' placeholder='ID of test drive' value={id} onChange={(e) => setId(e.target.value)}/> 
          <input type='submit' value='Search' />
        </form>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='number' placeholder='Client Id' name='clientSubmit' required />
          <input type='number' placeholder='Cars Id' name='carSubmit' required />
          <input type='date' placeholder='Date' name='dateSubmit' required />
          <input type='submit' value='Add new' />
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client's ID</th>
              <th>Car's ID</th>
              <th>Drive's Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {testdrives?.map((testdrive, index) => (
            <tr key={Number(testdrive.id)}>
              <td>{String(testdrive.id)}.</td>
              <td>{testdrive.clientsId}</td>
              <td>{testdrive.carsId}</td>
              <td>{editIndex === index ? <input type='date' name='drivesDate' defaultValue={String(testdrive.drivesDate).substring(0,10)} placeholder='Drives Date' onChange={handleInputChange} /> : String(testdrive.drivesDate).substring(0,10)}</td>
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
