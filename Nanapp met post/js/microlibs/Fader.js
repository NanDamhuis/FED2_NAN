/*!
* Fader.js 0.3.3
*
* Copyright 2012, Lukas Alexandre, Tait Brown
* Licensed under MIT
*/
var Fader = {
    supportsTransitions: function() {
        var a = document.body || document.documentElement, b = {
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
            KhtmlTransition: "KhtmlTransitionEnd",
            OTransition: "oTransitionEnd",
            msTransition: "MSTransitionEnd",
            transition: "transitionEnd"
        };
        for (p in b)
            if ("string" == typeof a.style[p])
                return [p, b[p]];
        return !1
    }(),
    fadeOutWithId: function(a,
    b,
    c) {
        Fader.fadeWithId(a,
        b,
        100,
        0,
        c)
    }, fadeInWithId : function(a, b, c) {
        Fader.fadeWithId(a, b, 0, 100, c)
    }, fadeOutWithClass: function(a, b, c, d) {
        Fader.fadeWithClass(a, b, c, 100, 0, d)
    }, fadeInWithClass: function(a, b, c, d) {
        Fader.fadeWithClass(a, b, c, 0, 100, d)
    }, fadeOutElement: function(a, b, c) {
        Fader.fadeElement(a, b, 100, 0, c)
    }, fadeInElement: function(a, b, c) {
        Fader.fadeElement(a, b, 0, 100, c)
    }, fadeWithId: function(a, b, c, d, e) {
        a = document.getElementById(a);
        Fader.executeFade(a, b, c, d, e)
    }, fadeWithClass: function(a, b, c, d, e, f) {
        a = document.getElementsByClassName(a)[b];
        Fader.executeFade(a, c, d, e, f)
    }, fadeElement: function(a, b, c, d, e) {
        Fader.executeFade(a, b, c, d, e)
    }, executeFade: function(a, b, c, d, e) {
        e = e || function() {};
        if (Fader.supportsTransitions)
            a.style.opacity = 100 === c ? 1 : 0, a.style[Fader.supportsTransitions[0]] = "opacity " + 1E3 * b + "ms linear", a.style.opacity = 100 === d ? 1 : 0, a.addEventListener(Fader.supportsTransitions[1], e, !1);
        else {
            var f = c, g;
            g = d >= c ? 2 : -2;
            var h = 1E3 * b / 50, j = setInterval(function() {
                if (0 < g && f >= d || 0 > g && f <= d)
                    clearInterval(j), setTimeout(e, h);
                Fader.setAlpha(a, f);
                f += g
            }, h)
        }
    }, setAlpha: function(a, b) {
        a.style.filter = "alpha(opacity=" + b + ")";
        a.style.opacity = b / 100
    }
};

