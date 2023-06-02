import p5 from 'p5';
import dat from 'dat.gui';
import { init } from '../src/common';

/**
 * divRectによる分割の細部を拡大表示する
 */
export const divRectZoom = () => {
  init('Div Rectによる分割の細部を拡大表示する');

  globalP5Instance = new p5((p: p5) => {
    const ratio = p.sqrt(2);
    p.setup = () => {
      p.createCanvas(500, 353);
      p.colorMode(p.HSB, 1);
    };
    p.draw = () => {
      p.background(0, 0, 1);
      const scalar = p.pow(50, (p.mouseX * 1.0) / p.width) * p.width;
      // マウスのカーソルのX座標によって長方形を1～50倍まで拡大する
      _divRect(p.width - scalar, p.height - scalar / ratio, scalar); //長方形を分割
    };
    const _divRect = (xPos: number, yPos: number, wd: number) => {
      let itr = 0;
      const xEndPos = xPos + wd;
      const yEndPos = yPos + wd / ratio;
      while (wd > 0.1) {
        itr++;
        p.fill(p.color((itr * ratio) % 1, 1, 1)); //色を指定
        if (itr % 2 === 0) {
          while (xPos + wd < xEndPos + 0.1) {
            p.rect(xPos, yPos, wd, wd);
            xPos += wd;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd < yEndPos + 0.1) {
            p.rect(xPos, yPos, wd, wd);
            yPos += wd;
          }
          wd = yEndPos - yPos;
        }
      }
    };
  });
  return '';
};

/**
 * 黄金分割を使ってモンドリアンもどきの絵を描く
 */
export const mondrian = () => {
  init('モンドリアンもどきの生成');

  globalP5Instance = new p5((p: p5) => {
    const ratio = (p.sqrt(5) + 1) / 2; //黄金数
    let thr = 80; //分割する大きさに関するしきい値
    let thr2 = 0.5; //確率を決定するしきい値
    p.setup = () => {
      p.createCanvas(500, 500);
      p.textSize(24);
      p.text('長方形の分割によるユークリッド互除法の可視化', 10, 30);
      p.colorMode(p.HSB, 1);
      _colorRect(0, 0, p.width, p.width);
      _divSquare(0, 0, p.width);
    };
    p.mouseClicked = () => {
      thr = p.int(p.random(10, 300));
      thr2 = p.random(0, 1);
      console.log('thr =', thr, 'thr2 =', thr2);
      _colorRect(0, 0, p.width, p.width);
      _divSquare(0, 0, p.width);
    };
    const _colorRect = (xPos: number, yPos: number, wd: number, ht: number) => {
      let col: p5.Color;
      const val = p.random(1);

      // 15%の確率
      if (val < 0.15) col = p.color(0, 1, 1); // 赤
      // 15%の確率
      else if (val < 0.3) col = p.color(2.0 / 3, 1, 1); // 青
      // 15%の確率
      else if (val < 0.45) col = p.color(1.0 / 6, 1, 1); // 黄
      // 5%の確率
      else if (val < 0.5) col = p.color(0, 1, 0); // 黒
      // 20%の確率
      else if (val < 0.7) col = p.color(0, 0, 0.9); // 灰
      // 30%の確率
      else col = p.color(0, 0, 1); // 白

      p.fill(col);
      p.strokeWeight(5); //長方形の枠線の太さ
      p.rect(xPos, yPos, wd, ht);
    };
    const _divRect = (xPos: number, yPos: number, wd: number) => {
      //長方形を分割する関数
      let itr = 0;
      const xEndPos = xPos + wd; //長方形の横の長さ
      const yEndPos = yPos + wd / ratio; //長方形の縦の長さ
      while (wd > thr) {
        //wdがしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 === 0) {
          while (xPos + wd < xEndPos + 0.1) {
            _colorRect(xPos, yPos, wd, wd); //正方形を描く
            if (p.random(1) < thr2) _divSquare(xPos, yPos, wd); //正方形を分割する関数の呼び出し
            xPos += wd;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd < yEndPos + 0.1) {
            _colorRect(xPos, yPos, wd, wd); //正方形を描く
            if (p.random(1) < thr2) _divSquare(xPos, yPos, wd); //正方形を分割する関数の呼び出し
            yPos += wd;
          }
          wd = yEndPos - yPos;
        }
      }
    };
    const _divSquare = (xPos: number, yPos: number, wd: number) => {
      //正方形を分割する関数
      let itr = 0;
      const xEndPos = wd + xPos; //正方形の横の長さ
      const yEndPos = wd + yPos; //正方形の縦の長さ
      while (wd > thr) {
        //正方形の幅がしきい値以上の場合に実行
        itr++;
        if (itr % 2 === 1) {
          while (xPos + wd * ratio < xEndPos + 0.1) {
            _colorRect(xPos, yPos, wd * ratio, wd); //長方形を描く
            // thr2の確率で再分割
            if (p.random(1) < thr2) _divRect(xPos, yPos, wd * ratio); // 長方形を分割する関数の呼び出し
            xPos += wd * ratio;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd / ratio < yEndPos + 0.1) {
            _colorRect(xPos, yPos, wd, wd / ratio); // 長方形を描く
            // thr2の確率で再分割
            if (p.random(1) < thr2) _divRect(xPos, yPos, wd); // 長方形を分割する関数の呼び出し
            yPos += wd / ratio;
          }
          wd = yEndPos - yPos;
        }
      }
    };
  });
  return '';
};

/**
 * 再起的な黄金分割のGUIプログラム
 */
export const goldDivGUI = () => {
  init('再起的な黄金分割のGUIプログラム');

  globalP5Instance = new p5((p: p5) => {
    let ratio: number;
    let rand1: number[];
    let rand2: number[];
    let count: number;
    const controls = {
      thr: 100,
      thr2: 0.5,
      changeCol() {
        for (let i = 0; i < rand1.length; i++) {
          rand1[i] = p.random(1); //ランダムに数を選んで配列の要素を書き換える
          rand2[i] = p.random(1);
        }
      },
      mond: false
    };

    const _controller = () => {
      gui = new dat.GUI();
      gui.add(controls, 'thr', 10, 300, 30);
      gui.add(controls, 'thr2', 0, 1);
      gui.add(controls, 'changeCol');
      gui.add(controls, 'mond');
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode(p.HSB, 1);
      _controller(); //controller関数を呼び出し
      rand1 = [0]; //0個の配列を生成
      rand2 = [0];
    };
    p.draw = () => {
      p.background(1, 0, 1);
      ratio = (1 + p.sqrt(5)) / 2;
      count = 0;
      if (ratio !== 1) {
        _colRect(0, 0, p.width, p.width);
        _divSq(0, 0, p.width);
      }
    };
    const _colRect = (x: number, y: number, z: number, w: number) => {
      if (rand1.length <= count) {
        rand1 = p.append(rand1, p.random(1)); //ランダムに選んだ数を新しい要素として配列hに加える
        rand2 = p.append(rand2, p.random(1)); //ランダムに選んだ数を新しい要素として配列hに加える
      }
      if (controls.mond) _mondCol(rand2[count]);
      else {
        p.fill(p.color(rand2[count], 1, 1));
        p.strokeWeight(1);
      }

      p.rect(x, y, z, w);
      count++;
    };
    const _mondCol = (val: number) => {
      let col = p.color(0, 0, 1); // 白
      if (val < 0.15) col = p.color(0, 1, 1); // 赤
      else if (val < 0.3) col = p.color(2.0 / 3, 1, 1); // 青
      else if (val < 0.45) col = p.color(1.0 / 6, 1, 1); // 黄
      else if (val < 0.5) col = p.color(0, 1, 0); // 黒
      else if (val < 0.7) col = p.color(0, 0, 0.9); // 灰
      p.fill(col);
      p.strokeWeight(5);
    };
    const _divRect = (xPos: number, yPos: number, wd: number) => {
      // 長方形を分割する関数
      let itr = 0;
      const xEndPos = xPos + wd; // 長方形の横の長さ
      const yEndPos = yPos + wd / ratio; // 長方形の縦の長さ
      while (wd > controls.thr) {
        // wdがしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 === 0) {
          while (xPos + wd < xEndPos + 0.1) {
            _colRect(xPos, yPos, wd, wd); // 正方形を描く
            if (rand1[count - 1] > controls.thr2) _divSq(xPos, yPos, wd); // 正方形を分割する関数の呼び出し
            xPos += wd;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd < yEndPos + 0.1) {
            _colRect(xPos, yPos, wd, wd); // 正方形を描く
            if (rand1[count - 1] > controls.thr2) _divSq(xPos, yPos, wd); // 正方形を分割する関数の呼び出し
            yPos += wd;
          }
          wd = yEndPos - yPos;
        }
      }
    };
    const _divSq = (xPos: number, yPos: number, wd: number) => {
      let itr = 0;
      const xEndPos = wd + xPos; // 正方形の横の長さ
      const yEndPos = wd + yPos; // 正方形の縦の長さ
      while (wd > controls.thr) {
        // wdがしきい値以上の場合に処理を行う
        itr++;
        if (itr % 2 === 1) {
          while (xPos + wd * ratio < xEndPos + 0.1) {
            _colRect(xPos, yPos, wd * ratio, wd); // 長方形を描く
            if (rand1[count - 1] > controls.thr2) {
              _divRect(xPos, yPos, wd * ratio); // 長方形を分割する関数の呼び出し
            }
            xPos += wd * ratio;
          }
          wd = xEndPos - xPos;
        } else {
          while (yPos + wd / ratio < yEndPos + 0.1) {
            _colRect(xPos, yPos, wd, wd / ratio); // 長方形を描く
            if (rand1[count - 1] > controls.thr2) _divRect(xPos, yPos, wd); // 長方形を分割する関数の呼び出し
            yPos += wd / ratio;
          }
          wd = yEndPos - yPos;
        }
      }
    };
  });
  return '';
};
