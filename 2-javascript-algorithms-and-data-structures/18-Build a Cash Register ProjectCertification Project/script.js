// script.js

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

document.getElementById("purchase-btn").addEventListener("click", function() {
  let cashProvided = parseFloat(document.getElementById("cash").value);
  let changeDue = getChangeDue(price, cashProvided, cid);
  displayChangeDue(changeDue);
});

function getChangeDue(price, cashProvided, cid) {
  if (cashProvided < price) {
    alert("Customer does not have enough money to purchase the item");
    return { status: "INSUFFICIENT_FUNDS" };
  }

  let change = cashProvided - price;
  let totalCID = getTotalCID(cid);
  if (totalCID < change) {
    return { status: "INSUFFICIENT_FUNDS" };
  } else if (totalCID === change) {
    let closedChange = cid.filter(currency => currency[1] !== 0);
    return { status: "CLOSED", change: closedChange };
  } else if (change === 0) {
    return { status: "EQUAL_TO_PRICE" };
  } else {
    return calculateChange(change, cid);
  }
}

function getTotalCID(cid) {
  return cid.reduce((acc, curr) => acc + curr[1], 0);
}

function calculateChange(change, cid) {
  let changeArr = [];
  let currencyUnits = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01
  };

  for (let i = cid.length - 1; i >= 0; i--) {
    let currName = cid[i][0];
    let currTotal = cid[i][1];
    let currValue = currencyUnits[currName];
    let currCount = Math.floor(currTotal / currValue);
    let amountToReturn = 0;

    while (change >= currValue && currCount > 0) {
      change = Math.round((change - currValue) * 100) / 100;
      currTotal -= currValue;
      currCount--;
      amountToReturn += currValue;
    }

    if (amountToReturn > 0) {
      changeArr.push([currName, amountToReturn]);
    }
  }

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS" };
  } else {
    return { status: "OPEN", change: changeArr };
  }
}

function displayChangeDue(changeDue) {
  let changeDueElement = document.getElementById("change-due");
  changeDueElement.innerHTML = "";

  if (changeDue.status === "INSUFFICIENT_FUNDS") {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (changeDue.status === "CLOSED") {
    changeDueElement.textContent = "Status: CLOSED";
    changeDue.change.forEach(currency => {
      changeDueElement.innerHTML += `${currency[0]}: $${currency[1]}<br>`;
    });
  } else if (changeDue.status === "EQUAL_TO_PRICE") {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
  } else {
    changeDueElement.textContent = "Status: OPEN";
    changeDue.change.forEach(currency => {
      changeDueElement.innerHTML += `${currency[0]}: $${currency[1]}<br>`;
    });
  }
}
