import p5 from 'p5';
import { init } from './common';

/**
 * 正六角形の合同変換の可視化
 */
export const dihedralGroup = () => {
  init('正六角形の合同変換の可視化');

  globalP5Instance = new p5((p: p5) => {
    let img: p5.Image; // 画像用の変数
    let gon = 6; // 正多角形の角数
    let scalar: number; // サイズ
    let j = 1; // 鏡映変換のパラメータ
    let k = 0; // 回転変換のパラメータ
    let imageIndex = 0;
    const FILE_NAMES = ['F.svg', 'yosegi1.svg', 'yosegi2.svg'];
    const _drawShape = () => {
      p.background(200);
      p.push();
      p.translate(p.width / 2, p.height / 2);
      _drawImage();
      _drawDihedral();
      _drawNumbers();
      p.pop();
    };
    const _drawImage = () => {
      p.push();
      p.imageMode(p.CENTER); // Center the rotation point
      p.scale(1, j); // Consider reflection
      p.rotate((k * 2 * p.PI) / gon); // Consider rotation
      p.image(img, 0, 0); // Draw Image
      p.pop();
    };
    // Draw Dihedral
    const _drawDihedral = () => {
      p.noFill();
      p.beginShape();
      for (let i = 0; i < gon; i++) {
        const vector = p5.Vector.fromAngle((2 * Math.PI * i) / gon);
        vector.mult(scalar);
        p.vertex(vector.x, vector.y);
      }
      p.endShape(p.CLOSE);
    };
    // Draw Numbers
    const _drawNumbers = () => {
      p.fill(p.color('white'));
      p.textSize(20);

      for (let i = 0; i < gon; i++) {
        // Calcurate position
        const indexNumber = (j * i - k + 2 * gon) % gon;
        const vector = p5.Vector.fromAngle((2 * Math.PI * i) / gon);
        vector.mult(scalar);

        // Draw text
        p.text(indexNumber, vector.x, vector.y);
      }
    };
    const _resetImage = () => {
      k = 0;
      j = 1;
      _drawShape();
    };
    p.preload = () => {
      img = p.loadImage(FILE_NAMES[imageIndex]); // 画像ファイル読み込み
    };
    p.setup = () => {
      p.createCanvas(300, 300);
      scalar = p.height * 0.4;
      _drawShape();
      p.noLoop();
    };
    p.draw = () => {};
    p.keyPressed = () => {
      if (p.key == 's') {
        // 鏡映
        j *= -1;
        console.log(p.key);
      } else if (p.key == 'r') {
        // 回転
        k = (k + j + gon) % gon;
        console.log(p.key);
      } else if (p.key == 'e') {
        // 初期化
        k = 0;
        j = 1;
        console.log('RESET');
      }
      _drawShape();
    };
    p.mouseClicked = () => {
      imageIndex = (imageIndex + 1) % 3;
      img = p.loadImage(FILE_NAMES[imageIndex], _resetImage);
    };
  });
  return '';
};

/**
 * 画像の読み込みによるD6対称性を持つ模様の生成
 */
export const fundamentalDomain = () => {
  init('画像の読み込みによるD6対称性を持つ模様の生成');

  globalP5Instance = new p5((p: p5) => {
    let img: p5.Image; // 画像用の変数
    const gon = 6;
    let imageIndex = 0;
    const FILE_NAMES = [
      'yosegiC6Part.svg',
      'yosegiD6Part.svg',
      'HelloWorld.svg',
      'HelloWorld.svg'
    ];
    const _drawShape = () => {
      p.background('silver');
      p.push();

      p.translate(p.width / 2, p.height / 2);

      for (let idReflection = 0; idReflection < 2; idReflection++) {
        for (let idRotation = 0; idRotation < gon; idRotation++) {
          p.push();

          // imageMode center for only HelloWorld.svg
          if (imageIndex > 1) {
            p.imageMode(p.CENTER);
          }

          // Consider reflection for only D6 case
          if (imageIndex === 1 || imageIndex === 3) {
            p.scale(1, p.pow(-1, idReflection));
          }

          // Consider rotation
          p.rotate((idRotation * 2 * Math.PI) / gon);

          // Draw Image
          p.image(img, 0, 0);

          p.pop();
        }
      }

      p.pop();
    };
    p.preload = () => {
      img = p.loadImage(FILE_NAMES[imageIndex]); // 画像ファイル読み込み
    };
    p.setup = () => {
      p.createCanvas(300, 300);
      _drawShape();
      p.noLoop();
    };
    p.mouseClicked = () => {
      imageIndex = (imageIndex + 1) % 4;
      img = p.loadImage(FILE_NAMES[imageIndex], _drawShape);
    };
  });
  return '';
};

/**
 * 2次ベジェ曲線の描画
 */
export const quadBezier = () => {
  init('2次ベジェ曲線の描画');

  globalP5Instance = new p5((p: p5) => {
    const ctr: p5.Vector[] = new Array(3); // 制御点
    const step = 10; // 中間点の数(曲線の精度)
    let itr = 0; // 繰り返し回数
    const _getMidPoint = (v: p5.Vector[], t: number) => {
      const pt: p5.Vector[] = new Array(v.length - 1);
      for (let i = 0; i < v.length - 1; i++) {
        pt[i] = p5.Vector.sub(v[i + 1], v[i]);
        pt[i].mult(t);
        pt[i].add(v[i]);
      }
      return pt;
    };
    const _drawLine = (v: p5.Vector[]) => {
      if (v.length > 1) {
        for (let i = 0; i < v.length - 1; i++) {
          p.strokeWeight(1);
          p.line(v[i].x, v[i].y, v[i + 1].x, v[i + 1].y);
        }
      } else {
        p.stroke(0, 0, 0);
        p.strokeWeight(8);
        p.point(v[0].x, v[0].y);
      }
    };
    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      ctr[0] = p.createVector(0, 0);
      ctr[1] = p.createVector(p.width, 0);
      ctr[2] = p.createVector(p.width, p.height);
      p.noFill();
    };
    p.draw = () => {
      let midPt = ctr;
      while (midPt.length > 1) {
        // 中間点の個数が1個になるまで続ける
        midPt = _getMidPoint(midPt, (itr * 1.0) / step); // 中間点を取る(点の個数が1つ減る)
        p.stroke((midPt.length * 1.0) / ctr.length, 1, 1);
        _drawLine(midPt); // 中間点をつないで線分を作る
      }
      itr++;
      if (itr > step) {
        p.stroke(0, 0, 0);
        p.strokeWeight(1);
        p.beginShape();
        p.vertex(0, 0);
        p.quadraticVertex(p.width, 0, p.width, p.height); // 2次ベジエ曲線を描く関数
        p.endShape();
        p.noLoop(); // 繰り返し処理の終了
      }
    };
  });
  return '';
};

/**
 * 3次ベジェ曲線の描画
 */
export const cubicBezier = () => {
  init('3次ベジェ曲線の描画');

  globalP5Instance = new p5((p: p5) => {
    const ctr: p5.Vector[] = new Array(4);
    const step = 10;
    let itr = 0;
    const _getMidPoint = (v: p5.Vector[], t: number) => {
      const pt = new Array(v.length - 1);
      for (let i = 0; i < v.length - 1; i++) {
        pt[i] = p5.Vector.sub(v[i + 1], v[i]);
        pt[i].mult(t);
        pt[i].add(v[i]);
      }
      return pt;
    };
    const _drawLine = (v: p5.Vector[]) => {
      if (v.length > 1) {
        for (let i = 0; i < v.length - 1; i++) {
          p.strokeWeight(1);
          p.line(v[i].x, v[i].y, v[i + 1].x, v[i + 1].y);
        }
      } else {
        p.stroke(0, 0, 0);
        p.strokeWeight(8);
        p.point(v[0].x, v[0].y);
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      ctr[0] = p.createVector(0, 0);
      ctr[1] = p.createVector(p.width, 0);
      ctr[2] = p.createVector(p.width, p.height);
      ctr[3] = p.createVector(0, p.height);
      p.noFill();
    };
    p.draw = () => {
      let midPt = ctr;
      while (midPt.length > 1) {
        midPt = _getMidPoint(midPt, (itr * 1.0) / step);
        p.stroke((midPt.length * 1.0) / ctr.length, 1, 1);
        _drawLine(midPt);
      }
      itr++;
      if (itr > step) {
        p.stroke(0, 0, 0);
        p.strokeWeight(1);
        p.beginShape();
        p.vertex(0, 0);
        p.bezier(
          ctr[0].x,
          ctr[0].y,
          ctr[1].x,
          ctr[1].y,
          ctr[2].x,
          ctr[2].y,
          ctr[3].x,
          ctr[3].y
        );
        p.endShape();
        p.noLoop();
      }
    };
  });
  return '';
};

/**
 * 高次ベジェ曲線のランダムな描画
 */
export const higherBezier = () => {
  init('高次ベジェ曲線のランダムな描画');

  globalP5Instance = new p5((p: p5) => {
    const num = 5;
    const ctr = new Array(num);
    const step = 30;
    let itr = 0;
    const _getVertex = (v: p5.Vector[], t: number) => {
      const newVtx = new Array(v.length - 1);
      for (let i = 0; i < v.length - 1; i++) {
        newVtx[i] = p5.Vector.sub(v[i + 1], v[i]);
        newVtx[i].mult(t);
        newVtx[i].add(v[i]);
      }
      return newVtx;
    };
    let _drawLine = (v: p5.Vector[]) => {
      if (v.length > 1) {
        for (let i = 0; i < v.length - 1; i++) {
          p.strokeWeight(1);
          p.line(v[i].x, v[i].y, v[i + 1].x, v[i + 1].y);
        }
      } else {
        p.stroke(0, 0, 0);
        p.strokeWeight(8);
        p.point(v[0].x, v[0].y);
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      for (let i = 0; i < num; i++) {
        ctr[i] = p5.Vector.random2D(); // 単位円内にランダムにベクトルを取る関数
        ctr[i].mult(p.width / 2);
        ctr[i].add(p.width / 2, p.height / 2);
      }
      p.noFill();
    };
    p.draw = () => {
      if (itr == 0) p.background(0, 0, 1);
      let midPt = ctr;
      while (midPt.length > 1) {
        midPt = _getVertex(midPt, (itr * 1.0) / step);
        p.stroke((midPt.length * 1.0) / ctr.length, 1, 1, 0.2);
        _drawLine(midPt);
      }
      itr++;
      if (itr > step) p.noLoop();
    };
    p.mouseClicked = () => {
      itr = 0;
      for (let i = 0; i < num; i++) {
        ctr[i] = p5.Vector.random2D();
        ctr[i].mult(p.width / 2);
        ctr[i].add(p.width / 2, p.height / 2);
      }
      p.loop();
    };
  });
  return '';
};

/**
 * Dn対称性を持つランダムな模様の生成
 */
export const symmetricShape = () => {
  init('Dn対称性を持つランダムな模様の生成');

  globalP5Instance = new p5((p: p5) => {
    let crvData: { fill: p5.Color; ctr: p5.Vector[] } | null = null; // ベジエ曲線
    const gon = 10;
    const _makeCurve = () => {
      const v: p5.Vector[] = new Array(2);
      for (let i = 0; i < 2; i++) {
        v[i] = p5.Vector.fromAngle((i * p.PI) / gon); // 基本領域のベクトル
        v[i].mult(p.width / 2);
      }
      const ctr: p5.Vector[] = new Array(4);
      for (let i = 0; i < 4; i++) {
        ctr[i] = v[Math.floor(i / 2)].copy().mult(p.random(1)); // 制御点をランダムに取る
        // ctr[i] = p5.Vector.mult(v[i / 2], p.random(1));
      }
      crvData = {
        fill: p.color(p.random(1), 1, 1),
        ctr
      };
    };
    const _drawCrv = () => {
      if (!crvData) return;
      const { ctr, fill } = crvData;
      p.fill(fill);
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
    const _drawShape = () => {
      p.translate(p.width / 2, p.height / 2);
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < gon; k++) {
          p.push();
          p.scale(1, p.pow(-1, j));
          p.rotate((k * 2 * p.PI) / gon);
          _drawCrv();
          p.pop();
        }
      }
    };

    p.setup = () => {
      p.createCanvas(500, 500, p.P2D); // ベジエ曲線を描画する場合はP2Dレンダラを使った方が無難
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
      _makeCurve(); // ベジエ曲線の描画
      _drawShape(); // 二面体群による変換と描画
    };
    p.draw = () => {};
    p.mouseClicked = () => {
      _makeCurve();
      _drawShape();
    };
  });
  return '';
};
