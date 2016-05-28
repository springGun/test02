!function() {
	var f = function(e, i, t) {
		if (window.addEventListener)
			e.addEventListener(i, t, !1);
		else
			e.attachEvent("on" + i, t)
	};
	var c = function(e, i, t) {
		if (window.removeEventListener)
			e.removeEventListener(i, t);
		else
			e.detachEvent("on" + i, t)
	};
	var r, n, i, e = {}, t = [];
	e.flag = !1;
	e.getDiscoverCss = function() {
		var e = "";
		if (this.__coverBackground && this._$supportCss3("animation"))
			e = -1 != this.__coverBackground.indexOf("background:") ? this.__coverBackground
					: "";
		return "position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:rgb(0,0,0); filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6;z-index:1000;"
				+ e
	};
	e.getPanelCss = function(e, i) {
		return "position:fixed;z-index:10000;left:50%;top:50%;width:" + e
				+ "px;margin-left:-" + e / 2 + "px;height:" + i
				+ "px;margin-top:-" + i / 2 + "px;"
	};
	e.getIframeCss = function() {
		var e = null;
		if (this.__iframeShowAnimation)
			var e = "-webkit-animation:" + this.__iframeShowAnimation
					+ ";-moz-animation:" + this.__iframeShowAnimation
					+ ";-ms-animation:" + this.__iframeShowAnimation
					+ ";-o-animation:" + this.__iframeShowAnimation
					+ ";animation:" + this.__iframeShowAnimation + ";";
		return "width:100%;height:100%;border:none;background:none;"
				+ (e ? e : "")
	};
	e.setOpacity = function(e, i) {
		e.style.opacity = i / 100
	};
	e.setWh = function(e, i, t) {
		e.style.cssText = this.getPanelCss(i, t)
	};
	e.addIframe = function(r, f) {
		var i = document.getElementById("x-URS-iframe"), a = this._name || "";
		if (!i) {
			try {
				i = document.createElement("<iframe  name='" + a
						+ "' allowTransparency=true ></iframe>")
			} catch (c) {
				i = document.createElement("iframe");
				i.allowTransparency = !0;
				i.name = a
			}
			i.frameBorder = 0;
			i.id = "x-URS-iframe";
			i.scrolling = "no";
			i.style.cssText = this.getIframeCss()
		}
		if (f)
			r.appendChild(i);
		else {
			var o = 420, s = 408;
			if (e.frameSize) {
				o = e.frameSize.width;
				s = e.frameSize.height
			}
			var n = document.getElementById("x-discover");
			if (!n) {
				n = document.createElement("div");
				n.id = "x-discover";
				n.style.cssText = this.getDiscoverCss()
			}
			var t = document.getElementById("x-panel");
			if (!t) {
				t = document.createElement("div");
				t.id = "x-panel";
				this._panel = t;
				t.style.cssText = this.getPanelCss(o, s)
			}
			t.appendChild(i);
			r.appendChild(n);
			r.appendChild(t);
			r.style.display = "none"
		}
	};
	e.initIframe = function() {
		var e = document.getElementById("x-URS-iframe");
		e.src = r
	};
	e._$supportCss3 = function(t) {
		var e, n = [ "webkit", "Moz", "ms", "o" ], i = [], a = document.documentElement.style, r = function(
				e) {
			return e.replace(/-(\w)/g, function(i, e) {
				return e.toUpperCase()
			})
		};
		for (e in n)
			i.push(r(n[e] + "-" + t));
		i.push(r(t));
		for (e in i)
			if (i[e] in a)
				return !0;
		return !1
	};
	var s = function() {
		var i = document.getElementById("x-URS-iframe");
		var t = window.name || "_parent";
		var e = {};
		e.data = n;
		e.data.from = "URS|";
		e.origin = "*";
		e.source = t;
		l(i.contentWindow, e)
	};
	var o = function() {
		var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
		return function(i) {
			i = i || "";
			if (e.test(i))
				return RegExp.$1;
			else
				return "*"
		}
	}();
	var a = function(i, e) {
		try {
			e = e.toLowerCase();
			if (null === i)
				return "null" == e;
			if (void 0 === i)
				return "undefined" == e;
			else
				return Object.prototype.toString.call(i).toLowerCase() == "[object "
						+ e + "]"
		} catch (t) {
			return !1
		}
	};
	var d = function(i, r, o) {
		if (!i)
			return "";
		var n = [];
		for ( var t in i)
			if (i.hasOwnProperty(t)) {
				var e = i[t];
				if (e)
					if (!a(e, "function")) {
						if (a(e, "date"))
							e = e.getTime();
						else if (a(e, "array"))
							e = e.join(",");
						else if (a(e, "object"))
							e = JSON.stringify(e);
						if (o)
							e = encodeURIComponent(e);
						n.push(encodeURIComponent(t) + "=" + e)
					} else
						;
				else
					;
			} else
				;
		return n.join(r || ",")
	};
	var l = function() {
		var e = "MSG|";
		var i = function(i) {
			var t = {};
			i = i || {};
			t.origin = i.origin || "";
			t.ref = location.href;
			t.self = i.source;
			t.data = JSON.stringify(i.data);
			return e + d(t, "|", !0)
		};
		return function(n, e) {
			if (window.postMessage) {
				e = e || {};
				n.postMessage(JSON.stringify(e.data), o(e.origin))
			} else
				t.unshift({
					w : n,
					d : escape(i(e))
				})
		}
	}();
	window.URS = function(m, g, d) {
		1 == this._$COM_NUM ? this._$COM_NUM = 1 : this._$COM_NUM = 2;
		if ("object" == typeof m)
			d = m;
		e.frameSize = d.frameSize;
		e.__coverBackground = d.coverBackground;
		e.__iframeShowAnimation = d.iframeShowAnimation;
		window.PTDOM = 0 != d.isHttps ? "https://" : "http://";
		if (d.cssDomain && d.cssFiles) {
			e.__cssStr = "cd=" + d.cssDomain + "&cf=" + d.cssFiles;
			if (-1 != e.__cssStr.indexOf("http://"))
				window.PTDOM = "http://";
			e.__cssStr = encodeURIComponent(e.__cssStr)
		}
		this.isInclude = document.getElementById(d.includeBox) || 0;
		e.needPrepare = d.needPrepare || 0;
		var u, p;
		if ("string" == typeof g)
			p = g;
		if ("string" == typeof m)
			u = document.getElementById(m);
		else
			u = m;
		if (d.logincb)
			this.logincb = d.logincb;
		if (d.closecb)
			this.closecb = d.closecb;
		if (d.regcb)
			this.regcb = d.regcb;
		i = document.createElement("div");
		i.id = "x-URS";
		document.body.appendChild(i);
		this.box = i;
		var h = "index.html";
		if (d.single) {
			h = "index_dl.html";
			if ("register" == d.page)
				h = "index_reg.html"
		}
		r = window.PTDOM + "webzj.reg.163.com/out/pub/" + h;
		if (e.__cssStr)
			r += "?" + e.__cssStr;
		n = d || {};
		try {
			JSON.stringify(n)
		} catch (S) {
			return null
		}
		if (!this.isInclude && u && p)
			f(u, p, this.showIframe);
		else
			this.includeBox = this.isInclude;
		if (e.needPrepare || this.isInclude)
			this.prepareIframe();
		var _ = function(e) {
			if (e)
				e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
		};
		var w = function(e) {
			_(e);
			var i = e.data || "null";
			v({
				data : i,
				origin : o(e.origin)
			})
		};
		var l = this;
		var v = function(n) {
			var i = n.data;
			n.origin;
			var t;
			if (l.isInclude)
				t = l.includeBox;
			else
				t = e._panel;
			if (i) {
				if ("string" == typeof i)
					try {
						i = JSON.parse(i)
					} catch (r) {
					}
				if (!i["URS-READY"] || !l.isInclude && e.needPrepare) {
					if (i["URS-READY"] && !e._initReady)
						e._initReady = !0;
					if (i["URS-CM"] && document.getElementById("x-URS-iframe"))
						if ("success" == i.type) {
							if (l.logincb)
								l.logincb(i["userName"], i["isOther"]);
							if (!this.isInclude) {
								if (u && p)
									c(u, p, l.showIframe);
								l.closeIframe()
							}
						} else if ("close" == i.type) {
							if (l.closecb)
								l.closecb();
							l.closeIframe()
						} else if ("resize" == i.type || "init" == i.type) {
							t.style.width = i.width + "px";
							t.style.height = i.height + "px";
							if (!l.isInclude)
								t.style.marginLeft = -1 * i.width / 2 + "px"
						} else if ("register-success" == i.type)
							if (l.regcb)
								l.regcb(i["userName"])
				} else
					s()
			}
		};
		var I = function() {
			var e = "MSG|";
			var i = function(n, i) {
				var o = a(i, "function") ? i : function(e) {
					return e === i
				}, t = null;
				for (var r, e = 0, s = n.length - 1; s > e; e++) {
					r = n[e];
					if (o(r))
						t = e
				}
				return null != t ? t : -1
			};
			var n = function() {
				var e;
				var n = function(t, n, r) {
					if (i(e, t.w) < 0) {
						e.push(t.w);
						r.splice(n, 1);
						t.w.name = t.d
					}
				};
				return function() {
					e = [];
					if (t && t.length)
						for (var r, i = t.length; i--; i >= 0) {
							r = t[i];
							n(r, i, t)
						}
					e = null
				}
			}();
			var r = function() {
				var n = unescape(window.name || "");
				if (n && 0 == n.indexOf(e)) {
					window.name = "";
					var i = n.replace(e, ""), s = i.split("|"), d = s.length, f = {};
					for (var r = 0; d > r; r++) {
						var t = s[r].split("=");
						if (!t || !t.length)
							return;
						var c = t.shift();
						if (!c)
							return;
						f[decodeURIComponent(c)] = decodeURIComponent(t
								.join("="))
					}
					i = f;
					var a = (i.origin || "").toLowerCase();
					if (!a || "*" == a
							|| 0 == location.href.toLowerCase().indexOf(a))
						v({
							data : i.data || "null",
							origin : o(i.ref || document.referrer)
						})
				}
			};
			return function() {
				setInterval(n, 100);
				setInterval(r, 20)
			}
		}();
		var y = function() {
			if (window.postMessage)
				f(window, "message", w);
			else
				I()
		};
		return y()
	};
	URS.prototype.prepareIframe = function() {
		if (this.isInclude) {
			e.addIframe(this.includeBox, 1);
			e.initIframe();
			this.showIframe()
		} else {
			e.addIframe(i);
			e.initIframe()
		}
	};
	URS.prototype.showIframe = function(t) {
		if (!this.isInclude)
			if (!e.needPrepare) {
				e.addIframe(i);
				e.initIframe()
			} else if (!e._initReady)
				return;
		t = t || {};
		if (t.page) {
			if (t.page != n.page && n.single) {
				var a = "index_dl.html";
				if ("register" == t.page)
					a = "index_reg.html";
				r = window.PTDOM + "webzj.reg.163.com/out/pub/" + a;
				if (e.__cssStr)
					r += "?" + e.__cssStr
			}
			e.initIframe();
			n.page = t.page
		}
		if (e.needPrepare && !e.isInclude)
			s();
		i.style.display = "block"
	};
	URS.prototype.closeIframe = function(n) {
		n = n || {};
		if (!this.isInclude) {
			i.style.display = "none";
			e.initIframe();
			if (!e.needPrepare) {
				e.flag = !1;
				if (navigator.userAgent.indexOf("MSIE") > 0) {
					var t = document.getElementById("x-URS-iframe"), r = t.contentWindow;
					if (t) {
						t.src = "about:blank";
						try {
							r.document.write("");
							r.document.clear()
						} catch (o) {
						}
					}
					var a = document.getElementById("x-panel");
					a.removeChild(t);
					CollectGarbage()
				}
				i.innerHTML = ""
			}
		} else
			;
	}
}();