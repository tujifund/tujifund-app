import React, { createContext, useState, useContext, useCallback } from 'react';

const ChamaContext = createContext();

export const useChama = () => {
  const context = useContext(ChamaContext);
  if (!context) {
    throw new Error('useChama must be used within a ChamaProvider');
  }
  return context;
};

export const ChamaProvider = ({ children }) => {
  const [chamaSearchTerm, setChamaSearchTerm] = useState('');
  const [chamaSearchResults, setChamaSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration - replace with actual API calls
  const mockChamaData = {
    members: [
      { id: 1, name: 'John Doe', role: 'Chairperson', type: 'member' },
      { id: 2, name: 'Jane Smith', role: 'Treasurer', type: 'member' },
      { id: 3, name: 'Alice Johnson', role: 'Secretary', type: 'member' },
    ],
    meetings: [
      { 
        id: 1, 
        title: 'Monthly General Meeting', 
        date: '2024-01-20',
        type: 'meeting'
      },
      { 
        id: 2, 
        title: 'Emergency Fund Discussion', 
        date: '2024-01-25',
        type: 'meeting'
      },
    ],
    loans: [
      {
        id: 1,
        borrower: 'John Doe',
        amount: 50000,
        status: 'Active',
        type: 'loan'
      },
      {
        id: 2,
        borrower: 'Jane Smith',
        amount: 30000,
        status: 'Pending',
        type: 'loan'
      },
    ],
    contributions: [
      {
        id: 1,
        member: 'John Doe',
        amount: 5000,
        date: '2024-01-10',
        type: 'contribution'
      },
      {
        id: 2,
        member: 'Jane Smith',
        amount: 5000,
        date: '2024-01-10',
        type: 'contribution'
      },
    ],
    goals: [
      {
        id: 1,
        title: 'Real Estate Investment',
        target: 1000000,
        current: 750000,
        type: 'goal'
      },
      {
        id: 2,
        title: 'Emergency Fund',
        target: 500000,
        current: 300000,
        type: 'goal'
      },
    ],
  };

  const performChamaSearch = useCallback(async (searchTerm) => {
    setIsSearching(true);
    setChamaSearchTerm(searchTerm);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!searchTerm.trim()) {
        setChamaSearchResults([]);
        return;
      }

      const searchTermLower = searchTerm.toLowerCase();

      const results = [
        ...mockChamaData.members
          .filter(member => 
            member.name.toLowerCase().includes(searchTermLower) ||
            member.role.toLowerCase().includes(searchTermLower)
          )
          .map(member => ({
            ...member,
            icon: '👤',
            title: member.name,
            subtitle: member.role,
            url: `membership`,
          })),
        ...mockChamaData.meetings
          .filter(meeting => 
            meeting.title.toLowerCase().includes(searchTermLower)
          )
          .map(meeting => ({
            ...meeting,
            icon: '📅',
            subtitle: `Scheduled for ${meeting.date}`,
            url: `meetings`,
          })),
        ...mockChamaData.loans
          .filter(loan => 
            loan.borrower.toLowerCase().includes(searchTermLower) ||
            loan.status.toLowerCase().includes(searchTermLower)
          )
          .map(loan => ({
            ...loan,
            icon: '💰',
            title: `${loan.borrower}'s Loan`,
            subtitle: `KES ${loan.amount} - ${loan.status}`,
            url: `loans`,
          })),
        ...mockChamaData.contributions
          .filter(contribution => 
            contribution.member.toLowerCase().includes(searchTermLower)
          )
          .map(contribution => ({
            ...contribution,
            icon: '💵',
            title: `${contribution.member}'s Contribution`,
            subtitle: `KES ${contribution.amount} on ${contribution.date}`,
            url: `accounts`,
          })),
        ...mockChamaData.goals
          .filter(goal => 
            goal.title.toLowerCase().includes(searchTermLower)
          )
          .map(goal => ({
            ...goal,
            icon: '🎯',
            subtitle: `KES ${goal.current} / ${goal.target}`,
            url: `goals`,
          })),
      ];

      setChamaSearchResults(results);
    } catch (error) {
      console.error('Chama search error:', error);
      setChamaSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearChamaSearch = () => {
    setChamaSearchTerm('');
    setChamaSearchResults([]);
    setIsSearching(false);
  };

  return (
    <ChamaContext.Provider
      value={{
        chamaSearchTerm,
        chamaSearchResults,
        isSearching,
        performChamaSearch,
        clearChamaSearch,
      }}
    >
      {children}
    </ChamaContext.Provider>
  );
};
