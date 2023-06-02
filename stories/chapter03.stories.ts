import p5 from 'p5';
import dat from 'dat.gui';
import { init } from '../src/common';
export default { title: 'chapter03' };

/**
 * 循環連分数の収束を可視化する
 */
export const convergent = () => {
  init('循環連分数への収束');

  globalP5Instance = new p5((p: p5) => {
    p.setup = () => {
      const m = 1;
      const num = 10; //数列の項数
      let x = m;
      const alpha = (m + Math.sqrt(m * m + 4)) / 2; //収束先の循環連分数
      p.createCanvas(500, 200);
      const limPos = p.map(alpha, m, m + 1, 0, p.height); //収束先の位置
      p.stroke(255, 0, 0); //漸近線の色(赤)
      p.line(0, limPos, p.width, limPos); //漸近線
      const step = p.width / num; //数列の項が増加するごとのx位置の増分
      p.stroke(0); //数列のグラフの色(黒)
      //数列を順に計算し，線分でつなぐ
      for (let i = 0; i < num; i++) {
        const nextX = m + 1.0 / x; //漸化式
        const pos = p.map(x, m, m + 1, 0, p.height); //i項目の数の位置
        const nextPos = p.map(nextX, m, m + 1, 0, p.height); //i+1項目の数の位置
        p.line(i * step, pos, (i + 1) * step, nextPos); //線分の描画
        x = nextX; //次の項を計算するために数を更新
      }
    };
  });

  return '';
};

/**
 * 正方形の敷き詰めによってフィボナッチ長方形を作る
 */
export const square = () => {
  init('フィボナッチ数列の可視化');

  globalP5Instance = new p5((p: p5) => {
    let fibo = [0, 1]; //フィボナッチ数列
    const _drawSquare = () => {
      let xPos = 0; //正方形のx位置
      let yPos = 0; //正方形のy位置
      const nextFibo = fibo[fibo.length - 2] + fibo[fibo.length - 1]; //次のフィボナッチ数
      const scalar = p.width / nextFibo; //長方形がウィンドウ幅に収まるように拡大
      p.background(0, 0, 1); //描画ごとに背景を白く塗りつぶし
      for (let i = 1; i < fibo.length; i++) {
        p.fill((0.1 * i) % 1, 1, 1);
        p.rect(
          scalar * xPos,
          scalar * yPos,
          scalar * fibo[i],
          scalar * fibo[i]
        );
        //正方形の位置は順にフィボナッチ数を足す・引くことで移動させる
        if (i % 2 == 1) {
          //数列の順番に従って交互に符号を変える
          xPos += fibo[i];
          yPos -= fibo[i - 1];
        } else {
          xPos -= fibo[i - 1];
          yPos += fibo[i];
        }
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      _drawSquare();
    };
    p.mouseClicked = () => {
      const nextFibo = fibo[fibo.length - 2] + fibo[fibo.length - 1]; //新しいフィボナッチ数を計算
      fibo = p.append(fibo, nextFibo); //新しいフィボナッチ数を配列に加える
      _drawSquare();
      console.log(nextFibo);
    };
  });

  return '';
};

/**
 * 回り込むように正方形を敷き詰めてフィボナッチ長方形を作る
 */
export const squareSpiral = () => {
  init('回り込むように正方形を敷き詰めてフィボナッチ長方形を作る');

  globalP5Instance = new p5((p: p5) => {
    let fibo = [0, 1, 1];
    const _drawSpiral = () => {
      const SGN = [-1, 1, 1, -1]; //敷き詰める方向を決める符号
      let xPos = 0;
      let yPos = 0;
      const scalar = p.width / (2 * fibo[fibo.length - 1]); //拡大・縮小比率
      p.background(0, 0, 1);

      /**
       * ↓クリックのたびに呼び出すと正常に表示されないのでsetup()に移動して一度だけ実行
       * p.translate(p.width / 2, p.height / 2); //描画ウィンドウ中央に移動
       */

      for (let i = 1; i < fibo.length - 1; i++) {
        p.fill((0.1 * i) % 1, 1, 1);
        //正方形を描く方向を符号の配列に従って変える
        p.rect(
          scalar * xPos,
          scalar * yPos,
          scalar * SGN[(i + 1) % 4] * fibo[i], //符号が負の場合，逆方向に正方形を描画
          scalar * SGN[i % 4] * fibo[i]
        );
        //正方形の位置を符号の配列に従って変える
        if (i % 2 == 1) {
          xPos += SGN[i % 4] * (fibo[i] + fibo[i + 1]);
        } else {
          yPos += SGN[i % 4] * (fibo[i] + fibo[i + 1]);
        }
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.translate(p.width / 2, p.height / 2); //描画ウィンドウ中央に移動
      _drawSpiral();
    };
    p.mouseClicked = () => {
      const nextFibo = fibo[fibo.length - 2] + fibo[fibo.length - 1];
      fibo = p.append(fibo, nextFibo);
      _drawSpiral();
      console.log(nextFibo);
    };
  });

  return '';
};

/**
 * フィボナッチ長方形の敷き詰めによって正方形を作る
 */
export const rect = () => {
  init('フィボナッチ長方形の敷き詰めによって正方形を作る');

  globalP5Instance = new p5((p: p5) => {
    let fibo = [0, 1, 1];
    const _drawRect = () => {
      const SGN = [-1, 1, 1, -1]; //敷き詰める方向
      let xPos = 0;
      let yPos = 0;
      const scalar = p.width / (2 * fibo[fibo.length - 1]); //拡大・縮小比率
      p.background(0, 0, 1);
      for (let i = 1; i < fibo.length - 1; i++) {
        p.fill((0.1 * i) % 1, 1, 1);
        p.rect(
          scalar * xPos,
          scalar * yPos,
          scalar * SGN[(i + 1) % 4] * fibo[i - 1], //横が短辺
          scalar * SGN[i % 4] * fibo[i]
        ); //縦が長辺(次の項のフィボナッチ数)
        if (i % 2 == 1) {
          xPos += SGN[i % 4] * (fibo[i - 1] + fibo[i]); //x位置の取り方を変更
        } else {
          yPos += SGN[i % 4] * (fibo[i] + fibo[i + 1]);
        }
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.translate(p.width / 2, p.height / 2); //描画ウィンドウ中央に移動
      _drawRect();
    };
    p.mouseClicked = () => {
      const nextFibo = fibo[fibo.length - 2] + fibo[fibo.length - 1];
      fibo = p.append(fibo, nextFibo);
      _drawRect();
      console.log(nextFibo);
    };
  });

  return '';
};

/**
 * 正方形の再帰的なフィボナッチ分割
 */
export const recurDiv = () => {
  init('正方形の再帰的なフィボナッチ分割');

  globalP5Instance = new p5((p: p5) => {
    let num = 10;
    let thr = 1; //関数の繰り返し回数に関するしきい値
    let fibo: number[];
    const SGN = [1, 1, -1, -1];
    const _generateFibo = (ind: number) => {
      fibo = [0, 1];
      for (let i = 1; i < ind; i++) {
        fibo = p.append(fibo, fibo[i - 1] + fibo[i]);
      }
      fibo = p.reverse(fibo); //配列の番号付けを逆にする
    };
    const _colRect = (
      xPos: number,
      yPos: number,
      wd: number,
      ht: number,
      ind: number
    ) => {
      const scalar = p.width / fibo[0];
      p.fill(((ind * 1.0) / num) % 1, 1, 1);
      p.rect(scalar * xPos, scalar * yPos, scalar * wd, scalar * ht);
    };

    const _divRect = (
      xPos: number,
      yPos: number,
      ind: number,
      itr: number,
      sgnX: number,
      sgnY: number
    ) => {
      for (let i = 0; i < num - ind; i++) {
        const lng = fibo[i + ind];
        const newSgnX = sgnX * SGN[(i + 1) % 4];
        const newSgnY = sgnY * SGN[i % 4];
        _colRect(xPos, yPos, newSgnX * lng, newSgnY * lng, ind + i);
        xPos += newSgnX * lng;
        yPos += newSgnY * lng;
        if (itr < thr) {
          _divSquare(xPos, yPos, ind + i, itr + 1, -newSgnX, -newSgnY);
        }
      }
    };

    //正方形の位置(xPos, yPos)，フィボナッチ数列の項数ind，
    //関数の繰り返し回数itr，正方形の描画に関する符号(sgnX,sgnY)を引数とする分割
    const _divSquare = (
      xPos: number,
      yPos: number,
      ind: number,
      itr: number,
      sgnX: number,
      sgnY: number
    ) => {
      //(num-ind)項目のフィボナッチ数(=fibo[ind])を一辺とする正方形を順に分割
      for (let i = 0; i < num - ind; i++) {
        //フィボナッチ数列の順序を逆にしているため，iが大きいほどフィボナッチ長方形は小さい
        const lng0 = fibo[i + ind + 1]; //フィボナッチ長方形の横幅(短辺)
        const lng1 = fibo[i + ind]; //フィボナッチ長方形の縦幅(長辺)
        const newSgnX = sgnX * SGN[i % 4]; //長方形を描画する方向
        const newSgnY = sgnY * SGN[(i + 1) % 4];
        _colRect(
          xPos,
          yPos, //フィボナッチ長方形の位置
          newSgnX * lng0,
          newSgnY * lng1, //フィボナッチ長方形の大きさ
          ind + i + 1
        ); //項数に対応して長方形の色を決定
        xPos += newSgnX * lng0;
        yPos += newSgnY * lng1;
        if (itr < thr) {
          //関数の繰り返し回数がしきい値未満ならば長方形をフィボナッチ分割
          _divRect(
            xPos,
            yPos,
            i + ind + 1, //フィボナッチ長方形の短辺の項数を渡す
            itr + 1, //繰り返し回数を1増やして渡す
            -newSgnX,
            -newSgnY
          ); //敷き詰めの回り込みの向きを逆にする
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
      _generateFibo(num); //num項目までのフィボナッチ数列を生成
      _divSquare(0, 0, 0, 0, 1, 1); //正方形のフィボナッチ分割
    };
    p.mouseClicked = () => {
      num = Math.trunc(p.random(2, 10));
      thr = Math.trunc(p.random(0, 9));
      console.log('num =', num, 'thr =', thr);
      p.background(0, 0, 1);
      _generateFibo(num);
      _divSquare(0, 0, 0, 0, 1, 1);
    };
  });

  return '';
};

/**
 * 再帰的なフィボナッチ分割のGUIプログラム
 */
export const recurDivGUI = () => {
  init('再帰的なフィボナッチ分割のGUIプログラム');

  globalP5Instance = new p5((p: p5) => {
    let fibo: number[];
    const SGN = [1, 1, -1, -1];
    const controls = {
      num: 10,
      thr: 0
    };
    const _controller = () => {
      gui = new dat.GUI();
      gui.add(controls, 'num', 1, 20);
      gui.add(controls, 'thr', 0, 9);
    };
    const _generateFibo = (ind: number) => {
      fibo = [0, 1];
      for (let i = 1; i < ind; i++) {
        fibo = p.append(fibo, fibo[i - 1] + fibo[i]);
      }
      fibo = p.reverse(fibo); //配列の番号付けを逆にする
    };
    const _colRect = (
      xPos: number,
      yPos: number,
      wd: number,
      ht: number,
      ind: number
    ) => {
      const scalar = p.width / fibo[0];
      p.fill(((ind * 1.0) / controls.num) % 1, 1, 1);
      p.rect(scalar * xPos, scalar * yPos, scalar * wd, scalar * ht);
    };
    const _divRect = (
      xPos: number,
      yPos: number,
      ind: number,
      itr: number,
      sgnX: number,
      sgnY: number
    ) => {
      const { num, thr } = controls;
      for (let i = 0; i < num - ind; i++) {
        const lng = fibo[i + ind];
        const newSgnX = sgnX * SGN[(i + 1) % 4];
        const newSgnY = sgnY * SGN[i % 4];
        _colRect(xPos, yPos, newSgnX * lng, newSgnY * lng, ind + i);
        xPos += newSgnX * lng;
        yPos += newSgnY * lng;
        if (itr < thr) {
          _divSq(xPos, yPos, ind + i, itr + 1, -newSgnX, -newSgnY);
        }
      }
    };
    const _divSq = (
      posX: number,
      posY: number,
      ind: number,
      itr: number,
      sgnX: number,
      sgnY: number
    ) => {
      const { num, thr } = controls;
      for (let i = 0; i < num - ind; i++) {
        const lng0 = fibo[i + ind + 1]; //小さい方の数
        const lng1 = fibo[i + ind]; //大きい方の数
        const newSgnX = sgnX * SGN[i % 4];
        const newSgnY = sgnY * SGN[(i + 1) % 4];
        _colRect(posX, posY, newSgnX * lng0, newSgnY * lng1, ind + i + 1);
        posX += newSgnX * lng0;
        posY += newSgnY * lng1;
        if (itr < thr) {
          _divRect(posX, posY, ind + i + 1, itr + 1, -newSgnX, -newSgnY);
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      _controller();
    };
    p.draw = () => {
      _generateFibo(controls.num);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
      _divSq(0, 0, 0, 0, 1, 1);
    };
  });

  return '';
};

/**
 * フィボナッチらせんを描く
 */
export const spiral = () => {
  init('フィボナッチらせんを描く');

  globalP5Instance = new p5((p: p5) => {
    let fibo = [0, 1, 1];
    const SGN = [-1, 1, 1, -1]; //敷き詰める方向
    const _drawSpiral = () => {
      let xPos = 0;
      let yPos = 0;
      const scalar = p.width / (2 * fibo[fibo.length - 1]); //拡大・縮小比率
      p.background(0, 0, 1);
      for (let i = 1; i < fibo.length - 1; i++) {
        p.stroke(0, 0, 0);
        p.rect(
          scalar * xPos,
          scalar * yPos,
          scalar * SGN[(i + 1) % 4] * fibo[i],
          scalar * SGN[i % 4] * fibo[i]
        );
        p.stroke(0, 1, 1);
        p.arc(
          scalar * (xPos + SGN[(i + 1) % 4] * fibo[i]), //円の中心のx座標
          scalar * (yPos + SGN[i % 4] * fibo[i]), //円の中心のy座標
          scalar * 2 * fibo[i], //楕円の縦の直径
          scalar * 2 * fibo[i], //楕円の横の直径(正円のため縦と同じ)
          ((1 + i) * p.PI) / 2, //円弧の開始位置(ラジアン)
          ((2 + i) * p.PI) / 2
        ); //円弧の終了位置
        if (i % 2 == 1) {
          xPos += SGN[i % 4] * (fibo[i] + fibo[i + 1]);
        } else {
          yPos += SGN[i % 4] * (fibo[i] + fibo[i + 1]);
        }
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.translate(p.width / 2, p.height / 2); //描画ウィンドウ中央に移動
      _drawSpiral();
    };
    p.mouseClicked = () => {
      const nextFibo = fibo[fibo.length - 2] + fibo[fibo.length - 1];
      fibo = p.append(fibo, nextFibo);
      _drawSpiral();
      console.log(nextFibo);
    };
  });

  return '';
};
