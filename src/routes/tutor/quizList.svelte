<script context="module">
  import QuizService from '../../service/quiz-service'

  export async function preload(page, session) {
    const list = await QuizService.retrieveQuizList(session.course)

    return {act: 'quiz', list}
  }
</script>

<script>
  export let act, list

  import {goto, stores} from '@sapper/app'
  import CourseSummary from "../../components/CourseSummary.svelte";
  import {quizzes} from '../../service/quiz-service'
  import {EVENT} from '../../service/liven-service'
  import {LivenSocket} from '../../store/action'

  const {session} = stores()

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

  // [출제하기]btn
  async function start() {
    const socket = LivenSocket.get()
    const qzz = quizzes.getValues()

    const startLive = async () => {
      // send action data to server
      socket.emit(EVENT.TUTOR_START_QUIZ, qzz);

      await goto(`tutor/quizResult?id=${quizzes.getValues()[0]}`)
    }

    // 기 출제된 문항이 있으면 경고!!
    const existsSubmitted = list.filter(q => qzz.includes(q.id.toString())).reduce((sum, i) => sum += i.answerCnt, 0) > 0
    if (existsSubmitted) {
      // 기 출제된 문항 삭제 후 진행하자!
      const ok = async function() { // this(bpf.popup instance) binding 을 위해 function definition 사용 (arrow function 사용 시 this binding 안됨!)
        const {subjCd, subjSeq} = $session.course
        await QuizService.resetQuizAnswers({subjCd, subjSeq, ids: qzz})

        // 시작하자!
        startLive()
        // close poppy
        this.close()
      };
      confirm('출제된 문항이 포함되어 있습니다.<br>재 출제 시 기존 데이터는 모두 삭제됩니다.<br><br>출제하시겠습니까?', ok);
    } else {
      // 시작하자!
      startLive()
    }

  }

  // [랭킹보기]btn
  async function rank() {
    // 하나도 선택안하면 못보지!
    if (quizzes.getValues().length === 0) {
      alert('랭킹을 집계할 Quiz를 선택해 주세요.')
      return
    }

    // 응시가 완료된 (출제한) 퀴즈만 랭킹보기 대상이다!
    const checkedQzz = quizzes.getValues()
    const submitted = list.filter(q => checkedQzz.includes(q.id.toString()) && q.answerCnt > 0)
    if (submitted.length !== checkedQzz.length) {
      alert('출제되지 않은 문항은 랭킹을 집계할 수 없습니다.')
      return
    }

    await goto('quiz/ranking')
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
                    {#if quiz.answerCnt > 0}
                      <span class="txt_s18cBrown_set">출제</span>
                    {/if}
                  </a>
                </div>
              </li>
            {/each}

          </ul>
        {/if}


      </div>

      <div class="items_btn_single">
        <button type="button" class="btn_brownh50" on:click={start} disabled={disabledStart}>
          <span class="txt_s18">출제하기</span>
        </button>
      </div>

      <div class="items_btn_single mt-20">
        <button type="button" class="btn_grayh50" on:click={rank}>
          <span class="txt_s18">랭킹보기</span>
        </button>
      </div>
    </div>

  </section>

</div>


<style>
  .mt-20 {margin-top: 20px;}
  /* 출제여부 표시 */
  .list_question .q_box {position: relative;}
  .list_question .txt_s18cBrown_set {position: absolute;top: 15px;right: 15px;}
</style>
