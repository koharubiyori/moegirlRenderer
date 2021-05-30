
export default async () => {
  try {
    let isAlerted = false;
    const layouts = ["Slim", "Artwork-only", "Standard"];
    const truthy = [1, "1", "true", "yes", "on"];
    /**
     * @typedef range
     * @type {Object}
     * @property {number} range.min
     * @property {number} range.max
     * @property {boolean} range.auto
     * @typedef layout
     * @type {Object}
     * @property {range} [width]
     * @property {range} [height]
     * @property {range} [widthAndHeight]
     * @typedef layouts
     * @type {Object.<string, layout>}
     */
    /**
     * @type {Object.<string, layouts>}
     */
    const acceptableWidthAndHeight = {
        Slim: {
            "default": {
                width: {
                    min: 170,
                    max: 700,
                    auto: true,
                },
                height: {
                    min: 42,
                    max: 42,
                    auto: false,
                },
            },
        },
        "Artwork-only": {
            "default": {
                widthAndHeight: {
                    min: 170,
                    max: 700,
                    auto: false,
                },
            },
        },
        Standard: {
            "noArtwork-noTracklist": {
                width: {
                    min: 250,
                    max: 700,
                    auto: true,
                },
                height: {
                    min: 120,
                    max: 120,
                    auto: false,
                },
            },
            "noArtwork-hasTracklist": {
                width: {
                    min: 250,
                    max: 700,
                    auto: false,
                },
                height: {
                    min: 208,
                    max: 999,
                    auto: false,
                },
            },
            "bigArtwork-noTracklist": {
                width: {
                    min: 170,
                    max: 700,
                    auto: false,
                },
                height: {
                    min: 312,
                    max: 999,
                    auto: false,
                },
            },
            "bigArtwork-hasTracklist": {
                width: {
                    min: 170,
                    max: 700,
                    auto: false,
                },
                height: {
                    min: 362,
                    max: 999,
                    auto: false,
                },
            },
            "smallArtwork-noTracklist": {
                width: {
                    min: 250,
                    max: 700,
                    auto: true,
                },
                height: {
                    min: 120,
                    max: 120,
                    auto: false,
                },
            },
            "smallArtwork-hasTracklist": {
                width: {
                    min: 250,
                    max: 700,
                    auto: false,
                },
                height: {
                    min: 208,
                    max: 999,
                    auto: false,
                },
            },
        },
    };
    const placeholderToggle = (iframe) => {
        if (iframe.data("displayFlag")) {
            iframe.data("displayFlag", false);
            iframe.data("placeholder").fadeOut(370);
        }
    };
    const colorVerify = (str, defaultStr) => typeof str === "string" && /^[\da-f]{6}$/i.test(str) ? str : defaultStr;
    let lazyLoadObserver;
    if ("IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype &&
        "isIntersecting" in window.IntersectionObserverEntry.prototype) {
        lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    setTimeout(() => {
                        placeholderToggle($(entry.target));
                    }, 13070);
                    lazyLoadObserver.unobserve(entry.target);
                }
            });
        });
    } else {
        lazyLoadObserver = {
            observe: (target) => {
                target.src = target.dataset.src;
                setTimeout(() => {
                    placeholderToggle($(target));
                }, 13070);
            },
        };
    }
    const run = () => {
        $(".bandcamp:not(.exec)").each((_, that) => {
            const self = $(that);
            self.addClass("exec");
            const id = that.dataset.id;
            const track = that.dataset.track;
            if (!/^\d+$/) {
                return self.css("color", "red").text("Error in widget:Bandcamp: Invalid id.");
            }
            const layout = that.dataset.layout;
            if (!layouts.includes(layout)) {
                if (!isAlerted) {
                    isAlerted = true;
                    alert("有bandcamp模板没有填写合法的layout参数，请更正！");
                }
                return;
            }
            const title = that.dataset.title;
            const link = that.dataset.link;
            const backgroundColor = colorVerify(that.dataset.backgroundColor, "ffffff");
            const linkColor = colorVerify(that.dataset.linkColor, "7137dc");
            const artwork = that.dataset.artwork;
            const needTracklist = truthy.includes(that.dataset.tracklist);
            const layoutRanges = acceptableWidthAndHeight[layout];
            /**
             * @type {layout}
             */
            let layoutRange;
            if (layout !== "Standard") {
                layoutRange = layoutRanges.default;
            } else if (artwork === "big") {
                if (needTracklist) {
                    layoutRange = layoutRanges["bigArtwork-hasTracklist"];
                } else {
                    layoutRange = layoutRanges["bigArtwork-noTracklist"];
                }
            } else if (artwork === "small") {
                if (needTracklist) {
                    layoutRange = layoutRanges["smallArtwork-hasTracklist"];
                } else {
                    layoutRange = layoutRanges["smallArtwork-noTracklist"];
                }
            } else if (needTracklist) {
                layoutRange = layoutRanges["noArtwork-hasTracklist"];
            } else {
                layoutRange = layoutRanges["noArtwork-noTracklist"];
            }
            if (!layouts.includes(layout)) {
                return;
            }
            let float = that.dataset.float,
                width = that.dataset.width !== "auto" ? parseInt(that.dataset.width) : "auto",
                height = parseInt(that.dataset.height);
            if (isNaN(width) && width !== "auto") {
                width = 0;
            }
            if ("widthAndHeight" in layoutRange) {
                if (width < layoutRange.widthAndHeight.min) {
                    width = layoutRange.widthAndHeight.min;
                } else if (width > layoutRange.widthAndHeight.max) {
                    width = layoutRange.widthAndHeight.max;
                }
                height = width;
            } else {
                if (width === "auto" && layoutRange.width.auto) {
                    width = "auto";
                } else if (width < layoutRange.width.min) {
                    width = layoutRange.width.min;
                } else if (width > layoutRange.width.max) {
                    width = layoutRange.width.max;
                }
                if (height < layoutRange.height.min) {
                    height = layoutRange.height.min;
                } else if (height > layoutRange.height.max) {
                    height = layoutRange.height.max;
                }
            }
            if (!["left", "right"].includes(float)) { float = "none"; }
            if (float !== "none") { self.addClass(`float-${float}`); }
            self.empty().attr("title", `${title || that.title || `id ${id}`} - Bandcamp`);
            const iframe = $("<iframe/>");
            let src = "https://bandcamp.com/EmbeddedPlayer";
            if (/^\d+$/.test(id)) {
                src += `/album=${id}`;
            }
            if (/^\d+$/.test(track)) {
                src += `/track=${track}`;
            }
            src += `/size=${layout === "Slim" ? "small" : "large"}`;
            src += `/bgcol=${backgroundColor}`;
            src += `/linkcol=${linkColor}`;
            if (layout === "Slim") {
                if (!truthy.includes(artwork)) {
                    src += "/artwork=none";
                }
            } else if (layout === "Artwork-only") {
                src += "/minimal=true";
            } else {
                if (!needTracklist) {
                    src += "/tracklist=false";
                }
                if (artwork === "small") {
                    src += "/artwork=small";
                } else if (artwork !== "big") {
                    src += "/artwork=none";
                }
            }
            iframe.attr("data-src", `${src}/transparent=true/`);
            iframe.height(height);
            if (width === "auto") {
                iframe.css("width", "auto");
            } else {
                iframe.width(width);
            }
            const div = $("<div/>");
            div.width(iframe.width()).height(height).css({
                position: "absolute",
                width: '100%',
                top: "0",
                left: "0",
                "z-index": "99",
                display: "flex",
                "align-items": "center",
                background: "rgba(255, 255, 255, .37)",
            });
            const text = $("<div/>");
            text.css({
                "text-align": "center",
                width: "100%",
            }).text("正在加载中，若长时间空白则说明是网络问题……");
            div.append(text).appendTo(self);
            iframe.data({
                placeholder: div,
                displayFlag: true,
            });
            self.prepend(iframe);
            iframe[0].addEventListener("load", () => {
                placeholderToggle(iframe);
            });
            self.width(iframe.width() + iframe.next("a").outerWidth());
            lazyLoadObserver.observe(iframe[0]);
        });
    };
    $(run);
    $(window).on("load", run);
} catch (e) {
    // eslint-disable-next-line prefer-template
    prompt("Bandcamp模板执行出现问题，请复制以下内容并在提问求助区处粘贴寻求帮助：", navigator.userAgent + " : " + e + " " + e.stack.split("\
")[1].trim());
}
}
