import createModuleConfig from '~/utils/createModuleConfig';
import './index.scss'

export interface PollData {
  pollId: string
  answer: number
  token: string
}

const { config, addMethod } = createModuleConfig('poll', {
  onPoll: () => {}
})

addMethod<'poll'>('updatePollContent', (pollId, content) => {
  $('#ajaxpoll-container-' + pollId).html(content)
})

export default () => {
  $('body').on('click', '.ajaxpoll-answer', function() {
    const pollId = $(this).attr('poll')!
    const answer = parseInt($(this).attr('answer')!)
    const token = $(this).parents('.ajaxpoll').find('input[name="ajaxPollToken"]').val() as string
    $(this).parents('ajaxpoll').find('.ajaxpoll-ajax').text('提交投票中...')
    
    config.onPoll({ pollId, answer, token })
  })
}