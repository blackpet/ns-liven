<!--
  [Action Component]
  Quiz
-->
<script>
  export let data, role

  import {createEventDispatcher} from 'svelte'
  import {ROLE} from '../service/liven-service'

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

  /**
   * 항목 선택 readonly 여부
   *  - tutor: readonly
   *  - student: checkable
   * @param e
   */
  function readonly(e) {
    // 강사인 경우는 read-only!!
    if (role === ROLE.TUTOR) {
      e.preventDefault();
      return;
    }

    return;
  }

  // [student] [제출하기]btn
  function submit() {
    console.log('student :: submit!!!')
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
                  <input type="radio" name="q1" bind:group={answer.id} value="{item.id}" on:click="{readonly}">
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
              <button type="button" class="btn_brownh50" on:click={submit}>
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
