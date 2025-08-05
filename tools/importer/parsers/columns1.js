/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout that defines the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The header row MUST be a single cell
  const headerRow = ['Columns (columns1)'];
  // The content row contains one cell per column
  const contentRow = columns;

  // Compose the cells as per the required structure
  const cells = [
    headerRow,    // single header cell
    contentRow    // content row with two cells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
