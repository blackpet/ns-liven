<!--
  [Action Component]
  Quiz
-->
<script>
  /**
   * @data {id, items[{id, subject, vote}] }
   * @submitStatus {can: bool, show: bool}
   *  - [제출하기]btn 제어용 / 학생전용
   */
  export let data, role, act
  export let submitStatus = {
    can: false,
    show: true
  }

  // 답안(문항) 선택
  let myAnswer = -1

  // quiz인 경우는 [제출하기]btn 무조건 보여주면 된다!
  $: {
    if (act === 'quiz') {
      submitStatus.can = myAnswer == -1
    }
  }

  import {goto, stores} from '@sapper/app'
  import {onMount, createEventDispatcher} from 'svelte'
  import LivenService, {ROLE, EVENT} from '../service/liven-service'
  import QuizService, {quizzes} from '../service/quiz-service'
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
    dispatch('submit')
  }

  // 정답
  let answer = {id: -1}
  // 강사인 경우만 답안을 표시한다! (default checked)
  if (role === ROLE.TUTOR) {
    const answerItem = data.items.find(i => !!i.answer);
    answer = !answerItem ? answer : answerItem
  } else {
    // 선택한 값이 있으면 default check를 해주자!
    answer.id = !data.myAnswer ? -1 : data.myAnswer
  }

  $: isAddedQuiz = $quizzes.includes(data.id.toString())
  // quiz 목록으로
  function goQuizList() {
    goto('tutor/quizList')
  }

  // 출제에 포함/제외?
  function toggleQuizzes() {
    quizzes.toggleQuiz(data.id.toString())
    goQuizList()
  }
  ////////////////////////////////////////////////// end of 강사 전용


  ////////////////////////////////////////////////// 학생 전용
  let shareMode = false;

  if (!!socket) {
    // [tutor] quiz 결과 보러가자!
    socket.on(EVENT.TUTOR_SHARE_RESULT, (actData) => {
      console.log(EVENT.TUTOR_SHARE_RESULT, actData)

      $action[actData.act] = actData.data

      // 아직 응시 전이라도 무조건 결과화면으로 이동한다!
      dispatch('share')
    });
  }

  function checkAnswer(e) {
    // quiz 는 단일 문제로 Quiz component 안에서 동작한다!
    if (act === 'quiz') {
      myAnswer = e.target.value
    }

    // poll 은 다항 문제로 상위 PollList component 에서 제어한다!
    else if (act === 'poll') {
      dispatch('checkAnswer', {actId: data.id, itemId: e.target.value})
    }
  }

  // [student] [제출하기]btn
  function submit() {
    confirm('제출 후에는 답안을 변경할 수 없습니다.<br>제출하시겠습니까?', function () {

      const {subjCd, subjSeq} = $session.course
      const answerId = data.items.find(i => !!i.answer).id
      console.log('quiz submit!!', answerId, myAnswer)
      // insert to DB!
      QuizService.submitQuizAnswer({
        subjCd,
        subjSeq,
        quizId: data.id,
        userId: $session.userId,
        answerId,
        myAnswer: myAnswer
      })

      // submit!
      socket.emit(EVENT.STUDENT_SUBMIT_QUIZ, {actId: data.id, itemId: myAnswer});

      // close confirm!
      this.close()

      dispatch('submit');
    });
  }

  ////////////////////////////////////////////////// end of 학생 전용

</script>

{#if data.length === 0}
  데이터가 없습니다.

{:else}

  <!-- Quiz 출력 -->
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
            <span class="txt_s18cDGray">{i+1}. {@html item.subject}</span>
            <i class="icon_rd_nl"></i>
          </label>
        </li>
      {/each}
    </ul>

    {#if act === 'quiz'}
      {#if role === ROLE.TUTOR}
        <!-- tutor only -->
          <ul class="items_btn_double">
            <li class="item_list">
              <button type="button" class="btn_lineGrayh50" on:click={goQuizList}>
                <span class="txt_s16">목록으로</span>
              </button>
            </li>
            <li class="item_list">
              <button type="button" class="{isAddedQuiz ? 'btn_grayh50' : 'btn_brownh50'}" on:click={toggleQuizzes}>
                <span class="txt_s16">
                  {#if isAddedQuiz}
                    출제에서 제외하기
                  {:else}
                    출제에 포함하기
                  {/if}
                </span>
              </button>
            </li>
          </ul>

      {:else}
        <!-- student only -->
        <div class="items_btn_single">
          <button type="button" class="btn_brownh50" on:click={submit} disabled="{answer.id === -1}">
            <span class="txt_s18">제출하기</span>
          </button>
        </div>
      {/if}
    {/if}
  </div>

  <!-- // Quiz 출력 -->

{/if}
