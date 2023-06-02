import type p5 from 'p5';
import type { GUI } from 'lil-gui';

export default {};

declare global {
  let globalP5Instance: p5;
  let gui: GUI | null;
}
