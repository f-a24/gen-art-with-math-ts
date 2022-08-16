import p5 from 'p5';
import dat from 'dat.gui';
import { init } from '../src/common';
export default { title: 'chapter03' };

/**
 * [WIP] 循環連分数の収束を可視化する
 */
export const Convergent = () => {
  init('');

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
