<script context="module">
  import PollService from '../../service/poll-service'

  export async function preload(page, session) {
    const list = await PollService.retrievePollList(session.course)

    return {list}
  }
</script>

<script>
  export let list

  import CourseSummary from "../../components/CourseSummary.svelte";
  import {goto} from '@sapper/app'

  const act = 'poll'

  async function goDetail(poll) {
    let url
    if (poll.submitCnt > 0) {
      // 출제된 poll 은 결과화면으로 이동!
      url = `survey/result?id=${poll.id}`;
    } else {
      // 상세화면으로 이동
      url = `tutor/${act}?id=${poll.id}`;
    }

    await goto(url)
  }

</script>


<div class="container">
  <section class="content">

    <CourseSummary/>

    <div class="contBox_NLive">

      <div class="cb_inner">

        <h3 class="title_wrap">
          <span class="tit_s20cDGray">Poll</span>
        </h3>

        {#if list.length === 0}
          <span class="txt_s16cLGray">등록된 Live.N Poll가 없습니다!</span>
        {:else}

          <ul class="lists_wrap_question">

            {#each list as poll}
              <li class="list_question">
                <a href="detail" on:click|preventDefault={goDetail(poll)} class="q_box">
                  <span class="txt_s18cDGray">{poll.subject}</span>
                  {#if poll.submitCnt > 0}
                    <span class="txt_s18cBrown_set">출제</span>
                  {/if}
                </a>
              </li>
            {/each}

          </ul>
        {/if}

      </div>
    </div>

  </section>

</div>

<style>
  /* 출제여부 표시 */
  .list_question .q_box {position: relative;}
  .list_question .txt_s18cBrown_set {position: absolute;top: 15px;right: 15px;}
</style>
