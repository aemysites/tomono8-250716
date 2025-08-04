/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Must exactly match the example
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row: Find the background image (cover-image with utility-position-absolute)
  let bgImg = null;
  const bgImgCandidates = element.querySelectorAll('img.cover-image');
  for (const img of bgImgCandidates) {
    if (img.classList.contains('utility-position-absolute')) {
      bgImg = img;
      break;
    }
  }
  // Fallback: use first cover-image if no absolute one found
  if (!bgImg && bgImgCandidates.length > 0) {
    bgImg = bgImgCandidates[0];
  }

  // 3. Content cell: Headline, subheading, cta (all content in card-body)
  let contentCell = null;
  // The structure is:
  // section > .w-layout-grid > .container > .card > .card-body
  const container = element.querySelector('.container');
  if (container) {
    const cardBody = container.querySelector('.card-body');
    if (cardBody) {
      contentCell = cardBody;
    } else {
      // fallback: use container if card-body is missing
      contentCell = container;
    }
  } else {
    // fallback: use the element itself
    contentCell = element;
  }

  // 4. Compose table: Only one table per block
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell],
  ];

  // 5. Replace the element with this table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
