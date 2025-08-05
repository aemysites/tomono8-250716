/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // We expect two columns: one text, one image
  // Find the content column (div) and the image column (img)
  let contentCol = null, imageCol = null;
  columns.forEach(col => {
    if (!contentCol && col.tagName === 'DIV') {
      contentCol = col;
    } else if (!imageCol && col.tagName === 'IMG') {
      imageCol = col;
    }
  });

  // Fallbacks if structure is unexpected
  if (!contentCol && columns.length > 0) {
    contentCol = columns[0];
  }
  if (!imageCol && columns.length > 1) {
    imageCol = columns[1];
  }

  // Compose the table (header row, then content row with two cells)
  const headerRow = ['Columns (columns27)'];
  const contentRow = [contentCol, imageCol];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
