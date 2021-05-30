
export default () => {
  try {
      const types = ["large", "compact"];
      const embedPodcastdomain = "https://open.spotify.com/embed-podcast";
      const embedNormaldomain = "https://open.spotify.com/embed";
      const parseURI = (u) => {
          if (typeof u !== "string") {
              return false;
          }
          const clean_url = u.replace(/\?.*$/, "");
          if (/^spotify:(?:track|album|artist|show|episode|playlist):[a-zA-Z0-9]{22}$/.test(clean_url) ||
              /^spotify:user:[^:]+:playlist:[a-zA-Z0-9]{22}$/.test(clean_url)) {
              return clean_url;
          }
          if (/^https?:\/\/(?:open|play)\.spotify\.com\/(?:track|album|artist|show|episode|playlist)\/[a-zA-Z0-9]{22}\/?$/.test(clean_url) ||
              /^https?:\/\/(?:open|play)\.spotify\.com\/user\/[^:]+\/playlist\/[a-zA-Z0-9]{22}\/?$/.test(clean_url)) {
              return `spotify:${clean_url.replace(/^https?:\/\/(?:open|play)\.spotify\.com\//, "").split("/").join(":")}`;
          }
          return false;
      };
      const placeholderToggle = (iframe) => {
          if (iframe.data("displayFlag")) {
              iframe.data("displayFlag", false);
              iframe.data("placeholder").fadeOut(370);
          }
      };
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
          $(".spotify:not(.exec)").each((_, that) => {
              const self = $(that);
              self.addClass("exec");
              const id = that.dataset.id;
              const title = that.dataset.title;
              const type = (that.dataset.type || "large").toLowerCase();
              const uri = parseURI(id);
              let float = that.dataset.float,
                  width = parseInt(that.dataset.width);
              //检测ID是否合法，不合法则抛出异常。
              if (typeof uri !== "string") {
                  return self.css("color", "red").text("Error in widget:Spotify: Invalid id.");
              }
              //检测类型是否合法（在类型表内），不合法则抛出异常。
              if (!types.includes(type)) {
                  return self.css("color", "red").text("Error in widget:Spotify: Invalid type.");
              }
              //检测宽度是否合法（纯数字、260 < width < 510），不合法则使用默认值。
              if (isNaN(width) || width < 250 || width > 640) {
                  width = type === "large" ? 250 : 300;
              }
              //检测浮动类型是否合法，若不为left或right则设定为none
              if (!["left", "right"].includes(float)) {
                  float = "none";
              }
              //设置高度
              const height = type === "large" ? width + 80 : 80;
              if (float !== "none") { self.addClass(`float-${float}`); }
              self.empty().append(`<a rel="nofollow noreferrer noopener" class="external text" href="${uri.split(":").join("/").replace(/^spotify/, "https://open.spotify.com")}" target="_blank" style="position:relative; top:2px"><img src="https://open.scdn.co/cdn/images/favicon.5cb2bd30.ico"></a><span class="spotifyCopyrightNotice" style="position:initial;">[<a href="javascript:void(0);">会员提示</a>]</span>`).attr("title", `${title || that.title || `id ${uri.replace(/^spotify:/, "")}`} - Spotify`);
              const iframe = $("<iframe/>");
              //生成地址
              const matches = uri.match(/^spotify:(track|album|user|artist|show|episode|playlist):[^:]+(?::(playlist):[A-Za-z0-9]+)?/);
              const isUserPlaylist = matches[2] && "user" === matches[1];
              const isNormalPlaylist = !matches[2] && "playlist" === matches[1];
              let playerType;
              if (isUserPlaylist || isNormalPlaylist) {
                  playerType = "playlist";
              } else if (!matches[2] && ["track", "album", "artist", "show", "episode"].includes(matches[1])) {
                  playerType = matches[1];
              }
              const isPodcast = ["episode", "show"].includes(playerType);
              const src = `${isPodcast ? embedPodcastdomain : embedNormaldomain}/${uri.replace("spotify:", "").split(":").join("/")}`;
              iframe.attr({
                  "data-src": src,
                  allowtransparency: "true",
                  allow: "encrypted-media",
              });
              iframe.width(width).height(height);
              const div = $("<div/>");
              div.width(width).height(height).css({
                  width: '100%',
                  position: "absolute",
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
              self.append(iframe);
              iframe[0].addEventListener("load", () => {
                  placeholderToggle(iframe);
              });
              self.find(".spotifyCopyrightNotice a").on("click", () => {
                  alert("Spotify 限制了非会员用户的站外音乐播放功能，如果您未在 Spotify 网站登录，或登录非会员账户，则只能播放前30秒。\n此时我们建议点击播放器右侧 Spotify 图标，跳转到歌曲页面欣赏。");
              });
              self.width(iframe.width() + self.find(".spotifyCopyrightNotice").width() + parseInt(self.find(".spotifyCopyrightNotice").css("margin-left")));
              lazyLoadObserver.observe(iframe[0]);
          });
      };
      $(run);
      $(window).on("load", run);
  } catch (e) {
      // eslint-disable-next-line prefer-template
      prompt("Spotify模板执行出现问题，请复制以下内容并在提问求助区处粘贴寻求帮助：", navigator.userAgent + " : " + e + " " + e.stack.split("\n")[1].trim());
  }
}