/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const headerRow = ['Cards'];
  const rows = [headerRow];

  // Get all immediate card elements (each card is a flex-horizontal)
  const cardNodes = element.querySelectorAll(':scope > div');

  cardNodes.forEach(card => {
    // Only use the <p> element for content, as in the example (no titles in this HTML)
    const p = card.querySelector('p');
    if (p) {
      rows.push([p]);
    }
  });
  // Create and replace with the Cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
