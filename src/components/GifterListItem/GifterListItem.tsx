import { forwardRef } from 'react';
import { CloseButton, ListGroup } from 'react-bootstrap';
import MultiSelect from '../MultiSelect/MultiSelect';
import { Gifter } from './types';
import styles from './GlitterListItem.module.scss';

interface Props {
	/**
	 * The gifter
	 */
	currentGifter: Gifter;
	/**
	 * Updates the gifters list
	 */
	updateGifters: (gifters: Gifter[]) => void;
	/**
	 * Callback function used to remove a gifter from the list
	 */
	removeGifter: (gifter: Gifter) => void;
	/**
	 * The list of gifters
	 */
	gifters: Gifter[];
}

/**
 * Renders a gifter in the gifter list
 */
const GifterListItem = forwardRef<HTMLLIElement, Props>(
	({ currentGifter, updateGifters, removeGifter, gifters }, ref) => {
		return (
			<ListGroup.Item ref={ref} as='li' className={`d-flex justify-content-between align-items-center ${styles.item}`}>
				<div className='ms-2 me-auto'>
					<div className='me-2 fw-bold'>{currentGifter.name}</div>
				</div>
				<MultiSelect currentGifter={currentGifter} gifters={gifters} updateGifters={updateGifters} />
				<CloseButton className='ms-2' aria-label='Remove' onClick={() => removeGifter(currentGifter)} />
			</ListGroup.Item>
		);
	}
);
export default GifterListItem;
