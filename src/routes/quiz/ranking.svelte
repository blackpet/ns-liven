<script context="module">
  import QuizService, {quizzes} from '../../service/quiz-service'

  export async function preload(page, session) {
    const list = await QuizService.retrieveQuizRanking(session.course, quizzes.getValues())

    return {list}
  }
</script>

<script>
  export let list
  let dashoffsets = []

  // 목록을 1차로 가공하자!
  list.map(r => {
    // 풀이시간 초 변환
    r.totExamtime = (r.totExamtime / 1000).toFixed(2)

    // 정답률 animation을 위해 dashoffset을 계산해두자!
    dashoffsets.push({offset:176, real:176 - (176 * (r.correctRate / 100))})

    return r
  })

  // 정답률 animation 동작!!
  $: setTimeout(() => {
    dashoffsets.map(o => o.offset = o.real)
  }, 1000);
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
                <i class="icon_nlrank_01"></i> <!-- 1위 아이콘 -->
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
                    <circle style="stroke-dashoffset: {dashoffsets[i].offset}" class="circle_animation" r="28" cy="37" cx="32" stroke-width="8" stroke="#6fdb6f" fill="none" />
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
    </div>

  </section>

</div>
