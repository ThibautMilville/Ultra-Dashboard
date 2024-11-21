import React from 'react';
import { Shield, Cpu, Network, Lock } from 'lucide-react';

const BlockchainFeature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-primary-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

function Blockchain() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ultra Blockchain Technology</h1>
        <p className="text-lg text-gray-600">
          Ultra leverages advanced blockchain technology to create a secure, scalable, and efficient gaming ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <BlockchainFeature
          icon={<Shield className="h-6 w-6" />}
          title="Security First"
          description="Built on EOSIO technology with enhanced security protocols to protect users' assets and transactions."
        />
        <BlockchainFeature
          icon={<Cpu className="h-6 w-6" />}
          title="High Performance"
          description="Capable of processing thousands of transactions per second with minimal latency and energy consumption."
        />
        <BlockchainFeature
          icon={<Network className="h-6 w-6" />}
          title="Scalable Infrastructure"
          description="Designed to scale horizontally to accommodate millions of users and transactions without compromising performance."
        />
        <BlockchainFeature
          icon={<Lock className="h-6 w-6" />}
          title="Advanced Consensus"
          description="Utilizes Delegated Proof of Stake (DPoS) for efficient and democratic network governance."
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Block Time</h3>
            <p className="text-gray-600">0.5 seconds</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Consensus Mechanism</h3>
            <p className="text-gray-600">DPoS (Delegated Proof of Stake)</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Contracts</h3>
            <p className="text-gray-600">WebAssembly (WASM) based</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction Speed</h3>
            <p className="text-gray-600">3,000+ TPS</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Block Producers</h3>
            <p className="text-gray-600">21 active validators</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Network Type</h3>
            <p className="text-gray-600">Public blockchain</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Network Architecture</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Ultra's blockchain architecture is designed to meet the demanding requirements of the gaming industry,
            featuring a multi-layered approach to scaling and security.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Layer 1: Core blockchain protocol based on EOSIO technology</li>
            <li>Layer 2: Scaling solutions for improved transaction throughput</li>
            <li>Interoperability bridges for cross-chain asset transfers</li>
            <li>Dedicated gaming sidechains for specific use cases</li>
            <li>Advanced cryptographic security measures</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Blockchain;