import { Link } from 'react-router-dom'

const Error = () => {
	return (
		<div>
			Oops - don't think you meant to come here
			<Link to={'home'}>
				Go home
			</Link>
		</div>
	)
}

export default Error;