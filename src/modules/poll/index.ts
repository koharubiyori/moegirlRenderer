import createModuleConfig from '~/utils/createModuleConfig';
import './index.scss'

const { config, addMethod } = createModuleConfig('poll', {
  onPoll: () => {}
})

addMethod('updatePollContent', (pollId, content) => {
  $('#ajaxpoll-container-' + pollId).html(content)
})

export default () => {
  $('body').on('click', '.ajaxpoll-answer', function() {
    const pollId = $(this).attr('poll')!
    const answer = parseInt($(this).attr('answer')!)
    config.onPoll(pollId, answer)
  })
}