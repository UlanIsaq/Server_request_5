import { useEffect, useState } from 'react';
import styles from './app.module.css';
//mock backend

const PRODUCTS_MOCK = [
	{
		id: '001',
		name: 'TV',
		price: 100,
	},
	{
		id: '002',
		name: 'Smartphone1',
		price: 101,
	},
	{
		id: '003',
		name: 'product 3',
		price: 102,
	},
];

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		new Promise((resolve) => {
			setTimeout(() => {
				resolve({ json: () => PRODUCTS_MOCK });
			}, 5000);
		})
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				products.map(({ id, name, price }) => (
					<div key={id}>
						{name} - {price} rub{' '}
					</div>
				))
			)}
		</div>
	);
}

export default App;
