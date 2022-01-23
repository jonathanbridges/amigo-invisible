export interface Gifter {
  /**
   * The person's name
   */
  name: string;
  /**
   * The name of another person who is banned from receiving a gift from the person
   */
  bannedReceivers: string[];
}