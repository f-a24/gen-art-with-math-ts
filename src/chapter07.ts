import p5 from 'p5';
import { init } from './common';

/**
 * パスカルの三角形（数値の書き出し）
 */
export const pascal = () => {
  init('パスカルの三角形');

  globalP5Instance = new p5((p: p5) => {
    const num = 8; // 計算する世代数の上限
    let state = [1]; // 初期状態
    let gen = 0; // 世代
    // 数字を書く関数
    const _drawNumber = (y: number) => {
      const scalar = p.width / num; // 数字の大きさ
      let x = (p.width - state.length * scalar) * 0.5; // 数字を書く位置のx座標
      y *= scalar;
      p.fill(0);
      for (let i = 0; i < state.length; i++) {
        p.textSize(scalar * 0.5);
        p.text(state[i], x + scalar * 0.5, y + scalar * 0.5);
        x += scalar; // 数字を書く位置をx座標方向にずらす
      }
    };
    // 状態を更新する関数
    const _updateState = () => {
      const BOUNDARY = [0];
      const nextState: number[] = []; // 次の世代の状態
      state = p.splice(state, BOUNDARY, 0); // 配列の最初に境界値を加える
      state = p.splice(state, BOUNDARY, state.length); // 配列の最後に境界値を加える
      for (let i = 0; i < state.length - 1; i++) {
        nextState[i] = _transition(i); // 次世代の状態の計算
      }
      state = nextState; // 状態を更新
      gen++; // 世代を1つ増やす
    };
    // 遷移の計算をする関数
    const _transition = (i: number) => state[i + 1] + state[i]; // パスカルの法則に従った計算

    p.setup = () => {
      p.createCanvas(500, 500);
    };
    p.draw = () => {
      if (gen < num) {
        _drawNumber(gen); // 数字を書く
        _updateState(); // 状態を更新する
      }
    };
  });
  return '';
};

/**
 * パスカルの三角形（合同な数による可視化）
 */
export const modPascal = () => {
  init('modを法としたパスカルの三角形');

  globalP5Instance = new p5((p: p5) => {
    const num = 250;
    let mod = 2;
    let state = [1];
    let gen = 0;
    // セルを描画する関数
    const _drawCell = (y: number) => {
      const scalar = p.width / num; // セルの大きさ
      let x = (p.width - state.length * scalar) * 0.5; // セルのx座標
      y *= scalar;
      p.noStroke();
      for (let i = 0; i < state.length; i++) {
        p.fill((state[i] * 1.0) / mod, (state[i] * 1.0) / mod, 1); // 色相にセルの状態を割り当て
        p.rect(x, y, scalar, scalar); // セルの描画
        x += scalar; // x座標方向にセルをずらす
      }
    };
    // 状態を更新する関数
    const _updateState = () => {
      const BOUNDARY = [0];
      const nextState: number[] = []; // 次の行の配列
      state = p.splice(state, BOUNDARY, 0); // 配列stateの最初に{0,0}を加える
      state = p.splice(state, BOUNDARY, state.length); // 配列stateの最後に{0,0}を加える
      for (let i = 0; i < state.length - 1; i++) {
        nextState[i] = _transition(i); // 次世代のセルの状態の計算
      }
      state = nextState; // セルの状態を更新
      gen++;
    };
    // 遷移の計算をする関数
    const _transition = (i: number) => (state[i + 1] + state[i]) % mod; // 遷移規則

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
    };
    p.draw = () => {
      if (gen < num) {
        _drawCell(gen);
        _updateState();
      }
    };
    p.mouseClicked = () => {
      gen = 0;
      state = [1]; // 初期状態
      mod = Math.trunc(p.random(2, 20));
      console.log(mod);
      p.background(0, 0, 1);
    };
  });
  return '';
};

/**
 * 1次元セルオートマトン
 */
export const cA1dim = () => {
  init('modを法としたセルオートマトン');

  globalP5Instance = new p5((p: p5) => {
    const num = 250; // 表示する世代数
    let mod = 2; // 法とする数
    let state = [1]; // 初期状態
    let gen = 0;
    const _drawCell = (y: number) => {
      const scalar = (p.width * 0.5) / num; // セルの大きさ
      let x = (p.width - state.length * scalar) * 0.5; // セルのx座標
      y *= scalar;
      p.noStroke();
      for (let i = 0; i < state.length; i++) {
        p.fill((state[i] * 1.0) / mod, (state[i] * 1.0) / mod, 1); // 色相にセルの状態を割り当て
        p.rect(x, y, scalar, scalar); // セルの描画
        x += scalar; // x座標方向にセルをずらす
      }
    };
    // セルの状態を更新する関数
    const _updateState = () => {
      const BOUNDARY = [0, 0];
      const nextState: number[] = []; // 次の世代の状態
      state = p.splice(state, BOUNDARY, 0); // 配列の最初に境界値を加える
      state = p.splice(state, BOUNDARY, state.length); // 配列の最後に境界値を加える
      for (let i = 1; i < state.length - 1; i++) {
        nextState[i - 1] = _transition(state[i - 1], state[i], state[i + 1]); // 次世代のセルの状態の計算
      }
      state = nextState; // セルの状態を更新
      gen++; // 世代を1つ増やす
    };
    // 遷移の計算をする関数
    const _transition = (a: number, b: number, c: number) => {
      let d = a + b + c; // 遷移ルールに従って計算
      d = d % mod;
      return d;
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
    };
    p.draw = () => {
      if (gen < num) {
        _drawCell(gen);
        _updateState();
      }
    };
    p.mouseClicked = () => {
      gen = 0;
      state = [1]; // 初期状態
      mod = Math.trunc(p.random(2, 20));
      console.log(mod);
      p.background(0, 0, 1);
    };
  });
  return '';
};

/**
 * 確率的なセルオートマトン
 */
export const stochCA = () => {
  init('99.9%の確率でルールA、0.1%の確率でルールBを選ぶセルオートマトン');

  globalP5Instance = new p5((p: p5) => {
    const num = 250; // 表示する世代数
    let mod = 2; // 法とする数
    let state = [1]; // 初期状態
    let gen = 0;
    const _drawCell = (y: number) => {
      const scalar = (p.width * 0.5) / num; // セルの大きさ
      let x = (p.width - state.length * scalar) * 0.5; // セルのx座標
      y *= scalar;
      p.noStroke();
      for (let i = 0; i < state.length; i++) {
        p.fill((state[i] * 1.0) / mod, (state[i] * 1.0) / mod, 1); // 色相にセルの状態を割り当て
        p.rect(x, y, scalar, scalar); // セルの描画
        x += scalar; // x座標方向にセルをずらす
      }
    };
    const _updateState = () => {
      const BOUNDARY = [0, 0];
      const nextState: number[] = []; // 次の行の配列
      state = p.splice(state, BOUNDARY, 0); // 配列stateの最初に{0,0}を加える
      state = p.splice(state, BOUNDARY, state.length); // 配列stateの最後に{0,0}を加える
      for (let i = 1; i < state.length - 1; i++) {
        nextState[i - 1] = _transition(state[i - 1], state[i], state[i + 1]); // 次世代のセルの状態の計算
      }
      state = nextState; // セルの状態を更新
      gen++;
    };
    // 確率的に遷移ルールを決定し計算する関数
    const _transition = (a: number, b: number, c: number) => {
      let d: number;
      if (p.random(1) < 0.999) {
        d = a + b + c; // 99.9%の確率でこのルールを選択
      } else {
        d = a + c; // 0.1%の確率でこのルールを選択
      }
      d = d % mod;
      return d;
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      p.background(0, 0, 1);
    };
    p.draw = () => {
      if (gen < num) {
        _drawCell(gen);
        _updateState();
      }
    };
    p.mouseClicked = () => {
      gen = 0;
      state = [1]; // 初期状態
      mod = Math.trunc(p.random(2, 20));
      console.log(mod);
      p.background(0, 0, 1);
    };
  });
  return '';
};

/**
 * 基本セルオートマトン
 */
export const elemCA = () => {
  init('複雑なパターンを生み出す基本セルオートマトン');

  globalP5Instance = new p5((p: p5) => {
    const num = 250; // 表示する世代数
    let state = [1]; // 初期状態
    let rule = [0, 0, 0, 1, 1, 1, 1, 0];
    let gen = 0;
    const _drawCell = (y: number) => {
      const scalar = (p.width * 0.5) / num; // セルの大きさ
      let x = (p.width - state.length * scalar) * 0.5; // セルのx座標
      y *= scalar;
      p.noStroke();
      for (let i = 0; i < state.length; i++) {
        p.fill(0, 0, 1 - state[i]); // 色相にセルの状態を割り当て
        p.rect(x, y, scalar, scalar); // セルの描画
        x += scalar; // x座標方向にセルをずらす
      }
    };
    const _updateState = () => {
      const BOUNDARY = [0, 0];
      const nextState: number[] = []; // 次の行の配列
      state = p.splice(state, BOUNDARY, 0); // 配列stateの最初に{0,0}を加える
      state = p.splice(state, BOUNDARY, state.length); // 配列stateの最後に{0,0}を加える
      for (let i = 1; i < state.length - 1; i++) {
        nextState[i - 1] = _transition(state[i - 1], state[i], state[i + 1]); // 次世代のセルの状態の計算
      }
      state = nextState; // セルの状態を更新
      gen++;
    };
    // 基本セルオートマトンの遷移の計算をする関数
    // 8個の01要素からなる配列ruleに対して，遷移ルールを決定する
    const _transition = (a: number, b: number, c: number) => {
      let d: number;
      // abcを10進数に置き換える
      const ruleInt = Math.trunc(
        a * p.pow(2, 2) + b * p.pow(2, 1) + c * p.pow(2, 0)
      );
      d = rule[7 - ruleInt];
      return d;
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
    };
    p.draw = () => {
      if (gen < num) {
        _drawCell(gen);
        _updateState();
      }
    };
    p.mouseClicked = () => {
      gen = 0;
      state = [1]; // 初期状態
      rule = [];
      let ruleInt = 0;
      for (let i = 0; i < 8; i++) {
        rule[i] = Math.trunc(p.random(2));
        ruleInt += rule[i] * Math.trunc(p.pow(2, 7 - i));
      }
      console.log(ruleInt);
      p.background(0, 0, 1);
    };
  });
  return '';
};

/**
 * 2次元セルオートマトン
 */
export const cA2dim = () => {
  init('2次元セルオートマトン');

  globalP5Instance = new p5((p: p5) => {
    const num = 250; // 行と列の長さ
    let mod = 4; // 法とする数
    let state: number[][] = []; // セルの状態を表す行列
    // 初期状態にする関数
    const _initialize = () => {
      state = [];
      for (let i = 0; i < num; i++) {
        const _arr: number[] = [];
        for (let j = 0; j < num; j++) {
          if (i === num / 2 && j === num / 2) {
            _arr.push(1); // 真ん中の成分のみ1
          } else {
            _arr.push(0);
          }
        }
        state.push(_arr);
      }
    };
    const _drawCell = () => {
      const scalar = p.height / num; // セルのサイズ
      let y = 0; // セルのy座標
      let x: number = 0;
      for (let i = 0; i < num; i++) {
        x = 0; // セルのx座標
        for (let j = 0; j < num; j++) {
          p.noStroke();
          p.fill((state[i][j] * 1.0) / mod, (state[i][j] * 1.0) / mod, 1); // セルの色
          p.rect(x, y, scalar, scalar);
          x += scalar;
        }
        y += scalar;
      }
    };
    // 状態を更新する関数
    const _updateState = () => {
      const nextState: number[][] = []; // 次世代の状態
      for (let i = 0; i < num; i++) {
        const _arr: number[] = [];
        for (let j = 0; j < num; j++) {
          _arr.push(_transition(i, j)); // 遷移
        }
        nextState.push(_arr);
      }
      state = structuredClone(nextState); // 更新
    };
    // 遷移の計算をする関数
    const _transition = (i: number, j: number) => {
      let nextC =
        state[(i - 1 + num) % num][j] + // 上のセル
        state[i][(j - 1 + num) % num] + // 左のセル
        state[i][j] + // 中央のセル
        state[i][(j + 1) % num] + // 右のセル
        state[(i + 1) % num][j]; // 下のセル
      nextC = nextC % mod;
      return nextC;
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      p.colorMode('hsb', 1);
      _initialize(); // 初期化する
      p.frameRate(2); // 0.5秒ごとに遷移
    };
    p.draw = () => {
      _drawCell();
      _updateState();
    };
    p.mouseClicked = () => {
      _initialize();
      mod = Math.trunc(p.random(2, 20));
      console.log(mod);
      p.background(0, 0, 1);
    };
  });
  return '';
};
