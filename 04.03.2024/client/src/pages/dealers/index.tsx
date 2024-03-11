import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Dealer {
  id: Number;
  name: string;
  adress: Number;
}

export default function Dealers() {
  const {
    data: dealers,
    error,
    isValidating,
  } = useSWR<Dealer[]>('http://localhost:9000/dealers', fetcher);

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {dealers &&
        dealers.map((dealer, index) => (
            <p key={index}>{dealer.name} {String(dealer.adress)}</p>
        ))}
    </div>
  );
};
