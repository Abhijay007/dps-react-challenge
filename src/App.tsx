import dpsLogo from './assets/DPS.svg';
import './App.css';

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
		</>
	);
}

export default App;
