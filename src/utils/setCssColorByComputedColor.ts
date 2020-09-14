// 通过解析计算后样式的颜色，为节点设置rgb颜色的css变量，配合styles/utils.scss中的useComputedColorVars一起使用
export default function setCssColorByComputedColor(computedStyleColor: string, varPrefix: string, targetElement: Element) {
  const rgb = computedStyleColor.replace(/rgb\((\d+?), (\d+?), (\d+?)\)/, '$1,$2,$3').split(',')

  $(targetElement).css({
    [`--${varPrefix}-r`]: rgb[0],
    [`--${varPrefix}-g`]: rgb[1],
    [`--${varPrefix}-b`]: rgb[2]
  })
}