/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  // Find the background image: <img> inside .ix-parallax-scale-out-hero
  let bgImg = '';
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    const img = parallaxDiv.querySelector('img');
    if (img) {
      bgImg = img;
    }
  }
  const imageRow = [bgImg];

  // 3. Content row (headline, subheading, CTA)
  // The main content container is .container .utility-margin-bottom-6rem
  let contentCell = '';
  const container = element.querySelector('.container');
  if (container) {
    const mainContent = container.querySelector('.utility-margin-bottom-6rem');
    if (mainContent) {
      contentCell = mainContent;
    } else {
      // fallback to container if .utility-margin-bottom-6rem is missing
      contentCell = container;
    }
  }
  const contentRow = [contentCell];

  // Compose the rows for the block table
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}