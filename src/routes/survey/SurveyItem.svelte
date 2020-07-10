<!--
  Survey Item Component
-->
<script>
  /**
   * @data {id, items[{id, subject, vote}] }
   * @submitStatus {can: bool, show: bool}
   *  - [제출하기]btn 제어용
   */
  export let data

  const timer = new Date().getTime() // 시험 시작 시간
  console.log('start time', timer)

  import {createEventDispatcher} from 'svelte'

  // event를 상위 component 로 전파하자!
  const dispatch = createEventDispatcher()

  // 정답
  let answer = {id: -1}
  // 선택한 값이 있으면 default check를 해주자!
  answer.id = !data.myAnswer ? -1 : data.myAnswer

  let shareMode = false;

  function checkAnswer(e) {
    // survey 은 다항 문제로 상위 component 에서 제어한다!
    dispatch('checkAnswer', {actId: data.id, itemId: e.target.value})
  }

</script>

{#if data.length === 0}
  데이터가 없습니다.

{:else}

  <!-- Survey 문항 출력 -->
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
            <input type="radio" name="q1" bind:group={answer.id} value="{item.id}" on:click={checkAnswer}>
            <span class="txt_s18cDGray">{i+1}. {@html item.subject}</span>
            <i class="icon_rd_nl"></i>
          </label>
        </li>
      {/each}
    </ul>

  </div>

  <!-- // Survey 문항 출력 -->

{/if}
