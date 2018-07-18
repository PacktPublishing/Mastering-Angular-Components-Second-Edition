export function limitWithEllipsis(str: string, limit: number): string {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '…';
  } else {
    return str;
  }
}

export function replaceAll(
  target: string,
  search: string,
  replacement: string): string {
  return target.split(search).join(replacement);
}

export function splice(
  target: string,
  index: number,
  deleteCount: number,
  content: string): string {
  return target.slice(0, index) +
    content +
    target.slice(index + deleteCount);
}
