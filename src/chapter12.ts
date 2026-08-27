import p5 from 'p5';
import { init } from './common';

/**
 * 対応するパターンの模様を生成する
 */
export const p3M1 = () => {
  init('対応するパターンの模様を生成する');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    // 格子を張るベクトル
    const base = [p5.Vector.fromAngle(p.PI / 2), p5.Vector.fromAngle(p.PI / 6)];
    const num = 2;
    let scalar: number;
    let svgImage: p5.Image;
    let tilePattern: { flipY: boolean; rotation: number }[] = [];
    const _makeLattice = () => {
      const m = p.ceil(num / base[1].x); // 列の数
      lattice = Array.from({ length: num + 1 }, () => new Array(m + 1));
      for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= m; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _getVector = (v: p5.Vector[], gap: number) => {
      const nextVec: p5.Vector[] = new Array(3);
      for (let i = 0; i < 3; i++) {
        const dir = p5.Vector.sub(v[(i + 1) % 3], v[i]);
        dir.mult(gap);
        nextVec[i] = p5.Vector.add(v[i], dir);
      }
      return nextVec;
    };
    const _makeRecurTriangle = (gap: number) => {
      let v: p5.Vector[] = new Array(3); // 正三角形の頂点
      v[2] = new p5.Vector(0, 0);
      for (let i = 0; i < 2; i++) {
        v[i] = p5.Vector.fromAngle((i * p.PI) / 3);
        v[i].mult(scalar / p.sqrt(3));
      }
      p.beginShape(p.TRIANGLES); // 3点ずつの頂点から三角形を作る
      while (v[0].dist(v[1]) > 1) {
        for (let i = 0; i < 3; i++) {
          p.vertex(v[i].x, v[i].y);
        }
        v = _getVector(v, gap); // gapの分だけずらした正三角形の頂点を取得
      }
      p.endShape();
    };
    const _makePatternP3M1 = () => {
      tilePattern = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          tilePattern.push({
            flipY: i === 1, // pow(-1, i) → i === 1 で y 反転
            rotation: (2 * p.PI * j) / 3 // 120° ずつ回転
          });
        }
      }
    };
    const _drawTiling = () => {
      p.background(255);
      // const gap = p.random(0.01, 0.5);
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          for (const cell of tilePattern) {
            p.push();
            p.translate(vec.x, vec.y); // タイルの格子位置へ移動
            p.scale(1, cell.flipY ? -1 : 1); // x 軸を中心に鏡映
            p.rotate(cell.rotation); // 120° 回転
            // _makeRecurTriangle(gap);
            p.image(svgImage, -svgImage.width / 2, -svgImage.height / 2); // SVG を描画
            p.pop();
          }
        }
      }
    };
    p.preload = () => {
      svgImage = p.loadImage('HelloWorld.svg');
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      scalar = (p.height * 1.0) / num;
      _makeLattice();
      _makePatternP3M1();
      _drawTiling();
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      _makePatternP3M1();
      _drawTiling();
    };
  });
  return '';
};

/**
 * 対応するパターンの模様を生成する
 */
export const p3 = () => {
  init('対応するパターンの模様を生成する');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    // 格子を張るベクトル
    const base = [p5.Vector.fromAngle(p.PI / 2), p5.Vector.fromAngle(p.PI / 6)];
    const num = 10;
    let scalar: number;
    const _makeLattice = () => {
      const m = p.ceil(num / base[1].x); // 列の数
      lattice = Array.from({ length: num + 1 }, () => new Array(m + 1));
      for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= m; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _makeRhomb = (rand: number[]) => {
      const v: p5.Vector[] = new Array(2); // ひし形の長い対角線の端点
      for (let i = 0; i < 2; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 3);
        v[i].mult(scalar / p.sqrt(3));
      }
      const ctr: p5.Vector[] = new Array(4); // ベジエ曲線の制御点
      for (let i = 0; i < 4; i++) {
        ctr[i] = p5.Vector.sub(v[(i + 1) % 2], v[i % 2]);
        ctr[i].rotate((rand[i] * p.PI) / 3); // ランダムな回転によって制御点を取る
        ctr[i].add(v[i % 2]);
      }
      p.beginShape(); // ひし形の端点をつなぐ２つのベジエ曲線の生成
      p.vertex(v[0].x, v[0].y); // 1番目の制御点
      p.bezierVertex(
        ctr[0].x,
        ctr[0].y, // 2番目の制御点
        ctr[1].x,
        ctr[1].y, // 3番目の制御点
        v[1].x,
        v[1].y
      ); // 4番目の制御点=次のベジエ曲線の1番目の制御点
      p.bezierVertex(
        ctr[3].x,
        ctr[3].y, // 2番目の制御点
        ctr[2].x,
        ctr[2].y, // 3番目の制御点
        v[0].x,
        v[0].y
      ); // 4番目の制御点
      p.endShape();
    };
    const _drawTiling = () => {
      p.background(0, 0, 1);
      // ベジエ曲線の制御点に関するランダム変数
      const rand = [
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1)
      ];
      p.fill(p.color(p.random(1), 1, 1));
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          p.beginShape(); // タイルを描画
          for (let i = 0; i < 3; i++) {
            p.rotate((2 * p.PI * i) / 3); // ひし形の120度回転
            _makeRhomb(rand);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      scalar = (p.height * 1.0) / num;
      _makeLattice();
      _drawTiling();
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      _drawTiling();
    };
  });
  return '';
};

/**
 * 対応するパターンの模様を生成する
 */
export const p31M = () => {
  init('対応するパターンの模様を生成する');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    // 格子を張るベクトル
    const base = [p5.Vector.fromAngle(p.PI / 2), p5.Vector.fromAngle(p.PI / 6)];
    const num = 3;
    let scalar: number;
    const _makeLattice = () => {
      const m = p.ceil(num / base[1].x); // 列の数
      lattice = Array.from({ length: num + 1 }, () => new Array(m + 1));
      for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= m; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _makeLine = (rand: number[]) => {
      // 模様2(三角形)
      const v: p5.Vector[] = new Array(2); // 二等辺三角形の底辺の2点をランダムに取る
      for (let i = 0; i < 2; i++) {
        v[i] = p5.Vector.fromAngle(p.PI / 6);
        v[i].mult(scalar / 3);
        const dir = new p5.Vector(-scalar / p.sqrt(3), 0);
        dir.mult(p.abs(rand[i]));
        v[i].add(dir);
      }
      p.beginShape(); // 三角形の生成
      p.vertex(0, 0);
      p.vertex(v[0].x, v[0].y);
      p.vertex(v[1].x, v[1].y);
      p.endShape(p.CLOSE);
    };
    const _makeCurve = (rand: number[]) => {
      // 模様1(ベジエ曲線)
      const v: p5.Vector[] = new Array(2); // 二等辺三角形の2斜辺の中点
      for (let i = 0; i < 2; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 3 + p.PI / 6);
        v[i].mult(scalar / 6);
      }
      const ctr: p5.Vector[] = new Array(4); // ベジエ曲線の制御点
      for (let i = 0; i < 4; i++) {
        ctr[i] = p5.Vector.sub(v[(i + 1) % 2], v[i % 2]);
        ctr[i].rotate((rand[i] * p.PI) / 3);
        ctr[i].add(v[i % 2]);
      }
      p.beginShape(); // ベジエ曲線の生成
      p.vertex(v[0].x, v[0].y);
      p.bezierVertex(ctr[0].x, ctr[0].y, ctr[1].x, ctr[1].y, v[1].x, v[1].y);
      p.bezierVertex(ctr[3].x, ctr[3].y, ctr[2].x, ctr[2].y, v[0].x, v[0].y);
      p.endShape();
    };
    const _makeTriangle = (rand: number[], col1: p5.Color, col2: p5.Color) => {
      const v = p5.Vector.fromAngle(-p.PI / 6);
      v.mult(scalar / 3);
      // 正三角形を構成するグループ
      p.push();
      p.translate(v.x, v.y); // 模様の位置をずらす
      for (let i = 0; i < 3; i++) {
        p.push();
        p.fill(col1);
        p.rotate((2 * p.PI * i) / 3); // 120度回転
        _makeLine(rand); // 直線模様の生成
        p.pop();
      }
      for (let i = 0; i < 3; i++) {
        p.push();
        p.fill(col2);
        p.rotate((2 * p.PI * i) / 3); // 120度回転
        _makeCurve(rand); // 曲線模様の生成
        p.pop();
      }
      p.pop();
    };
    const _makePattern = (rand: number[], col1: p5.Color, col2: p5.Color) => {
      // 1タイル分の模様（正三角形6個ぶん）を、現在の原点を基準に描画する
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          p.push();
          p.scale(1, p.pow(-1, i)); // x軸を中心に鏡映
          p.rotate((2 * p.PI * j) / 3); // 120度回転
          _makeTriangle(rand, col1, col2);
          p.pop();
        }
      }
    };
    const _drawTiling = () => {
      // タイリングを描画
      p.background(0, 0, 1);
      // 模様のためのランダム変数
      const rand = [
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1)
      ];
      const col1 = p.color(p.random(1), 1, 1); // 直線模様のためのカラー変数
      const col2 = p.color(p.random(1), 1, 1); // 曲線模様のためのカラー変数

      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          _makePattern(rand, col1, col2); // タイルを描画
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      scalar = (p.height * 1.0) / num;
      _makeLattice();
      _drawTiling();
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      // マウスクリック時の動作
      _drawTiling();
    };
  });
  return '';
};

/**
 * 対応するパターンの模様を生成する
 */
export const p6 = () => {
  init('対応するパターンの模様を生成する');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    // 格子を張るベクトル
    const base = [p5.Vector.fromAngle(p.PI / 2), p5.Vector.fromAngle(p.PI / 6)];
    const num = 5;
    let scalar: number;
    const _makeLattice = () => {
      const m = p.ceil(num / base[1].x); // 列の数
      lattice = Array.from({ length: num + 1 }, () => new Array(m + 1));
      for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= m; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _makeTriangle = (rand: number[]) => {
      const v: p5.Vector[] = new Array(2); // 正三角形を二等分する線分の端点
      v[0] = new p5.Vector(0, 0); // 頂点
      v[1] = p5.Vector.fromAngle(p.PI / 6); // 辺の中点
      v[1].mult(scalar / 2);
      const ctr: p5.Vector[] = new Array(2);
      for (let i = 0; i < 2; i++) {
        ctr[i] = p5.Vector.sub(v[(i + 1) % 2], v[i]);
        ctr[i].rotate((rand[i] * p.PI) / 3);
        ctr[i].add(v[i]);
      }
      p.beginShape(); // ベジエ曲線の生成
      p.noFill();
      p.strokeWeight(3);
      p.vertex(v[0].x, v[0].y);
      p.bezierVertex(ctr[0].x, ctr[0].y, ctr[1].x, ctr[1].y, v[1].x, v[1].y);
      p.endShape();
    };
    const _drawTiling = () => {
      // タイリングを描画
      p.background(0, 0, 1);
      // 模様のためのランダム変数
      const rand = [
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1)
      ];
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          for (let i = 0; i < 6; i++) {
            _makeTriangle(rand);
            p.rotate((2 * p.PI * i) / 6); //60°回転
          }
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      scalar = (p.height * 1.0) / num;
      _makeLattice();
      _drawTiling();
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      // マウスクリック時の動作
      _drawTiling();
    };
  });
  return '';
};

/**
 * 対応するパターンの模様を生成する
 */
export const p6M = () => {
  init('対応するパターンの模様を生成する');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    // 格子を張るベクトル
    const base = [p5.Vector.fromAngle(p.PI / 2), p5.Vector.fromAngle(p.PI / 6)];
    const num = 5;
    let scalar: number;
    const _makeLattice = () => {
      const m = p.ceil(num / base[1].x); // 列の数
      lattice = Array.from({ length: num + 1 }, () => new Array(m + 1));
      for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= m; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _makeTriangle = (rand: number[]) => {
      const v: p5.Vector[] = new Array(2);
      for (let i = 0; i < 2; i++) {
        v[i] = p5.Vector.fromAngle((i * p.PI) / 6);
        v[i].mult(scalar);
      }
      const ctr: p5.Vector[] = new Array(4);
      for (let i = 0; i < 4; i++) {
        console.log(i / 2, v[i / 2]);
        ctr[i] = v[i % 2].copy().mult(rand[i]);
      }
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(ctr[0].x, ctr[0].y);
      p.bezierVertex(
        ctr[1].x,
        ctr[1].y,
        ctr[2].x,
        ctr[2].y,
        ctr[3].x,
        ctr[3].y
      );
      p.endShape(p.CLOSE);
    };
    const _drawTiling = () => {
      const rand = [
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1),
        p.random(-1, 1)
      ];
      p.fill(p.color(p.random(1), 1, 1));
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 6; j++) {
              p.scale(1, p.pow(-1, i)); // x軸を中心に鏡映
              p.rotate((2 * p.PI * j) / 6); // 60度回転
              _makeTriangle(rand); // 直角三角形上の曲線模様をランダムに生成
            }
          }
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      p.background(0, 0, 1);
      scalar = (p.height * 1.0) / num;
      _makeLattice();
      _drawTiling();
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      // マウスクリック時の動作
      _drawTiling();
    };
  });
  return '';
};
