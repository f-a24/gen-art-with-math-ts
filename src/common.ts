export const guiReset = () => {
  if (!gui) return;
  gui.destroy();
  gui = null;
};
