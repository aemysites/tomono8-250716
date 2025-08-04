/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid: text/heading/author/button area
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // The first child: left side (eyebrow + heading)
  const leftCol = mainGrid.children[0];
  // The second child: right side (paragraph, author, button)
  const rightCol = mainGrid.children[1];

  // Compose the left column content
  // Eyebrow and heading
  const leftEyebrow = leftCol && leftCol.querySelector('.eyebrow');
  const leftHeading = leftCol && leftCol.querySelector('h1');

  // Paragraph
  const rightPara = rightCol && rightCol.querySelector('.rich-text');
  // Author/Meta block (avatar, name, date, read time)
  const authorBlock = rightCol && rightCol.querySelector('.grid-layout > .flex-horizontal');
  // Button
  const readMoreBtn = rightCol && rightCol.querySelector('a.button');

  // Compose the first column cell: all content in a single wrapper
  const leftCell = document.createElement('div');
  if (leftEyebrow) leftCell.appendChild(leftEyebrow);
  if (leftHeading) leftCell.appendChild(leftHeading);
  if (rightPara) leftCell.appendChild(rightPara);
  if (authorBlock) leftCell.appendChild(authorBlock);
  if (readMoreBtn) leftCell.appendChild(readMoreBtn);

  // The second grid: two square images
  const imgGrid = container.parentElement.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCells = [];
  if (imgGrid) {
    const imgDivs = imgGrid.querySelectorAll('.utility-aspect-1x1');
    for (let i = 0; i < imgDivs.length; i++) {
      const img = imgDivs[i].querySelector('img');
      imgCells.push(img || '');
    }
  }
  // If less than 2 images, pad with empty string
  while (imgCells.length < 2) imgCells.push('');

  // Fix: Make the header row a single cell (spanning all columns conceptually)
  const headerRow = ['Columns (columns11)'];
  const blockRow = [leftCell, imgCells[0], imgCells[1]];
  const cells = [headerRow, blockRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
