import {InputPosition} from '../model';

export function getRangeBoundingClientRect(): InputPosition | null {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection.rangeCount) {
      return null;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (!range.collapsed) {
      return {
        top: rect.top,
        left: rect.left,
        caretOffset: range.startOffset
      };
    }

    const dummy = document.createElement('span');
    range.insertNode(dummy);
    const pos: InputPosition = {
      top: rect.top,
      left: rect.left,
      caretOffset: range.startOffset
    };
    dummy.parentNode.removeChild(dummy);
    return pos;
  }

  if (document['selection']) {
    return document['selection']
      .createRange()
      .getBoundingClientRect();
  }
}
