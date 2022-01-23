import React, { useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './styles/global.scss';
import GifterList from './components/GifterList/GifterList';
import { Gifter } from './components/GifterListItem/types';
import drawNames from './helpers/utils';
import ParticlesComponent from './components/Particles/Particles';
import FormComponent from './components/Form/Form';
import NavbarComponent from './components/Navbar/Navbar';
import logo from './logo.png';
import ModalComponent from './components/Modal/Modal';

export interface GifterErrors {
	alreadyExists?: boolean;
	minLength?: boolean;
}

/**
 * Renders the secret santa application
 */
const App: React.FC = () => {
	const [gifters, setGifters] = useState<Gifter[]>([]);
	const [gifterErrors, setGifterErrors] = useState<GifterErrors>({});
	const [result, setResult] = useState<Map<string, string>>(new Map());
	const [showModal, setShowModal] = useState<boolean>(false);

	const gifterRef = useRef<HTMLInputElement>(null);

	/**
	 * Adds a gifter
	 */
	function addGifter(): void {
		const gifterInput = gifterRef.current;
		if (gifterInput) {
			const gifterName = gifterInput.value;

			const { alreadyExists, minLength } = validateGifter(gifterName);
			setGifterErrors({ alreadyExists, minLength });

			if (!alreadyExists && !minLength) {
				const gifter: Gifter = {
					name: gifterName,
					bannedReceivers: []
				};

				setGifters((prevState) => [...prevState, gifter]);
				gifterRef.current.value = '';
			}
		}
		if (result) {
			setResult(new Map());
		}
	}

	/**
	 * Updates the gifters list
	 *
	 * @param gifters the new gifters list
	 */
	function updateGifters(gifters: Gifter[]): void {
		setGifters(gifters);
		if (result) {
			setResult(new Map());
		}
	}

	/**
	 * Removes a gifter from the gifter list
	 *
	 * @param gifter the gifter to be removed
	 */
	function removeGifter(gifter: Gifter): void {
		setGifters((prevState) => prevState.filter((prevGifter) => prevGifter.name !== gifter.name));
		if (result) {
			setResult(new Map());
		}
	}

	/**
	 * Validates that the gifter input
	 */
	function validateGifter(gifterName: string): GifterErrors {
		const alreadyExists = gifters.some((gifter: Gifter) => gifter.name === gifterName);
		const minLength = gifterName.length < 3;

		return { alreadyExists, minLength };
	}

	/**
	 * Updates the result Map
	 *
	 * @param incomingResult the result from the name draw
	 */
	function updateResult(incomingResult: Map<string, string>): void {
		setResult(incomingResult);
	}

	/**
	 * Whether or not the name draw and begin
	 */
	function isInvalidSetup(): boolean {
		if (gifters.length < 3) {
			// cannot submit if there are not enough gifters
			return true;
		} else if (gifters.some((gifter) => gifter.bannedReceivers.length === gifters.length - 1)) {
			// cannot submit if a gifter has banned all other gifters
			return true;
		} else {
			// cannot submit if all other gifters have banned a single recipient
			const bannedHash = new Map<string, number>();
			gifters.forEach((gifter: Gifter) =>
				gifter.bannedReceivers.forEach((bannedReceiver: string) => {
					const currentValue: number = bannedHash.get(bannedReceiver) || 0;
					bannedHash.set(bannedReceiver, currentValue + 1);
				})
			);

			return Array.from(bannedHash.values()).some((banCount) => banCount === gifters.length - 1);
		}
	}

	return (
		<div className='App'>
			<ParticlesComponent />
			<NavbarComponent logo={logo} />
			<Container className='bg-primary' as='main'>
				<Row>
					<Col md={4}>
						<Card>
							<Card.Body>
								<FormComponent
									gifterErrors={gifterErrors}
									gifterRef={gifterRef}
									onAddGifter={(event) => {
										event.preventDefault();
										addGifter();
									}}
									onDrawNames={(): void => {
										setShowModal(true);
										drawNames(gifters, updateResult);
									}}
									isDisabled={isInvalidSetup()}
								/>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<GifterList gifters={gifters} updateGifters={updateGifters} removeGifter={removeGifter} />
					</Col>
				</Row>
			</Container>
			<ModalComponent
				show={showModal}
				onHide={() => setShowModal(false)}
				onReset={() => {
					setShowModal(false);
					updateGifters([]);
				}}
				result={result}
			/>
		</div>
	);
};

export default App;
