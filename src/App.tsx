import React, { createRef, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, ListGroup, Modal, Nav, Navbar, Row } from 'react-bootstrap';
import './styles/global.scss';
import GifterList from './components/GifterList/GifterList';
import { Gifter } from './components/GifterListItem/types';
import logo from './logo.png';
import drawNames from './helpers/utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Particles from 'react-tsparticles';
import { ArrowRight } from 'react-bootstrap-icons';

interface GifterErrors {
	alreadyExists?: boolean;
	minLength?: boolean;
}

const mockOptions: Gifter[] = [
	{ name: 'Jack', bannedReceivers: [] },
	{ name: 'Jill', bannedReceivers: [] },
	{ name: 'Over', bannedReceivers: [] },
	{ name: 'Hill', bannedReceivers: [] },
	{ name: 'Run', bannedReceivers: [] },
	{ name: 'Forest', bannedReceivers: [] }
];

const App: React.FC = () => {
	const [gifters, setGifters] = useState<Gifter[]>(mockOptions);
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

	/**
	 *
	 * @returns Renders the running list of participants
	 */
	function renderRow() {
		return (
			<>
				<Form.FloatingLabel controlId='name' label='Enter Name'>
					<Form.Control ref={gifterRef} type='text' placeholder='Enter Name' />
				</Form.FloatingLabel>
				{gifterErrors.alreadyExists && <div className='text-danger mt-3'>Name already exists</div>}
				{gifterErrors.minLength && <div className='text-danger mt-3'>Name must be at least 3 characters</div>}
				<div className='d-flex justify-content-around mt-3'>
					<Button className='me-auto' variant='secondary' type='submit'>
						Add name
					</Button>
					<Button
						variant='secondary'
						disabled={isInvalidSetup()}
						onClick={() => {
							setShowModal(true);
							drawNames(gifters, updateResult);
						}}
					>
						Draw!
					</Button>
				</div>
			</>
		);
	}

	return (
		<>
			<Particles
				id='tsparticles'
				options={{
					background: {
						color: {
							value: 'transparent'
						},
						position: '50% 50%',
						repeat: 'no-repeat',
						size: 'cover'
					},
					fullScreen: {
						zIndex: 1
					},
					interactivity: {
						events: {
							onHover: {
								enable: true,
								mode: 'bubble'
							}
						},
						modes: {
							bubble: {
								distance: 400,
								duration: 0.3,
								opacity: 1,
								size: 4
							},
							grab: {
								distance: 400,
								links: {
									opacity: 0.5
								}
							}
						}
					},
					particles: {
						links: {
							color: {
								value: '#ffffff'
							},
							distance: 500,
							opacity: 0.4,
							width: 2
						},
						move: {
							attract: {
								rotate: {
									x: 600,
									y: 1200
								}
							},
							direction: 'bottom',
							enable: true,
							outModes: 'out'
						},
						number: {
							density: {
								enable: true
							},
							value: 400
						},
						opacity: {
							random: true,
							value: {
								min: 0.1,
								max: 0.5
							},
							animation: {
								speed: 1,
								minimumValue: 0.1
							}
						},
						size: {
							random: true,
							value: {
								min: 1,
								max: 8
							},
							animation: {
								speed: 40,
								minimumValue: 0.1
							}
						}
					}
				}}
			/>
			<div className='App'>
				<Navbar bg='primary'>
					<Container>
						<Navbar.Brand className='San-navbar-brand'>
							<img alt='Logo' src={logo} width='45' height='45' className='me-1' />
							Secret Santa
						</Navbar.Brand>
						<Nav>
							<Navbar.Text className='text-light'>Created by</Navbar.Text>
							<Nav.Link className='text-light' href='https://www.jonathanbridges.com'>
								Jonathan Bridges
							</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
				<Container className='bg-primary' as='main'>
					<Row>
						<Col md={4}>
							<Card>
								<Card.Body>
									<Form
										className='d-flex flex-column'
										onSubmit={(event) => {
											event.preventDefault();
											addGifter();
										}}
									>
										{renderRow()}
									</Form>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<GifterList gifters={gifters} updateGifters={updateGifters} removeGifter={removeGifter} />
						</Col>
					</Row>
				</Container>
				<Modal centered show={showModal} onHide={() => setShowModal(false)}>
					<Modal.Header className='mx-3' closeButton>
						<Modal.Title>Go get giftin'</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ListGroup variant={'flush'} as='ul'>
							<TransitionGroup component={null}>
								{Array.from(result).map(([gifter, recipient]: [gifter: string, recipient: string]) => {
									const nodeRef = createRef<HTMLLIElement>();
									return (
										<CSSTransition
											classNames='Fade'
											key={gifter}
											timeout={{
												appear: 500,
												enter: 500,
												exit: 500
											}}
											nodeRef={nodeRef}
										>
											<ListGroup.Item
												className='d-flex align-items-center justify-content-evenly'
												as='li'
												ref={nodeRef}
												key={gifter}
											>
												<span className='fw-bolder w-50'>{gifter}</span>
												<ArrowRight className='w-100 position-absolute' />
												<span className='fw-bolder ms-auto'>{recipient}</span>
											</ListGroup.Item>
										</CSSTransition>
									);
								})}
							</TransitionGroup>
						</ListGroup>
					</Modal.Body>
					<Modal.Footer className='mx-3'>
						<Button
							variant='secondary'
							onClick={() => {
								setShowModal(false);
								updateGifters([]);
							}}
						>
							Reset
						</Button>
						<Button variant='secondary' onClick={() => window.print()}>
							Print
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
};

export default App;
