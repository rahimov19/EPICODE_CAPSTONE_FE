const toPositiveTemporal = (amount, unit, nonNegative) => {
  const amountToUse = parseInt(amount);
  let unitToUse = unit.toLowerCase();
  if (
    amountToUse !== 0 ||
    nonNegative === true ||
    nonNegative === "nonNegative"
  ) {
    let result = {};
    switch (unitToUse) {
      case "d":
      case "day":
        result = { days: amount };
        break;
      case "m":
      case "month":
        result = { months: amount };
        break;
      case "y":
      case "year":
        result = { years: amount };
        break;
      default:
        break;
    }
    return result;
  } else {
    return `amount zero in toPositiveTemporal is invalid, unit: ${unit}`;
  }
};

const amount = "31";
const unit = "day";
let nonNegative;

console.log(toPositiveTemporal(amount, unit, nonNegative));
