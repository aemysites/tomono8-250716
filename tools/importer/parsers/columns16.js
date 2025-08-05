/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Each direct child of the grid is a column
  const columnDivs = Array.from(grid.children);
  // For each column, gather its content (in this case, the image wrapper)
  const cells = columnDivs.map(col => {
    // Use the whole column content, not just the img, for maximum resilience
    return col;
  });
  // Header row: single cell with exact header text from the example
  const headerRow = ['Columns (columns16)'];
  // Table rows: [[header], [columns...]]
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);
  element.replaceWith(table);
}
