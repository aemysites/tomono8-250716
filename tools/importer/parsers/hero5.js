/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero5)'];

  // Extract image for background image (second row)
  const img = element.querySelector('img');

  // Extract content for third row (headline, subheading, CTA)
  // This is typically in the nested .w-layout-grid, then a div with heading, rich text, and button group
  let contentCell = [];
  // Find the inner grid containing the main content (look for heading inside a grid)
  let textContainer = null;
  const grids = element.querySelectorAll(':scope > .w-layout-grid');
  for (const grid of grids) {
    const innerGrids = grid.querySelectorAll(':scope > .w-layout-grid');
    for (const innerGrid of innerGrids) {
      // Look for direct child .section or div with heading
      const candidateDiv = innerGrid.querySelector('.section, div');
      if (candidateDiv && candidateDiv.querySelector('h1, h2, .h1-heading, .h2-heading')) {
        textContainer = candidateDiv;
        break;
      }
    }
    if (textContainer) break;
  }
  if (!textContainer) {
    // fallback: look for any heading in direct children
    textContainer = element.querySelector('h1, h2, .h1-heading, .h2-heading')?.parentElement;
  }
  if (textContainer) {
    // Heading
    const heading = textContainer.querySelector('h1, h2, .h1-heading, .h2-heading');
    if (heading) contentCell.push(heading);
    // Subheading/paragraphs
    const richText = textContainer.querySelector('.rich-text, .w-richtext, p');
    if (richText) contentCell.push(richText);
    // Button group
    const buttonGroup = textContainer.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }

  // Ensure at least an empty array if no content found
  if (contentCell.length === 0) contentCell = [''];

  // Construct the rows array
  const rows = [
    headerRow,
    [img || ''],
    [contentCell]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
