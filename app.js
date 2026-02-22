/*
  ==============================
  データ定義（data.json を直接埋め込み）
  ==============================
*/

const data = [


{ "src": "1_あべし_設定1相当_天井狙い_非リセット時_不問_不問_2000~2299.png","ハマり表記":"あべし","設定":"設定1相当","狙い目":"天井狙い","リセットの有無":"非リセット時","モード":"不問","内部状態":"不問","差枚数":"2000~2299" },
{ "src": "2_あべし_設定1相当_天井狙い_非リセット時_不問_低確_2000~2299.png","ハマり表記":"あべし","設定":"設定1相当","狙い目":"天井狙い","リセットの有無":"非リセット時","モード":"不問","内部状態":"低確","差枚数":"2000~2299" },
{ "src": "3_あべし_設定1相当_天井狙い_非リセット時_不問_通常_2000~2299.png","ハマり表記":"あべし","設定":"設定1相当","狙い目":"天井狙い","リセットの有無":"非リセット時","モード":"不問","内部状態":"通常","差枚数":"2000~2299" },
{ "src": "4_あべし_設定1相当_天井狙い_非リセット時_不問_高確_2000~2299.png","ハマり表記":"あべし","設定":"設定1相当","狙い目":"天井狙い","リセットの有無":"非リセット時","モード":"不問","内部状態":"高確","差枚数":"2000~2299" },






];

/*
  ==============================
  初期化
  ==============================
*/

const filtersDiv = document.getElementById("filters");
const galleryDiv = document.getElementById("gallery");

// src 以外を条件キーとして取得
const conditionKeys = Object.keys(data[0]).filter(key => key !== "src");

// select要素保持
const selects = {};

// 条件UI生成
conditionKeys.forEach(key => {
  const group = document.createElement("div");
  group.className = "filter-group";

  const label = document.createElement("label");
  label.textContent = key + "：";

  const select = document.createElement("select");

  // ユニーク値のみ追加（「すべて」は作らない）
  const values = [...new Set(data.map(item => item[key]))];

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  select.addEventListener("change", update);

  group.appendChild(label);
  group.appendChild(select);
  filtersDiv.appendChild(group);

  selects[key] = select;
});

// 初期表示
update();

/*
  ==============================
  検索＆描画
  ==============================
*/

function update() {
  galleryDiv.innerHTML = "";

  const filtered = data.filter(item => {
    return conditionKeys.every(key => {
      return item[key] === selects[key].value;
    });
  });

  // 一致した画像のみ表示（0件なら何も表示しない）
  filtered.forEach(item => {
    const img = document.createElement("img");
    img.src = `images/${item.src}`;
    img.alt = item.src;
    galleryDiv.appendChild(img);
  });

}



