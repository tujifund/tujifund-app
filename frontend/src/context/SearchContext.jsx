import React, { createContext, useState, useContext } from 'react';
import { Group } from '@mui/icons-material';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration - replace with actual API calls
  const mockData = {
    chamas: [
      { id: 1, name: 'Intel kwote', type: 'chama', members: 10 },
      { id: 2, name: 'Savings Group B', type: 'chama', members: 20 },
    ],
    members: [
      { id: 1, name: 'John Doe', type: 'member' },
      { id: 2, name: 'Jane Smith', type: 'member' },
    ],
    meetings: [
      { id: 1, title: 'Monthly Meeting', type: 'meeting' },
      { id: 2, title: 'Emergency Meeting', type: 'meeting' },
    ],
    transactions: [
      { id: 1, description: 'Monthly Contribution', type: 'transaction' },
      { id: 2, description: 'Loan Payment', type: 'transaction' },
    ],
  };

  const performSearch = async (searchTerm) => {
    setIsSearching(true);
    setGlobalSearchTerm(searchTerm);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      const searchTermLower = searchTerm.toLowerCase();

      // Search through all data types
      const results = [
        ...mockData.chamas
          .filter(chama => chama.name.toLowerCase().includes(searchTermLower))
          .map(chama => ({
            title: chama.name,
            description: `${chama.members} members • ${chama.type}`,
            icon: <Group />,
            url: `/ChamaDashboard/${chama.id}/home`,
          })),
        ...mockData.members
          .filter(member => member.name.toLowerCase().includes(searchTermLower))
          .map(member => ({
            ...member,
            icon: '👤',
            url: `/members/${member.id}`,
          })),
        ...mockData.meetings
          .filter(meeting => meeting.title.toLowerCase().includes(searchTermLower))
          .map(meeting => ({
            ...meeting,
            icon: '📅',
            url: `/meetings/${meeting.id}`,
          })),
        ...mockData.transactions
          .filter(tx => tx.description.toLowerCase().includes(searchTermLower))
          .map(tx => ({
            ...tx,
            icon: '💰',
            url: `/transactions/${tx.id}`,
          })),
      ];

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setGlobalSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        globalSearchTerm,
        searchResults,
        isSearching,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
