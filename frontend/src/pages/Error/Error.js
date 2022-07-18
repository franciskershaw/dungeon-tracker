import { Link } from 'react-router-dom'

const Error = () => {
	return (
		<div>
			Oops - don't think you meant to come here
			<Link to={'/'}>
				Go home
			</Link>
		</div>
	)
}

export default Error;