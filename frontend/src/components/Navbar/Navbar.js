import { Link } from 'react-router-dom'

const NavBar = () => {
	return (
		<header>
			<nav>
				<div>
					<span>logo</span>
					<span>DT</span>
				</div>
				<div>
					<Link to={'register'}>Register</Link>
					{/* To be completed later during development */}
					{/* <Link to={'about'}>About</Link>
					<Link to={'faqs'}>FAQs</Link> */}
				</div>
			</nav>
		</header>
	)
}

export default NavBar