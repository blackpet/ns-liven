<!--
  [Action Component]
  Quiz
-->
<script>
  /**
   * data {id, items[{id, subject, vote}] }
   */
  export let data, role

  import {onMount, createEventDispatcher} from 'svelte'
  import LivenService, {ROLE} from '../service/liven-service'
  import {submitQuiz} from '../service/student-service'

  // 강사는 문항을 선택할 수 없다! (readonly)
  let disabled = false
  onMount(() => {
    disabled = role === ROLE.TUTOR
  });

  // event를 상위 component 로 전파하자!
  const dispatch = createEventDispatcher();
  function start() {
    dispatch('start', {act: 'quiz'})
  }

  // 정답
  let answer = {id: -1}
  // 강사인 경우만 답안을 표시한다! (default checked)
  if (role === ROLE.TUTOR) {
    answer = data.items.find(i => !!i.answer)
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
      submitQuiz(data.id, userAnswerId)
      this.close()
    });
  }

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
