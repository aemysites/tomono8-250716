/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header
  const cells = [['Accordion (accordion34)']];

  // Each accordion item is a direct child div with class 'accordion' or 'w-dropdown'
  const items = Array.from(element.querySelectorAll(':scope > div.accordion, :scope > div.w-dropdown'));

  items.forEach(item => {
    // Title: find the first .w-dropdown-toggle child, then its .paragraph-lg or all text nodes except icon
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Find all direct children and use the .paragraph-lg, else fallback to the toggle's text
      const label = toggle.querySelector('.paragraph-lg');
      if (label) {
        titleCell = label;
      } else {
        // fallback to all text nodes inside toggle (skipping icons and empty text nodes)
        const texts = Array.from(toggle.childNodes)
          .filter(n => n.nodeType === 3 && n.textContent.trim().length > 0)
          .map(n => n.textContent.trim()).join(' ');
        if (texts) {
          const span = document.createElement('span');
          span.textContent = texts;
          titleCell = span;
        } else {
          const span = document.createElement('span');
          span.textContent = toggle.textContent.trim();
          titleCell = span;
        }
      }
    } else {
      // fallback: get some text from item
      const span = document.createElement('span');
      span.textContent = item.textContent.trim();
      titleCell = span;
    }

    // Content cell: the nav.accordion-content (w-dropdown-list), get its rich text div or content
    let contentCell = '';
    const dropdownList = item.querySelector('nav.accordion-content, .w-dropdown-list');
    if (dropdownList) {
      // Look for rich text content inside, or just get all children (usually a wrapper div)
      const richText = dropdownList.querySelector('.rich-text, .w-richtext');
      if (richText) {
        contentCell = richText;
      } else {
        // fallback: grab all content from inside the dropdown list (could be a wrapper)
        // If there's only one child, reference that, else reference all children
        const wrappers = Array.from(dropdownList.children);
        if (wrappers.length === 1) {
          contentCell = wrappers[0];
        } else if (wrappers.length > 1) {
          contentCell = wrappers;
        } else {
          // fallback: empty content cell
          const span = document.createElement('span');
          span.textContent = '';
          contentCell = span;
        }
      }
    } else {
      // fallback: empty content cell
      const span = document.createElement('span');
      span.textContent = '';
      contentCell = span;
    }

    cells.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
