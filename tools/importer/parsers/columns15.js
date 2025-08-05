/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (multi-column container)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Build the row of columns, ensuring all content (text, headings, buttons, images) is included
  const contentRow = columns.map((col) => {
    // For img, include as-is
    if (col.tagName === 'IMG') return col;
    // For others, create a wrapper and move all content (including text nodes)
    const wrapper = document.createElement('div');
    Array.from(col.childNodes).forEach(node => wrapper.appendChild(node));
    // If there is extra text in col (not in children), include it as well
    if (col.childNodes.length === 0 && col.textContent.trim()) {
      wrapper.textContent = col.textContent.trim();
    }
    return wrapper;
  });

  // Table header must match the example exactly
  const cells = [
    ['Columns (columns15)'],
    contentRow
  ];
  
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
