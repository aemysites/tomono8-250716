/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one column only
  const headerRow = ['Columns (columns38)'];

  // Content row: as many columns as direct children
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = columns;

  // createTable expects an array of rows; each row is an array of cells
  // Header row is single-cell, second row is columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
