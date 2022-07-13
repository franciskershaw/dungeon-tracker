import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			<Link to='/campaign'>
				Campaign
			</Link>
			<p>I am the home page for logged in users</p>
		</div>
	)
}

export default HomePage;