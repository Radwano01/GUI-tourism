import React, { useState } from 'react';
import CountriesListPage from './country/CountriesListPage';
import GetPlanesPage from './plane/GetPlanesPage';

const SECTIONS = {
  COUNTRY: 'COUNTRY',
  PLANE: 'PLANE'
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS.COUNTRY);

  const renderContent = () => {
    switch (activeSection) {
      case SECTIONS.COUNTRY:
        return <CountriesListPage />;
      case SECTIONS.PLANE:
        return <GetPlanesPage />;
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-semibold border-b border-gray-600">
          Admin Dashboard
        </div>
        <div className="flex-1">
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === SECTIONS.COUNTRY ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveSection(SECTIONS.COUNTRY)}
          >
            Country
          </button>
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === SECTIONS.PLANE ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveSection(SECTIONS.PLANE)}
          >
            Plane
          </button>
        </div>
      </div>

      {/* Main Content - Render the selected section */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;