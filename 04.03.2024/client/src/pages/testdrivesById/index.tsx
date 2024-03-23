import { useEffect, useState } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface TestDrive {
  id: string;
  clientsId: number;
  carsId: number;
  drivesDate: Date;
}

export default function TestDrivesById() {
  const { id } = useParams<{ id: string }>();
  
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [updateTestDrive, setUpdateTestDrive] = useState({drivesDate: new Date('1999-12-31')});

  const [testdrive, setTestDrive] = useState<TestDrive | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [id2, setId2] = useState('');
  
  useEffect(() => {
    const fetchDrive = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<TestDrive>(`http://localhost:9000/testdrives/${id}`);
        setTestDrive(response.data);
      } catch (error) {
        setTestDrive(null);
        console.clear()
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrive();
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
      if (!testdrive) {
        console.error('There are no test drives');
        return;
      }
  
      const testDriveToDelete = testdrive;

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
      setEditIndex(prev => prev !== null ? null : 0);
    }
  };

  const handleSaveClick = async () => {
    try {
      if (!testdrive) {
        console.error('There are no test drives');
        return;
      }
  
      const testDriveToUpdate = testdrive;

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
      setEditIndex(prev => prev !== null ? null : 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let _value = new Date(value)

    setUpdateTestDrive((prevUpdateTestDrive) => ({ ...prevUpdateTestDrive, [name]: _value }));
  };

  const handleSearch = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/testdrives/${id2}`;
  };

  if(!testdrive){
    return(
      <section>
        <div>
          <p>Test Drives with this ID does not exist</p>
        </div>
      </section>
    )
  }
  else{
    return (
      <section>
        <div>
          <form onSubmit={handleSearch}>
            <input type='number' name='id' placeholder='ID of test drive' value={id2} onChange={(e) => setId2(e.target.value)}/> 
            <input type='submit' value='Search' />
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
              <tr key={Number(testdrive.id)}>
                <td>{String(testdrive.id)}.</td>
                <td>{testdrive.clientsId}</td>
                <td>{testdrive.carsId}</td>
                <td>{editIndex === 1 ? <input type='date' name='drivesDate' defaultValue={String(testdrive.drivesDate).substring(0,10)} placeholder='Drives Date' onChange={handleInputChange} /> : String(testdrive.drivesDate).substring(0,10)}</td>
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
