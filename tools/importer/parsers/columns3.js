/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (the columns)
  const columns = Array.from(grid.children);

  // Defensive: skip if no columns found
  if (columns.length === 0) return;

  // Table header row: must match exactly
  const headerRow = ['Columns (columns3)'];

  // Table body row: as many columns as there are column divs
  // Reference the existing elements directly
  const bodyRow = columns;

  // Compose the cells array
  const cells = [
    headerRow,
    bodyRow
  ];

  // Create the table block using the utility
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
