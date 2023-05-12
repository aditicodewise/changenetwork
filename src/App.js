import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const networks = {
  mainnet: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
    blockExplorerUrls: ["https://etherscan.io/"]
  },
  avax: {
  
      chainId: `0x${Number(43114).toString(16)}`,
      chainName: "Avalanche Mainnet",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"], // Add the valid HTTPS RPC URL(s) here
      blockExplorerUrls: ["https://cchain.explorer.avax.network/"]
    }
};  

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
      <main className="mt-4 p-4">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Force MetaMask network
        </h1>
        <div className="mt-4">
          <button
            onClick={() => handleNetworkSwitch("mainnet")}
            className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Switch to Ethereum Mainnet
          </button>
          <button
            onClick={() => handleNetworkSwitch("avax")}
            className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
          >
            Switch to Avax
          </button>
          <ErrorMessage message={error} />
        </div>
      </main>
    </div>
  );
}
