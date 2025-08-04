/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns (immediate child divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Create a header row with a single cell for the header (spanning all columns visually)
  const headerRow = ['Columns (columns7)'];
  // Create a row with one cell per column
  const contentRow = columns.map(col => col);
  // Assemble the table: header row (1 cell), then content row (N cells)
  const tableArr = [headerRow, contentRow];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  // Replace the original element
  element.replaceWith(block);
}
