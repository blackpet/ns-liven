<script context="module">
  import LivenService from '../../service/liven-service'

  export async function preload({params, query}, session) {
    // Action Data 조회하자!
    const data = await LivenService.retrieveActionData('quiz', session.course, query.id)

    return {data}
  }
</script>

<script>
  export let data

  import QuizResult from '../../components/QuizResult.svelte'
  import {ROLE} from '../../service/liven-service'
  import QuizService, {quizzes} from '../../service/quiz-service'
  import {goto} from '@sapper/app'

  function nextQuiz() {
    console.log('nextQuiz')
    goto(`tutor/quizResult?id=${quizzes.nextQuizId(data.id)}`)
  }

  function shareRank() {
    console.log('shareRank!!!')
  }
</script>

<div class="container">
  <section class="content">
    <div class="contBox_NLive">

      <QuizResult {data} role="{ROLE.TUTOR}" act="quiz">

        {#if quizzes.hasNextQuiz(data.id)}
          <div class="items_btn_single">
            <button type="button" class="btn_brownh50" on:click={nextQuiz}>
              <span class="txt_s16">다음 문제 출제하기</span>
            </button>
          </div>
        {:else}
          <div class="items_btn_single">
            <button type="button" class="btn_brownh50" on:click={shareRank}>
              <span class="txt_s16">순위 공유하기</span>
            </button>
          </div>
        {/if}

      </QuizResult>

    </div>
  </section>
</div>

