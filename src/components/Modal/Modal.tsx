import { Button, ListGroup, Modal } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';

interface Props {
	/**
	 * Whether or not to show the modal
	 */
	show: boolean;
	/**
	 * Callback function used to close the modal
	 */
	onHide: () => void;
	/**
	 * The result of the name draw
	 */
	result: Map<string, string>;
	/**
	 * Callback function used to reset/clear the name list
	 */
	onReset: () => void;
}

/**
 * Renders the modal with the draw results
 */
const ModalComponent: React.FC<Props> = ({ show, onHide, result, onReset }) => {
	return (
		<Modal centered show={show} onHide={onHide}>
			<Modal.Header className='mx-3' closeButton>
				<Modal.Title>Snow get giftin'</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup variant={'flush'} as='ul'>
					{Array.from(result).map(([gifter, recipient]: [gifter: string, recipient: string]) => {
						return (
							<ListGroup.Item className='d-flex align-items-center justify-content-evenly' as='li' key={gifter}>
								<span className='fw-bolder w-50'>{gifter}</span>
								<ArrowRight className='w-100 position-absolute' />
								<span className='fw-bolder ms-auto'>{recipient}</span>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer className='mx-3'>
				<Button variant='secondary' onClick={onReset}>
					Reset
				</Button>
				<Button variant='secondary' onClick={() => window.print()}>
					Print
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default ModalComponent;
