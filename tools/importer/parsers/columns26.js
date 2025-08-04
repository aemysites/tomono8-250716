/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure .container and grid exist
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get heading and quote
  const heading = mainGrid.querySelector('p.h2-heading');
  const quote = mainGrid.querySelector('p.paragraph-lg');

  // Get the author+logo row grid
  const subGrids = mainGrid.querySelectorAll('.w-layout-grid.grid-layout');
  let authorLogoGrid = null;
  if (subGrids.length > 1) {
    authorLogoGrid = subGrids[1];
  } else {
    // fallback: try nested in mainGrid
    authorLogoGrid = mainGrid.querySelector('.w-layout-grid.grid-layout:not(:first-child)');
  }
  if (!authorLogoGrid) return;

  // Left: author avatar, author name/role
  const horzFlex = authorLogoGrid.querySelector('.flex-horizontal');
  // Right: logo (SVG)
  const logoDiv = authorLogoGrid.querySelector('.utility-display-inline-block');

  // Compose left column
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (horzFlex) leftCol.appendChild(horzFlex);

  // Compose right column
  const rightCol = document.createElement('div');
  if (quote) rightCol.appendChild(quote);
  if (logoDiv) rightCol.appendChild(logoDiv);

  // Correct header row: only one column
  const rows = [];
  rows.push(['Columns (columns26)']); // header row, one column only
  rows.push([leftCol, rightCol]); // data row, two columns

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
