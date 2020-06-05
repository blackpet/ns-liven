<script>
  export let data, role, act

  import {createEventDispatcher} from 'svelte'
  import {fade, fly} from 'svelte/transition'
  import {stores} from '@sapper/app'
  import {ROLE} from '../service/liven-service'
  import Quiz from './Quiz.svelte'

  const {session} = stores()
  const dispatch = createEventDispatcher()

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
    console.log('PollList checkAnswer', e.detail)
  }

  // [tutor] Live.N 시작!
  function start() {
    dispatch('submit', {})
  }

  function submit() {

  }
</script>


<ul>
  {#each data as poll, i}
    {#if idx === i}
    <li in:fly={{ x: direction * 300, duration: 500 }}>
      <Quiz data={poll} role="{$session.role}" {act} {submitStatus} on:checkAnswer={checkAnswer}/>
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
