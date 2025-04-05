import React, { useState } from 'react';
import { FileText, Layout, Eye, Download, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface ResumeSection {
  id: string;
  type: 'education' | 'experience' | 'skills' | 'projects';
  title: string;
  items: ResumeItem[];
}

interface ResumeItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string[];
}

const ResumeBuilder = () => {
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  });
  const [sections, setSections] = useState<ResumeSection[]>([
    {
      id: '1',
      type: 'experience',
      title: 'Work Experience',
      items: [],
    },
    {
      id: '2',
      type: 'education',
      title: 'Education',
      items: [],
    },
    {
      id: '3',
      type: 'skills',
      title: 'Skills',
      items: [],
    },
  ]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (sectionId: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: [...section.items, {
            id: Date.now().toString(),
            title: '',
            subtitle: '',
            date: '',
            description: [''],
          }],
        };
      }
      return section;
    }));
  };

  const removeItem = (sectionId: string, itemId: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId),
        };
      }
      return section;
    }));
  };

  const updateItem = (sectionId: string, itemId: string, field: string, value: string | string[]) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id === itemId) {
              return { ...item, [field]: value };
            }
            return item;
          }),
        };
      }
      return section;
    }));
  };

  const addBulletPoint = (sectionId: string, itemId: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                description: [...item.description, ''],
              };
            }
            return item;
          }),
        };
      }
      return section;
    }));
  };

  const removeBulletPoint = (sectionId: string, itemId: string, bulletIndex: number) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                description: item.description.filter((_, index) => index !== bulletIndex),
              };
            }
            return item;
          }),
        };
      }
      return section;
    }));
  };

  const updateBulletPoint = (sectionId: string, itemId: string, bulletIndex: number, value: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id === itemId) {
              const newDescription = [...item.description];
              newDescription[bulletIndex] = value;
              return {
                ...item,
                description: newDescription,
              };
            }
            return item;
          }),
        };
      }
      return section;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-5 w-5 mr-2" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor */}
        <div className={`lg:col-span-${showPreview ? '6' : '12'} space-y-6`}>
          {/* Template Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Template</h2>
            <div className="grid grid-cols-3 gap-4">
              {['modern', 'professional', 'creative'].map(template => (
                <button
                  key={template}
                  onClick={() => setActiveTemplate(template)}
                  className={`p-4 border-2 rounded-lg ${
                    activeTemplate === template
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <Layout className="h-6 w-6 mx-auto mb-2" />
                  <span className="block text-sm capitalize">{template}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                <textarea
                  value={personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Resume Sections */}
          {sections.map(section => (
            <div key={section.id} className="bg-white rounded-lg shadow-lg p-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                {activeSection === section.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>

              {activeSection === section.id && (
                <div className="mt-4 space-y-4">
                  {section.items.map((item, index) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Item {index + 1}</h3>
                        <button
                          onClick={() => removeItem(section.id, item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Jan 2020 - Present"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          {item.description.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-start space-x-2 mb-2">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => updateBulletPoint(section.id, item.id, bulletIndex, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Add bullet point"
                              />
                              <button
                                onClick={() => removeBulletPoint(section.id, item.id, bulletIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addBulletPoint(section.id, item.id)}
                            className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                          >
                            + Add Bullet Point
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addItem(section.id)}
                    className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:text-indigo-500 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add {section.title} Item
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <div className="prose max-w-none">
                <h1 className="text-3xl font-bold text-center mb-4">{personalInfo.name || 'Your Name'}</h1>
                <div className="text-center text-gray-600 mb-6">
                  {personalInfo.email && <span className="mx-2">{personalInfo.email}</span>}
                  {personalInfo.phone && <span className="mx-2">{personalInfo.phone}</span>}
                  {personalInfo.location && <span className="mx-2">{personalInfo.location}</span>}
                </div>

                {personalInfo.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Professional Summary</h2>
                    <p className="text-gray-700">{personalInfo.summary}</p>
                  </div>
                )}

                {sections.map(section => (
                  <div key={section.id} className="mb-6">
                    <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">{section.title}</h2>
                    {section.items.map(item => (
                      <div key={item.id} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{item.title || 'Position/Degree'}</h3>
                            {item.subtitle && <div className="text-gray-600">{item.subtitle}</div>}
                          </div>
                          {item.date && <div className="text-gray-600">{item.date}</div>}
                        </div>
                        <ul className="list-disc list-inside text-gray-700">
                          {item.description.map((bullet, index) => (
                            bullet && <li key={index}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;