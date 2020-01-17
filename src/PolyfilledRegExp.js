window["__fluent__RegExp"] = window["RegExp"];
import {
  UNSUPPORTED_Y,
  BROKEN_CARET
} from "core-js/internals/regexp-sticky-helpers";

try {
  new window["RegExp"](".", "y");

  if (UNSUPPORTED_Y || BROKEN_CARET) {
    throw "core-js would polyfill, but our implementation is more performant";
  }

  if (window["__test__fluent__RegExp"]) {
    throw "forcing polyfill in test environment";
  }
} catch (e) {
  console.info(
    "Using RegExp wrapper to polyfill `y` flag functionality. (%s)",
    e
  );

  class PolyfilledRegExp {
    constructor(regex, flags) {
      let rxInstance = new window["RegExp"](regex, flags.replace("y", "g"));

      if (flags.indexOf("y") === -1) {
        return rxInstance;
      }

      this.rxInstance = rxInstance;

      /*
        console.log(
          "created new PolyfilledRegExp(%s, %s -> %s); %s",
          regex,
          flags,
          flags.replace("y", "g"),
          flags.indexOf("y") === -1 ? "using original RegExp" : "using Polyfill"
        );
        */

      Object.defineProperty(this, "sticky", { value: true, readonly: true });
    }

    get lastIndex() {
      return this.rxInstance.lastIndex;
    }
    set lastIndex(value) {
      this.rxInstance.lastIndex = value;
    }

    exec(str) {
      const lastIndex = this.lastIndex;
      const result = this.rxInstance.exec(str);
      /*
    console.log(
      "running exec(%s) with result %o (%s). lastIndex was %d before (matched at %d), is now %d",
      str,
      result,
      !result || result.index !== lastIndex ? "fail" : "success",
      lastIndex,
      result && result.index,
      this.lastIndex
    );
    */
      if (!result || result.index !== lastIndex) {
        this.rxInstance.lastIndex = 0;
        return null;
      }
      return result;
    }

    test(str) {
      // console.log("running test(%s)", str);
      return !!this.exec(str);
    }
  }

  window["__fluent__RegExp"] = PolyfilledRegExp;
}
