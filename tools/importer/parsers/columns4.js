/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct children of the grid (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the content row for the columns
  const contentRow = columns.map((col) => {
    // If the column contains only an image, reference that image directly
    if (
      col.children.length === 1 &&
      col.children[0].tagName === 'IMG' &&
      col.textContent.trim() === ''
    ) {
      return col.children[0];
    }
    // Otherwise, use the entire column div
    return col;
  });

  // Assemble the table data
  const cells = [['Columns (columns4)'], contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Ensure the header cell spans all columns (critical: set colspan)
  const th = table.querySelector('tr:first-child th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }

  element.replaceWith(table);
}
