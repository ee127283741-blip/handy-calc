// Inserts <AdSlot /> after the 2nd top-level paragraph of guide MDX files.
// The guide page passes AdSlot via `components`, and AdSlot renders nothing unless ads are on (src/ads.ts).
export default function remarkAdAfterP2() {
  return (tree, file) => {
    if (!/[\\/]content[\\/]guides[\\/]/.test(file.path ?? '')) return;
    let seen = 0;
    const i = tree.children.findIndex((n) => n.type === 'paragraph' && ++seen === 2);
    if (i >= 0) tree.children.splice(i + 1, 0, { type: 'mdxJsxFlowElement', name: 'AdSlot', attributes: [], children: [] });
  };
}
