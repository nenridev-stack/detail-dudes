'use client';

import { useState, useCallback, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Clock,
  MapPin,
  CarFront,
  CalendarX,
  ChevronDown,
} from 'lucide-react';
import type { FAQCategory } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Clock,
  MapPin,
  CarFront,
  CalendarX,
};

const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  duration: 0.3,
};

interface AccordionProps {
  categories: FAQCategory[];
}

export default function Accordion({ categories }: AccordionProps) {
  // Track which item is open per category (categoryId -> questionId | null)
  const [openItems, setOpenItems] = useState<Record<string, string | null>>({});
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const toggleItem = useCallback(
    (categoryId: string, questionId: string) => {
      setOpenItems((prev) => ({
        ...prev,
        [categoryId]:
          prev[categoryId] === questionId ? null : questionId,
      }));
    },
    []
  );

  // Build a flat list of all question IDs for arrow key navigation
  const allQuestionIds = categories.flatMap((cat) =>
    cat.questions.map((q) => q.id)
  );

  const handleKeyDown = useCallback(
    (
      e: KeyboardEvent<HTMLButtonElement>,
      categoryId: string,
      questionId: string
    ) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(categoryId, questionId);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = allQuestionIds.indexOf(questionId);
        const nextIndex = (currentIndex + 1) % allQuestionIds.length;
        const nextId = allQuestionIds[nextIndex];
        itemRefs.current.get(nextId)?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = allQuestionIds.indexOf(questionId);
        const prevIndex =
          (currentIndex - 1 + allQuestionIds.length) % allQuestionIds.length;
        const prevId = allQuestionIds[prevIndex];
        itemRefs.current.get(prevId)?.focus();
      }
    },
    [allQuestionIds, toggleItem]
  );

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon] || DollarSign;

        return (
          <section key={category.id} aria-labelledby={`category-${category.id}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-500/10 text-accent-400">
                <IconComponent className="w-5 h-5" />
              </div>
              <h2
                id={`category-${category.id}`}
                className="text-xl font-semibold text-white"
              >
                {category.name}
              </h2>
            </div>

            <div className="space-y-2">
              {category.questions.map((item) => {
                const isOpen = openItems[category.id] === item.id;
                const panelId = `panel-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-lg"
                  >
                    <button
                      ref={(el) => {
                        if (el) {
                          itemRefs.current.set(item.id, el);
                        }
                      }}
                      role="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(category.id, item.id)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, category.id, item.id)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left text-white font-medium hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
                    >
                      <span className="pr-4">{item.question}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={springTransition}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={item.id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={springTransition}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 pt-0 text-gray-400 leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
