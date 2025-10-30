import { stellarNetwork } from "../contracts/util";

export function getFriendbotUrl(address: string) {
  if (stellarNetwork === "testnet") {
    return `https://friendbot.stellar.org/?addr=${address}`;
  }
  return `/friendbot?addr=${address}`;
}
