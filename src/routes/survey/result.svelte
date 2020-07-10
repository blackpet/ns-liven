<script context="module">
  import SurveyService from '../../service/survey-service'

  export async function preload({params, query}, session) {
    // survey 결과 조회!
    const data = await SurveyService.retrieveSurveyResult(session.course, query.id)

    return {data}
  }
</script>

<script>

  export let data = []

  import SurveyResultItem from "./SurveyResultItem.svelte";
  import {fly} from 'svelte/transition'
  import {goto, stores} from '@sapper/app'

  const {session} = stores()
  const course = $session.course

  let idx = 0
  let direction = 1

  // total attendee user count
  // 첫 문항의 투표수가 곧 참여자 수 이다!
  let resUserTotal = data[0].items.reduce((sum, i) => sum + i.vote, 0)

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

</script>


<div class="container">
  <section class="content">
    <div class="contBox_NLive">

      <div class="cb_inner">

        <div class="nl_result_top">
          <ul class="items_cont_double">
            <li class="item_cont">
              <span class="txt_s16cBrown">참여인원  {course.stdCnt} 명</span>
            </li>
            <li class="item_cont">
              <span class="txt_s16cBrown">응답인원  <b class="cRed">{resUserTotal}</b> 명</span>
            </li>
          </ul>
        </div>

        <ul>
          {#if data && data.length}
            {#each data as survey, i (survey.id)}
              {#if idx === i}
                <li in:fly={{ x: direction * 300, duration: 500 }}>

                  <SurveyResultItem data={survey} />

                </li>
              {/if}
            {/each}
          {/if}
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

      </div>

    </div>
  </section>
</div>

<style>
  .items_btn_single {
    margin-bottom: 20px;
  }
</style>
