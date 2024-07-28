import React from 'react';

interface Props {
	searchName: string;
	selectedCity: string;
	highlightOldest: boolean;
	cities: string[];
	onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onHighlightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FiltersHeader: React.FC<Props> = ({
	searchName,
	selectedCity,
	highlightOldest,
	cities,
	onNameChange,
	onCityChange,
	onHighlightChange,
}) => (
	<div className="filters-container">
		<input
			type="text"
			placeholder="Search by name"
			value={searchName}
			onChange={onNameChange}
			className="text-field"
		/>
		<div className="form-control">
			<label htmlFor="city-select">Select city</label>
			<select
				id="city-select"
				value={selectedCity}
				onChange={onCityChange}
				className="select-field"
			>
				<option value="">Select city</option>
				{cities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>
		</div>
		<label className="checkbox-label">
			<input
				type="checkbox"
				checked={highlightOldest}
				onChange={onHighlightChange}
			/>
			oldest per city
		</label>
	</div>
);

export default FiltersHeader;
