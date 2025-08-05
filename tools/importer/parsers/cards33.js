/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name from the requirement
  const headerRow = ['Cards (cards33)'];

  // Get all immediate card containers (direct <a> children)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // First cell: image (first <img> in card)
    const img = card.querySelector('img');

    // Second cell: text content
    const textContent = [];

    // Tag and time (row at top of content, if present)
    const metaRow = card.querySelector('.flex-horizontal, .flex-gap-xs');
    if (metaRow) textContent.push(metaRow);

    // Heading (h3 or .h4-heading)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textContent.push(heading);

    // Description (<p>)
    const description = card.querySelector('p');
    if (description) textContent.push(description);

    // CTA ("Read"), if present at bottom, as a link
    // The CTA is always the last <div> inside the text content block
    // Find all inner content divs (not parent wrappers)
    const innerDivGroups = card.querySelectorAll('div > div');
    let ctaDiv;
    if (innerDivGroups.length > 0) {
      // The last div is often the CTA
      ctaDiv = innerDivGroups[innerDivGroups.length - 1];
      if (ctaDiv && ctaDiv.textContent.trim() === 'Read') {
        // Use the parent <a>'s href for the link
        const ctaLink = document.createElement('a');
        ctaLink.href = card.href;
        ctaLink.textContent = 'Read';
        textContent.push(ctaLink);
      }
    }

    return [img, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
