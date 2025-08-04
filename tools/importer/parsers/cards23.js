/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .w-tab-pane (tab content) in the element
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  // Find the active tab (with .w--tab-active), else fallback to first
  let activePane = Array.from(tabPanes).find(p => p.classList.contains('w--tab-active')) || tabPanes[0];
  if (!activePane) return;
  // Find the grid that contains the cards
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;
  // Header row, must match example exactly
  const rows = [['Cards (cards23)']];
  // Each direct child <a> is a card
  const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
  for (const card of cards) {
    // IMAGE cell: first img descendant, or '' if none
    const img = card.querySelector('img');
    const imageCell = img || '';
    // TEXT cell: collect all non-image content in the card
    // Strategy: gather all heading and paragraph type elements (including those nested)
    let textElements = [];
    // Any headings inside the card
    const headings = card.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => {
      if (!textElements.includes(h)) textElements.push(h);
    });
    // Any .paragraph-sm (description, can be nested)
    const paragraphs = card.querySelectorAll('.paragraph-sm');
    paragraphs.forEach(p => {
      if (!textElements.includes(p)) textElements.push(p);
    });
    // Fallback: If nothing found, just grab all text node children except image wrappers
    if (textElements.length === 0) {
      Array.from(card.childNodes).forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE && !child.querySelector('img')) {
          textElements.push(child);
        }
      });
    }
    // Remove duplicates
    textElements = [...new Set(textElements)];
    // If still empty, fallback to text content
    const textCell = textElements.length ? textElements : card.textContent.trim();
    rows.push([imageCell, textCell]);
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
