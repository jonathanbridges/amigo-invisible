import React from 'react';
import Particles from 'react-tsparticles';

/**
 * Renders the particles.js snow effect
 */
const ParticlesComponent: React.FC = () => (
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
);
export default React.memo(ParticlesComponent);
