/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example (must match exactly)
  const headerRow = ['Cards (cards10)'];

  // Gather all direct child <a> elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // First child is the image wrapper
    const imageDiv = card.querySelector(':scope > div:first-child');
    let img = null;
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // Second child is the text wrapper
    const textDiv = card.querySelector(':scope > div.utility-padding-all-1rem');
    const textContent = [];

    if (textDiv) {
      // Tag (optional, appears above heading)
      const tag = textDiv.querySelector('.tag');
      if (tag) textContent.push(tag);

      // Heading (h3 typical, could check for others if structure changes)
      const heading = textDiv.querySelector('h3, h2, h4, h5, h6');
      if (heading) textContent.push(heading);

      // Description/paragraph
      const para = textDiv.querySelector('p');
      if (para) textContent.push(para);
    }

    return [img, textContent];
  });

  // Create the table for the cards block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
