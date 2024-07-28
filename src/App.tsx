import React, { useState, useMemo } from 'react';
import { useUsers } from './hooks/useUser';
import FiltersHeader from './components/FiltersHeader';
import UserTable from './components/UserTable';
import dpsLogo from './assets/DPS.svg';
import './App.css';

const App: React.FC = () => {
	const users = useUsers();
	const [searchName, setSearchName] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchName(e.target.value);
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCity(e.target.value);
	};

	const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHighlightOldest(e.target.checked);
	};

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
			const isNameMatch = fullName.includes(searchName.toLowerCase());
			const isCityMatch = selectedCity
				? user.address.city === selectedCity
				: true;
			return isNameMatch && isCityMatch;
		});
	}, [users, searchName, selectedCity]);

	const cities = useMemo(() => {
		const citySet = new Set(users.map((user) => user.address.city));
		return Array.from(citySet);
	}, [users]);

	const oldestUsers = useMemo(() => {
		return filteredUsers.reduce(
			(acc, user) => {
				const city = user.address.city;
				if (
					!acc[city] ||
					new Date(acc[city].birthDate) > new Date(user.birthDate)
				) {
					acc[city] = user;
				}
				return acc;
			},
			{} as Record<string, User | undefined>,
		);
	}, [filteredUsers]);

	return (
		<>
			<div className="container">
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
				<FiltersHeader
					searchName={searchName}
					selectedCity={selectedCity}
					highlightOldest={highlightOldest}
					cities={cities}
					onNameChange={handleNameChange}
					onCityChange={handleCityChange}
					onHighlightChange={handleHighlightChange}
				/>
				<UserTable
					users={filteredUsers}
					highlightOldest={highlightOldest}
					oldestUsers={oldestUsers}
				/>
			</div>
		</>
	);
};

export default App;
