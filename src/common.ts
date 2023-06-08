/**
 * 初期設定
 * @param title タイトル
 */
export const init = (title: string) => {
  const titleEl = document.querySelector('#title')!;
  titleEl.textContent = title;

  if (!!globalP5Instance) globalP5Instance.remove();
  if (gui) {
    gui.destroy();
    gui = null;
  }
};

/**
 * 簡易的な行列を作成する関数
 * @param rowLen 行数
 * @param colLen 列数
 * @returns 行列
 */
export const createMatrix = (rowLen: number, colLen: number) =>
  [...Array(rowLen)].map(() => [...Array(colLen)].map(() => 0));
