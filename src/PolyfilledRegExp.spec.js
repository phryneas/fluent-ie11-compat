window["__test__fluent__RegExp"] = true;
require("./PolyfilledRegExp");
const PolyfilledRegExp = window["__fluent__RegExp"];

test("documented behaviour", () => {
  var str = "#foo#";
  var regex = new PolyfilledRegExp("foo", "y");

  regex.lastIndex = 0;
  expect(regex.test(str)).toBe(false);
  expect(regex.lastIndex).toBe(0);
  regex.lastIndex = 5;
  expect(regex.test(str)).toBe(false);
  expect(regex.lastIndex).toBe(0);
  regex.lastIndex = 1;
  expect(regex.test(str)).toBe(true);
  expect(regex.lastIndex).toBe(4);
  expect(regex.test(str)).toBe(false);
  expect(regex.lastIndex).toBe(0);
});

// and some "official" tests for good measure
test("https://github.com/tc39/test262/blob/master/test/built-ins/RegExp/prototype/exec/y-fail-lastindex.js", () => {
  var r = new PolyfilledRegExp("c", "y");
  r.lastIndex = 1;

  r.exec("abc");

  expect(r.lastIndex).toBe(0);
});
test("https://github.com/tc39/test262/blob/master/test/built-ins/RegExp/prototype/exec/y-fail-return.js", () => {
  expect(new PolyfilledRegExp("b", "y").exec("ab")).toBe(null);
});

test("https://github.com/tc39/test262/blob/master/test/built-ins/RegExp/prototype/exec/y-init-lastindex.js", () => {
  var r = new PolyfilledRegExp(".", "y");
  var match;
  r.lastIndex = 1;

  match = r.exec("abc");

  expect(match).not.toBe(null);
  expect(match.length).toBe(1);
  expect(match[0]).toBe("b");
});
test("https://github.com/tc39/test262/blob/master/test/built-ins/RegExp/prototype/exec/y-set-lastindex.js", () => {
  var r = new PolyfilledRegExp("abc", "y");
  r.exec("abc");

  expect(r.lastIndex).toBe(3);
});
