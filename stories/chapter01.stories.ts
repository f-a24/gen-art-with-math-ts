import p5 from 'p5';
import dat from 'dat.gui';
import { init } from '../src/common';
export default { title: 'chapter01' };

/**
 * aとbに対してユークリッド互除法を行う
 */
export const numeric = () => {
  init('ユークリッド互除法の計算を行う');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(850, 170);

      // 課題
      const exercise = [
        [10, 6],
        [6, 9],
        [6, 15],
        [21, 17],
        [18, 20]
      ];

      // 課題を繰り返す
      exercise.forEach((e, i) => {
        let a = e[0];
        let b = e[1];
        let c: number; // 商のための変数
        let d = b; // 余りのための変数
        let itr = 0; // 繰り返しの回数

        p.textSize(20);
        p.text(`a = ${a}, b = ${b}`, i * 170, 30);
        p.textSize(16);

        // 繰り返し処理
        while (d > 0) {
          // 余りが0以上のとき以下の処理を実行
          itr++; // 繰り返し回数を1増やす
          c = (a / b) | 0; // cに商を代入
          d = a % b; // dに余りを代入
          p.text(`${itr} : ${a} / ${b} = ${c}...${d}`, i * 170, itr * 30 + 30); // 計算結果を表示
          a = b; // aにbを代入
          b = d; // bに余りを代入
        }
        p.textSize(20);
        p.text(`GCD is ${a}`, i * 170, (itr + 1) * 30 + 30); // 最大公約数を表示
      });
    };
  });
  return '';
};

/**
 * 長方形の分割によるユークリッド互除法の可視化
 */
export const divRect = () => {
  init('長方形の分割によるユークリッド互除法の可視化');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(500, 500);

      // 横縦比がnumA:numBの長方形を正方形によって分割
      const scalar = 50; // 長方形の拡大倍率
      const numA = 10 * scalar; // 数値の大きさを拡大
      const numB = 6 * scalar;

      // プログラム実行中に動く変数
      let wd = numB; // 分割に使う正方形の幅の大きさ(初期値numB)
      let xPos = 0; // 正方形のx位置(初期値0)
      let yPos = 0; // 正方形のy位置(初期値0)
      let itr = 0; // 分割の繰り返し回数(初期値0)

      // 繰り返し処理
      while (wd > 0) {
        // 幅が0になるまで以下を実行
        itr++; // 繰り返し回数を1増やす
        if (itr % 2 === 1) {
          // 繰り返し回数が奇数のとき，x軸方向へ正方形を増やす
          while (xPos + wd <= numA) {
            // 幅を足したとき，長方形を超えなければ以下を実行
            p.rect(xPos, yPos, wd, wd); // (xPos, yPos)を左上の頂点とする1辺wdの正方形を描画
            xPos += wd; // x位置を更新
          }
          wd = numA - xPos; // 幅を更新
        } else {
          // 繰り返し回数が偶数のとき，y軸方向へ正方形を加える
          while (yPos + wd <= numB) {
            // 幅を足したとき，長方形を超えなければ以下を実行
            p.rect(xPos, yPos, wd, wd); // (xPos, yPos)を左上の頂点とする1辺wdの正方形を描画
            yPos += wd; // y位置を更新
          }
          wd = numB - yPos; // 幅を更新
        }
      }
    };
  });
  return '';
};

/**
 * divRectを着彩したもの
 */
export const divRectColor = () => {
  init('Div Rectを着彩したもの');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(500, 500);

      // 横縦比がnumA:numBの長方形を正方形によって分割
      const scalar = 50; // 長方形の拡大倍率
      const numA = 10 * scalar; // 数値の大きさを拡大
      const numB = 6 * scalar;

      // プログラム実行中に動く変数
      let wd = numB; // 分割に使う正方形の幅の大きさ(初期値numB)
      let xPos = 0; // 正方形のx位置(初期値0)
      let yPos = 0; // 正方形のy位置(初期値0)
      let itr = 0; // 分割の繰り返し回数(初期値0)
      let col: p5.Color; // 色のための変数
      p.colorMode('hsb', 1); // 01区間をパラメータとするHSB色形式を使用

      // 繰り返し処理
      while (wd > 0) {
        // 幅が0になるまで以下を実行
        itr++; // 繰り返し回数を1増やす
        if (itr % 2 === 1) {
          // 繰り返し回数が奇数のとき，x軸方向へ正方形を増やす
          while (xPos + wd <= numA) {
            // 幅を足したとき，長方形を超えなければ以下を実行
            col = p.color(p.random(1), 1, 1); // 色相のみを01区間でランダムに変える
            p.fill(col);
            p.rect(xPos, yPos, wd, wd); // (xPos, yPos)を左上の頂点とする1辺wdの正方形を描画
            xPos += wd; // x位置を更新
          }
          wd = numA - xPos; // 幅を更新
        } else {
          // 繰り返し回数が偶数のとき，y軸方向へ正方形を加える
          while (yPos + wd <= numB) {
            // 幅を足したとき，長方形を超えなければ以下を実行
            col = p.color(p.random(1), 1, 1);
            p.fill(col);
            p.rect(xPos, yPos, wd, wd); // (xPos, yPos)を左上の頂点とする1辺wdの正方形を描画
            yPos += wd; // y位置を更新
          }
          wd = numB - yPos; // 幅を更新
        }
      }
    };
  });
  return '';
};

/**
 * 正方形の分割によるユークリッド互除法の可視化
 */
export const divSquare = () => {
  init('長方形による正方形の分割');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);

      // 縦横比がnumA:numBの長方形によって正方形の描画ウィンドウを分割
      const numA = 16;
      const numB = 7;
      const ratio = numB / numA; // 比率

      let xPos = 0;
      let yPos = 0;
      let itr = 0;
      let wd = p.width; // 描画ウィンドウの横幅サイズを初期値とする

      // 繰り返し処理
      while (wd > 0) {
        itr++;
        if (itr % 2 === 1) {
          // 繰り返し回数が奇数のとき，x軸方向へ正方形を増やす
          while (xPos + wd * ratio < p.width + 0.1) {
            // 幅を足したとき，横幅がウィンドウを超えなければ以下の処理を実行
            p.fill(p.color(p.random(1), 1, 1));
            p.rect(xPos, yPos, wd * ratio, wd); // (xPos, yPos)を左上の頂点とする1辺wdの正方形を描画
            xPos += wd * ratio; // x位置を更新
          }
          wd = p.width - xPos;
        } else {
          // 横幅がwdの長方形をy軸方向へ加える
          while (yPos + wd / ratio < p.width + 0.1) {
            // 幅を足したとき，縦幅がウィンドウを超えなければ以下の処理を実行
            p.fill(p.color(p.random(1), 1, 1));
            p.rect(xPos, yPos, wd, wd / ratio); // 横幅wd，縦横比がnumA:numBの長方形
            yPos += wd / ratio; // y位置を更新
          }
          wd = p.width - yPos; // 幅を更新
        }
      }
    };
  });
  return '';
};

/**
 * 長方形の長方形による分割
 */
export const rectDivRect = () => {
  init('長方形の長方形による分割');

  globalP5Instance = new p5((p: p5) => {
    const numA = 10;
    const numB = 6;
    const ratio = numB / numA;

    /**
     * 位置(xPos,yPos)にある1辺がwdの正方形を縦横比がnumA:numBの長方形で分割する
     */
    const _divSquare = (xPos: number, yPos: number, wd: number) => {
      //この関数内だけのローカル変数
      let itr = 0;
      const xEndPos = wd + xPos; //正方形の右下の頂点のx座標
      const yEndPos = wd + yPos; //正方形の右下の頂点のy座標
      //繰り返し処理
      while (wd > 0.1) {
        itr++;
        if (itr % 2 == 1) {
          while (xPos + wd * ratio < xEndPos + 0.1) {
            //ratioはグローバル変数
            p.fill(p.color(p.random(1), 1, 1));
            p.rect(xPos, yPos, wd * ratio, wd);
            xPos += wd * ratio;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd / ratio < yEndPos + 0.1) {
            p.fill(p.color(p.random(1), 1, 1));
            p.rect(xPos, yPos, wd, wd / ratio);
            yPos += wd / ratio;
          }
          wd = yEndPos - yPos;
        }
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);

      let itr = 0;
      let xPos = 0;
      let yPos = 0;
      let wd = p.width * ratio;

      while (wd > 0.1) {
        itr++;
        if (itr % 2 == 1) {
          while (xPos + wd < p.width + 0.1) {
            _divSquare(xPos, yPos, wd); // 正方形を分割する関数の呼び出し
            xPos += wd;
          }
          wd = p.width - xPos;
        } else {
          while (yPos + wd < p.width * ratio + 0.1) {
            _divSquare(xPos, yPos, wd); // 正方形を分割する関数の呼び出し
            yPos += wd;
          }
          wd = p.width * ratio - yPos;
        }
      }
    };
  });
  return '';
};

/**
 * 正方形の再帰的な分割
 */
export const recurDivSquare = () => {
  init('正方形の再帰的な分割');

  globalP5Instance = new p5((p: p5) => {
    let numA = 10;
    let numB = 6;
    let ratio = numB / numA;
    let thr = 160; // しきい値

    /**
     * 位置(xPos,yPos)にある横幅wdで縦横比がnumA:numBの長方形を正方形によって分割する
     */
    const _divRect = (xPos: number, yPos: number, wd: number) => {
      let itr = 0;
      const xEndPos = xPos + wd;
      const yEndPos = yPos + wd / ratio;
      p.fill(p.color(p.random(1), 1, 1));
      p.rect(xPos, yPos, wd, wd / ratio);
      while (wd > thr) {
        // 長方形の幅がしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 == 0) {
          while (xPos + wd < xEndPos + 0.1) {
            _divSquare(xPos, yPos, wd); //正方形を分割する関数の呼び出し
            xPos += wd;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd < yEndPos + 0.1) {
            _divSquare(xPos, yPos, wd); //正方形を分割する関数の呼び出し
            yPos += wd;
          }
          wd = yEndPos - yPos;
        }
      }
    };

    /**
     * 位置(xPos,yPos)にある1辺がwdの正方形を縦横比がnumA:numBの長方形で分割する
     */
    const _divSquare = (xPos: number, yPos: number, wd: number) => {
      let itr = 0;
      const xEndPos = wd + xPos;
      const yEndPos = wd + yPos;
      p.fill(p.color(p.random(1), 1, 1));
      p.rect(xPos, yPos, wd, wd);
      while (wd > thr) {
        //wdがしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 == 1) {
          while (xPos + wd * ratio < xEndPos + 0.1) {
            _divRect(xPos, yPos, wd * ratio); //長方形を分割する関数の呼び出し
            xPos += wd * ratio;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd / ratio < yEndPos + 0.1) {
            _divRect(xPos, yPos, wd); //長方形を分割する関数の呼び出し
            yPos += wd / ratio;
          }
          wd = yEndPos - yPos;
        }
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      _divSquare(0, 0, p.width); //正方形の分割
    };

    p.mouseClicked = () => {
      numA = Math.floor(p.random(1, 20)); //1以上20以下のランダムな整数を代入
      numB = Math.floor(p.random(1, 20));
      while (numA === numB) {
        //numAとnumBが異なるようにする
        numB = Math.floor(p.random(1, 20));
      }
      thr = Math.floor(p.random(10, 300));
      console.log('numA =', numA, 'numB =', numB, 'thr =', thr); //numA,numB,thrの値を表示
      ratio = numA / numB;
      p.background(0, 0, 1); //背景を白で消去
      p.fill(0, 0, 0);
      _divSquare(0, 0, p.width);
    };
  });
  return '';
};

/**
 * recurDivSquareのGUIプログラム
 */
export const recurDivSquareGUI = () => {
  init('Recur Div SquareのGUIプログラム');

  globalP5Instance = new p5((p: p5) => {
    const controls = {
      numA: 10,
      numB: 6,
      thr: 100,
      changeColor() {
        for (let i = 0; i < rand.length; i++) {
          rand[i] = p.random(1);
        }
      }
    };
    let ratio = controls.numA / controls.numB;
    let rand = [0]; //ランダムな数値を格納する配列
    let count = 0;

    const _setColor = () => {
      if (rand.length <= count) {
        rand = p.append(rand, p.random(1));
      }
      p.fill(p.color(rand[count], 1, 1));
      count++;
    };

    /**
     * 位置(xPos,yPos)にある横幅wdで縦横比がnumA:numBの長方形を正方形によって分割する
     */
    const _divRect = (xPos: number, yPos: number, wd: number) => {
      let itr = 0;
      const xEndPos = xPos + wd;
      const yEndPos = yPos + wd / ratio;
      _setColor();
      p.rect(xPos, yPos, wd, wd / ratio);
      while (wd > controls.thr) {
        // 長方形の幅がしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 == 0) {
          while (xPos + wd < xEndPos + 0.1) {
            _divSquare(xPos, yPos, wd); //正方形を分割する関数の呼び出し
            xPos += wd;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd < yEndPos + 0.1) {
            _divSquare(xPos, yPos, wd); //正方形を分割する関数の呼び出し
            yPos += wd;
          }
          wd = yEndPos - yPos;
        }
      }
    };

    /**
     * 位置(xPos,yPos)にある1辺がwdの正方形を縦横比がnumA:numBの長方形で分割する
     */
    const _divSquare = (xPos: number, yPos: number, wd: number) => {
      let itr = 0;
      const xEndPos = wd + xPos;
      const yEndPos = wd + yPos;
      _setColor();
      p.rect(xPos, yPos, wd, wd);
      while (wd > controls.thr) {
        //wdがしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 == 1) {
          while (xPos + wd * ratio < xEndPos + 0.1) {
            _divRect(xPos, yPos, wd * ratio); //長方形を分割する関数の呼び出し
            xPos += wd * ratio;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd / ratio < yEndPos + 0.1) {
            _divRect(xPos, yPos, wd); //長方形を分割する関数の呼び出し
            yPos += wd / ratio;
          }
          wd = yEndPos - yPos;
        }
      }
    };

    const _controller = () => {
      gui = new dat.GUI();
      gui.add(controls, 'numA', 1, 40, 1);
      gui.add(controls, 'numB', 1, 40, 1);
      gui.add(controls, 'thr', 10, 300, 30);
      gui.add(controls, 'changeColor');
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      _controller();
    };

    p.draw = () => {
      p.background(1, 0, 1);
      ratio = controls.numB / controls.numA;
      count = 0;
      if (ratio !== 1) {
        // numAとnumBが異なるとき実行
        _divSquare(0, 0, p.width);
      }
    };
  });
  return '';
};
