<script context="module">
  import QuizService from '../../service/quiz-service'

  export async function preload(page, session) {
    const list = await QuizService.retrieveQuizList(session.course)

    return {list}
  }
</script>

<script>
  export let list

  import CourseSummary from "../../components/CourseSummary.svelte";
  import {quizzes} from '../../service/quiz-service'

  const act = 'quiz'

  // 출제할 quiz 에 포함/제외
  function toggleQuiz(e) {
    const chk = e.target
    const id = chk.value
    console.log('value(id)', id)

    quizzes.update(arr => {
      const idx = arr.indexOf(id)
      if (idx > -1) {
        // remove id
        arr.splice(idx, 1);
      } else {
        arr.push(id)
      }
      arr.sort()

      return arr
    });
    console.log(chk, chk.checked, id);
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
                <div href="tutor/{act}?id={quiz.id}" class="q_box">
                  <label class="inp_chk">
                    <input type="checkbox" value="{quiz.id}" on:change={toggleQuiz}>
                    <i class="icon_chk"></i>
                    <span class="txt_s18cDGray">{quiz.subject}</span>
                  </label>

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
    </div>

  </section>

</div>
