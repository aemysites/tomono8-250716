/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid, which are columns
  const columns = Array.from(grid.children);

  // Header row: exactly one column with correct header text
  const headerRow = ['Columns (columns31)'];

  // Content row: one cell per column, referencing each column element
  const contentRow = columns.map((col) => col);

  // Build the table: header row has one column, second row has as many as needed
  const tableRows = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace element with the new table
  element.replaceWith(table);
}
