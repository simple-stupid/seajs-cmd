;(function() {
var seajs_combo_101_dist_seajs_combo_debug, seajs_seajs_combo_101_seajs_combo;
seajs_combo_101_dist_seajs_combo_debug = function () {
  !function () {
    function a(a) {
      var b = a.length;
      if (!(2 > b)) {
        q.comboSyntax && (s = q.comboSyntax), q.comboMaxLength && (t = q.comboMaxLength), n = q.comboExcludes;
        for (var d = [], e = 0; b > e; e++) {
          var f = a[e];
          if (!r[f]) {
            var h = o.get(f);
            h.status < p && !l(f) && !m(f) && d.push(f);
          }
        }
        d.length > 1 && g(c(d));
      }
    }
    function b(a) {
      a.requestUri = r[a.uri] || a.uri;
    }
    function c(a) {
      return e(d(a));
    }
    function d(a) {
      for (var b = { __KEYS: [] }, c = 0, d = a.length; d > c; c++)
        for (var e = a[c].replace('://', '__').split('/'), f = b, g = 0, h = e.length; h > g; g++) {
          var i = e[g];
          f[i] || (f[i] = { __KEYS: [] }, f.__KEYS.push(i)), f = f[i];
        }
      return b;
    }
    function e(a) {
      for (var b = [], c = a.__KEYS, d = 0, e = c.length; e > d; d++) {
        for (var g = c[d], h = g, i = a[g], j = i.__KEYS; 1 === j.length;)
          h += '/' + j[0], i = i[j[0]], j = i.__KEYS;
        j.length && b.push([
          h.replace('__', '://'),
          f(i)
        ]);
      }
      return b;
    }
    function f(a) {
      for (var b = [], c = a.__KEYS, d = 0, e = c.length; e > d; d++) {
        var g = c[d], h = f(a[g]), i = h.length;
        if (i)
          for (var j = 0; i > j; j++)
            b.push(g + '/' + h[j]);
        else
          b.push(g);
      }
      return b;
    }
    function g(a) {
      for (var b = 0, c = a.length; c > b; b++)
        for (var d = a[b], e = d[0] + '/', f = j(d[1]), g = 0, i = f.length; i > g; g++)
          h(e, f[g]);
      return r;
    }
    function h(a, b) {
      var c = a + s[0] + b.join(s[1]), d = c.length > t;
      if (b.length > 1 && d) {
        var e = i(b, t - (a + s[0]).length);
        h(a, e[0]), h(a, e[1]);
      } else {
        if (d)
          throw new Error('The combo url is too long: ' + c);
        for (var f = 0, g = b.length; g > f; f++)
          r[a + b[f]] = c;
      }
    }
    function i(a, b) {
      for (var c = s[1], d = a[0], e = 1, f = a.length; f > e; e++)
        if (d += c + a[e], d.length > b)
          return [
            a.splice(0, e),
            a
          ];
    }
    function j(a) {
      for (var b = [], c = {}, d = 0, e = a.length; e > d; d++) {
        var f = a[d], g = k(f);
        g && (c[g] || (c[g] = [])).push(f);
      }
      for (var h in c)
        c.hasOwnProperty(h) && b.push(c[h]);
      return b;
    }
    function k(a) {
      var b = a.lastIndexOf('.');
      return b >= 0 ? a.substring(b) : '';
    }
    function l(a) {
      return n ? n.test ? n.test(a) : n(a) : void 0;
    }
    function m(a) {
      var b = q.comboSyntax || [
          '??',
          ','
        ], c = b[0], d = b[1];
      return c && a.indexOf(c) > 0 || d && a.indexOf(d) > 0;
    }
    var n, o = seajs.Module, p = o.STATUS.FETCHING, q = seajs.data, r = q.comboHash = {}, s = [
        '??',
        ','
      ], t = 2000;
    if (seajs.on('load', a), seajs.on('fetch', b), q.test) {
      var u = seajs.test || (seajs.test = {});
      u.uris2paths = c, u.paths2hash = g;
    }
    define('seajs/seajs-combo/1.0.1/seajs-combo', [], {});
  }();
}();

if (typeof exports == "object") {
  module.exports = seajs_combo_101_dist_seajs_combo_debug;
} else if (typeof define == "function" && (define.cmd || define.amd)) {
  define(function(){ return seajs_combo_101_dist_seajs_combo_debug });
} else {
  this[""] = seajs_combo_101_dist_seajs_combo_debug;
}
}());