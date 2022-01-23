import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListGroup } from "react-bootstrap";
import { Gifter } from "../GifterListItem/types";
import GifterListItem from "../GifterListItem/GifterListItem";
import { createRef } from "react";

interface Props {
	/**
	 * The list of gifters
	 */
	gifters: Gifter[];
	/**
	 * Updates the gifters list
	 */
	updateGifters: (gifters: Gifter[]) => void;
	/**
	 * Callback function used to remove a gifter from the list
	 */
	removeGifter: (gifter: Gifter) => void;
}

/**
 * Renders the list of gifters
 */
const GifterList: React.FC<Props> = ({ gifters, updateGifters, removeGifter }) => {
	return (
		<ListGroup as='ol' numbered>
			<TransitionGroup component={null}>
				{gifters.map((currentGifter: Gifter) => {
					const nodeRef = createRef<HTMLLIElement>();
					return (
						<CSSTransition
							classNames='Fade'
							key={currentGifter.name}
							timeout={{
								appear: 500,
								enter: 500,
								exit: 500
							}}
							nodeRef={nodeRef}
						>
							<GifterListItem
								currentGifter={currentGifter}
								updateGifters={updateGifters}
								removeGifter={removeGifter}
								gifters={gifters}
								ref={nodeRef}
							/>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		</ListGroup>
	);
};
export default GifterList;
