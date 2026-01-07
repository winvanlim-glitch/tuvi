import { useState, useMemo, useCallback } from 'react';
import { TarotCard } from '@/data/tarot/deck';

export type DrawMode = 'single' | 'three' | 'yesno';
export type FocusTab = 'love' | 'work' | 'finance' | 'health';

export type DrawnCard = {
  card: TarotCard;
  reversed: boolean;
  position?: 'past' | 'present' | 'future';
};

export const useTarotDraw = (deck: TarotCard[], mode: DrawMode = 'single', allowReverse: boolean = true) => {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [focusTab, setFocusTab] = useState<FocusTab>('love');
  const [hasDrawn, setHasDrawn] = useState(false);

  const shuffleDeck = useCallback(() => {
    return [...deck].sort(() => Math.random() - 0.5);
  }, [deck]);

  const drawCard = useCallback((): DrawnCard => {
    const shuffled = shuffleDeck();
    const card = shuffled[Math.floor(Math.random() * shuffled.length)];
    const reversed = allowReverse && Math.random() > 0.5;
    return { card, reversed };
  }, [shuffleDeck, allowReverse]);

  const draw = useCallback(() => {
    setIsShuffling(true);
    setFocusTab('love');

    setTimeout(() => {
      let newCards: DrawnCard[] = [];

      if (mode === 'single') {
        newCards = [drawCard()];
      } else if (mode === 'three') {
        const cards = [drawCard(), drawCard(), drawCard()];
        newCards = [
          { ...cards[0], position: 'past' },
          { ...cards[1], position: 'present' },
          { ...cards[2], position: 'future' },
        ];
      } else if (mode === 'yesno') {
        newCards = [drawCard()];
      }

      setDrawnCards(newCards);
      setHasDrawn(true);
      setIsShuffling(false);
    }, 700);
  }, [mode, drawCard]);

  const reshuffle = useCallback(() => {
    setHasDrawn(false);
    setDrawnCards([]);
    setFocusTab('love');
  }, []);

  const getAdvice = useCallback((card: DrawnCard, tab: FocusTab): string => {
    const content = card.reversed ? card.card.reversed : card.card.upright;
    return content[tab];
  }, []);

  return {
    drawnCards,
    isShuffling,
    focusTab,
    hasDrawn,
    setFocusTab,
    draw,
    reshuffle,
    getAdvice,
  };
};

