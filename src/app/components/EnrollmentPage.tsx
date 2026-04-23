import { useState } from 'react';
import { Shield, Heart, Anchor, CheckCircle } from 'lucide-react';

const NSTP_COMPONENTS = [
  {
    id: 'cwts',
    name: 'CWTS',
    fullName: 'Civic Welfare Training Service',
    description: 'Activities contributory to the general welfare and betterment of life for the members of the community.',
    icon: Heart,
    color: 'bg-green-600',
    benefits: [
      'Community development projects',
      'Health and education programs',
      'Environmental initiatives',
      'Social welfare activities'
    ]
  },
  {
    id: 'lts',
    name: 'LTS',
    fullName: 'Literacy Training Service',
    description: 'Programs designed to train students to become teachers of literacy and numeracy skills.',
    icon: Shield,
    color: 'bg-blue-600',
    benefits: [
      'Teaching literacy to communities',
      'Educational outreach programs',
      'Tutorial and mentorship activities',
      'Learning material development'
    ]
  },
  {
    id: 'mts-army',
    name: 'MTS (Army)',
    fullName: 'Military Training Service - Army',
    description: 'Military training program to motivate, train, organize and mobilize students for national defense.',
    icon: Shield,
    color: 'bg-orange-600',
    benefits: [
      'Military discipline and training',
      'Leadership development',
      'Physical fitness programs',
      'National defense preparation'
    ]
  },
  {
    id: 'mts-navy',
    name: 'MTS (Navy)',
    fullName: 'Military Training Service - Navy',
    description: 'Naval training program focused on maritime defense and coastal community service.',
    icon: Anchor,
    color: 'bg-indigo-600',
    benefits: [
      'Naval operations training',
      'Maritime safety and security',
      'Coastal community service',
      'Leadership at sea'
    ]
  }
];

export default function EnrollmentPage({ user, onEnroll }) {
  // Show completion message
  const hasCompletedGeneralEd = user.generalEducationComplete;
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleEnroll = () => {
    if (selectedComponent) {
      onEnroll(selectedComponent.name);
    }
  };

  return (
    <div className="size-full overflow-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          {hasCompletedGeneralEd && (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">General Education Complete - 25 Hours</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Select Your NSTP Component</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose the National Service Training Program component that aligns with your interests and career goals.
            Each component includes specialized training and community service.
          </p>
        </div>

        {/* Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {NSTP_COMPONENTS.map((component) => {
            const Icon = component.icon;
            const isSelected = selectedComponent?.id === component.id;

            return (
              <button
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={`text-left p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${component.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900">{component.name}</h3>
                      {isSelected && <CheckCircle className="w-5 h-5 text-blue-600" />}
                    </div>
                    <p className="text-sm text-slate-600">{component.fullName}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 mb-4">{component.description}</p>

                <div className="space-y-2">
                  {component.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Enroll Button */}
        {selectedComponent && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Ready to enroll in {selectedComponent.name}?
                </h3>
                <p className="text-sm text-slate-600">
                  You'll get access to all modules, assessments, and learning materials.
                </p>
              </div>
              <button
                onClick={handleEnroll}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Complete Enrollment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
