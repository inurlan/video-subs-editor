export default function dragElement(
  element: HTMLDivElement,
  minWidth: number,
  maxWidth: number,
  elementDragCallback: (elementPosition: number) => void
) {
  let elementPos = 0;
  let mosusePos = 0;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(event: MouseEvent) {
    event.preventDefault();

    // get the mouse cursor position at startup:
    mosusePos = event.clientX;

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(event: MouseEvent) {
    event.preventDefault();

    // calculate the new cursor position:
    elementPos = mosusePos - event.clientX;
    mosusePos = event.clientX;

    // set the element's new position:
    let newElementPosition = element.offsetLeft - elementPos;

    if (newElementPosition < minWidth) {
      newElementPosition = minWidth;
    }

    if (newElementPosition > maxWidth) {
      newElementPosition = maxWidth;
    }

    element.style.left = newElementPosition + 'px';

    // on close callback
    elementDragCallback(newElementPosition);
  }

  function closeDragElement() {
    // stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
