import React from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	InputAdornment,
	IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
	searchName: string;
	selectedCity: string;
	highlightOldest: boolean;
	cities: string[];
	onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onHighlightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClearSearch: () => void;
}

const FiltersHeader: React.FC<Props> = ({
	searchName,
	selectedCity,
	highlightOldest,
	cities,
	onNameChange,
	onCityChange,
	onHighlightChange,
	onClearSearch,
}) => (
	<Box
		sx={{
			p: 2,
			width: '100%',
		}}
	>
		<Grid container spacing={2} alignItems="center">
			<Grid item xs={12} sm={4}>
				<TextField
					label="Search by name"
					variant="outlined"
					value={searchName}
					onChange={onNameChange}
					fullWidth
					placeholder="Search..."
					InputProps={{
						endAdornment: searchName && (
							<InputAdornment position="end">
								<IconButton onClick={onClearSearch} edge="end">
									<ClearIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{
						'& .MuiInputBase-root': {
							padding: '14px 14px',
						},
					}}
				/>
			</Grid>

			<Grid item xs={12} sm={4}>
				<FormControl fullWidth variant="outlined">
					<InputLabel id="city-select-label">Select city</InputLabel>
					<Select
						labelId="city-select-label"
						value={selectedCity}
						onChange={onCityChange}
						label="Select city"
						sx={{
							'& .MuiSelect-select': {
								padding: '14px 14px',
							},
						}}
					>
						<MenuItem value="">
							<em>Select city</em>
						</MenuItem>
						{cities.map((city) => (
							<MenuItem key={city} value={city}>
								{city}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} sm={4}>
				<FormControlLabel
					control={
						<Checkbox
							checked={highlightOldest}
							onChange={onHighlightChange}
						/>
					}
					label="Oldest per city"
				/>
			</Grid>
		</Grid>
	</Box>
);

export default FiltersHeader;
