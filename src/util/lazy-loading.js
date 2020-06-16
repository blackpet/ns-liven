
const loaded = new Map();

export const lazy = (node, data) => {
  if (loaded.has(data.src)) {
    node.setAttribute('src', data.src);
  } else {
    // simulate slow loading network
    setTimeout(() => {
      const img = new Image();
      img.src = data.src;
      img.onload = () => {
        loaded.set(data.src, img);
        node.setAttribute('src', data.src);
      };
    }, 50);
  }

  return {
    destroy() {
    } // noop
  };
}
