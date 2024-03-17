import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Client {
  id: string;
  name: string;
}

export default function Clients() {
  const {
    data: clients,
    error,
    isValidating,
  } = useSWR<Client[]>('http://localhost:9000/clients', fetcher);

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {clients &&
        clients.map((client, index) => (
            <p key={index}>{client.name}</p>
        ))}
    </div>
  );
};
