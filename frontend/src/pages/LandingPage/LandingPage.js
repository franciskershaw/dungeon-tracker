import { Link } from 'react-router-dom'

const LandingPage = () => {
	return (
		<div>
			<Link to={'/home'}>
				Login
			</Link>
			I am the landing page
		</div>
	)
}

export default LandingPage