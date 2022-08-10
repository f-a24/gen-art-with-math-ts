import p5 from 'p5';
import dat from 'dat.gui';
import { guiReset } from '../src/common';
export default { title: 'chapter03' };

/**
 * [WIP] 循環連分数の収束を可視化する
 */
export const Convergent = () => {
  if (!!globalP5Instance) globalP5Instance.remove();
  if (!!gui) guiReset();

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      /** */
    };
    p.draw = () => {
      /** */
    };
  });

  return '';
};
