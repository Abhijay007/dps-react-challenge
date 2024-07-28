import React from 'react';
import { User } from '../models/user';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';

interface Props {
	users: User[];
	highlightOldest: boolean;
	oldestUsers: Record<string, User | undefined>;
}

const UserTable: React.FC<Props> = ({
	users,
	highlightOldest,
	oldestUsers,
}) => (
	<TableContainer component={Paper}>
		<Table
			sx={{
				'& td, & th': {
					padding: '10px 60px',
				},
				'& tr': {
					'&:last-of-type': {
						borderBottom: 'none',
					},
				},
			}}
		>
			<TableHead>
				<TableRow>
					<TableCell>ID</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>City</TableCell>
					<TableCell>Birthday</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{users.map((user) => (
					<TableRow
						key={user.id}
						sx={{
							backgroundColor:
								highlightOldest &&
								oldestUsers[user.address.city]?.id === user.id
									? 'yellow'
									: 'inherit',
						}}
					>
						<TableCell>{user.id}</TableCell>
						<TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
						<TableCell>{user.address.city}</TableCell>
						<TableCell>
							{new Date(user.birthDate).toLocaleDateString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

export default UserTable;
