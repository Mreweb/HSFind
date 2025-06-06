"use strict";
var Layout = function () {
        var a = localStorage.getItem("sidenav-state") ? localStorage.getItem("sidenav-state") : "pinned";
        if ($(window).on({
                "load resize": function () {
                    $(window).width() < 1200 ? t($(".sidenav-toggler")) : "pinned" == a ? e($(".sidenav-toggler")) : "unpinned" == a && t($(".sidenav-toggler"))
                }
            }), $("body").on("click", "[data-action]", function (a) {
                a.preventDefault();
                var n = $(this),
                    i = n.data("action"),
                    s = n.data("target");
                switch (i) {
                    case "offcanvas-open":
                        s = n.data("target"), $(s).addClass("open"), $("body").append('<div class="body-backdrop" data-action="offcanvas-close" data-target=' + s + " />");
                        break;
                    case "offcanvas-close":
                        s = n.data("target"), $(s).removeClass("open"), $("body").find(".body-backdrop").remove();
                        break;
                    case "aside-open":
                        s = n.data("target"), n.addClass("active"), $(s).addClass("show"), $("body").append('<div class="mask-body mask-body-light" data-action="aside-close" data-target=' + s + " />");
                        break;
                    case "aside-close":
                        s = n.data("target"), n.removeClass("active"), $(s).removeClass("show"), $("body").find(".body-backdrop").remove();
                        break;
                    case "omnisearch-open":
                        s = n.data("target"), n.addClass("active"), $(s).addClass("show"), $(s).find(".form-control").focus(), $("body").addClass("omnisearch-open").append('<div class="mask-body mask-body-dark" data-action="omnisearch-close" data-target="' + s + '" />');
                        break;
                    case "omnisearch-close":
                        s = n.data("target"), $('[data-action="search-open"]').removeClass("active"), $(s).removeClass("show"), $("body").removeClass("omnisearch-open").find(".mask-body").remove();
                        break;
                    case "search-open":
                        s = n.data("target"), n.addClass("active"), $(s).addClass("show"), $(s).find(".form-control").focus();
                        break;
                    case "search-close":
                        s = n.data("target"), $('[data-action="search-open"]').removeClass("active"), $(s).removeClass("show");
                        break;
                    case "sidenav-pin":
                        e(n);
                        break;
                    case "sidenav-unpin":
                        t(n)
                }
            }), $("[data-offset-top]").length) {
            var n = $("[data-offset-top]"),
                i = $(n.data("offset-top")).height();
            n.css({
                "padding-top": i + "px"
            })
        }
    }(),
    TextareaAutosize = function () {
        var e = $('[data-toggle="autosize"]');
        e.length && autosize(e)
    }();
if ($('[data-toggle="widget-calendar"]')[0]) {
    $('[data-toggle="widget-calendar"]').fullCalendar({
        contentHeight: "auto",
        theme: !1,
        buttonIcons: {
            prev: " fas fa-angle-left",
            next: " fas fa-angle-right"
        },
        header: {
            right: "next",
            center: "title, ",
            left: "prev"
        },
        defaultDate: "2018-12-01",
        editable: !0,
        events: [{
            title: "Call with Dave",
            start: "2018-11-30",
            end: "2018-11-30",
            className: "bg-danger"
        }, {
            title: "Lunch meeting",
            start: "2018-11-21",
            end: "2018-11-22",
            className: "bg-warning"
        }, {
            title: "All day conference",
            start: "2018-11-29",
            end: "2018-11-29",
            className: "bg-success"
        }, {
            title: "Meeting with Mary",
            start: "2018-12-01",
            end: "2018-12-01",
            className: "bg-info"
        }, {
            title: "Winter Hackaton",
            start: "2018-12-03",
            end: "2018-12-03",
            className: "bg-danger"
        }, {
            title: "Digital event",
            start: "2018-12-07",
            end: "2018-12-09",
            className: "bg-warning"
        }, {
            title: "Marketing event",
            start: "2018-12-10",
            end: "2018-12-10",
            className: "bg-primary"
        }, {
            title: "Dinner with Family",
            start: "2018-12-19",
            end: "2018-12-19",
            className: "bg-danger"
        }, {
            title: "Black Friday",
            start: "2018-12-23",
            end: "2018-12-23",
            className: "bg-info"
        }, {
            title: "Cyber Week",
            start: "2018-12-02",
            end: "2018-12-02",
            className: "bg-warning"
        }]
    });
    var mYear = moment().format("YYYY"),
        mDay = moment().format("dddd, MMM D");
    $(".widget-calendar-year").html(mYear), $(".widget-calendar-day").html(mDay)
}
var Countdown = function () {
    var e = $(".countdown");
    e.length && e.each(function () {
        var e, t;
        t = (e = $(this)).data("countdown-date"), e.countdown(t).on("update.countdown", function (e) {
            $(this).html(e.strftime('<div class="countdown-item"><span class="countdown-digit">%-D</span><span class="countdown-label countdown-days">day%!D</span></div><div class="countdown-item"><span class="countdown-digit">%H</span><span class="countdown-separator">:</span><span class="countdown-label">hours</span></div><div class="countdown-item"><span class="countdown-digit">%M</span><span class="countdown-separator">:</span><span class="countdown-label">minutes</span></div><div class="countdown-item"><span class="countdown-digit">%S</span><span class="countdown-label">seconds</span></div>'))
        })
    })
}();
! function (e) {
    e.fn.countTo = function (t) {
        return t = t || {}, e(this).each(function () {
            var a = e.extend({}, e.fn.countTo.defaults, {
                    from: e(this).data("from"),
                    to: e(this).data("to"),
                    speed: e(this).data("speed"),
                    refreshInterval: e(this).data("refresh-interval"),
                    decimals: e(this).data("decimals")
                }, t),
                n = Math.ceil(a.speed / a.refreshInterval),
                i = (a.to - a.from) / n,
                s = this,
                l = e(this),
                o = 0,
                d = a.from,
                r = l.data("countTo") || {};

            function c(e) {
                var t = a.formatter.call(s, e, a);
                l.text(t)
            }
            l.data("countTo", r), r.interval && clearInterval(r.interval), r.interval = setInterval(function () {
                o++, c(d += i), "function" == typeof a.onUpdate && a.onUpdate.call(s, d), o >= n && (l.removeData("countTo"), clearInterval(r.interval), d = a.to, "function" == typeof a.onComplete && a.onComplete.call(s, d))
            }, a.refreshInterval), c(d)
        })
    }, e.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: function (e, t) {
            return e.toFixed(t.decimals)
        },
        onUpdate: null,
        onComplete: null
    }
}(jQuery);
var Counter = function () {
        var e, t = ".counter",
            a = $(t);
        a.length && (e = a, inView(t).on("enter", function () {
            e.hasClass("counting-finished") || e.countTo({
                formatter: function (e, t) {
                    return e.toFixed(t.decimals)
                },
                onUpdate: function (e) {},
                onComplete: function (e) {
                    $(this).addClass("counting-finished")
                }
            })
        }))
    }(),
    Datepicker = function () {
        var e = $('[data-toggle="date"]'),
            t = $('[data-toggle="datetime"]'),
            a = $('[data-toggle="time"]');
        e.length && e.each(function () {
            $(this).flatpickr({
                enableTime: !1,
                allowInput: !0
            })
        }), t.length && t.each(function () {
            $(this).flatpickr({
                enableTime: !0,
                allowInput: !0
            })
        }), a.length && a.each(function () {
            $(this).flatpickr({
                noCalendar: !0,
                enableTime: !0,
                allowInput: !0
            })
        })
    }();
! function (e) {
    var t = function () {
        this.$body = e("body")
    };
    t.prototype.init = function () {
        e('[data-toggle="dragula"]').each(function () {
            var t = e(this).data("containers"),
                a = [];
            if (t)
                for (var n = 0; n < t.length; n++) a.push(e("#" + t[n])[0]);
            else a = [e(this)[0]];
            var i = e(this).data("handle-class");
            i ? dragula(a, {
                moves: function (e, t, a) {
                    return a.classList.contains(i)
                }
            }) : dragula(a)
        })
    }, e.Dragula = new t, e.Dragula.Constructor = t
}(window.jQuery), window.jQuery.Dragula.init();
var Dropzones = function () {
        var e = $('[data-toggle="dropzone"]'),
            t = $(".dz-preview");
        e.length && (Dropzone.autoDiscover = !1, e.each(function () {
            var e, a, n, i, s;
            e = $(this), a = void 0 !== e.data("dropzone-multiple"), n = e.find(t), i = void 0, s = {
                url: e.data("dropzone-url"),
                thumbnailWidth: null,
                thumbnailHeight: null,
                previewsContainer: n.get(0),
                previewTemplate: n.html(),
                maxFiles: a ? null : 1,
                acceptedFiles: a ? null : "image/*",
                init: function () {
                    this.on("addedfile", function (e) {
                        !a && i && this.removeFile(i), i = e
                    })
                }
            }, n.html(""), e.dropzone(s)
        }))
    }(),
    Fullcalendar = function () {
        var e, t, a = $('[data-toggle="calendar"]');
        a.length && (t = {
            header: {
                right: "",
                center: "",
                left: ""
            },
            buttonIcons: {
                prev: "calendar--prev",
                next: "calendar--next"
            },
            theme: !1,
            selectable: !0,
            selectHelper: !0,
            editable: !0,
            events: [{
                id: 1,
                title: "Call with Dave",
                start: "2019-04-18",
                allDay: !0,
                className: "bg-danger",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 2,
                title: "Lunch meeting",
                start: "2019-04-21",
                allDay: !0,
                className: "bg-warning",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 3,
                title: "All day conference",
                start: "2019-04-29",
                allDay: !0,
                className: "bg-success",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 4,
                title: "Meeting with Mary",
                start: "2019-05-01",
                allDay: !0,
                className: "bg-info",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 5,
                title: "Winter Hackaton",
                start: "2019-05-03",
                allDay: !0,
                className: "bg-danger",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 6,
                title: "Digital event",
                start: "2019-05-07",
                allDay: !0,
                className: "bg-warning",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 7,
                title: "Marketing event",
                start: "2019-05-10",
                allDay: !0,
                className: "bg-primary",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 8,
                title: "Dinner with Family",
                start: "2019-05-19",
                allDay: !0,
                className: "bg-danger",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 9,
                title: "Black Friday",
                start: "2019-05-23",
                allDay: !0,
                className: "bg-info",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }, {
                id: 10,
                title: "Cyber Week",
                start: "2019-05-02",
                allDay: !0,
                className: "bg-yellow",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            }],
            dayClick: function (e) {
                var t = moment(e).toISOString();
                $("#new-event").modal("show"), $(".new-event--title").val(""), $(".new-event--start").val(t), $(".new-event--end").val(t)
            },
            viewRender: function (t) {
                e.fullCalendar("getDate").month(), $(".fullcalendar-title").html(t.title)
            },
            eventClick: function (e, t) {
                $("#edit-event input[value=" + e.className + "]").prop("checked", !0), $("#edit-event").modal("show"), $(".edit-event--id").val(e.id), $(".edit-event--title").val(e.title), $(".edit-event--description").val(e.description)
            }
        }, (e = a).fullCalendar(t), $("body").on("click", ".new-event--add", function () {
            var t = $(".new-event--title").val(),
                a = {
                    Stored: [],
                    Job: function () {
                        var e = Date.now().toString().substr(6);
                        return this.Check(e) ? this.Job() : (this.Stored.push(e), e)
                    },
                    Check: function (e) {
                        for (var t = 0; t < this.Stored.length; t++)
                            if (this.Stored[t] == e) return !0;
                        return !1
                    }
                };
            "" != t ? (e.fullCalendar("renderEvent", {
                id: a.Job(),
                title: t,
                start: $(".new-event--start").val(),
                end: $(".new-event--end").val(),
                allDay: !0,
                className: $(".event-tag input:checked").val()
            }, !0), $(".new-event--form")[0].reset(), $(".new-event--title").closest(".form-group").removeClass("has-danger"), $("#new-event").modal("hide")) : ($(".new-event--title").closest(".form-group").addClass("has-danger"), $(".new-event--title").focus())
        }), $("body").on("click", "[data-calendar]", function () {
            var t = $(this).data("calendar"),
                a = $(".edit-event--id").val(),
                n = $(".edit-event--title").val(),
                i = $(".edit-event--description").val(),
                s = $("#edit-event .event-tag input:checked").val(),
                l = e.fullCalendar("clientEvents", a);
            "update" === t && ("" != n ? (l[0].title = n, l[0].description = i, l[0].className = [s], console.log(s), e.fullCalendar("updateEvent", l[0]), $("#edit-event").modal("hide")) : ($(".edit-event--title").closest(".form-group").addClass("has-error"), $(".edit-event--title").focus())), "delete" === t && ($("#edit-event").modal("hide"), setTimeout(function () {
                swal({
                    title: "آیا مطمئن هستید؟",
                    text: "بعد از حذف نمی توانید آنرا بازگردانید!",
                    type: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonClass: "btn btn-secondary"
                }).then(function (t) {
                    t.value && (e.fullCalendar("removeEvents", a), swal({
                        title: "Deleted!",
                        text: "The event has been deleted.",
                        type: "success",
                        buttonsStyling: !1,
                        confirmButtonClass: "btn btn-primary"
                    }))
                })
            }, 200))
        }), $("body").on("click", "[data-calendar-view]", function (t) {
            t.preventDefault(), $("[data-calendar-view]").removeClass("active"), $(this).addClass("active");
            var a = $(this).attr("data-calendar-view");
            e.fullCalendar("changeView", a)
        }), $("body").on("click", ".fullcalendar-btn-next", function (t) {
            t.preventDefault(), e.fullCalendar("next")
        }), $("body").on("click", ".fullcalendar-btn-prev", function (t) {
            t.preventDefault(), e.fullCalendar("prev")
        }))
    }();