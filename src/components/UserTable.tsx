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
	Skeleton,
} from '@mui/material';

interface Props {
	users: User[];
	highlightOldest: boolean;
	oldestUsers: Record<string, User | undefined>;
	isLoading: boolean;
}

const UserTable: React.FC<Props> = ({
	users,
	highlightOldest,
	oldestUsers,
	isLoading,
}) => (
	<TableContainer component={Paper} sx={{ width: '100%' }}>
		<Table
			sx={{
				width: 800,
				tableLayout: 'fixed',
				'& td': {
					padding: '12px 50px',
				},
				'& th': {
					fontWeight: 'bold',
					color: '#737373',
					padding: '8px 50px',
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
					{isLoading ? (
						<>
							<TableCell sx={{ width: '10%' }}>
								<Skeleton variant="text" />
							</TableCell>
							<TableCell sx={{ width: '40%' }}>
								<Skeleton variant="text" />
							</TableCell>
							<TableCell sx={{ width: '25%' }}>
								<Skeleton variant="text" />
							</TableCell>
							<TableCell sx={{ width: '25%' }}>
								<Skeleton variant="text" />
							</TableCell>
						</>
					) : (
						<>
							<TableCell sx={{ width: '10%' }}>ID</TableCell>
							<TableCell sx={{ width: '40%' }}>Name</TableCell>
							<TableCell sx={{ width: '25%' }}>City</TableCell>
							<TableCell sx={{ width: '25%' }}>
								Birthday
							</TableCell>
						</>
					)}
				</TableRow>
			</TableHead>
			<TableBody>
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
							<TableRow key={index}>
								<TableCell>
									<Skeleton variant="text" />
								</TableCell>
								<TableCell>
									<Skeleton variant="text" />
								</TableCell>
								<TableCell>
									<Skeleton variant="text" />
								</TableCell>
								<TableCell>
									<Skeleton variant="text" />
								</TableCell>
							</TableRow>
						))
					: users.map((user) => (
							<TableRow
								key={user.id}
								sx={{
									backgroundColor:
										highlightOldest &&
										oldestUsers[user.address.city]?.id ===
											user.id
											? '#F9F7EC'
											: 'inherit',
								}}
							>
								<TableCell>{user.id}</TableCell>
								<TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
								<TableCell>{user.address.city}</TableCell>
								<TableCell>
									{new Date(
										user.birthDate,
									).toLocaleDateString()}
								</TableCell>
							</TableRow>
						))}
				{!isLoading && (
					<TableRow>
						<TableCell colSpan={4} align="center">
							<strong>
								Total Number of Customers Found: {users.length}
							</strong>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	</TableContainer>
);

export default UserTable;
