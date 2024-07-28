import { useState, useEffect } from 'react';
import { fetchUsers } from '../api/userService';
import { User } from '../models/user';

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const loadUsers = async () => {
			const data = await fetchUsers();
			setUsers(data);
		};
		loadUsers();
	}, []);

	return users;
};
