<!--
  [Action Component]
  Quiz
-->
<script>
  /**
   * data {id, items[{id, subject, vote}] }
   */
  export let data, role

  import {stores} from '@sapper/app'
  import {onMount, createEventDispatcher} from 'svelte'
  import LivenService, {ROLE, EVENT} from '../service/liven-service'
  import {submitQuiz} from '../service/student-service'
  import {action, LivenSocket} from '../store/action'

  const {session} = stores()
  const socket = LivenSocket.get()

  ////////////////////////////////////////////////// 강사 전용

  // 강사는 문항을 선택할 수 없다! (readonly)
  let disabled = false
  onMount(() => {
    disabled = role === ROLE.TUTOR
  });

  // event를 상위 component 로 전파하자!
  const dispatch = createEventDispatcher()

  // [tutor] Live.N 시작!
  function start() {
    dispatch('submit', {})
  }

  // 정답
  let answer = {id: -1}
  // 강사인 경우만 답안을 표시한다! (default checked)
  if (role === ROLE.TUTOR) {
    answer = data.items.find(i => !!i.answer)
  }
  ////////////////////////////////////////////////// end of 강사 전용



  ////////////////////////////////////////////////// 학생 전용
  let shareMode = false

  if (!!socket) {
    // [tutor] quiz 결과 보러가자!
    socket.on(EVENT.TUTOR_SHARE_RESULT, (actData) => {
      console.log(EVENT.TUTOR_SHARE_RESULT, actData)

      $action[actData.act] = actData.data

      // 대기? 결과 공유?
      standbyOrShare(false)
    });
  }

  // 답안(문항) 선택
  let userAnswerId = -1
  function checkAnswer(e) {
    console.log('checkAnswer', e, e.target)
    userAnswerId = e.target.value
  }

  // [student] [제출하기]btn
  function submit() {
    confirm('제출 후에는 답안을 변경할 수 없습니다.<br>제출하시겠습니까?', function () {

      // insert to DB!
      submitQuiz({
        ns: $session.ns,
        userId: $session.userId,
        quizId: data.id,
        itemId: userAnswerId
      })

      // submit!
      socket.emit(EVENT.STUDENT_SUBMIT_QUIZ, {actId: data.id, itemId: userAnswerId});

      // close confirm!
      this.close()

      // 대기? 결과 공유?
      standbyOrShare(true)
    });
  }

  // 이미 "결과 공유하기" 이면 바로 결과 화면으로! 아니면 대기하자!
  function standbyOrShare(answered) {
    if (shareMode) {
      dispatch('share')
    } else {
      shareMode = !shareMode

      // 답안 제출했니?
      if (answered) {
        dispatch('standby');
      }
    }
  }
  ////////////////////////////////////////////////// end of 학생 전용

</script>

{#if data.length === 0}
  데이터가 없습니다.

{:else}

  <!-- Quiz 출력 -->
  <div class="container">
    <section class="content">

      <div class="contBox_NLive">

        <div class="cb_inner">

          <div class="question_w">
            <span class="icon_qRed">
                <span class="txt_s30cWhiteFB">Q</span>
            </span>
            <span class="txt_s18cDGrayFB">{@html data.subject}</span>
          </div>

          <ul class="quize_lists_w">
            {#each data.items as item, i}
              <li class="q_list">
                <label class="inp_radio_nl">
                  <input type="radio" name="q1" bind:group={answer.id} value="{item.id}" {disabled} on:click={checkAnswer}>
                  <span class="txt_s18cDGray">{i}. {@html item.subject}</span>
                  <i class="icon_rd_nl"></i>
                </label>
              </li>
            {/each}
          </ul>

          <!-- tutor private -->
          {#if role === ROLE.TUTOR}
            <div class="items_btn_single">
              <button type="button" class="btn_brownh50" on:click={start}>
                <span class="txt_s18">출제하기</span>
              </button>
            </div>
          {:else}
            <div class="items_btn_single">
              <button type="button" class="btn_brownh50" on:click={submit} disabled="{userAnswerId === -1}">
                <span class="txt_s18">제출하기</span>
              </button>
            </div>
          {/if}

        </div>
      </div>
    </section>
  </div>
  <!-- // Quiz 출력 -->

{/if}
