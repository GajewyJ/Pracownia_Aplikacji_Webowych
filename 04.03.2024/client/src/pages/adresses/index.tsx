import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Adress {
  id: string;
  adress: string;
}

export default function Adresses() {
  const {
    data: adresses,
    error,
    isValidating,
  } = useSWR<Adress[]>('http://localhost:9000/adresses', fetcher);

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {adresses &&
        adresses.map((adress, index) => (
            <p key={index}>{adress.adress}</p>
        ))}
    </div>
  );
};
