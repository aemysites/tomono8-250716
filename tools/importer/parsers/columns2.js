/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are working within the correct DOM structure
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid layout should have three main children for this block
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // Left column (Main card)
  const leftCol = gridChildren[0];
  // Right column: top (cards with images/text)
  const rightColTop = gridChildren[1];
  // Right column: bottom (vertical stack of cards separated by dividers)
  const rightColBottom = gridChildren[2];

  // Right column wrapper to match the visual grouping
  const rightColWrapper = document.createElement('div');
  // Only append if non-empty
  if (rightColTop && rightColTop.childNodes.length > 0) rightColWrapper.appendChild(rightColTop);
  if (rightColBottom && rightColBottom.childNodes.length > 0) rightColWrapper.appendChild(rightColBottom);

  // Build the block table as per the markdown example
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightColWrapper];

  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(blockTable);
}
