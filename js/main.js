
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		}
	],
	dataOS : [
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iOS"
	    },
		{
			   string: navigator.userAgent,
			   subString: "iPod",
			   identity: "iOS"
	    },
		{
			   string: navigator.userAgent,
			   subString: "iPad",
			   identity: "iOS"
	    },
		{
			   string: navigator.userAgent,
			   subString: "Android",
			   identity: "Android"
	    }
	]

};


var Parallax = function (el, opts) {
	this.$el = $(el);
	this.inertia = opts && opts.inertia || 0.3;
	this.beginEffect = opts && opts.hasOwnProperty("beginEffect") ? opts.beginEffect : 0;
	this.endEffect = opts && opts.endEffect || 400;
	$(window).on("scroll", $.proxy(this.__window_scroll, this));
};

Parallax.prototype = {
	__window_scroll: function () {
		this.parallax()
	},
	reset_offset: function () {
		this.$el.css("transform", "translate3d(0, " + this.beginEffect + ", 0)")
	},
	parallax: function () {
		var offset = $(window).scrollTop();
		if (offset > this.endEffect) return;
		var t = -Math.round(offset * this.inertia);
		this.$el.css("transform", "translate3d(0, " + t + "px, 0)");
	}
};

$(function () {
	BrowserDetect.init();

	new Parallax($("header .bg"), {
		inertia: 0.5,
		beginEffect: 0,
		endEffect: $("header").height() + $("nav").height()
	});

	// console.log(BrowserDetect);
	switch (BrowserDetect.OS) {
	case "Android":
		$("#downloads .wrapper.browser").hide();
		$("#downloads .download.ios").hide();
		break;
	case "iOS":
		$("#downloads .wrapper.browser").hide();
		$("#downloads .download.android").hide();
		break;
	default:
		$("#downloads .wrapper.mobile").hide();
		break;
	}

	switch (BrowserDetect.browser) {
		case "Chrome":
			$("#downloads .download:not(.chrome)").hide();
			break;
		default:
			$("#downloads .download").hide();
			$("#downloads .unsupported").show();
			break;
	}
});
