import Select, { MultiValue, Options } from 'react-select';
import { Gifter } from '../GifterListItem/types';

interface Props {
	/**
	 * The current gifter
	 */
	currentGifter: Gifter;
	/**
	 * The list of possible recipients
	 */
	gifters: Gifter[];
	/**
	 * Updates the gifters list
	 */
	updateGifters: (gifters: Gifter[]) => void;
}

interface SelectOption {
	value: string;
	label: string;
}

/**
 * Renders the multi select input where users can add banned recipients
 */
const MultiSelect: React.FC<Props> = ({ currentGifter, gifters, updateGifters }) => {
	const options: MultiValue<SelectOption> = gifters
		.filter((gifter: Gifter) => gifter.name !== currentGifter.name)
		.map((gifter: Gifter) => {
			return {
				value: gifter.name,
				label: gifter.name
			};
		});

	/**
	 * Adds or removes banned recipients for a gifter
	 *
	 * @param newValues the new select option values
	 */
	function handleChange(newValues: MultiValue<never> | { value: string }[]): void {
		const updatedGifters = [...gifters];
		const targetGifterIdx = updatedGifters.findIndex((gifter) => gifter.name === currentGifter.name);
		const bannedReceivers = newValues.map((option: { value: string }) => option.value);
		updatedGifters[targetGifterIdx] = {
			name: currentGifter.name,
			bannedReceivers
		};
		updateGifters(updatedGifters);
	}

	return options.length > 0 ? (
		<Select
			placeholder='Ban recipient...'
			onChange={(newValues) => handleChange(newValues as MultiValue<never>)}
			defaultValue={[]}
			isMulti
			name='recipients'
			options={options as unknown as Options<never>}
			className='basic-multi-select'
			classNamePrefix='select'
		/>
	) : null;
};
export default MultiSelect;
