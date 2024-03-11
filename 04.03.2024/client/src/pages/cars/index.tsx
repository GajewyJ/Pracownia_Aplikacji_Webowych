import './index.scss'
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

interface Car {
  id: Number;
  brand: String;
  model: String;
  productionYear: Number;
  registrationNumber: String;
  dealer: String;
}

export default function Cars() {
  const {
    data: cars,
    error,
    isValidating,
  } = useSWR<Car[]>('http://localhost:9000/cars', fetcher);

  if (error) return <div className='failed'>Failed to load {error.message}</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
      {cars &&
        cars.map((car, index) => (
            <p key={index}>{car.brand} {car.model} {String(car.productionYear)} {car.registrationNumber}</p>
        ))}
    </div>
  );
};
