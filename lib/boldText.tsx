import React from 'react';

/**
 * Converts a string with **bold** markers into an array of React nodes.
 * e.g. "Hello **World**" → ["Hello ", <strong>World</strong>]
 */
export function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
