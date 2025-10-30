import { Networks } from "@stellar/stellar-sdk";

// Network configuration
export const stellarNetwork = "testnet"; // or "mainnet" for production
export const networkPassphrase = stellarNetwork === "testnet" 
  ? Networks.TESTNET 
  : Networks.PUBLIC;

// RPC URL
export const rpcUrl = stellarNetwork === "testnet" 
  ? "https://soroban-testnet.stellar.org" 
  : "https://soroban-mainnet.stellar.org";

// Horizon URL
export const horizonUrl = stellarNetwork === "testnet"
  ? "https://horizon-testnet.stellar.org"
  : "https://horizon.stellar.org";

// Network object for RPC calls
export const network = {
  rpcUrl,
  networkPassphrase,
  name: stellarNetwork
};

// Lab prefix for experimental features
export const labPrefix = stellarNetwork === "testnet" ? "test-" : "";