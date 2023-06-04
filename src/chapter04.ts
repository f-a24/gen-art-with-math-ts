import p5 from 'p5';
import { init } from './common';

/**
 * らせんを描く
 */
export const spiral = () => {
  init('らせんの描画');

  globalP5Instance = new p5((p: p5) => {
    let theta = 0;
    const STEP = 2 * p.PI * 0.01; // 曲線の精度
    const _rad = (t: number) => {
      const r = 5 * t;  // アルキメデスらせん
      // const r = 20 * p.sqrt(t); // フェルマーらせん
      // const r = p.pow(1.1, t); // 対数らせん
      return(r);
    }

    p.setup = () => {
      p.createCanvas(500, 500);
    };
    p.draw = () => {
      p.translate(p.width / 2, p.height / 2);  // 描画ウィンドウの中心に移動
      p.line(_rad(theta) * p.cos(theta),
      _rad(theta) * p.sin(theta),
      _rad(theta + STEP) * p.cos(theta + STEP),
      _rad(theta + STEP) * p.sin(theta + STEP));
      theta += STEP;
    }
  });
  return '';
};

/**
 * 対数らせんの拡大
 */
export const logSpiralZoom = () => {
    init('対数らせんの拡大');
  
    globalP5Instance = new p5((p: p5) => {
      const STEP = 2 * p.PI * 0.01; // 曲線の精度
      // 動径を定める関数
      const _rad = (t: number) => p.pow(1.1, t);
      // 対数らせんを描く関数
      const _drawLogSpiral = () => {
        let theta = 0;
        const scalar = p.pow(10, p.mouseX / p.width) * p.height / 2;
        // マウスのx座標によって1～10倍に拡大する
        p.translate(p.width / 2, p.height / 2);  // 描画ウィンドウの中心に移動
        for(let i = 0; i < 2000; i++){
          p.line(scalar * _rad(theta) * p.cos(theta),
            scalar * _rad(theta) * p.sin(theta),
            scalar * _rad(theta + STEP) * p.cos(theta + STEP),
            scalar * _rad(theta + STEP) * p.sin(theta + STEP));
          theta -= STEP;  // 反時計回りに進むほど動径は減少する
        }
      }

      p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode('hsb', 1);
      };
      p.draw = () => {
        p.background(1,0,1);
        _drawLogSpiral();  // 対数らせんを描画
      }
    });
    return '';
  };

/**
 * 再帰的に正方形を描く
 */
export const recurSquare = () => {
    init('正方形の再帰的な描画');
  
    globalP5Instance = new p5((p: p5) => {
      let vec: p5.Vector;
      let gap = 0.01;  // 内接する正方形のずれ
      // ベクトルから正方形を描く関数
      const _drawSquare = (v: p5.Vector) => { 
        for(let i = 0; i < 4; i++){
          p.line(v[i].x, v[i].y, v[(i + 1) % 4].x, v[(i + 1) % 4].y);
          // ベクトルのxy座標の値を取りだし，線分を描く
        }
      }
      // 新しいベクトルを取得する関数
      const _getVector = (vec: p5.Vector) => {
        const nextVec = p.createVector(4);
        for(let i = 0; i < 4; i++){
          const dir = p5.Vector.sub(vec[(i + 1) % 4], vec[i]);  // 2頂点間の方向ベクトル
          dir.mult(gap);  // ずれの分を方向ベクトルにかける
          nextVec[i] = p5.Vector.add(vec[i], dir); // 元の頂点の位置ベクトルをずらして新たなベクトルを作る
        }
        return nextVec;
      }

      p.setup = () => {
        p.createCanvas(500, 500);
        vec = p.createVector(4); // 4のベクトルを生成
        vec[0] = p.createVector(0, 0); // ウィンドウ左上の角
        vec[1] = p.createVector(p.width, 0); // ウィンドウ右上の角
        vec[2] = p.createVector(p.width, p.height);  // ウィンドウ右下の角
        vec[3] = p.createVector(0, p.height);  // ウィンドウ左下の角
        console.log({ vec });
      };
      p.draw = () => {
        _drawSquare(vec);  // 4つのベクトルを頂点とする四角形を描画
        vec = _getVector(vec); // ベクトルをgapの分だけずらす
      }
      p.mouseClicked = () => {
        p.background(255);
        gap = p.random(1) / 2;
        console.log("gap =", gap);
        vec[0] = p.createVector(0, 0);
        vec[1] = p.createVector(p.width, 0);
        vec[2] = p.createVector(p.width, p.height);
        vec[3] = p.createVector(0, p.height);
      }
    });
    return '';
  };

/**
 * 再帰的な正方形と軌跡として現れる対数らせんを描く
 */
export const recurSquareSpiral = () => {
    init('正方形の再帰的な描画と対数らせん');
  
    globalP5Instance = new p5((p: p5) => {
      let vec: p5.Vector;  // p5.Vectorクラスのインスタンスを生成
      let gap = 0.2;
      const _drawLogSpiral = () => {
        const STEP = 2 * p.PI * 0.001;
        let b = p.sqrt(2 * gap * gap - 2 * gap + 1);
        let c = p.atan(gap / (1 - gap));
        const O = p.createVector(p.width / 2, p.height / 2); // ウィンドウの中心
        let v = p.createVector(0, 0);  // ウィンドウの左上の角
        v.sub(O);
        p.translate(O.x, O.y);
        p.stroke(p.color(255, 0, 0));
        p.strokeWeight(3);
        while(v.mag() > 1){ // ベクトルの長さが1以下になれば停止
          const nextV = v.copy(); // ベクトルをコピーして新たなベクトルを生成
          nextV.rotate(STEP); // ベクトルの回転
          nextV.mult(p.pow(b, STEP / c));  // ベクトルのスカラー倍
          p.line(v.x, v.y, nextV.x, nextV.y);
          v = nextV;
        }
      }
      const _drawSquare = (v: p5.Vector) => { // 四角形を描く
        for(let i = 0; i < 4; i++){
          p.line(v[i].x,
            v[i].y,
            v[(i + 1) % 4].x,
            v[(i + 1) % 4].y); // ベクトルのxy座標の値を取りだし，線分を描く
        }
      }
      const _getVector = (v: p5.Vector) => {  // 新しい頂点を生成する
        const newVec = p.createVector(4);
        for(let i = 0; i < 4; i++){
          const dir = p5.Vector.sub(v[(i+1)%4], v[i]);  // ずれの方向ベクトル
          dir.mult(gap);  // ずれをa倍する
          newVec[i] = p5.Vector.add(v[i], dir); // 元の頂点の位置ベクトルにずれを足して新たなベクトルを作る
        }
        return newVec;
      }

      p.setup = () => {
        p.createCanvas(500, 500);
        vec = p.createVector(4);
        vec[0] = p.createVector(0, 0);
        vec[1] = p.createVector(p.width, 0);
        vec[2] = p.createVector(p.width, p.height);
        vec[3] = p.createVector(0, p.height);
        _drawLogSpiral();
      };
      p.draw = () => {
        p.stroke(0);  // 枠線を黒色にする
        p.strokeWeight(1);
        _drawSquare(vec);
        vec = _getVector(vec);
      };
      p.mouseClicked = () => {
        p.background(255);
        gap = p.random(1) / 2;
        _drawLogSpiral();
        vec[0] = p.createVector(0, 0);
        vec[1] = p.createVector(p.width, 0);
        vec[2] = p.createVector(p.width, p.height);
        vec[3] = p.createVector(0, p.height);
        console.log("gap =", gap);
      }
    });
    return '';
  };

/**
 * 再帰的な正多角形を描く
 */
export const recurPolygon = () => {
    init('多角形の再帰的な描画');
  
    globalP5Instance = new p5((p: p5) => {
      let vec: p5.Vector;  // p5.Vector型を宣言
      let gap = 0.1;  // 内接する正多角形のずれ
      let gon = 8;  // 正多角形の頂点の数
      const _drawPolygon = (v: p5.Vector) => {
        for(let i = 0; i < gon; i++){
          p.line(v[i].x, v[i].y, v[(i + 1) % gon].x, v[(i + 1) % gon].y);
        }
      }
      const _getVector = (v: p5.Vector) => {
        const nextVec = p.createVector(gon);
        for(let i = 0; i < gon; i++){
          const dir = p5.Vector.sub(v[(i + 1) % gon], v[i]);
          dir.mult(gap);
          nextVec[i] = p5.Vector.add(v[i], dir);
        }
        return nextVec;
      }

      p.setup = () => {
        p.createCanvas(500, 500);
        vec = p.createVector(gon);
        for(let i = 0; i < gon; i++){ // 正多角形の頂点の位置ベクトル
          vec[i] = p5.Vector.fromAngle(2 * i * p.PI / gon);
          vec[i].mult(p.width / 2);
        }
      };
      p.draw = () => {
        p.translate(p.width / 2, p.height / 2); // 描画ウィンドウの中心に移動
        _drawPolygon(vec);
        vec = _getVector(vec);
      };
      p.mouseClicked = () => {
        gap = p.random(1) / 2;
        gon = p.int(p.random(4, 16));
        p.background(255);
        vec = p.createVector(gon);
        for(let i = 0; i < gon; i++){ // 正多角形の頂点の位置ベクトル
          vec[i] = p5.Vector.fromAngle(2 * i * p.PI / gon);
          vec[i].mult(p.width / 2);
        }
      }
    });
    return '';
  };


/**
 * フィボナッチらせんと黄金らせんを描く
 */
export const goldFiboSpiral = () => {
    init('黄金らせんとフィボナッチらせん');
  
    globalP5Instance = new p5((p: p5) => {
      let fibo = [0, 1, 1]; // フィボナッチ数列の配列
      const SGN = [-1, 1, 1, -1];  // 正方形を敷き詰める方向
      const _drawFiboSpiral = () => {
        let xPos = 0;
        let yPos = 0;
        let scalar = p.width / (2 * fibo[fibo.length-1]);  // 拡大・縮小比率
        for(let i = 1; i < fibo.length - 1; i++){
          p.rect(scalar * xPos,
            scalar * yPos,
            scalar * SGN[(i+1) % 4] * fibo[i],
            scalar * SGN[i % 4] * fibo[i]);
            p.arc(scalar * (xPos + SGN[(i+1) % 4] * fibo[i]),
            scalar * (yPos + SGN[i % 4] * fibo[i]),
            scalar * 2 * fibo[i],
            scalar * 2 * fibo[i],
            (1 + i) * p.PI / 2,
            (2 + i) * p.PI / 2);
          if (i % 2 == 1){
            xPos += SGN[i % 4] * (fibo[i] + fibo[i+1]);
          } else {
            yPos += SGN[i % 4] * (fibo[i] + fibo[i+1]);
          }
        }
      };
      const _drawGoldSpiral = () => {
        const scalar = p.width / (2 * fibo[fibo.length - 1]);
        const PHI = (1 + p.sqrt(5)) / 2;  // 黄金数
        const STEP = -p.PI / 50;
        const O = p.createVector(1, 1);  // らせんの中心
        let v = p.createVector(0, 1);  // らせんの出発点
        for(let i = 1; i < fibo.length - 1; i++){
            v.add(SGN[i % 4]* fibo[i], SGN[(i-1) % 4]* fibo[i]);  // 出発点を順に移動
        }
        v.sub(O);
        v.mult(scalar); // ウィンドウサイズに合わせてスカラー倍
        p.translate(scalar,  scalar); // ウィンドウサイズに合わせて移動
        for (let i = 0; i < (fibo.length - 2) * 25; i++){ // 正方形1つにつき90度分のらせんを描画
          const nextV = v.copy();
          nextV.rotate(STEP);
          nextV.mult(p.pow(PHI, 2 * STEP / p.PI));
          p.line(v.x, v.y, nextV.x, nextV.y);
          v = nextV;
        }
      }

      p.setup = () => {
        p.createCanvas(500, 500);
        p.translate(p.width / 2, p.height / 2);
        p.stroke(0);
        _drawFiboSpiral(); // フィボナッチらせんの描画
        p.stroke(255, 0, 0);
        _drawGoldSpiral(); // 黄金らせんの描画
      };
      p.draw = () => {};
      p.mouseClicked = () => {
        p.background(255);
        const nextFibo = fibo[fibo.length-2] + fibo[fibo.length-1];
        fibo = p.append(fibo, nextFibo);
        p.translate(p.width / 2, p.height / 2);
        p.stroke(0);
        _drawFiboSpiral();
        p.stroke(255, 0, 0);
        _drawGoldSpiral();
        console.log(nextFibo);
      }
    });
    return '';
  };