import { useEffect, useState } from 'react';
import styles from './app.module.css';
//JSON Server

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);

	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const [isDeleting, setIsDeleting] = useState(false);

	const refreshProducts = () => setRefreshProductsFlag(!refreshProductsFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/products')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, [refreshProductsFlag]);

	const requestAddVacumCleaner = () => {
		setIsCreating(true);

		fetch('http://localhost:3005/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Vacum Cleaner',
				price: 4690,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('the vacum cleaner was added:', response);
				refreshProducts();
			})
			.finally(() => setIsCreating(false));
	};

	const updateSmartphone = () => {
		setIsUpdating(true);
		fetch('http://localhost:3005/products/002', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				name: 'Smartphone',
				price: 9999,
			}),
		})
			.then((rawResponse) => {
				if (!rawResponse.ok) {
					throw new Error('Error in response');
				}
				return rawResponse.json();
			})
			.then((response) => {
				console.log('smartphone is updated:', response);
			})
			.finally(() => {
				refreshProducts();
				setIsUpdating(false);
			});
	};

	const requestdeleteVacumCleaner = (id) => {
		setIsDeleting(true);
		fetch('http://localhost:3005/products/003', {
			method: 'DELETE',
		})
			.then((rawResponse) => {
				if (!rawResponse.ok) {
					throw new Error('Error in response');
				}
				return rawResponse.json();
			})
			.then((response) => {
				console.log('smartphone is deleted:', response);
			})
			.finally(() => {
				refreshProducts();
				setIsDeleting(false);
			});
	};
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
			<button disabled={isCreating} onClick={requestAddVacumCleaner}>
				{' '}
				Add wakumcleaner
			</button>
			<button disabled={isUpdating} onClick={updateSmartphone}>
				Update Smartphone
			</button>
			<button disabled={isDeleting} onClick={requestdeleteVacumCleaner}>
				Delete Vacum Cleaner
			</button>
		</div>
	);
}

export default App;
