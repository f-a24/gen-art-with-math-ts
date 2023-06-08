import p5 from 'p5';
import { createMatrix, init } from './common';

/**
 * 行列の積と転置の計算
 */
export const matrixCalculator = () => {
  init('行列の計算');

  globalP5Instance = new p5((p: p5) => {
    const mtxA = [
      [2, 1],
      [0, 1]
    ]; // 行列A
    const mtxB = [[3], [1]]; // 行列B
    // 行列のかけ算を行う関数
    const _multMtx = (mtx1: number[][], mtx2: number[][]) => {
      // mtx1とmtx2をかけて返す
      const newMtx = createMatrix(mtx1.length, mtx2[0].length);
      for (let i = 0; i < mtx1.length; i++) {
        for (let j = 0; j < mtx2[0].length; j++) {
          let sum = 0; // (i,j)要素の初期値
          for (let k = 0; k < mtx2.length; k++) {
            sum += mtx1[i][k] * mtx2[k][j]; // 要素をかけて足す
          }
          newMtx[i][j] = sum;
        }
      }
      return newMtx;
    };
    // 行列の転置を行う関数
    const _trMtx = (mtx: number[][]) => {
      // mtxを転置して返す
      const newMtx = createMatrix(mtx[0].length, mtx.length);
      for (let i = 0; i < mtx.length; i++) {
        for (let j = 0; j < mtx[0].length; j++) {
          newMtx[j][i] = mtx[i][j]; // 要素を入れ替える
        }
      }
      return newMtx;
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      let mtx = _multMtx(mtxA, mtxB); // 行列AとBの積
      p.textSize(20);
      p.text('mult:', 20, 30);
      for (let i = 0; i < mtx.length; i++) {
        p.text('row:' + i, 40, 60 * i + 60);
        p.text(mtx[i], 40, 60 * (i + 1) + 30); // i行の配列を表示
      }
      mtx = _trMtx(mtxA); // 行列Aの転置
      p.text('transpose:', 20, 180);
      for (let i = 0; i < mtx.length; i++) {
        p.text('row:' + i, 40, 60 * i + 210);
        p.text(mtx[i], 40, 60 * (i + 1) + 180); // i行の配列を表示
      }
    };
  });
  return '';
};

/**
 * 組織図の生成
 */
export const textileGenerator = () => {
  init('組織図の生成');

  globalP5Instance = new p5((p: p5) => {
    const rowA = 20; // Aの行数(Cの列数)
    const columnA = 4; // A,Bの列数(B,Cの行数)
    const mtxA = createMatrix(rowA, columnA);
    const mtxB = createMatrix(columnA, columnA);
    const mtxC = createMatrix(columnA, rowA);
    let mtxP = createMatrix(rowA, rowA);
    let scalar: number;
    const colorTate = p.color(255, 255, 0); // タテ糸の色(黄)
    const colorYoko = p.color(255, 0, 0); // ヨコ糸の色(赤)
    const BLACK = p.color(0, 0, 0); // 黒
    const WHITE = p.color(255, 255, 255); // 白
    const _multMtx = (mtx1: number[][], mtx2: number[][]) => {
      // 行列の積
      const newMtx = createMatrix(mtx1.length, mtx2[0].length);
      for (let i = 0; i < mtx1.length; i++) {
        for (let j = 0; j < mtx2[0].length; j++) {
          let sum = 0; // (i,j)要素の初期値
          for (let k = 0; k < mtx2.length; k++) {
            sum += mtx1[i][k] * mtx2[k][j]; // 要素をかけて足す
          }
          newMtx[i][j] = sum;
        }
      }
      return newMtx;
    };
    const _trMtx = (mtx: number[][]) => {
      // 行列の転置
      const newMtx = createMatrix(mtx[0].length, mtx.length);
      for (let i = 0; i < mtx.length; i++) {
        for (let j = 0; j < mtx[0].length; j++) {
          newMtx[j][i] = mtx[i][j]; // 要素を入れ替える
        }
      }
      return newMtx;
    };
    // 行列を表に書き出す関数
    const _drawTable = (
      mtx: number[][],
      x: number,
      y: number,
      c1: p5.Color,
      c2: p5.Color
    ) => {
      let posY = y * scalar; // セルのy座標位置
      for (let i = 0; i < mtx.length; i++) {
        let posX = x * scalar; // セルのx座標位置
        for (let j = 0; j < mtx[0].length; j++) {
          if (mtx[i][j] == 0) {
            p.fill(c2); // 成分が0ならば色c2でセルを塗る
          } else {
            p.fill(c1); // 成分が1ならば色c1でセルを塗る
          }
          p.rect(posX, posY, scalar, scalar); // 行列をセルとして書き出し
          posX += scalar; // セルの位置を更新
        }
        posY += scalar;
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      scalar = p.height / (rowA + columnA); // セルのサイズ
    };
    p.draw = () => {
      mtxP = _multMtx(_multMtx(mtxA, _trMtx(mtxB)), mtxC); // Pの計算
      p.strokeWeight(1);
      _drawTable(mtxA, 0, columnA, BLACK, WHITE); // Aを表に書き出す(1が黒，0が白)
      _drawTable(mtxB, 0, 0, BLACK, WHITE); // Bを表に書き出す
      _drawTable(mtxC, columnA, 0, BLACK, WHITE); // Cを表に書き出す
      _drawTable(mtxP, columnA, columnA, colorYoko, colorTate); // Pを表に書き出す(1がヨコ糸，0がタテ糸)
      p.strokeWeight(3);
      p.line(0, scalar * columnA, p.width, scalar * columnA); // 罫線の描画
      p.line(scalar * columnA, 0, scalar * columnA, p.height);
    };
    // マウスをクリックしたときの動作
    p.mouseClicked = () => {
      const x = p.floor(p.mouseX / scalar);
      const y = p.floor(p.mouseY / scalar);
      if (y < columnA) {
        // マウスのカーソルがBまたはCの上にある場合
        if (x < columnA) {
          // マウスのカーソルがBの上にある場合
          mtxB[y][x] = (mtxB[y][x] + 1) % 2; // 行列の成分が0ならば1，1ならば0に変える
        } else {
          // マウスのカーソルがCの上にある場合
          mtxC[y][x - columnA] = (mtxC[y][x - columnA] + 1) % 2;
        }
      } else if (x < columnA) {
        // マウスのカーソルがAの上にある場合
        mtxA[y - columnA][x] = (mtxA[y - columnA][x] + 1) % 2;
      }
    };
  });
  return '';
};

/**
 * 対称性・周期性のある模様をランダムに生成
 */
export const textileRepeater = () => {
  init('D2対称性、D4対称性を持つ完全組織の反復');

  globalP5Instance = new p5((p: p5) => {
    const columnA = 10; // A,Bの列数(B,Cの行数)
    const rep = 10; // 反復回数
    const rowA = rep * columnA; // Aの行数(Cの列数)
    const mtxA = createMatrix(rowA, columnA);
    const mtxB = createMatrix(columnA, columnA);
    let mtxC = createMatrix(columnA, rowA);
    let mtxP = createMatrix(rowA, rowA);
    let scalar: number;
    let colorTate = p.color(255, 255, 0); // タテ糸の色(黄)
    let colorYoko = p.color(255, 0, 0); // ヨコ糸の色(赤)
    const BLACK = p.color(0, 0, 0); // 黒
    const WHITE = p.color(255, 255, 255); // 白
    let sym = true; // Bの鏡映対称性(trueならばD4，falseならばD2)
    // 反復配列を作る関数
    const _repeat = (mtx: number[][]) => {
      for (let i = 0; i < rowA; i++) {
        for (let j = 0; j < columnA; j++) {
          mtx[i][j] = 0; // mtxの要素をすべて0にする
        }
      }
      for (let i = 0; i < rowA; i++) {
        let iZigzag: number;
        if (p.int(i / columnA) % 2 == 0) {
          iZigzag = i % columnA;
        } else {
          // 列の端まで達したとき折り返す
          iZigzag = columnA - (i % columnA) - 1;
        }
        mtx[i][iZigzag] = 1; // 行列の要素をジグザグに1にする
      }
    };
    // 行列をランダムに作る関数
    const _randomize = (mtx: number[][]) => {
      for (let i = 0; i < mtx.length; i++) {
        for (let j = 0; j < mtx[0].length; j++) {
          mtx[i][j] = p.int(p.random(2)); // ランダムな01配列の生成
        }
      }
      if (sym) {
        // 対称行列にする場合
        for (let i = 0; i < mtx.length; i++) {
          for (let j = i; j < mtx[0].length; j++) {
            mtx[j][i] = mtx[i][j]; // (i,j)成分と(j,i)成分が同じになるようにする
          }
        }
      }
      colorTate = p.color(p.random(1), 1, 1); // 色彩をランダムに生成
      colorYoko = p.color(p.random(1), 1, 1);
    };
    const _trMtx = (mtx: number[][]) => {
      // 行列の転置
      const newMtx = createMatrix(mtx[0].length, mtx.length);
      for (let i = 0; i < mtx.length; i++) {
        for (let j = 0; j < mtx[0].length; j++) {
          newMtx[j][i] = mtx[i][j]; // 要素を入れ替える
        }
      }
      return newMtx;
    };
    const _multMtx = (mtx1: number[][], mtx2: number[][]) => {
      // 行列の積
      const newMtx = createMatrix(mtx1.length, mtx2[0].length);
      for (let i = 0; i < mtx1.length; i++) {
        for (let j = 0; j < mtx2[0].length; j++) {
          let sum = 0; // (i,j)要素の初期値
          for (let k = 0; k < mtx2.length; k++) {
            sum += mtx1[i][k] * mtx2[k][j]; // 要素をかけて足す
          }
          newMtx[i][j] = sum;
        }
      }
      return newMtx;
    };
    const _drawTable = (
      mtx: number[][],
      x: number,
      y: number,
      c1: p5.Color,
      c2: p5.Color
    ) => {
      p.noStroke();
      let posY = y * scalar;
      for (let i = 0; i < mtx.length; i++) {
        let posX = x * scalar;
        for (let j = 0; j < mtx[0].length; j++) {
          if (mtx[i][j] == 0) {
            p.fill(c2);
          } else {
            p.fill(c1);
          }
          p.rect(posX, posY, scalar, scalar);
          posX += scalar;
        }
        posY += scalar;
      }
    };

    // 配列に関する関数
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      _repeat(mtxA); // Aを反復配列にする
      _randomize(mtxB); // Bをランダムな配列にする
      mtxC = _trMtx(mtxA); // CをAの転置とする
      scalar = p.height / (rowA + columnA); // セルのサイズ
    };
    p.draw = () => {
      mtxP = _multMtx(_multMtx(mtxA, _trMtx(mtxB)), mtxC); // Dの計算
      p.strokeWeight(1);
      _drawTable(mtxA, 0, columnA, BLACK, WHITE); // Aを描画する
      _drawTable(mtxB, 0, 0, BLACK, WHITE); // Bを描画する
      _drawTable(mtxC, columnA, 0, BLACK, WHITE); // Cを描画する
      _drawTable(mtxP, columnA, columnA, colorYoko, colorTate); // Dを描画する
      p.strokeWeight(3);
      p.line(0, scalar * columnA, p.width, scalar * columnA); // 罫線の描画
      p.line(scalar * columnA, 0, scalar * columnA, p.height);
    };
    p.mouseClicked = () => {
      // マウスクリック時
      sym = true; // D4対称性を持つ模様の生成
      _randomize(mtxB);
    };
    p.keyPressed = () => {
      // キーを押したとき
      sym = false; // D2対称性を持つ模様の生成
      _randomize(mtxB);
    };
  });
  return '';
};
