<script context="module">
  import QuizService, {quizzes} from '../../service/quiz-service'

  export async function preload(page, session) {
    const list = await QuizService.retrieveQuizRanking(session.course, quizzes.getValues())

    return {list}
  }
</script>

<script>
  export let list

  import {goto, stores} from '@sapper/app'
  import {EVENT, ROLE} from '../../service/liven-service'
  import {LivenSocket, action} from '../../store/action'

  const {session} = stores()
  const socket = LivenSocket.get()

  /////////////////////////////////// listen on server
  // [종료하기] 시작 페이지로 이동하자!
  socket.on(EVENT.TUTOR_END_LIVEN, async act => {
    // 데이터 제거하자!
    $action[act] = {}

    await goto($session.role)
  });
  ///////////////////////////////////  end of listen on server


  // [랭킹 공유하기] 시 quizIds 를 사용한다! 임시저장 해놓자!
  const qzz = quizzes.getValues()
  let shared = false

  // 목록을 1차로 가공하자!
  list.map(r => {
    // 풀이시간 초 변환
    r.totExamtime = (r.totExamtime / 1000).toFixed(2)
    r.dashoffset = 176 - (176 * (r.correctRate / 100))

    return r
  })

  // quizzes reset 하자!
  quizzes.reset()

  // [랭킹 공유하기]btn
  function shareRanking() {
    socket.emit(EVENT.TUTOR_SHARE_QUIZ_RANK, qzz)
    shared = true
  }

  // [종료하기]btn
  function endQuiz() {
    socket.emit(EVENT.TUTOR_END_LIVEN, 'quiz')
  }
</script>

<style>
  td.circle-rate {
    position: relative;
    width: 94px;
  }

  .circle-rate .lchart_info {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  svg {
    transform: rotate(-90deg);
  }

  .circle_animation {
    stroke-dasharray: 176;
    stroke-dashoffset: 176;
    transition: stroke-dashoffset .3s ease-in-out;
  }
</style>

<div class="container">
  <section class="content">
    <div class="contBox_NLive">

      <div class="cb_inner">

        {#if list.length === 0}
          <span class="txt_s16cLGray">랭킹 결과가 없습니다.</span>

        {:else}
          <div class="tableWrap_info">
            <table class="table_infoList">
              <thead>
              <tr>
                <th scope="col">
                  <span class="txt_s16cDGray">순위</span>
                </th>
                <th scope="col">
                  <span class="txt_s16cDGray">닉네임</span>
                </th>
                <th scope="col">
                  <span class="txt_s16cDGray">정답률</span>
                </th>
                <th scope="col">
                  <span class="txt_s16cDGray">총<br>풀이시간</span>
                </th>
              </tr>
              </thead>
              <tbody>

              {#each list as rank, i}
                <tr>
                  <td>
                    {#if rank.rank <= 3}
                      <i class="icon_nlrank_0{rank.rank}"></i> <!-- 1~3위 아이콘 -->
                    {:else}
                      <span class="txt_s16cDGrayFB">{rank.rank}</span>
                    {/if}
                  </td>
                  <td>
                    <span class="txt_s16cDGray">{rank.userNm}</span>
                  </td>
                  <td class="circle-rate">
                    <div class="lchart_info">
                      <span class="txt_s16cDGray">{rank.correctRate}%</span>
                    </div>
                    <svg width="75" height="72" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <title>{rank.correctRate}</title>
                        <circle style="stroke-dashoffset: {rank.dashoffset}" class="circle_animation" r="28" cy="37"
                                cx="32" stroke-width="8" stroke="#6fdb6f" fill="none"/>
                      </g>
                    </svg>
                  </td>
                  <td>
                    <span class="txt_s16cDGray">{rank.totExamtime}초</span>
                  </td>
                </tr>
              {/each}

              </tbody>
            </table>
          </div>

        {/if} <!-- // end of rank list -->

      </div>

      {#if $session.role == ROLE.TUTOR}
        {#if !shared}
          <div class="items_btn_single">
            <button type="button" class="btn_brownh50" on:click={shareRanking}>
              <span class="txt_s18">랭킹 공유하기</span>
            </button>
          </div>
        {:else}
          <div class="items_btn_single">
            <button type="button" class="btn_brownh50" on:click={endQuiz}>
              <span class="txt_s18">종료하기</span>
            </button>
          </div>
        {/if}
      {/if}
    </div>

  </section>

</div>
