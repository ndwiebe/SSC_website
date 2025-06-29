import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Card {
  id: string;
  playerName: string;
  description: string;
  grade: string;
  price: number | null;
  notes: string;
  imageUrl: string;
  featured: boolean;
  sold: boolean;
  claimedBy?: string;
  claimedAt?: Date;
  team?: string;
  year?: number;
}

interface CardContextType {
  cards: Card[];
  featuredCards: Card[];
  availableCards: Card[];
  claimCard: (cardId: string, userId: string) => void;
  releaseCard: (cardId: string) => void;
  addToWishlist: (cardId: string) => void;
  removeFromWishlist: (cardId: string) => void;
  isLoading: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};

interface CardProviderProps {
  children: ReactNode;
}

// Mock data - replace with Google Sheets integration
const mockCards: Card[] = [
  {
    id: '1',
    playerName: 'Connor McDavid',
    description: '2015-16 Upper Deck Young Guns Rookie Card',
    grade: 'PSA 10',
    price: 1200,
    notes: 'Gem Mint condition, perfect centering',
    imageUrl: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: true,
    sold: false,
    team: 'Edmonton Oilers',
    year: 2015
  },
  {
    id: '2',
    playerName: 'Sidney Crosby',
    description: '2005-06 Upper Deck Young Guns Rookie Card',
    grade: 'BGS 9.5',
    price: 800,
    notes: 'Near mint-mint condition',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: true,
    sold: false,
    team: 'Pittsburgh Penguins',
    year: 2005
  },
  {
    id: '3',
    playerName: 'Wayne Gretzky',
    description: '1979-80 O-Pee-Chee Rookie Card',
    grade: 'SGC 8',
    price: 15000,
    notes: 'Iconic rookie card, excellent condition',
    imageUrl: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: true,
    sold: false,
    team: 'Edmonton Oilers',
    year: 1979
  },
  {
    id: '4',
    playerName: 'Nathan MacKinnon',
    description: '2013-14 Upper Deck Young Guns',
    grade: 'PSA 9',
    price: 450,
    notes: 'Mint condition',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false,
    sold: false,
    team: 'Colorado Avalanche',
    year: 2013
  },
  {
    id: '5',
    playerName: 'Auston Matthews',
    description: '2016-17 Upper Deck Young Guns',
    grade: 'BGS 9',
    price: 350,
    notes: 'Near mint condition',
    imageUrl: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false,
    sold: false,
    team: 'Toronto Maple Leafs',
    year: 2016
  },
  {
    id: '6',
    playerName: 'Leon Draisaitl',
    description: '2014-15 Upper Deck Young Guns',
    grade: 'PSA 8',
    price: 200,
    notes: 'Near mint condition',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
    featured: false,
    sold: true,
    team: 'Edmonton Oilers',
    year: 2014
  }
];

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [isLoading, setIsLoading] = useState(false);

  const featuredCards = cards.filter(card => card.featured && !card.sold);
  const availableCards = cards.filter(card => !card.sold);

  const claimCard = (cardId: string, userId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, claimedBy: userId, claimedAt: new Date() }
        : card
    ));
  };

  const releaseCard = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, claimedBy: undefined, claimedAt: undefined }
        : card
    ));
  };

  const addToWishlist = (cardId: string) => {
    // This would integrate with user context
    console.log('Added to wishlist:', cardId);
  };

  const removeFromWishlist = (cardId: string) => {
    // This would integrate with user context
    console.log('Removed from wishlist:', cardId);
  };

  const value: CardContextType = {
    cards,
    featuredCards,
    availableCards,
    claimCard,
    releaseCard,
    addToWishlist,
    removeFromWishlist,
    isLoading
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};