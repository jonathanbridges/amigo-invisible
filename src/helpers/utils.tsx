import { Gifter } from '../components/GifterListItem/types';

/**
 * Validates whether or not the current gifter can draw the selected recipient
 *
 * @param currentGifter the gifter
 * @param recipientName the recipient's name
 */
function isValidDraw(currentGifter: Gifter, recipientName: string): boolean {
	return currentGifter.name !== recipientName && !currentGifter.bannedReceivers.includes(recipientName);
}

/**
 * Validates whether or not the current gifter has any valid draws remaining
 *
 * @param currentGifter the current gifter
 * @param remainingRecipients the reamining recipients
 */
function hasValidDraws(currentGifter: Gifter, remainingRecipients: Gifter[]): boolean {
	const remainingRecipientNames: string[] = remainingRecipients.map((recipient) => recipient.name);

	return remainingRecipientNames.some((recipient) => isValidDraw(currentGifter, recipient));
}

/**
 * Returns the blanco elephante Map
 *
 * @param gifters the gifters
 * @param updateResult updates the result
 */
export default function drawNames(gifters: Gifter[], updateResult: (result: Map<string, string>) => void): void {
	let result = new Map<string, string>();
	let idx = 0;
	let recipients: Gifter[] = [...gifters];

	while (result.size < gifters.length) {
		const currentGifter: Gifter = gifters[idx];
		if (!hasValidDraws(currentGifter, recipients)) {
			// reset if there are no valid draws remaining for the current gifter
			recipients = [...gifters];
			result.clear();
			idx = 0;
		} else {
			// select a random recipient
			const recipientIdx: number = Math.floor(Math.random() * recipients.length);
			const recipient: Gifter = recipients[recipientIdx];
			// validate draw
			if (isValidDraw(currentGifter, recipient.name)) {
				// add entry to map, remove recipient, and increment gifter idx
				result.set(currentGifter.name, recipient.name);
				recipients.splice(recipientIdx, 1);
				idx++;
			}
		}
	}

	updateResult(result);
}
