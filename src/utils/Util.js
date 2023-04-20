module.exports = class Util {
  constructor () {
    return Util;
  }

  static noop () {}

  static asyncNoop () {
    return Promise.resolve();
  }

  static timeout (ms, reject = false) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => (reject ? _reject() : resolve()), ms);
    });
  }

  static removeRepeatedElements (array) {
    if (!Array.isArray(array)) {
      return (
        typeof array === "string"
          ? this.removeRepeatedElements(array.split("")).join("")
          : typeof array === "number"
          ? this.removeRepeatedElements(array.toString())
          : array
      );
    }
    return array.filter((x, i) => array.indexOf(x) === i);
  }

  static toCapitalize (text, applyWithWhitespace = true) {
    if (applyWithWhitespace) {
      return text.split(/\s/).map(x => x.replace(/\w/, e => e.toUpperCase())).join(" ");
    }
    return text.replace(/\w/, e => e.toUpperCase());
  }
}