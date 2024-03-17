import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface TestDrive {
  id: string;
  clientsId: number;
  carsId: number;
  drivesDate: string;
}

export default function TestDrives() {
  const {
    data: testDrives,
    error,
    isValidating,
  } = useSWR<TestDrive[]>('http://localhost:9000/testdrives', fetcher);

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {testDrives &&
        testDrives.map((testDrive, index) => (
            <p key={index}>{testDrive.clientsId} {testDrive.carsId} {testDrive.drivesDate}</p>
        ))}
    </div>
  );
};
