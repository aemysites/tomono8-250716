/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block: 2 columns, multiple rows, each card is an image and text content
  const headerRow = ['Cards (cards17)'];

  // Get all .utility-aspect-1x1 immediate children (each represents a card)
  const cards = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));

  // Each card: first cell is the <img>, second cell is all available text (alt text in this case)
  const rows = cards.map(card => {
    const img = card.querySelector('img');
    let textCell = '';
    if (img && img.alt && img.alt.trim()) {
      // Prefer to display strong for bracketed info (simulate a heading), rest as a description
      let alt = img.alt.trim();
      let strong = null;
      let remainder = '';
      const bracketMatch = alt.match(/^(.*?)\s*(\(.*\))?$/);
      if (bracketMatch) {
        strong = bracketMatch[1] ? document.createElement('strong') : null;
        if (strong) strong.textContent = bracketMatch[1].trim();
        remainder = bracketMatch[2] ? bracketMatch[2].replace(/[()]/g, '').trim() : '';
      }
      if (strong && remainder) {
        const p = document.createElement('p');
        p.textContent = remainder;
        textCell = [strong, p];
      } else if (strong) {
        textCell = strong;
      } else {
        textCell = alt;
      }
    }
    // Reference *existing* elements only
    return [img, textCell];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
