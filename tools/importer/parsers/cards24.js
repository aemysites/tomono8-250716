/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Find all direct card <a> children
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // --- LEFT CELL: image ---
    let imageEl = null;
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }
    // --- RIGHT CELL: text content ---
    const textCellParts = [];

    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Use the *existing* tagRow for semantic fidelity
      textCellParts.push(tagRow);
    }

    // Heading
    // Accept h3 or any element with .h4-heading for resilience
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      textCellParts.push(heading);
    }
    // Compose cell content
    let textCell = textCellParts.length === 1 ? textCellParts[0] : textCellParts;
    // If both parts missing, prevent empty cell
    if (!textCell || (Array.isArray(textCell) && textCell.length === 0)) {
      textCell = '';
    }
    rows.push([imageEl, textCell]);
  });

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
