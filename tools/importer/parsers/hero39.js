/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create header row matching the block name exactly as in the example
  const headerRow = ['Hero (hero39)'];

  // 2. Extract the background image (if any)
  let bgImgEl = null;
  const gridLayout = element.querySelector('.w-layout-grid');
  if (gridLayout) {
    // Get all direct children divs
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    if (gridDivs.length > 0) {
      // Look for an img inside the first div
      bgImgEl = gridDivs[0].querySelector('img');
    }
  }

  // 3. Extract main content: heading, paragraph, button (link)
  let contentFragment = document.createDocumentFragment();
  if (gridLayout) {
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    if (gridDivs.length > 1) {
      const contentDiv = gridDivs[1];
      // Grab the inner grid layout if present
      let innerGrid = contentDiv.querySelector('.w-layout-grid');
      if (innerGrid) {
        // Heading
        const h1 = innerGrid.querySelector('h1');
        if (h1) contentFragment.appendChild(h1);
        // Find paragraph and button inside flex-vertical block
        const flexVertical = innerGrid.querySelector('.flex-vertical');
        if (flexVertical) {
          // Big paragraph
          const p = flexVertical.querySelector('p');
          if (p) contentFragment.appendChild(p);
          // Button link
          const buttonGroup = flexVertical.querySelector('.button-group');
          if (buttonGroup) {
            const btn = buttonGroup.querySelector('a');
            if (btn) contentFragment.appendChild(btn);
          }
        }
      }
    }
  }

  // Build the table rows as in the requirements (1 column, 3 rows)
  const rows = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentFragment]
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
