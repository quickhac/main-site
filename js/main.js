
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

	new Parallax($("header .container, nav"), {
		inertia: -0.5,
		beginEffect: 0,
		endEffect: $("header").height() + $("nav").height()
	});

	new Parallax($("header .preview, header .bg"), {
		inertia: 0.5,
		beginEffect: 0,
		endEffect: $("header").height() + $("nav").height()
	});
	
});
