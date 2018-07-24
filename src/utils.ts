export function getNodeWidth(node: HTMLElement) {
  const nodeStyles = window.getComputedStyle(node);
  const width = node.offsetWidth;
  const borderLeftWidth = parseFloat(nodeStyles.borderLeftWidth!);
  const borderRightWidth = parseFloat(nodeStyles.borderRightWidth!);
  const paddingLeft = parseFloat(nodeStyles.paddingLeft!);
  const paddingRight = parseFloat(nodeStyles.paddingRight!);
  return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
}
