<script context="module">
  import LivenService from '../../service/liven-service'
  export async function preload({params, query}, session) {
    const act = 'poll'
    // poll 문항정보 조회!
    const data = await LivenService.retrieveActionData(act, session.course, query.id)

    return {act, data}
  }
</script>

<script>
  export let data, act

  import SurveyItem from './SurveyItem.svelte'
  import {fly} from 'svelte/transition'
  import {goto, stores} from '@sapper/app'
  import PollService from '../../service/poll-service'

  const {session} = stores()

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
  }

  // 모든 답을 입력했니?
  $: allAnswers = () => {
    console.log('allAnswers', data.filter(d => !!d.myAnswer).length, data.length)
    return data.filter(d => !!d.myAnswer).length === data.length
  }

  // [student] [제출하기]
  async function submit() {
    const {subjCd, subjSeq} = $session.course
    const {userId, comp} = $session

    const allAnswers = data.map(p => {
      return {
        subjCd, subjSeq, userId, comp,
        pageId: p.pageId,
        pollId: p.id,
        myAnswer: p.myAnswer
      }
    })

    console.log('allAnswers', allAnswers)

    // DB에 저장하자!
    await PollService.submitPollAnswer(allAnswers);

    // 메인으로 이동!
    await goto('student')
  }

</script>

<h1>[student] paper</h1>


<div class="container">
  <section class="content">
    <div class="contBox_NLive">

      <ul>
        {#if data && data.length}
          {#each data as survey, i (survey.id)}
            {#if idx === i}
              <li in:fly={{ x: direction * 300, duration: 500 }}>

                <SurveyItem data={survey} on:checkAnswer={checkAnswer}/>

              </li>
            {/if}
          {/each}
        {/if}
      </ul>

      <!-- poll paper -->
      <div class="items_btn_single">
        <button type="button" class="btn_brownh50" on:click={submit} disabled="{!allAnswers()}">
          <span class="txt_s18">제출하기</span>
        </button>
      </div>

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


    </div>
  </section>
</div>
