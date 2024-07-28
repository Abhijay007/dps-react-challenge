import React from 'react';
import { User } from '../models/user';

interface Props {
	users: User[];
	highlightOldest: boolean;
	oldestUsers: Record<string, User | undefined>;
}

const UserTable: React.FC<Props> = ({
	users,
	highlightOldest,
	oldestUsers,
}) => {
	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						<th className="table-cell">ID</th>
						<th className="table-cell">Name</th>
						<th className="table-cell">City</th>
						<th className="table-cell">Birthday</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr
							key={user.id}
							style={{
								backgroundColor:
									highlightOldest &&
									oldestUsers[user.address.city]?.id ===
										user.id
										? 'yellow'
										: 'inherit',
							}}
						>
							<td className="table-cell">{user.id}</td>
							<td className="table-cell">{`${user.firstName} ${user.lastName}`}</td>
							<td className="table-cell">{user.address.city}</td>
							<td className="table-cell">
								{new Date(user.birthDate).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
