export const init = (title: string) => {
  const titleEl = document.querySelector('#title')!;
  titleEl.textContent = title;

  if (!!globalP5Instance) globalP5Instance.remove();
  if (gui) {
    gui.destroy();
    gui = null;
  }
};
