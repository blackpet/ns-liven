<script>
  export let data, role, act

  import {createEventDispatcher} from 'svelte'
  import {fade, fly} from 'svelte/transition'
  import {stores} from '@sapper/app'
  import {ROLE} from '../service/liven-service'
  import Quiz from './Quiz.svelte'
  import QuizResult from './QuizResult.svelte'

  const {session} = stores()
  const dispatch = createEventDispatcher()

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

    console.log('PollList checkAnswer', e.detail, data)
  }

  // [tutor] Live.N 시작!
  function start() {
    dispatch('submit')

    // 결과 페이지로 화면 전환하자!
    componentAct = `${act}-result`
    idx = 0 // 결과 페이지는 1번 문항부터 보여주자~
  }

  function submit() {

  }
</script>


<ul>
  {#each data as poll, i (poll.id)}
    {#if idx === i}
    <li in:fly={{ x: direction * 300, duration: 500 }}>

      {#if componentAct === 'poll-result'}
      <QuizResult data="{poll}" role="{$session.role}" {act} />
      {:else}
      <Quiz data={poll} role="{$session.role}" {act} {submitStatus}
            on:submit={start} on:checkAnswer={checkAnswer}/>
      {/if}

    </li>
    {/if}
  {/each}
</ul>

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
