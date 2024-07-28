import { useState, useEffect } from 'react';
import { fetchUsers } from '../api/userService';
import { User } from '../models/user';

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadUsers = async () => {
			setIsLoading(true);
			try {
				const fetchedUsers = await fetchUsers();
				setUsers(fetchedUsers);
			} catch (error) {
				console.error('Error fetching users:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadUsers();
	}, []);

	return { users, isLoading };
};
