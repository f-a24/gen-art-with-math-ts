import p5 from 'p5';
import dat from 'dat.gui';

export default {};

declare global {
  let globalP5Instance: p5;
  let gui: dat.GUI | null;
}
