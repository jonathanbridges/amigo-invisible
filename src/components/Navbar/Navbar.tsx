import { Container, Navbar, Nav } from 'react-bootstrap';
import localStyles from './Navbar.module.scss';

interface Props {
  /**
   * The navbar logo url
   */
	logo: string | undefined;
}

/**
 * Renders the navbar component
 */
const NavbarComponent: React.FC<Props> = ({ logo }) => {
	return (
		<Navbar bg='primary'>
			<Container>
				<Navbar.Brand className={localStyles.navbar}>
					<img alt='Logo' src={logo} width='45' height='45' className='me-1' />
					Secret Santa
				</Navbar.Brand>
				<Nav>
					<Navbar.Text className='text-light text-end'>Created by</Navbar.Text>
					<Nav.Link className='text-light' href='https://www.jonathanbridges.com'>
						Jonathan Bridges
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};
export default NavbarComponent;
