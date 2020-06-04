<script>
  export let data, role
  console.log('QuizResult', data)

  import {action, LivenSocket} from '../store/action'
  import {ROLE, EVENT} from '../service/liven-service'

  const socket = LivenSocket.get()

  // total attendee user count
  let resUserTotal = 1
  $: resUserTotal = data.items.reduce((sum, i) => sum + i.vote, 0)

  function percent(item) {
    return Math.round(item.vote / resUserTotal * 100)
  }

  function share() {
    socket.emit(EVENT.TUTOR_SHARE_RESULT)
  }

  //////////////////////////////////////// listen socket

  // [student] submit quiz/poll/survey data!
  socket.on(EVENT.STUDENT_SUBMIT_QUIZ, (actData) => {
    console.log(EVENT.STUDENT_SUBMIT_QUIZ, actData)

    $action[actData.act] = actData.data
  })
</script>

<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">

        <div class="nl_result_top">
          <ul class="items_cont_double">
            <li class="item_cont">
              <span class="txt_s16cBrown">참여인원  n명</span>
            </li>
            <li class="item_cont">
              <span class="txt_s16cBrown">응답인원  <b class="cRed">{resUserTotal}</b>명</span>
            </li>
          </ul>
        </div>

        <div class="question_w">
          <span class="icon_qRed">
              <span class="txt_s30cWhiteFB">Q</span>
          </span>
          <span class="txt_s18cDGrayFB">{@html data.subject}</span>
        </div>

        <ul class="lists_wrap_result">

          {#each data.items as item, i}
            <li class="list_result">
              <span class="txt_s18cDGray">{i}. {@html item.subject}</span>
              {#if item.answer}
                <span class="txt_s18cBrown">정답</span>
              {/if}
              <div class="grap_x_red">
              <span class="gWrap">
                  <i class="gBar" style="width:{percent(item)}%;"></i>
              </span>
                <span class="txt_s16cDGray"><b class="cRed">{item.vote}</b> 명</span>
              </div>
            </li>
          {/each}

        </ul>

        {#if role === ROLE.TUTOR}
          <div class="items_btn_single">
            <button type="button" class="btn_brownh50" on:click={share}>
              <span class="txt_s16">결과 공유하기</span>
            </button>
          </div>
        {/if}


      </div>
    </div>

  </section>


</div>
