/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the requirements
  const headerRow = ['Columns (columns29)'];

  // Find all direct children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column is a div (utility-aspect-1x1), containing the image we want
  // We reference each div directly as a table cell for resilience

  // If there are no columns, do nothing
  if (!columns.length) return;

  const rows = [
    headerRow,
    columns // each column goes in its own cell in the content row
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}