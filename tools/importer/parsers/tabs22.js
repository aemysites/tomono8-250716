/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu (contains tab labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = Array.from(tabMenu ? tabMenu.querySelectorAll('a') : []);
  // Get the tab content container (contains tab panes)
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = Array.from(tabContent ? tabContent.children : []);

  // Build rows, beginning with header row: a SINGLE cell (not multi-column)
  const rows = [];
  rows.push(['Tabs']);

  // For each tab, get label and content
  for (let i = 0; i < Math.min(tabLinks.length, tabPanes.length); i++) {
    // Tab label: find the innermost div (for text), fallback to link text
    let labelDiv = tabLinks[i].querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    // Tab content: use the grid if found, else the pane itself
    let contentGrid = tabPanes[i].querySelector('.w-layout-grid, .grid-layout');
    let contentEl = contentGrid || tabPanes[i];
    rows.push([label, contentEl]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Make header row a single cell spanning two columns, if more than one column exists
  if (rows.length > 1 && block.rows.length > 0) {
    const th = block.rows[0].cells[0];
    th.colSpan = '2';
  }
  // Replace the original element with the new table
  element.replaceWith(block);
}
