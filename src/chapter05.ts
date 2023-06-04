import p5 from 'p5';
import { init } from './common';

/**
 * フェルマーらせんを描く
 */
export const fermatSpiral = () => {
  init('離散的なフェルマーらせん');

  globalP5Instance = new p5((p: p5) => {
    let itr = 0; // 描画の繰り返し回数
    const scalar = 5; // 拡大倍率
    const drawFermatSpiral = (rot: number) => {
      const theta = 2 * p.PI * itr * rot; // 回転角
      const v = p5.Vector.fromAngle(theta);
      v.mult(scalar * p.sqrt(itr));
      p.ellipse(v.x, v.y, scalar, scalar); // 点を描画
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.background(255); // 背景を白くする
    };
    p.draw = () => {
      p.translate(p.width / 2, p.height / 2); // 描画ウィンドウの中心に移動
      p.fill(0); // 点を黒く塗る
      drawFermatSpiral(17.0 / 55); // 引数を回転角とするフェルマーらせんの描画
      itr++;
    };
  });
  return '';
};

/**
 * フェルマーらせんと補助線を描く
 */
export const fermatSpiralLine = () => {
  init('連続的なフェルマーらせんと中心角の等分線');

  globalP5Instance = new p5((p: p5) => {
    let itr = 0;
    const scalar = 30;
    const drawFermatSpiral = (rot: number) => {
      const theta = 2 * p.PI * itr * rot; // 回転角
      const v = p5.Vector.fromAngle(theta);
      v.mult(scalar * p.sqrt(itr));
      p.fill(0);
      p.ellipse(v.x, v.y, 10, 10); // 点を描画
    };
    // 中心角の等分線を描く関数
    const drawLine = (n: number) => {
      for (let i = 0; i <= n / 2; i++) {
        const v = p5.Vector.fromAngle((2 * i * p.PI) / n); // 円周上のn等分点を取る
        v.mult(p.width / p.sqrt(2)); // 画面いっぱいに線を引くように拡大
        p.line(v.x, v.y, -v.x, -v.y);
      }
    };
    // 連続的なフェルマーらせんを描く関数
    const drawRealCurve = (rot: number) => {
      const STEP = 2 * p.PI * 0.01; // 曲線の精度
      let theta = 0; // 偏角
      let rad = 0; // 動径
      p.noFill();
      p.beginShape(); // 頂点をつないで図形を描画
      while (rad < p.width / p.sqrt(2)) {
        rad = scalar * p.sqrt(theta / (2 * p.PI * rot));
        const v = p5.Vector.fromAngle(theta);
        v.mult(rad);
        p.vertex(v.x, v.y); // 頂点をセット
        theta += STEP;
      }
      p.endShape();
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.translate(p.width / 2, p.height / 2); // 描画ウィンドウの中心に移動
      p.stroke(0, 0, 255);
      drawLine(10); // 中心角の等分線を描く
      p.stroke(255, 0, 0);
      drawRealCurve(1.0 / 10); // 連続的なフェルマーらせんを描く
    };
    p.draw = () => {
      p.translate(p.width / 2, p.height / 2); // 描画ウィンドウの中心に移動
      p.noStroke(); // 輪郭線を消す
      drawFermatSpiral(1.0 / 10);
      itr++;
    };
  });
  return '';
};

/**
 * フェルマーらせんを描く
 */
export const fermatSpiral2 = () => {
  init('かたちの世代変化');

  globalP5Instance = new p5((p: p5) => {
    let itr = 0; // 描画の繰り返し回数
    const scalar = 5; // 拡大倍率
    const drawFermatSpiral = (rot: number) => {
      const theta = 2 * p.PI * itr * rot; // 回転角
      const v = p5.Vector.fromAngle(theta);
      v.mult(scalar * p.sqrt(itr));
      p.ellipse(v.x, v.y, scalar, scalar); // 点を描画
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.background(255); // 背景を白くする
    };
    p.draw = () => {
      p.translate(p.width / 2, p.height / 2); // 描画ウィンドウの中心に移動
      p.noStroke();
      p.fill(255, 0, 0, 127); // 点を赤く塗る
      drawFermatSpiral(1.0 / 3);
      // drawFermatSpiral(4.0 / 17);
      p.fill(0, 0, 255, 127); // 点を青く塗る
      drawFermatSpiral(1.0 / 61);
      // drawFermatSpiral(17.0 / 72);
      p.fill(0, 255, 0, 127); // 点を緑に塗る
      drawFermatSpiral(20.0 / 61);
      // drawFermatSpiral(72.0 / 305);
      itr++;
    };
  });
  return '';
};
