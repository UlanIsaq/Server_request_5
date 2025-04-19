import { useEffect, useState } from 'react';
import styles from './app.module.css';
//mock api mock.io
function App() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('https://mocki.io/v1/9dd0b9e3-b0d7-4b24-bad0-2f71afec2b8c')
			.then((response) => response.json())
			.then((data) => setProducts(data));
	}, []);
	return (
		<div className={styles.app}>
			{products.map(({ id, name, price }) => (
				<div key={id}>
					{name} - {price} rub{' '}
				</div>
			))}
		</div>
	);
}

export default App;
