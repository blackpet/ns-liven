<script context="module">
  import QuizService from '../../service/quiz-service'

  export async function preload(page, session) {
    const list = await QuizService.retrieveQuizList(session.course)

    return {list}
  }
</script>

<script>
  export let list

  import {goto} from '@sapper/app'
  import CourseSummary from "../../components/CourseSummary.svelte";
  import {quizzes} from '../../service/quiz-service'

  const act = 'quiz'

  // 선택된 quiz의 checked status를 관리하자!
  let checkedQzz = {}
  $: disabledStart = Object.keys(checkedQzz).length == 0

  quizzes.subscribe(qzz => {
    checkedQzz = {}
    qzz.forEach(q => {
      checkedQzz[q] = true
    })
  });

  // 출제할 quiz 에 포함/제외
  function toggleQuiz(e) {
    const chk = e.target
    const id = chk.value

    quizzes.toggleQuiz(id)
  }

  function start() {
    console.log('start quiz value', quizzes.getValues())
    goto(`tutor/quizResult?id=${quizzes.getValues()[0]}`)
  }
</script>


<div class="container">
  <section class="content">

    <CourseSummary/>

    <div class="contBox_NLive">

      <div class="cb_inner">

        <h3 class="title_wrap">
          <span class="tit_s20cDGray">Quiz (출제할 퀴즈를 선택해 주세요)</span>
        </h3>

        {#if list.length === 0}
          <span class="txt_s16cLGray">등록된 Live.N Quiz가 없습니다!</span>
        {:else}

          <ul class="lists_wrap_question">

            {#each list as quiz}
              <li class="list_question">
                <div class="q_box">
                  <label class="inp_chk">
                    <input type="checkbox" value="{quiz.id}"
                           bind:checked={checkedQzz[quiz.id]}
                           on:change={toggleQuiz}>
                    <i class="icon_chk"></i>
                  </label>

                  <a href="tutor/{act}?id={quiz.id}">
                    <span class="txt_s18cDGray">{quiz.subject}</span>
                  </a>
                </div>
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
      <div class="items_btn_single">
        <button type="button" class="btn_brownh50" on:click={start} disabled={disabledStart}>
          <span class="txt_s18">출제하기</span>
        </button>
      </div>
    </div>

  </section>

</div>
