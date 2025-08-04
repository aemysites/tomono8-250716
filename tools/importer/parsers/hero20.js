/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name
  const headerRow = ['Hero (hero20)'];

  // Row 2: All background images as a single cell
  let imagesCell = '';
  const imageGrid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout.desktop-3-column');
  if (imageGrid) {
    const imgs = Array.from(imageGrid.querySelectorAll('img'));
    if (imgs.length > 0) {
      // Use a fragment to avoid reparenting issues, place all images together
      const frag = document.createDocumentFragment();
      imgs.forEach(img => frag.appendChild(img));
      imagesCell = frag;
    }
  }

  // Row 3: Content (heading, subheading, buttons) as a single cell
  let contentCell = '';
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container, .ix-hero-scale-3x-to-1x-content');
  if (contentDiv) {
    contentCell = contentDiv;
  }

  const cells = [
    headerRow,
    [imagesCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
