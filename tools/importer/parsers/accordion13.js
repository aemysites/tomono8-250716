/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row with the exact block name as specified
  const rows = [['Accordion (accordion13)']];

  // Each direct child with class 'divider' is an accordion item
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Find the inner grid that contains both the title and the content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The grid always has at least two children: title and content
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    // Always reference the actual DOM nodes as required
    rows.push([title, content]);
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
