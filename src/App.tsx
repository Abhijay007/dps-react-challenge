import React, { useState, useMemo } from 'react';
import { useUsers } from './hooks/useUser';
import FiltersHeader from './components/FiltersHeader';
import UserTable from './components/UserTable';
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { User } from './models/user';
import useDebounce from './hooks/useDebounce';
import { SelectChangeEvent } from '@mui/material';

const App: React.FC = () => {
	const { users, isLoading } = useUsers();
	const [searchName, setSearchName] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

	const debouncedSearchName = useDebounce(searchName, 1000);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchName(e.target.value);
	};

	const handleCityChange = (e: SelectChangeEvent<string>) => {
		setSelectedCity(e.target.value);
	};

	const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHighlightOldest(e.target.checked);
	};

	const handleClearSearch = () => {
		setSearchName('');
	};

	const filteredUsers = useMemo(() => {
		if (isLoading) return [];
		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
			const isNameMatch = fullName.includes(
				debouncedSearchName.toLowerCase(),
			);
			const isCityMatch = selectedCity
				? user.address.city === selectedCity
				: true;
			return isNameMatch && isCityMatch;
		});
	}, [users, debouncedSearchName, selectedCity, isLoading]);

	const cities = useMemo(() => {
		if (isLoading) return [];
		const citySet = new Set(users.map((user) => user.address.city));
		return Array.from(citySet);
	}, [users, isLoading]);

	const oldestUsers = useMemo(() => {
		if (isLoading) return {};
		return filteredUsers.reduce(
			(acc, user) => {
				const city = user.address.city;
				if (
					!acc[city] ||
					new Date(acc[city]!.birthDate) > new Date(user.birthDate)
				) {
					acc[city] = user;
				}
				return acc;
			},
			{} as Record<string, User | undefined>,
		);
	}, [filteredUsers, isLoading]);

	return (
		<div className="container">
			<a
				href="https://www.digitalproductschool.io/"
				target="_blank"
				rel="noopener noreferrer"
			>
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
				onClearSearch={handleClearSearch}
			/>
			<UserTable
				users={filteredUsers}
				highlightOldest={highlightOldest}
				oldestUsers={oldestUsers}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default App;
