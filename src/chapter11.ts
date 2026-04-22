import p5 from 'p5';
import { GUI } from 'lil-gui';
import { init } from './common';

/**
 * 頂点の移動による正六角形タイリングの変形
 */
export const tv08 = () => {
  init('頂点の移動による正六角形タイリングの変形');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = []; // 格子
    const base: p5.Vector[] = new Array(2); // 格子を張るベクトル
    const row: number = 10; // タイルの行の数
    let col: number; // タイルの列の数
    let scalar: number; // 拡大倍率
    let tileColor: p5.Color[][]; // タイルの色
    let tileVerts: p5.Vector[] = [];
    // 水平方向，垂直方向へのずれの変数
    const controls = {
      hor: 0,
      ver: 0
    };
    const _controller = () => {
      gui = new GUI();
      gui.add(controls, 'hor', -1, (p.sqrt(3) - 1) / 2, 0.01);
      gui.add(controls, 'ver', 0, 1, 0.01);
    };
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
    const _setTileColor = () => {
      // タイルごとに色をランダムに指定
      tileColor = Array.from({ length: row + 1 }, () => new Array(col + 1));
      for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
          tileColor[i][j] = p.color(p.random(1), 1, 1);
        }
      }
    };
    const _parameterizeTV08 = (v: p5.Vector[], i: number) => {
      if (i % 3 === 0) {
        v[i].mult(1 + controls.hor); // 垂直方向への頂点移動
      }
      if (i > 1 && i < 5) {
        v[i].add(0, (-0.5 * controls.ver * scalar) / p.sqrt(3)); // 水平方向への頂点移動
      } else {
        v[i].add(0, (0.5 * controls.ver * scalar) / p.sqrt(3)); // 水平方向への頂点移動
      }
      return v[i];
    };
    const _deformHex = () => {
      const v: p5.Vector[] = new Array(6);
      for (let i = 0; i < 6; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 6); // 正六角形の頂点
        v[i].mult(scalar / p.sqrt(3));
        v[i] = _parameterizeTV08(v, i); // 各頂点に対する変形
      }
      tileVerts = [...v];
    };
    const _drawTiling = () => {
      for (let i = 0; i < lattice.length; i++) {
        for (let j = 0; j < lattice[0].length; j++) {
          p.push();
          p.translate(lattice[i][j].x, lattice[i][j].y); // 格子点ベクトルによる移動
          p.scale(p.pow(-1, j), 1); // jが奇数のとき，タイルをy軸を中心に鏡映する
          p.fill(tileColor[i][j]); // タイルの配色
          p.beginShape();
          for (const v of tileVerts) {
            p.vertex(v.x, v.y);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    const _deformLattice = () => {
      lattice = Array.from({ length: row + 1 }, () => new Array(col + 1));
      for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          v.add((controls.hor * scalar * j) / p.sqrt(3), 0); // 水平方向へ格子をずらす
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      scalar = p.height / row;
      _controller(); // controlP5コントローラの設定
      _makeHexVector(); // 六角格子を張るベクトルの生成
      col = p.ceil(row / (base[1].x - 1.0 / p.sqrt(3))); // タイルの列の数を計算
      _setTileColor(); // タイルにランダムに色をセット
    };
    p.draw = () => {
      p.background(1, 0, 1);
      _deformLattice(); // 格子の生成
      _deformHex(); // タイルの生成
      _drawTiling(); // タイリングを描画
    };
  });
  return '';
};

/**
 * 正方形タイリングの辺を歪曲した等面タイリング
 */
export const ih41 = () => {
  init('正方形タイリングの辺を歪曲した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = []; // 格子のための変数
    const num = 10; // 行の数
    const base: p5.Vector[] = new Array(2); // 格子を張るベクトル
    let scalar: number; // 正方形タイルの辺の長さ
    const _makeSqVector = () => {
      base[0] = p.createVector(0, 1);
      base[1] = p.createVector(1, 0);
    };
    const _makeSqLattice = () => {
      lattice = Array.from({ length: num + 1 }, () => new Array(num + 1));
      for (let i = 0; i < num + 1; i++) {
        for (let j = 0; j < num + 1; j++) {
          const v = base[0].copy().mult(i * scalar); // 正方形を描画する位置ベクトル
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y);
        }
      }
    };
    const _parameterizeIH41 = (v: p5.Vector[], i: number, rand: number[][]) => {
      const w: p5.Vector[] = new Array(2);
      for (let j = 0; j < 2; j++) {
        w[j] = p5.Vector.sub(v[(i + 1) % 4], v[i]); // ベジエ曲線の始点から終点までのベクトル
        w[j].mult(p.pow(-1, j)); // j=1ならば始点と終点を入れ替える
        // 中間の制御点を取るためのランダムな回転
        if (i < 2) {
          w[j].rotate((rand[i % 2][j % 2] * p.PI) / 4);
        } else {
          w[j].rotate((rand[i % 2][(j + 1) % 2] * p.PI) / 4);
        }
        w[j].add(v[(i + j) % 4]);
      }
      return w; // 3次ベジエ曲線の4つの制御点のうち，中間の2点を返す
    };
    const _deformSquare = (): [p5.Vector[], number[][]] => {
      const vec: p5.Vector[] = new Array(4);
      for (let i = 0; i < 4; i++) {
        vec[i] = p5.Vector.fromAngle((2 * p.PI * (i + 0.5)) / 4); // 正方形の頂点
        vec[i].mult(scalar / p.sqrt(2));
      }
      const rand: number[][] = Array.from({ length: 2 }, () => new Array(2));
      for (let i = 0; i < 2; i++) {
        // ベジエ曲線の制御点生成のための乱数
        rand[i][0] = p.random(-1, 1);
        rand[i][1] = p.random(-1, 1);
      }
      return [vec, rand];
    };
    const _drawTiling = (v: p5.Vector[], rand: number[][]) => {
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          p.fill(p.color(p.random(1), 1, 1)); // タイルの色
          // タイルを描画
          p.beginShape();
          p.vertex(v[0].x, v[0].y); // 1つ目の制御点
          for (let i = 0; i < 4; i++) {
            // 4つの辺をベジエ曲線にする
            const w = _parameterizeIH41(v, i, rand); // 制御点の生成
            p.bezierVertex(
              w[0].x,
              w[0].y, // 2つ目の制御点
              w[1].x,
              w[1].y, // 3つ目の制御点
              v[(i + 1) % 4].x,
              v[(i + 1) % 4].y
            ); // 4つ目の制御点
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      scalar = p.height / num;
      _makeSqVector();
      _makeSqLattice(); // 格子点ベクトルを生成
      const [vec, rand] = _deformSquare(); // 正方形タイルを生成
      _drawTiling(vec, rand); // タイリングを描画
    };
    p.draw = () => {};
    // マウスクリック時の動作
    p.mouseClicked = () => {
      p.background(1, 0, 1);
      const [vec, rand] = _deformSquare();
      _drawTiling(vec, rand);
    };
  });
  return '';
};

/**
 * 正六角形タイリングの辺を歪曲した等面タイリング
 */
export const ih01 = () => {
  init('正六角形タイリングの辺を歪曲した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2);
    const num = 10;
    let scalar: number;
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
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
    const _deformHex = (): [p5.Vector[], number[][]] => {
      const v = new Array(6);
      for (let i = 0; i < 6; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 6);
        v[i].mult(scalar / p.sqrt(3));
      }
      const rand = Array.from({ length: 3 }, () => new Array(2));
      for (let i = 0; i < 3; i++) {
        // ベジエ曲線の制御点生成のための乱数
        rand[i][0] = p.random(-1, 1);
        rand[i][1] = p.random(-1, 1);
      }
      return [v, rand];
    };
    const _parameterizeIH01 = (v: p5.Vector[], i: number, rand: number[][]) => {
      const w: p5.Vector[] = new Array(2);
      for (let j = 0; j < 2; j++) {
        w[j] = p5.Vector.sub(v[(i + 1) % 6], v[i]); // ベジエ曲線の始点から終点までのベクトル
        w[j].mult(p.pow(-1, j)); // j=1ならば始点と終点を入れ替える
        if (i < 3) {
          w[j].rotate((rand[i % 3][j % 2] * p.PI) / 3);
        } else {
          w[j].rotate((rand[i % 3][(j + 1) % 2] * p.PI) / 3);
        }
        w[j].add(v[(i + j) % 6]);
      }
      return w; // 3次ベジエ曲線の4つの制御点のうち，中間の2点を返す
    };
    const _drawTiling = (v: p5.Vector[], rand: number[][]) => {
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          p.fill(p.color(p.random(1), 1, 1)); // タイルの色
          p.beginShape(); // タイルを描画
          p.vertex(v[0].x, v[0].y); // 1つ目の制御点
          for (let i = 0; i < 6; i++) {
            // 6つの辺をベジエ曲線にする
            const w = _parameterizeIH01(v, i, rand);
            p.bezierVertex(
              w[0].x,
              w[0].y, // 2つ目の制御点
              w[1].x,
              w[1].y, // 3つ目の制御点
              v[(i + 1) % 6].x,
              v[(i + 1) % 6].y
            ); // 4つ目の制御点
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      p.background(1, 0, 1);
      scalar = p.height / num;
      _makeHexVector();
      _makeLattice();
      const [vec, rand] = _deformHex();
      _drawTiling(vec, rand);
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      p.background(1, 0, 1);
      const [vec, rand] = _deformHex();
      _drawTiling(vec, rand);
    };
  });
  return '';
};

/**
 * 正六角形タイリングの辺を歪曲した等面タイリング
 */
export const ih02 = () => {
  init('正六角形タイリングの辺を歪曲した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2);
    const num = 10;
    let scalar: number;
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
    const _makeLattice = () => {
      const m = p.ceil(num / (base[1].x - 1.0 / p.sqrt(3))); // 列の数
      lattice = Array.from({ length: num + 1 }, () => new Array(m + 1));
      for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= m; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _deformHex = (): [p5.Vector[], number[][]] => {
      const v = new Array(6);
      for (let i = 0; i < 6; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 6);
        v[i].mult(scalar / p.sqrt(3));
      }
      const rand = Array.from({ length: 3 }, () => new Array(2));
      for (let i = 0; i < 3; i++) {
        // ベジエ曲線の制御点生成のための乱数
        rand[i][0] = p.random(-1, 1);
        rand[i][1] = p.random(-1, 1);
      }
      return [v, rand];
    };
    const _parameterizeIH02 = (v: p5.Vector[], i: number, rand: number[][]) => {
      const w: p5.Vector[] = new Array(2);
      for (let j = 0; j < 2; j++) {
        w[j] = p5.Vector.sub(v[(i + 1) % 6], v[i]); // ベジエ曲線の始点から終点までのベクトル
        w[j].mult(p.pow(-1, j)); // j=1ならば始点と終点を入れ替える
        if (i < 3) {
          w[j].rotate((rand[i][j] * p.PI) / 3);
        } else if (i != 4) {
          w[j].rotate((-rand[5 - i][j] * p.PI) / 3);
        } else {
          w[j].rotate((rand[5 - i][(j + 1) % 2] * p.PI) / 3);
        }
        w[j].add(v[(i + j) % 6]);
      }
      return w; // 3次ベジエ曲線の4つの制御点のうち，中間の2点を返す
    };
    const _drawTiling = (v: p5.Vector[], rand: number[][]) => {
      for (let i = 0; i < lattice.length; i++) {
        for (let j = 0; j < lattice[0].length; j++) {
          p.push();
          p.translate(lattice[i][j].x, lattice[i][j].y); // タイルの位置を指定
          p.scale(p.pow(-1, j), 1);
          p.fill(p.color(p.random(1), 1, 1)); // タイルの色
          p.beginShape(); // タイルを描画
          p.vertex(v[0].x, v[0].y); // 1つ目の制御点
          for (let i = 0; i < 6; i++) {
            // 6つの辺をベジエ曲線にする
            const w = _parameterizeIH02(v, i, rand);
            p.bezierVertex(
              w[0].x,
              w[0].y, // 2つ目の制御点
              w[1].x,
              w[1].y, // 3つ目の制御点
              v[(i + 1) % 6].x,
              v[(i + 1) % 6].y
            ); // 4つ目の制御点
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      p.background(1, 0, 1);
      scalar = p.height / num;
      _makeHexVector();
      _makeLattice();
      const [vec, rand] = _deformHex();
      _drawTiling(vec, rand);
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      p.background(1, 0, 1);
      const [vec, rand] = _deformHex();
      _drawTiling(vec, rand);
    };
  });
  return '';
};

/**
 * 正六角形タイリングの頂点を変形し、辺を歪曲した等面タイリング
 */
export const ih02TV08 = () => {
  init('正六角形タイリングの頂点を変形し、辺を歪曲した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2);
    const row = 10;
    let col: number;
    let scalar: number;
    let tileColor: p5.Color[][];
    let rand: number[][];
    // 水平方向，垂直方向へのずれの変数
    const controls = {
      hor: 0,
      ver: 0,
      randomize: () => {
        rand = Array.from({ length: 3 }, () => new Array(2));
        for (let i = 0; i < 3; i++) {
          // ベジエ曲線の制御点生成のための乱数
          rand[i][0] = p.random(-1, 1);
          rand[i][1] = p.random(-1, 1);
        }
        _setTileColor();
      }
    };
    const _controller = () => {
      gui = new GUI();
      gui.add(controls, 'hor', -1, (p.sqrt(3) - 1) / 2, 0.01);
      gui.add(controls, 'ver', 0, 1, 0.01);
      gui.add(controls, 'randomize');
    };
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
    const _setTileColor = () => {
      // タイルごとに色をランダムに指定
      tileColor = Array.from({ length: row + 1 }, () => new Array(col + 1));
      for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
          tileColor[i][j] = p.color(p.random(1), 1, 1);
        }
      }
    };
    const _deformLattice = () => {
      lattice = Array.from({ length: row + 1 }, () => new Array(col + 1));
      for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          v.add((controls.hor * scalar * j) / p.sqrt(3), 0); // 水平方向へ格子をずらす
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _parameterizeTV08 = (v: p5.Vector[], i: number): p5.Vector => {
      if (i % 3 == 0) {
        v[i].mult(1 + controls.hor); // 垂直方向への頂点移動
      }
      if (i > 1 && i < 5) {
        v[i].add(0, (-0.5 * controls.ver * scalar) / p.sqrt(3)); // 水平方向への頂点移動
      } else {
        v[i].add(0, (0.5 * controls.ver * scalar) / p.sqrt(3)); // 水平方向への頂点移動
      }
      return v[i];
    };
    const _deformHex = (): p5.Vector[] => {
      const v = new Array(6);
      for (let i = 0; i < 6; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 6);
        v[i].mult(scalar / p.sqrt(3));
        v[i] = _parameterizeTV08(v, i);
      }
      return v;
    };
    const _parameterizeIH02 = (v: p5.Vector[], i: number, rand: number[][]) => {
      const w: p5.Vector[] = new Array(2);
      for (let j = 0; j < 2; j++) {
        w[j] = p5.Vector.sub(v[(i + 1) % 6], v[i]);
        w[j].mult(p.pow(-1, j)); // j=1ならば始点と終点を入れ替える
        if (i < 3) {
          w[j].rotate((rand[i][j] * p.PI) / 3);
        } else if (i != 4) {
          w[j].rotate((-rand[5 - i][j] * p.PI) / 3);
        } else {
          w[j].rotate((rand[5 - i][(j + 1) % 2] * p.PI) / 3);
        }
        w[j].add(v[(i + j) % 6]);
      }
      return w;
    };
    const _drawTiling = (v: p5.Vector[]) => {
      for (let i = 0; i < lattice.length; i++) {
        for (let j = 0; j < lattice[0].length; j++) {
          p.push();
          p.translate(lattice[i][j].x, lattice[i][j].y); // タイルの位置を指定
          p.scale(p.pow(-1, j), 1);
          p.fill(tileColor[i][j]); // タイルの色
          p.beginShape(); // タイルを描画
          p.vertex(v[0].x, v[0].y); // 1つ目の制御点
          for (let i = 0; i < 6; i++) {
            // 6つの辺をベジエ曲線にする
            const w = _parameterizeIH02(v, i, rand);
            p.bezierVertex(
              w[0].x,
              w[0].y, // 2つ目の制御点
              w[1].x,
              w[1].y, // 3つ目の制御点
              v[(i + 1) % 6].x,
              v[(i + 1) % 6].y
            ); // 4つ目の制御点
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      scalar = p.height / row;
      _controller();
      _makeHexVector();
      col = p.ceil(row / (base[1].x - 1.0 / p.sqrt(3)));
      controls.randomize();
    };
    p.draw = () => {
      p.background(1, 0, 1);
      _deformLattice(); // 格子の生成
      const vec = _deformHex(); // タイルの生成
      _drawTiling(vec); // タイリングを描画
    };
  });
  return '';
};

/**
 * コッホ曲線の描画
 */
export const koch = () => {
  init('コッホ曲線の描画');

  globalP5Instance = new p5((p: p5) => {
    const v1 = new p5.Vector(0, 250); // 始点
    const v2 = new p5.Vector(500, 250); // 終点
    let upperLimit = 0; // 操作の繰り返し回数
    const _makeKoch = (startPt: p5.Vector, endPt: p5.Vector, itr: number) => {
      if (itr === upperLimit || itr > 5) {
        // 繰り返しの上限を超えた場合は線分を描画
        p.vertex(startPt.x, startPt.y);
        p.vertex(endPt.x, endPt.y);
        return;
      }
      const v: p5.Vector[] = new Array(5);
      const dir = p5.Vector.sub(endPt, startPt); // 始点から終点へ向かう方向
      dir.mult(1.0 / 3);
      const slope = dir.copy();
      slope.rotate(p.PI / 3); // 三角形の頂点への方向
      v[0] = startPt; // 始点
      v[1] = p5.Vector.add(startPt, dir); // 始点に近い山のふもとの点
      v[2] = p5.Vector.add(v[1], slope); // 山頂の点
      v[3] = p5.Vector.sub(endPt, dir); // 終点に近い山のふもとの点
      v[4] = endPt; // 終点
      itr++;
      for (let i = 0; i < 4; i++) {
        _makeKoch(v[i], v[i + 1], itr); // 再分割
      }
    };
    const _drawCurve = () => {
      p.beginShape();
      _makeKoch(v1, v2, 0); // コッホ曲線の頂点を与える
      p.endShape();
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      p.background(1, 0, 1);
      _drawCurve(); // コッホ曲線の描画
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      p.background(1, 0, 1);
      upperLimit++;
      _drawCurve();
    };
  });
  return '';
};

/**
 * 辺がコッホ曲線となるように変形した等面タイリング
 */
export const ih41koch = () => {
  init('辺がコッホ曲線となるように変形した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const num = 10;
    const base: p5.Vector[] = new Array(2);
    let scalar: number;
    let upperLimit = 0;
    const _makeSqVector = () => {
      base[0] = p.createVector(0, 1);
      base[1] = p.createVector(1, 0);
    };
    const _makeSqLattice = () => {
      lattice = Array.from({ length: num + 1 }, () => new Array(num + 1));
      for (let i = 0; i < num + 1; i++) {
        for (let j = 0; j < num + 1; j++) {
          const v = base[0].copy().mult(i * scalar); // 正方形を描画する位置ベクトル
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y);
        }
      }
    };
    const _deformSquare = (): p5.Vector[] => {
      const vec: p5.Vector[] = new Array(4);
      for (let i = 0; i < 4; i++) {
        vec[i] = p5.Vector.fromAngle((2 * p.PI * (i + 0.5)) / 4);
        vec[i].mult(scalar / p.sqrt(2));
      }
      return vec;
    };
    const _makeKoch = (
      startPt: p5.Vector,
      endPt: p5.Vector,
      itr: number,
      conv: boolean
    ) => {
      if (itr === upperLimit || itr > 5) {
        // 繰り返しの上限を超えた場合は線分を描画
        p.vertex(startPt.x, startPt.y);
        p.vertex(endPt.x, endPt.y);
        return;
      }
      const v: p5.Vector[] = new Array(5);
      const dir = p5.Vector.sub(endPt, startPt); // 始点から終点へ向かう方向
      dir.mult(1.0 / 3);
      const slope = dir.copy();
      if (conv) {
        slope.rotate(p.PI / 3);
      } else {
        slope.rotate(-p.PI / 3);
      }
      v[0] = startPt; // 始点
      v[1] = p5.Vector.add(startPt, dir); // 始点に近い山のふもとの点
      v[2] = p5.Vector.add(v[1], slope); // 山頂の点
      v[3] = p5.Vector.sub(endPt, dir); // 終点に近い山のふもとの点
      v[4] = endPt; // 終点
      itr++;
      for (let i = 0; i < 4; i++) {
        _makeKoch(v[i], v[i + 1], itr, conv); // 再分割
      }
    };
    const _drawTiling = (v: p5.Vector[]) => {
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          p.fill(p.color(p.random(1), 1, 1)); // タイルの色
          // タイルを描画
          p.beginShape();
          p.vertex(v[0].x, v[0].y); // 1つ目の制御点
          for (let i = 0; i < 4; i++) {
            if (i < 2) {
              _makeKoch(v[i], v[(i + 1) % 4], 0, true);
            } else {
              _makeKoch(v[i], v[(i + 1) % 4], 0, false);
            }
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      scalar = p.height / num;
      _makeSqVector();
      _makeSqLattice(); // 格子点ベクトルを生成
      const vec = _deformSquare(); // 正方形タイルを生成
      _drawTiling(vec); // タイリングを描画
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      p.background(1, 0, 1);
      upperLimit++;
      const vec = _deformSquare();
      _drawTiling(vec);
    };
  });
  return '';
};

/**
 * 辺がコッホ曲線となるように変形した等面タイリング
 */
export const ih01koch = () => {
  init('辺がコッホ曲線となるように変形した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2);
    const num = 10;
    let scalar: number;
    let upperLimit = 0;
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
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
    const _deformHex = (): p5.Vector[] => {
      const vec = new Array(6);
      for (let i = 0; i < 6; i++) {
        vec[i] = p5.Vector.fromAngle((2 * p.PI * i) / 6);
        vec[i].mult(scalar / p.sqrt(3));
      }
      return vec;
    };
    const _makeKoch = (
      startPt: p5.Vector,
      endPt: p5.Vector,
      itr: number,
      conv: boolean
    ) => {
      if (itr === upperLimit || itr > 5) {
        // 繰り返しの上限を超えた場合は線分を描画
        p.vertex(startPt.x, startPt.y);
        p.vertex(endPt.x, endPt.y);
        return;
      }
      const v: p5.Vector[] = new Array(5);
      const dir = p5.Vector.sub(endPt, startPt); // 始点から終点へ向かう方向
      dir.mult(1.0 / 3);
      const slope = dir.copy();
      if (conv) {
        slope.rotate(p.PI / 3);
      } else {
        slope.rotate(-p.PI / 3);
      }
      v[0] = startPt; // 始点
      v[1] = p5.Vector.add(startPt, dir); // 始点に近い山のふもとの点
      v[2] = p5.Vector.add(v[1], slope); // 山頂の点
      v[3] = p5.Vector.sub(endPt, dir); // 終点に近い山のふもとの点
      v[4] = endPt; // 終点
      itr++;
      for (let i = 0; i < 4; i++) {
        _makeKoch(v[i], v[i + 1], itr, conv); // 再分割
      }
    };
    const _drawTiling = (v: p5.Vector[]) => {
      for (const vecArr of lattice) {
        for (const vec of vecArr) {
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          p.fill(p.color(p.random(1), 1, 1)); // タイルの色
          p.beginShape(); // タイルを描画
          for (let i = 0; i < 6; i++) {
            if (i < 3) {
              _makeKoch(v[i], v[(i + 1) % 6], 0, true);
            } else {
              _makeKoch(v[i], v[(i + 1) % 6], 0, false);
            }
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      p.background(1, 0, 1);
      scalar = p.height / num;
      _makeHexVector();
      _makeLattice();
      const vec = _deformHex();
      _drawTiling(vec);
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      p.background(1, 0, 1);
      upperLimit++;
      const vec = _deformHex();
      _drawTiling(vec);
    };
  });
  return '';
};

/**
 * 辺がコッホ曲線となるように変形した等面タイリング
 */
export const ih02TV08koch = () => {
  init('辺がコッホ曲線となるように変形した等面タイリング');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2);
    const row = 10;
    let col: number;
    let scalar: number;
    let tileColor: p5.Color[][];
    let upperLimit = 0;
    // 水平方向，垂直方向へのずれの変数
    const controls = {
      hor: 0,
      ver: 0,
      subdivide: () => {
        upperLimit++;
      }
    };
    const _controller = () => {
      gui = new GUI();
      gui.add(controls, 'hor', -1, (p.sqrt(3) - 1) / 2, 0.01);
      gui.add(controls, 'ver', 0, 1, 0.01);
      gui.add(controls, 'subdivide');
    };
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
    const _setTileColor = () => {
      // タイルごとに色をランダムに指定
      tileColor = Array.from({ length: row + 1 }, () => new Array(col + 1));
      for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
          tileColor[i][j] = p.color(p.random(1), 1, 1);
        }
      }
    };
    const _deformLattice = () => {
      lattice = Array.from({ length: row + 1 }, () => new Array(col + 1));
      for (let i = 0; i < row + 1; i++) {
        for (let j = 0; j < col + 1; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          v.add((controls.hor * scalar * j) / p.sqrt(3), 0); // 水平方向へ格子をずらす
          lattice[i][j] = p.createVector(v.x, v.y % (p.height + scalar));
        }
      }
    };
    const _parameterizeTV08 = (v: p5.Vector[], i: number) => {
      if (i % 3 === 0) {
        v[i].mult(1 + controls.hor); // 垂直方向への頂点移動
      }
      if (i > 1 && i < 5) {
        v[i].add(0, (-0.5 * controls.ver * scalar) / p.sqrt(3)); // 水平方向への頂点移動
      } else {
        v[i].add(0, (0.5 * controls.ver * scalar) / p.sqrt(3)); // 水平方向への頂点移動
      }
      return v[i];
    };
    const _deformHex = () => {
      const v: p5.Vector[] = new Array(6);
      for (let i = 0; i < 6; i++) {
        v[i] = p5.Vector.fromAngle((2 * p.PI * i) / 6); // 正六角形の頂点
        v[i].mult(scalar / p.sqrt(3));
        v[i] = _parameterizeTV08(v, i); // 各頂点に対する変形
      }
      return v;
    };
    const _makeKoch = (
      startPt: p5.Vector,
      endPt: p5.Vector,
      itr: number,
      conv: boolean
    ) => {
      if (itr === upperLimit || itr > 5) {
        // 繰り返しの上限を超えた場合は線分を描画
        p.vertex(startPt.x, startPt.y);
        p.vertex(endPt.x, endPt.y);
        return;
      }
      const v: p5.Vector[] = new Array(5);
      const dir = p5.Vector.sub(endPt, startPt); // 始点から終点へ向かう方向
      dir.mult(1.0 / 3);
      const slope = dir.copy();
      if (conv) {
        slope.rotate(p.PI / 3);
      } else {
        slope.rotate(-p.PI / 3);
      }
      v[0] = startPt; // 始点
      v[1] = p5.Vector.add(startPt, dir); // 始点に近い山のふもとの点
      v[2] = p5.Vector.add(v[1], slope); // 山頂の点
      v[3] = p5.Vector.sub(endPt, dir); // 終点に近い山のふもとの点
      v[4] = endPt; // 終点
      itr++;
      for (let i = 0; i < 4; i++) {
        _makeKoch(v[i], v[i + 1], itr, conv); // 再分割
      }
    };
    const _drawTiling = (v: p5.Vector[]) => {
      for (let i = 0; i < lattice.length; i++) {
        for (let j = 0; j < lattice[0].length; j++) {
          p.push();
          p.translate(lattice[i][j].x, lattice[i][j].y); // 格子点ベクトルによる移動
          p.scale(p.pow(-1, j), 1); // jが奇数のとき，タイルをy軸を中心に鏡映する
          p.fill(tileColor[i][j]); // タイルの配色
          p.beginShape();
          for (let i = 0; i < 6; i++) {
            if (i < 3) {
              _makeKoch(v[i], v[(i + 1) % 6], 0, true);
            } else {
              _makeKoch(v[i], v[(i + 1) % 6], 0, false);
            }
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500, p.P2D);
      p.colorMode(p.HSB, 1);
      scalar = p.height / row;
      _controller();
      _makeHexVector();
      col = p.ceil(row / (base[1].x - 1.0 / p.sqrt(3)));
      _setTileColor();
    };
    p.draw = () => {
      p.background(1, 0, 1);
      _deformLattice(); // 格子の生成
      const vec = _deformHex(); // タイルの生成
      _drawTiling(vec); // タイリングを描画
    };
  });
  return '';
};
