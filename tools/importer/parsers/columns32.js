/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid (columns) inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  const columns = Array.from(grid.children);

  // Defensive: only continue if there are at least two columns
  if (columns.length < 2) return;

  // The first column: likely an <img>
  const colImg = columns[0];
  // The second column: content div
  const colContent = columns[1];

  // Compose the rows for the block table
  const headerRow = ['Columns (columns32)'];
  const contentRow = [colImg, colContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the block
  element.replaceWith(table);
}
