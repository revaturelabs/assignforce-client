(function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == 'function' && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = 'MODULE_NOT_FOUND'), f);
        }
        var l = (n[o] = { exports: {} });
        t[o][0].call(
          l.exports,
          function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == 'function' && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  }
  return e;
})()(
  {
    1: [
      function(require, module, exports) {
        'use strict';

        /* global given, then  */
        var url = '/batches';

        given('I am on the home page', function() {
          cy.visit('/');
        });

        when('I click on the {string} tab', function(title) {
          cy.get('#mat-tab-label-0-1')
            .should('contain', title)
            .click();
        });

        then('The URL is {string}', function(url) {
          cy.url().should('contain', url);
        });

        then('I can see {string}', function(text) {
          cy.get('*:contains(' + text + ')').should('contain', text);
        });

        given('I am on the batches page', function() {
          cy.visit('/batches');
        });

        then('true should be {int}', function(value) {
          expect(value).to.equal(24);
        });
      },
      {}
    ]
  },
  {},
  [1]
);
