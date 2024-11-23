import React from 'react';
import { Scale, AlertCircle, FileCheck, HelpCircle } from 'lucide-react';

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

function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600">Last updated: November 22, 2024</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <Section title="Agreement to Terms" icon={<Scale className="h-5 w-5" />}>
          <p>
            By accessing or using the Ultra Dashboard, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, please do not use the platform.
          </p>
        </Section>

        <Section title="Use License" icon={<FileCheck className="h-5 w-5" />}>
          <p>
            You may access the Ultra Dashboard to view publicly available technical data for personal, non-commercial use. You are not allowed to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or copy the content</li>
            <li>Use the content for commercial purposes</li>
            <li>Attempt to decompile or reverse engineer any part of the website</li>
            <li>Remove any copyright or proprietary notices</li>
            <li>Transfer the content to another platform without permission</li>
          </ul>
        </Section>

        <Section title="Disclaimer" icon={<AlertCircle className="h-5 w-5" />}>
          <p>
            The content on the Ultra Dashboard is provided "as is." Ultra Dashboard makes no warranties regarding the accuracy, completeness, or reliability of the data. We disclaim any implied warranties, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Merchantability or fitness for a particular purpose</li>
            <li>Accuracy or timeliness of information</li>
            <li>Non-infringement of intellectual property</li>
          </ul>
        </Section>

        <Section title="Limitations" icon={<HelpCircle className="h-5 w-5" />}>
          <p>
            Ultra Dashboard shall not be liable for any damages arising from the use of, or inability to use, the website. This includes, but is not limited to, loss of data or profit, or business interruption.
          </p>
          <p className="mt-4">
            Some jurisdictions do not allow limitations on implied warranties or liability for incidental damages, so these limitations may not apply to you.
          </p>
        </Section>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            For any questions about these Terms of Service, please contact us at info@ultratimes.io
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;