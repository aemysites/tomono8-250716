/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell (single column)
  const headerRow = ['Carousel'];

  // Find the slide content (image in first cell, text/heading in second cell)
  let slideBody = element.querySelector('.card-body');
  if (!slideBody) slideBody = element;

  const img = slideBody.querySelector('img');

  // Find the heading (text cell)
  let textCell = null;
  const heading = slideBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
  if (heading) {
    // Use heading tag if present, else wrap in h3
    let outputHeading;
    if (/^H[1-6]$/i.test(heading.tagName)) {
      outputHeading = heading;
    } else {
      outputHeading = document.createElement('h3');
      outputHeading.textContent = heading.textContent;
    }
    textCell = outputHeading;
  }
  // Collect any extra children if present
  if (slideBody.children.length > 0) {
    const extraNodes = Array.from(slideBody.children).filter(n => {
      if (n === img) return false;
      if (heading && n === heading) return false;
      if (n.tagName && n.tagName.match(/^H[1-6]$/i)) return false;
      if (n.tagName === 'IMG') return false;
      return true;
    });
    if (extraNodes.length > 0) {
      if (textCell) {
        if (!Array.isArray(textCell)) textCell = [textCell];
        textCell.push(...extraNodes);
      } else {
        textCell = extraNodes.length === 1 ? extraNodes[0] : extraNodes;
      }
    }
  }

  // Each slide row is two columns (image, textCell)
  const slideRow = [img, textCell];

  // To ensure the first row is a single column and the rest are two columns,
  // create a table fragment and insert the rows manually.
  const table = document.createElement('table');

  // Header row (single th spanning 2 columns)
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = headerRow[0];
  th.colSpan = 2;
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Slide row (two tds)
  const trSlide = document.createElement('tr');
  const tdImg = document.createElement('td');
  if (img) tdImg.appendChild(img);
  trSlide.appendChild(tdImg);
  const tdText = document.createElement('td');
  if (textCell) {
    if (Array.isArray(textCell)) {
      textCell.forEach(n => tdText.appendChild(n));
    } else {
      tdText.appendChild(textCell);
    }
  }
  trSlide.appendChild(tdText);
  table.appendChild(trSlide);

  element.replaceWith(table);
}
