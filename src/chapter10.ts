import p5 from 'p5';
import { init } from './common';

/**
 * 正方形タイリングの描画
 */
export const squareTiling = () => {
  init('正方形タイリングの描画');

  globalP5Instance = new p5((p: p5) => {
    const num = 10; // 描画するタイルの行の数
    let lattice: p5.Vector[][] = []; // 格子点ベクトル
    const base: p5.Vector[] = new Array(2); // 格子を張るベクトル
    let scalar: number; // タイルの辺の長さ
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
    const _drawTiling = () => {
      for (let i = 0; i < lattice.length; i++) {
        for (let j = 0; j < lattice[i].length; j++) {
          const vec = lattice[i][j];
          p.push();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          p.fill(p.random(1), 1, 1); // タイルの色
          p.beginShape(); // タイルを描画
          for (let k = 0; k < 4; k++) {
            const v = p5.Vector.fromAngle((2 * p.PI * (k + 0.5)) / 4); // 正方形の頂点を時計回りに設定
            v.mult(scalar / p.sqrt(2)); // 正方形の対角線の長さの半分をかける
            p.vertex(v.x, v.y);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      scalar = (p.height * 1.0) / num; // 描画ウィンドウと行の数からタイルの大きさを決定
      _makeSqVector(); // 正方格子を張るベクトルの生成
      _makeSqLattice(); // 正方格子の格子点ベクトルを生成
      _drawTiling(); // タイリングを描画
    };
    p.draw = () => {};
    // マウスクリック時の動作
    p.mouseClicked = () => {
      _drawTiling();
    };
  });
  return '';
};

/**
 * 正六角形タイリングの描画
 */
export const hexTiling = () => {
  init('正六角形タイリングの描画');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2); // 格子を張るベクトル
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
    // タイリングを描画
    const _drawTiling = () => {
      for (const row of lattice) {
        for (const vec of row) {
          // タイルを描画
          p.fill(p.random(1), 1, 1);
          p.push();
          p.beginShape();
          p.translate(vec.x, vec.y); // タイルの位置を指定
          for (let i = 0; i < 6; i++) {
            const v = p5.Vector.fromAngle((2 * p.PI * i) / 6); // 正六角形の頂点
            v.mult(scalar / p.sqrt(3));
            p.vertex(v.x, v.y);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      scalar = (p.height * 1.0) / num;
      _makeHexVector(); // 六角格子を張るベクトルの生成
      _makeLattice(); // 格子点ベクトルを生成
      _drawTiling(); // タイリングを描画
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      _drawTiling();
    };
  });
  return '';
};

/**
 * 正三角形タイリングの描画
 */
export const triangleTiling = () => {
  init('正三角形タイリングの描画');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const tileShapes: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2); // 格子を張るベクトル
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
    const _makeTriangleVerts = (
      tx: number,
      ty: number,
      rot: number
    ): p5.Vector[] =>
      Array.from({ length: 3 }, (_, i) => {
        const v = p5.Vector.fromAngle((2 * p.PI * i) / 3 + p.PI / 2); // 正三角形の頂点
        v.mult(scalar / Math.pow(Math.sqrt(3), 2));
        const rx = v.x * Math.cos(rot) - v.y * Math.sin(rot);
        const ry = v.x * Math.sin(rot) + v.y * Math.cos(rot);
        return p.createVector(rx + tx, ry + ty);
      });
    const _makeHexTriangle = () => {
      for (let i = 0; i < 6; i++) {
        const v = p5.Vector.fromAngle((p.PI * i) / 3 + p.PI / 6);
        v.mult(scalar / Math.pow(Math.sqrt(3), 2));
        tileShapes.push(_makeTriangleVerts(v.x, v.y, p.PI * i)); // 三角形をグループに加える
      }
    };
    // タイリングを描画
    const _drawTiling = () => {
      for (const row of lattice) {
        for (const vec of row) {
          // グループの個数だけ繰り返す
          for (const tri of tileShapes) {
            p.fill(p.random(1), 1, 1);
            p.beginShape(); // タイルを描画
            tri.forEach(v => p.vertex(vec.x + v.x, vec.y + v.y));
            p.endShape(p.CLOSE);
          }
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      scalar = p.height / num;
      _makeHexVector(); // 六角格子を張るベクトルの生成
      _makeLattice(); // 格子点ベクトルを生成
      _makeHexTriangle(); // 6つの正三角形に分割された正六角形タイルを生成
      _drawTiling(); // タイリングを描画
    };
    p.draw = () => {};
    // マウスクリック時の動作
    p.mouseClicked = () => {
      _drawTiling();
    };
  });
  return '';
};

/**
 * 正六角形タイリング上のセルオートマトン
 */
export const hexCA = () => {
  init('正六角形タイリング上のセルオートマトン');

  globalP5Instance = new p5((p: p5) => {
    let lattice: p5.Vector[][] = [];
    const base: p5.Vector[] = new Array(2); // 格子を張るベクトル
    const num = 200;
    let scalar: number;
    let state: number[][] = Array.from({ length: num }, () => new Array(num)); // セルの状態を表す行列
    const mod = 10; // 法とする数
    const _initialize = () => {
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          if (i == num / 2 && j == num / 2) {
            state[i][j] = 1; // 中央の成分のみ1
          } else {
            state[i][j] = 0;
          }
        }
      }
    };
    const _makeHexVector = () => {
      base[0] = p5.Vector.fromAngle(p.PI / 2);
      base[1] = p5.Vector.fromAngle(p.PI / 6);
    };
    const _makeLattice = () => {
      lattice = Array.from({ length: num }, () => new Array(num));
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          const v = base[0].copy().mult(i * scalar);
          v.add(base[1].copy().mult(j * scalar));
          lattice[i][j] = p.createVector(v.x, v.y % p.height);
        }
      }
    };
    const _transition = (i: number, j: number) => {
      const d =
        state[i][j] + // 中央のセル
        state[(i - 1 + num) % num][j] + // 上のセル
        state[(i - 1 + num) % num][(j + 1) % num] + // 右上のセル
        state[i][(j + 1) % num] + // 右下のセル
        state[(i + 1) % num][j] + // 下のセル
        state[(i + 1) % num][(j - 1 + num) % num] + // 左下のセル
        state[i][(j - 1 + num) % num]; // 左上のセル
      return d % mod;
    };
    // タイリングを描画
    const _drawTiling = () => {
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          // タイルを描画
          p.fill(
            p.color((state[i][j] * 1.0) / mod, (state[i][j] * 1.0) / mod, 1)
          );
          p.push();
          p.beginShape();
          p.noStroke();
          p.translate(lattice[i][j].x, lattice[i][j].y); // タイルの位置を指定
          for (let i = 0; i < 6; i++) {
            const v = p5.Vector.fromAngle((2 * p.PI * i) / 6);
            v.mult(scalar / p.sqrt(3));
            p.vertex(v.x, v.y);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
      }
    };
    p.setup = () => {
      p.createCanvas(693, 800);
      p.colorMode(p.HSB, 1);
      scalar = (p.height * 1.0) / num;
      _initialize(); // 初期状態
      _makeHexVector(); // 六角格子を張るベクトルの生成
      _makeLattice(); // 格子点ベクトルを生成
      _drawTiling(); // タイリングを描画
    };
    p.draw = () => {
      p.background(0, 0, 1);
      const nextState: number[][] = Array.from(
        { length: num },
        () => new Array(num)
      ); // 次世代の行列
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          nextState[i][j] = _transition(i, j); // 遷移
        }
      }
      state = nextState; // 状態を更新
      _drawTiling();
    };
  });
  return '';
};
