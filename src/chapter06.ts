import p5 from 'p5';
import { init } from './common';

/**
 * 合同算術における加法表・乗法表の書き出し
 */
export const table = () => {
  init('加法表・乗法表の書き出し');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      const mod = 5; // 法とする自然数
      p.createCanvas(500, 500);
      const scalar = p.width / mod; // 拡大比率
      for (let i = 0; i < mod; i++) {
        for (let j = 0; j < mod; j++) {
          const num = (i + j) % mod; // 数の計算
          const v = p.createVector(j, i); // マスの位置
          v.mult(scalar);
          // const num = (i * j) % mod;  // 乗法表の場合
          p.fill(255); // マスを白くする
          p.rect(v.x, v.y, scalar, scalar); // マスの描画
          p.fill(0); // 数字を黒くする
          p.textSize(scalar);
          p.text(num, v.x, v.y + scalar); // 数字の表示
        }
      }
    };
  });
  return '';
};

/**
 * 加法表・乗法表の可視化
 */
export const tableVar = () => {
  init('加法表・乗法表の可視化');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      const mod = 7; // 法とする自然数
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
      const scalar = p.width / mod;
      for (let i = 0; i < mod; i++) {
        for (let j = 0; j < mod; j++) {
          const num = (i + j) % mod; // 数の計算
          const v = p.createVector(j + 0.5, i + 0.5); // 円の中心位置
          v.mult(scalar);
          // const num = (i * j) % mod;  // 乗法表の場合
          // 色相に対応
          p.fill((num * 1.0) / mod, 1, 1); // 数を円の色相に対応
          p.noStroke();
          p.ellipse(v.x, v.y, scalar / 2, scalar / 2);
          // 円の大きさに対応
          p.fill(0, 0, 0);
          p.ellipse(v.x, v.y, (scalar * num) / mod, (scalar * num) / mod); // 数を円の直径に対応
        }
      }
    };
  });
  return '';
};

/**
 * 合同算術におけるべき乗法表の書き出し
 */
export const power = () => {
  init('べき乗法表の書き出し');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      const mod = 7;
      p.createCanvas(500, 500);
      const scalar = p.width / (mod - 1);
      let num: number;
      for (let i = 1; i < mod; i++) {
        num = i; // iの1乗
        for (let j = 1; j < mod; j++) {
          const v = p.createVector(j - 1, i - 1); // マスの位置
          v.mult(scalar);
          p.fill(255);
          p.rect(v.x, v.y, scalar, scalar); // マスを描画
          p.fill(0);
          p.textSize(scalar);
          p.text(num, v.x, v.y + scalar); // iのj乗をマスに表示
          num = (num * i) % mod; // numをiの(j+1)乗に更新
        }
      }
    };
  });
  return '';
};

/**
 * べき乗法表の可視化
 */
export const powerVar = () => {
  init('べき乗法表の可視化');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      const mod = 37;
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
      const scalar = p.width / (mod - 1);
      let num: number;
      for (let i = 1; i < mod; i++) {
        num = i;
        for (let j = 1; j < mod; j++) {
          const v = p.createVector(j - 0.5, i - 0.5); // 円の中心位置
          v.mult(scalar);
          // 色相に対応
          p.fill((num * 1.0) / mod, 1, 1);
          p.noStroke();
          p.ellipse(v.x, v.y, scalar / 2, scalar / 2);
          // 円の大きさに対応
          p.fill(0, 0, 0);
          p.ellipse(v.x, v.y, (scalar * num) / mod, (scalar * num) / mod);
          num = (num * i) % mod; // numをiの(j+1)乗に更新
        }
      }
    };
  });
  return '';
};
