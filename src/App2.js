import React, { useEffect, useState } from 'react';
// import Web3 from 'web3';

function App() {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const fetchNetworks = async () => {
      if (window.ethereum) {
        try {
          const networkList = await window.ethereum.request({
            method: 'wallet_getEthereumChain',
          });
          setNetworks(networkList);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchNetworks();
  }, []);

  const handleNetworkChange = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Available Networks:</h2>
      {networks.map((network) => (
        <button
          key={network.chainId}
          onClick={() => handleNetworkChange(network.chainId)}
        >
          {network.name}
        </button>
      ))}
    </div>
  );
}

export default App;
