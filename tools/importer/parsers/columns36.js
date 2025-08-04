/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must be a single cell
  const headerRow = ['Columns (columns36)'];

  // Find the main container and grid for columns
  const container = element.querySelector('.container');
  let leftColContent = [];
  let rightColContent = [];

  if (container) {
    const grid = container.querySelector('.grid-layout');
    if (grid) {
      const gridChildren = Array.from(grid.children);
      const leftCol = gridChildren[0];
      const rightCol = gridChildren[1];
      if (leftCol) {
        const h1 = leftCol.querySelector('h1');
        if (h1) leftColContent.push(h1);
        const subheading = leftCol.querySelector('p');
        if (subheading) leftColContent.push(subheading);
        const btnGroup = leftCol.querySelector('.button-group');
        if (btnGroup) leftColContent.push(btnGroup);
      }
      if (rightCol) {
        let images = [];
        const imgGrid = rightCol.querySelector('.grid-layout');
        if (imgGrid) {
          images = Array.from(imgGrid.querySelectorAll('img'));
        } else {
          images = Array.from(rightCol.querySelectorAll('img'));
        }
        rightColContent = images;
      }
    }
  }

  // The header row MUST be a single-cell row
  // The second row contains both columns
  const cells = [
    headerRow, // single cell (header)
    [leftColContent, rightColContent] // two columns (data)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
