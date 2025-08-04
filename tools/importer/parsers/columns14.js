/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns14)'];

  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // In the provided HTML, the grid has two children: h2 and a div with remainder
    const col1 = document.createElement('div');
    const h2 = grid.querySelector('h2');
    const col2 = grid.querySelector('div');
    if (h2) col1.appendChild(h2);
    // Only include h2 in col1, all other content (the <div>) goes to col2
    // This matches the visual intent: left = heading, right = paragraph+button
    columns = [col1, col2];
  } else {
    // fallback: treat the whole element as one column
    columns = [element];
  }

  // The header row should be a single cell
  const rows = [headerRow];
  // The content row should contain as many columns as needed (here, 2)
  rows.push(columns);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
