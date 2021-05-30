export default () => {
  // 渲染曲目列表总时长，代码来自萌百
  $('.tracklist').each(function() {
    var self = $(this),
        target = self.find('.total_length');
    if (!target[0]) return;
    var total = 0;
    self.find('.song_length').each(function() {
        var text = $(this).text().trim();
        var match = (text.match(/(\d+):(\d+)/) || []).slice(1);
        if (match.length !== 2) return;
        total += +match[0] * 60 + +match[1];
    });
    var min = (total - total % 60) / 60,
        sec = total % 60;
    if (sec < 10) sec = '0' + sec;
    target.text(min + ":" + sec);
  });
}