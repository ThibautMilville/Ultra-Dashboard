import React from 'react';
import { Shield, Eye, FileText } from 'lucide-react';

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-primary-600">{icon}</span>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-600 space-y-4">
      {children}
    </div>
  </div>
);

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: November 22, 2024</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <Section title="Information Collection" icon={<Eye className="h-5 w-5" />}>
          <p>
            We do not collect any personal information from users. Ultra Dashboard provides publicly available technical data without requiring any login or personal data submission.
          </p>
        </Section>

        <Section title="Data Security" icon={<Shield className="h-5 w-5" />}>
          <p>
            Ultra Dashboard does not store or process any personal data. The technical data displayed is sourced from public information. We take standard measures to ensure the website remains secure and accessible.
          </p>
        </Section>

        <Section title="Transparency" icon={<FileText className="h-5 w-5" />}>
          <p>
            Our platform is committed to transparency. All information displayed is openly available and does not involve tracking or storing personal data.
          </p>
        </Section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;