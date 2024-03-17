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
  const {
    data: sales,
    error,
    isValidating,
  } = useSWR<Sale[]>('http://localhost:9000/sales', fetcher);

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {sales &&
        sales.map((sale, index) => (
            <p key={index}>{sale.client} {sale.price} {sale.dealer}</p>
        ))}
    </div>
  );
};
