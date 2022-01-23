import { Button, Form } from 'react-bootstrap';
import { GifterErrors } from '../../App';

interface Props {
  /**
   * Errors for the currently entered name
   */
  gifterErrors: GifterErrors;
  /**
   * A reference to the name input
   */
  gifterRef: React.RefObject<HTMLInputElement>;
  /**
   * Callback function used for handling the addition of names
   */
  onAddGifter: (event: any) => void;
  /**
   * Callback function used to draw the names 
   */
  onDrawNames: () => void;
  /**
   * Whether or not the draw button is disabled
   */
	isDisabled: boolean;
}

/**
 * Renders the sidebar form where users enter names and draw results
 */
const FormComponent: React.FC<Props> = ({ gifterErrors, gifterRef, onAddGifter, onDrawNames, isDisabled }) => {
	return (
		<Form className='d-flex flex-column' onSubmit={onAddGifter}>
			<Form.FloatingLabel controlId='name' label='Enter Name'>
				<Form.Control ref={gifterRef} type='text' placeholder='Enter Name' />
			</Form.FloatingLabel>
			{gifterErrors.alreadyExists && <div className='text-danger mt-3'>Name already exists</div>}
			{gifterErrors.minLength && <div className='text-danger mt-3'>Name must be at least 3 characters</div>}
			<div className='d-flex justify-content-around mt-3'>
				<Button className='me-auto' variant='secondary' type='submit'>
					Add name
				</Button>
				<Button variant='secondary' disabled={isDisabled} onClick={onDrawNames}>
					Draw!
				</Button>
			</div>
		</Form>
	);
};
export default FormComponent;
