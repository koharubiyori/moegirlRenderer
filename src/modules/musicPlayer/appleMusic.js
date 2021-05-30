
export default async () => {
  try {
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
          $(".appleMusic:not(.exec)").each((_, that) => {
              const self = $(that);
              self.addClass("exec");
              const id = that.dataset.id;
              const song = that.dataset.song;
              const title = that.dataset.title;
              let float = that.dataset.float;
              const width = 660;
              const height = /^\d+$/.test(song) ? 150 : 450;
              if (!/^\d+$/.test(id)) {
                  return self.css("color", "red").text("Error in widget:AppleMusic: Invalid id.");
              }
              if (!["left", "right"].includes(float)) { float = "none"; }
              if (float !== "none") { self.addClass(`float-${float}`); }
              self.empty().attr("title", `${title || that.title || `id ${id}${/^\d+$/.test(id) ? ` song ${song}` : ""}`} - Apple Music`).append(`<a rel="nofollow noreferrer noopener" class="external text" href="https://music.apple.com/cn/album/${id}" target="_blank" style="position:relative; top:2px"><img src="https://music.apple.com/assets/favicon/favicon-32-cf4ec46d27b788993fc95dd81ee309d4.png"></a><span style="position:initial;" class="appleMusicCopyrightNotice">[<a href="javascript:void(0);">会员提示</a>]</span>`);
              const iframe = $("<iframe/>");
              iframe.attr("data-src", `https://embed.music.apple.com/cn/album/${id}${/^\d+$/.test(id) ? `?i=${song}` : ""}`);
              iframe.width(width).height(height);
              const div = $("<div/>");
              div.height(height).css({
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
              self.find(".appleMusicCopyrightNotice a").on("click", () => {
                  alert("Apple Music 限制了未订阅 Apple Music 用户的站外音乐播放功能，如果您未在 Apple Music 网站登录订阅了 Apple Music 的账户，则只能播放随机30秒片段。\n此时我们建议点击左侧 Apple Music 图标，跳转到歌曲页面欣赏。");
              });
              self.width(iframe.width() + self.find(".appleMusicCopyrightNotice").width());
              lazyLoadObserver.observe(iframe[0]);
          });
      };
      $(run);
      $(window).on("load", run);
  } catch (e) {
      // eslint-disable-next-line prefer-template
      prompt("AppleMusic模板执行出现问题，请复制以下内容并在提问求助区处粘贴寻求帮助：", navigator.userAgent + " : " + e + " " + e.stack.split("\n")[1].trim());
  }
}