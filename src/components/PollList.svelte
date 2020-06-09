<script>
  export let data, role, act

  import {createEventDispatcher} from 'svelte'
  import {fly} from 'svelte/transition'
  import {stores} from '@sapper/app'
  import {ROLE, EVENT} from '../service/liven-service'
  import {LivenSocket} from '../store/action'

  import Quiz from './Quiz.svelte'
  import QuizResult from './QuizResult.svelte'

  const {session} = stores()
  const dispatch = createEventDispatcher()
  const socket = LivenSocket.get()

  let componentAct = act
  let idx = 0
  let direction = 1

  let answers = []

  // [제출하기]btn 제어용 / 학생전용
  const submitStatus = {
    can: false,
    show: true
  }


  // [이전]btn
  function prev(e) {
    if (idx > 0) {
      --idx
      direction = -1
    }
  }

  // [다음]btn
  function next(e) {
    if (idx < data.length) {
      ++idx;
      direction = 1
    }
  }

  function checkAnswer(e) {
    // 정답을 저장하자!
    data[idx].myAnswer = parseInt(e.detail.itemId)

    // TODO blackpet: 모든 문항에 답을 입력하면 [제출하기] btn 활성화 하자!

    console.log('PollList checkAnswer', e.detail, data)
  }

  $: allAnswers = () => {
    console.log('allAnswers', data.filter(d => !!d.myAnswer).length, data.length)
    return data.filter(d => !!d.myAnswer).length === data.length
  }

  // [tutor] Live.N 시작!
  function start() {
    dispatch('submit')

    // 결과 페이지로 화면 전환하자!
    componentAct = `${act}-result`
    idx = 0 // 결과 페이지는 1번 문항부터 보여주자~
  }

  function submit() {
    const allAnswers = data.map(p => {
      return {actId: p.id, itemId:p.myAnswer}
    })

    // submit
    socket.emit(EVENT.STUDENT_SUBMIT_POLL, allAnswers)
  }
</script>


<ul>
  {#each data as poll, i (poll.id)}
    {#if idx === i}
      <li in:fly={{ x: direction * 300, duration: 500 }}>

        {#if componentAct === 'poll-result'}
          <QuizResult data="{poll}" role="{$session.role}" {act}/>
        {:else}
          <Quiz data={poll} role="{$session.role}" {act} {submitStatus}
                on:submit={start} on:checkAnswer={checkAnswer}/>
        {/if}

      </li>
    {/if}
  {/each}
</ul>

{#if role === ROLE.STUDENT}
  <!-- student only -->
  <div class="items_btn_single">
    <button type="button" class="btn_brownh50" on:click={submit} disabled="{!allAnswers()}">
      <span class="txt_s18">제출하기</span>
    </button>
  </div>
{/if}

<ul class="items_btn_double">
  <li class="item_list">
    <button type="button" class="btn_lineGrayh50" on:click={prev} disabled="{idx === 0}">
      <span class="txt_s16">이전</span>
    </button>
  </li>
  <li class="item_list">
    <button type="button" class="btn_grayh50" on:click={next} disabled="{idx === (data.length-1)}">
      <span class="txt_s16">다음</span>
    </button>
  </li>
</ul>

<style>
  .items_btn_single {margin-bottom: 20px;}
</style>
