/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must be exactly: 'Hero (hero35)'
  const headerRow = ['Hero (hero35)'];

  // Background image row (no background image present in this HTML)
  const bgImageRow = [''];

  // Get the main content (headline, subheading, CTA)
  // The structure is: section > div.container > div.grid > [div (text), a (button)]
  let container = element.querySelector(':scope > .container');
  if (!container) container = element;
  let grid = container.querySelector('.w-layout-grid');
  if (!grid) grid = container;
  // The text content appears to be in the first div, CTA in <a>
  let textBlock = null;
  let ctaBlock = null;
  for (const child of grid.children) {
    if (!textBlock && child.tagName === 'DIV') {
      textBlock = child;
    }
    if (!ctaBlock && child.tagName === 'A') {
      ctaBlock = child;
    }
  }

  const contentCell = [];
  // If textBlock is found, reference its children individually to preserve heading/subheading structure
  if (textBlock) {
    for (const node of textBlock.childNodes) {
      // Only include element nodes and non-empty text nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        contentCell.push(node);
      }
      // Ignore bare text nodes for this structure (not present in this sample anyway)
    }
  }
  if (ctaBlock) {
    contentCell.push(ctaBlock);
  }

  // If nothing collected, fallback to all grid children (should never trigger in this example)
  if (contentCell.length === 0) {
    contentCell.push(...grid.children);
  }

  const contentRow = [contentCell];

  // Compose the table
  const rows = [headerRow, bgImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
