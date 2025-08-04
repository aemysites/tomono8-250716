/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // There should be 4 main children for this grid (left col, tags, heading, rich text)
  // Defensive: Only include columns that actually exist
  const col1 = gridChildren[0] || '';
  const col2 = gridChildren[1] || '';
  // For col3, heading and rich text should be combined in a single cell, if both exist
  let col3 = '';
  if (gridChildren[2] && gridChildren[3]) {
    col3 = [gridChildren[2], gridChildren[3]];
  } else if (gridChildren[2]) {
    col3 = gridChildren[2];
  } else if (gridChildren[3]) {
    col3 = gridChildren[3];
  } else {
    col3 = '';
  }

  const headerRow = ['Columns (columns30)'];
  const contentRow = [col1, col2, col3];
  
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}
