/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, per example
  const headerRow = ['Cards (cards37)'];

  // Find the primary containers
  const container = element.querySelector('.container');
  if (!container) return;

  // Structure: .container > .grid-layout (main grid) > [A (main card), .grid-layout (subgrid)]
  const mainGrid = container.querySelector(':scope > .grid-layout');
  if (!mainGrid) return;

  // The cards are: the first <a> of the mainGrid, then all <a> in the subgrid
  const directChildren = Array.from(mainGrid.children);
  const firstCard = directChildren.find((ch) => ch.tagName === 'A');
  let cards = [];
  if (firstCard) {
    cards.push(firstCard);
  }
  const subgrid = directChildren.find(
    (ch) => ch.classList && ch.classList.contains('grid-layout')
  );
  if (subgrid) {
    const subCards = Array.from(subgrid.querySelectorAll(':scope > a'));
    cards = cards.concat(subCards);
  }

  // Build each card row: [image, [heading, paragraph, CTA]]
  const rows = cards.map((card) => {
    // Image: look for .utility-aspect-2x3 or .utility-aspect-1x1, then <img>
    let imgEl = null;
    let aspectContainer = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspectContainer) {
      imgEl = aspectContainer.querySelector('img');
    }
    if (!imgEl) {
      imgEl = card.querySelector('img');
    }
    // Text: try to get a wrapper, else the card itself
    let textWrapper = card.querySelector('.utility-padding-all-2rem');
    if (!textWrapper) textWrapper = card;

    // Heading (any h1-h6)
    let heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    // Paragraph(s)
    let paragraphs = Array.from(textWrapper.querySelectorAll('p'));
    // CTA (button or .button or a.button), but not if it's just a decorative div
    let cta = textWrapper.querySelector('a.button, .button');
    // Avoid duplicating CTA if it is already in paragraphs
    let textCell = [];
    if (heading) textCell.push(heading);
    if (paragraphs.length > 0) textCell.push(...paragraphs);
    if (cta && !textCell.includes(cta)) textCell.push(cta);
    return [imgEl, textCell];
  });

  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
