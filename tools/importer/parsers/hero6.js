/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Hero (hero6)'];

  // 2nd row: Background image (if present)
  let bgImg = null;
  // Look for an image with cover-image/background-image/hero-image class, fallback to first image
  const imgCandidates = element.querySelectorAll('img');
  for (const img of imgCandidates) {
    if (
      img.classList.contains('cover-image') ||
      img.classList.contains('background-image') ||
      img.classList.contains('hero-image')
    ) {
      bgImg = img;
      break;
    }
  }
  if (!bgImg && imgCandidates.length > 0) {
    bgImg = imgCandidates[0];
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3rd row: Title, Subheading, CTA (try to reference the card element containing them)
  // Find first card or blur-backdrop or similar container
  let card = null;
  const possibleCard = element.querySelector('.card, .card-on-inverse, .utility-backdrop-filter-blur');
  if (possibleCard) {
    card = possibleCard;
  } else {
    // Fallback: If card is not found, gather all headings, paragraphs, and button groups
    const contentNodes = [];
    element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .button-group, a.button').forEach((el) => {
      // Only push if it's not inside another element we've already pushed
      if (!contentNodes.some(node => node.contains(el))) {
        contentNodes.push(el);
      }
    });
    if (contentNodes.length > 0) {
      card = contentNodes;
    }
  }
  const contentRow = [card ? card : ''];

  // As per instructions, don't create a Section Metadata block, and don't add <hr>
  // Table structure: 1 column, 3 rows
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
