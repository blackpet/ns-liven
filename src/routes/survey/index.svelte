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
  const act = 'survey'

  // link to detail
  async function linkDetail(survey) {
    let url = 'survey'
    if ($session.role === 'tutor') {
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
                <a href="" on:click|preventDefault={linkDetail(survey)} class="q_box">
                  <span class="txt_s18cDGray">{survey.subject}</span>
                  {#if survey.submitYn === 'Y'}
                    <span class="txt_s18cBrown_set">제출</span>
                  {/if}
                </a>
              </li>
            {/each}

                  <!--          <li class="list_question">-->
            <!--            <a href="#none" class="q_box set">&lt;!&ndash; 출제 된 문제일때 set  추가 &ndash;&gt;-->
            <!--              <span class="txt_s18cDGray">어떤 걸 어떻게 해야 해결이 가능할까요 어떻게 해야 해결이 가능할까요?</span>-->
            <!--              <span class="txt_s18cBrown_set">출제</span>-->
            <!--            </a>-->
            <!--          </li>-->
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
