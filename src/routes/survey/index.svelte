<script context="module">
  import SurveyService from '../../service/survey-service'

  export async function preload(page, session) {
    const list = await SurveyService.retrieveSurveyList(session.course, session.userId)

    return {list}
  }
</script>

<script>
  export let list

  import {goto, stores} from '@sapper/app'
  import {ROLE} from '../../service/liven-service'
  import CourseSummary from "../../components/CourseSummary.svelte"


  const {session} = stores()
  const course = $session.course
  const act = 'survey'

  // link to detail
  async function linkDetail(survey) {
    let url = 'survey'
    if ($session.role === ROLE.TUTOR) {
      // 강사는 결과 화면으로 링크
      url += '/result'
    } else {
      // 기 제출된 설문지는 재 참여 불가!
      if (survey.submitYn === 'Y') {
        alert('이미 제출하였습니다.')
        return
      }

      // 학생은 설문지 화면으로 링크
      url += '/paper';
    }

    url = url + `?id=${survey.id}`
    await goto(url)

  }
</script>


<div class="container">
  <section class="content">

    <CourseSummary/>

    <div class="contBox_NLive">

      <div class="cb_inner">

        <h3 class="title_wrap">
          <span class="tit_s20cDGray">Survey</span>
        </h3>

        {#if list.length === 0}
          <span class="txt_s16cLGray">등록된 Live.N Survey가 없습니다!</span>
        {:else}

          <ul class="lists_wrap_question">

            {#each list as survey}
              <li class="list_question">
                <a href="#" on:click|preventDefault={linkDetail(survey)} class="q_box">
                  <span class="txt_s18cDGray">{survey.subject}</span>
                  {#if $session.role === ROLE.STUDENT && survey.submitYn === 'Y'}
                    <span class="txt_s18cBrown_set">제출</span>
                  {/if}

                  {#if $session.role === ROLE.TUTOR}
                    <span class="txt_s18cBrown_set">({!survey.submitCnt ? 0 : survey.submitCnt} / {course.stdCnt})</span>
                  {/if}

                </a>
              </li>
            {/each}

          </ul>
        {/if}

      </div>
    </div>

  </section>

</div>

<style>
  /* 제출여부 표시 */
  .list_question .q_box {position: relative;}
  .list_question .txt_s18cBrown_set {position: absolute;top: 15px;right: 15px;}
</style>
