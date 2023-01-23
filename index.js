//Konstansok
const AELDRA_TAX = 0.96;
//Fix árak, /db
const ORDOGUZO_TEKERCS = 230000;
const KONCENTRALT_OLVASAS = 34000;
//---Vezetés---
const SUNZI = 0.0426;
const WUZI = 0.3519;
const WEILAO = 0.012;
const WODA = 0.5934;
//---Erő---
const ERO_KONNYU = 0.0997;
const ERO_KOZEPES = 0.8229;
const ERO_NEHEZ = 0.0773;

//Objectek
const sellPriceObject = document.getElementById("sellPrice");
const wantedProfitObject = document.getElementById("wantedProfit");
const vezetesOutput = document.getElementById("vezetes");
const sunziObject = document.getElementById("sunzi");
const wuziObject = document.getElementById("wuzi");
const weilaoObject = document.getElementById("weilao");
const wodaObject = document.getElementById("woda");
const eroOutput = document.getElementById("ero");
const eroKonnyuObject = document.getElementById("erokonnyu");
const eroKozepesObject = document.getElementById("erokozepes");
const eroNehezObject = document.getElementById("eronehez");
const form = document.getElementById("maxBuyPriceForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
const nf = Intl.NumberFormat();

const calculate = (type) => {
  const selectedItem = document.getElementById("selectedItem").value;
  let sellPrice = convertToNum(sellPriceObject);
  let wantedProfit = convertToNum(wantedProfitObject);
  //validálás
  if (!sellPrice || !wantedProfit) {
    return;
  }

  //számolás
  if (type === "maxBuyPrice") {
    sellPrice *= AELDRA_TAX;
    let totalBuyPrice = sellPrice - wantedProfit;
    if (selectedItem === "vezetes") {
      totalBuyPrice -= ORDOGUZO_TEKERCS * 500;
      totalBuyPrice -= KONCENTRALT_OLVASAS * 500;
      sunziObject.innerText = formatNumber((totalBuyPrice * SUNZI) / 20);
      wuziObject.innerText = formatNumber((totalBuyPrice * WUZI) / 55);
      weilaoObject.innerText = formatNumber((totalBuyPrice * WEILAO) / 155);
      wodaObject.innerText = formatNumber((totalBuyPrice * WODA) / 255);
      if(!eroOutput.classList.contains("hidden")) {
        eroOutput.classList.add("hidden");
      }
      vezetesOutput.classList.remove("hidden");
    }
    if(selectedItem === "ero") {
      totalBuyPrice -= ORDOGUZO_TEKERCS * 250;
      totalBuyPrice -= KONCENTRALT_OLVASAS * 250;
      eroKonnyuObject.innerText = formatNumber((totalBuyPrice * ERO_KONNYU) / 20);
      eroKozepesObject.innerText = formatNumber((totalBuyPrice * ERO_KOZEPES) / 55);
      eroNehezObject.innerText = formatNumber((totalBuyPrice * ERO_NEHEZ) / 155);
      if(!vezetesOutput.classList.contains("hidden")) {
        vezetesOutput.classList.add("hidden");
      }
      eroOutput.classList.remove("hidden");
    }
  }
};

const formatNumber = (num) => {
  return nf.format(num.toFixed(0));
  //return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1.');
};

const isNumber = (val) => {
  return /^\d+\.\d+$|^\d+$/.test(val);
};

const convertToNum = (docObject) => {
  let str = docObject.value;
  if (str.includes("k")) {
    const k = +(str.split("k").length - 1);
    const num = +str.substring(0, str.indexOf("k"));
    //console.log("num=" + num);
    //console.log("k=" + k);

    const actualNum = Math.pow(1000, k) * num;
    //console.log("actualNum=" + actualNum);
    return actualNum;
  } else if (isNumber(str)) {
    return +str;
  }
  docObject.value = "";
  return false;
};
