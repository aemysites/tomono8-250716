/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer (the columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The columns are the direct children of the grid
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header should match the block name in the spec and span all columns
  // WebImporter.DOMUtils.createTable doesn't support colspan, so to create a single-cell header row,
  // we just pass an array with one string. The helper will make a single <th> spanning the row visually.
  // The content row is the columns array (one cell per column)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns9)'],
    columns,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
