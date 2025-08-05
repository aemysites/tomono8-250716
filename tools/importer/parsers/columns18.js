/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid children may include a main content div, a contacts ul, and an image
  const gridChildren = Array.from(grid.children);
  let contentCol = null;
  let contactsCol = null;
  let imageCol = null;

  for (const child of gridChildren) {
    // Find the text content column (with h2/h3/p)
    if (
      child.querySelector('h2') ||
      child.querySelector('h3') ||
      child.querySelector('p')
    ) {
      contentCol = child;
    }
    // Find the ul contacts column
    if (child.tagName === 'UL' || child.querySelector('ul')) {
      contactsCol = child;
      if (child.tagName !== 'UL') {
        contactsCol = child.querySelector('ul');
      }
    }
    // Find the image column
    if (child.tagName === 'IMG' || child.querySelector('img')) {
      imageCol = child;
      if (child.tagName !== 'IMG') {
        imageCol = child.querySelector('img');
      }
    }
  }
  // Fallbacks in case the above didn't find them
  if (!contactsCol) {
    contactsCol = grid.querySelector('ul');
  }
  if (!imageCol) {
    imageCol = grid.querySelector('img');
  }

  // Left column: main content and contacts list. Right column: image.
  const leftCell = [];
  if (contentCol) leftCell.push(contentCol);
  if (contactsCol) leftCell.push(contactsCol);

  const rightCell = [];
  if (imageCol) rightCell.push(imageCol);

  // Table header exactly as specified: ONE cell
  const headerRow = ['Columns (columns18)'];
  // Content row: two cells for the columns
  const contentRow = [leftCell, rightCell];

  // Compose table rows: header with one cell, content row with two cells
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
