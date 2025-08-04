/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows, starting with block/component header
  const rows = [['Cards (cards25)']];

  // Get all direct child cards (divs)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // First, attempt to locate the img
    const img = card.querySelector('img');
    // Attempt to locate the card's descriptive text content (h3 + p), if it exists
    let textCell = '';
    // Text content is in .utility-padding-all-2rem if present
    const contentDiv = card.querySelector('.utility-padding-all-2rem');
    if (contentDiv) {
      textCell = contentDiv;
    }
    rows.push([
      img ? img : '',
      textCell
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
