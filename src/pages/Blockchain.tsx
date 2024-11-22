import React from 'react';
import { Shield, Cpu, Network, Lock, Users, Server, Handshake } from 'lucide-react';

const BlockchainFeature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-primary-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BlockProducer: React.FC<{ name: string; location: string; votes: string; status: 'active' | 'standby' }> = ({ name, location, votes, status }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-semibold text-gray-900">{name}</h4>
      <span className={`px-2 py-1 text-xs rounded-full ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
        {status === 'active' ? 'Active' : 'Standby'}
      </span>
    </div>
    <div className="text-sm text-gray-600">
      <p>Location: {location}</p>
      <p>Votes: {votes}</p>
    </div>
  </div>
);

const Partner: React.FC<{ name: string; logo: string; description: string; role: string }> = ({ name, logo, description, role }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-center gap-4 mb-4">
      <img src={logo} alt={name} className="w-16 h-16 object-contain" />
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <span className="text-sm text-primary-600">{role}</span>
      </div>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
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
        <div className="flex items-center gap-3 mb-6">
          <Handshake className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Strategic Partners</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Partner
            name="Ubisoft"
            logo="https://upload.wikimedia.org/wikipedia/commons/7/78/Ubisoft_logo.svg"
            role="Gaming Industry Partner & Block Producer"
            description="Major gaming publisher partnering with Ultra to revolutionize game distribution and blockchain gaming. Serves as a key block producer and strategic advisor."
          />
          <Partner
            name="AMD"
            logo="https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg"
            role="Technology Partner"
            description="Strategic partnership to optimize Ultra's blockchain performance on AMD hardware and collaborate on gaming technology innovations."
          />
          <Partner
            name="Atari"
            logo="https://upload.wikimedia.org/wikipedia/commons/3/3e/Atari_logo.svg"
            role="Gaming Pioneer Partner"
            description="Iconic gaming company partnering with Ultra to bring classic games to blockchain and explore new gaming experiences."
          />
          <Partner
            name="The Sandbox"
            logo="https://upload.wikimedia.org/wikipedia/commons/9/9c/The_Sandbox_logo.png"
            role="Metaverse Partner"
            description="Collaboration to create interoperable gaming assets and experiences between Ultra and The Sandbox metaverse."
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Server className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Block Producers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <BlockProducer
            name="Ultra.io"
            location="United States"
            votes="15.2M UOS"
            status="active"
          />
          <BlockProducer
            name="EOS Nation"
            location="Canada"
            votes="12.8M UOS"
            status="active"
          />
          <BlockProducer
            name="Ubisoft"
            location="France"
            votes="11.5M UOS"
            status="active"
          />
          <BlockProducer
            name="Block Matrix"
            location="United Kingdom"
            votes="10.1M UOS"
            status="active"
          />
          <BlockProducer
            name="EOS Amsterdam"
            location="Netherlands"
            votes="9.8M UOS"
            status="active"
          />
          <BlockProducer
            name="EOS Asia"
            location="Singapore"
            votes="8.5M UOS"
            status="standby"
          />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Block Producer Requirements</h3>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Minimum 1.5% of total voting power</li>
            <li>Technical infrastructure meeting Ultra's standards</li>
            <li>Proven track record in blockchain operations</li>
            <li>Compliance with Ultra's governance policies</li>
          </ul>
        </div>
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