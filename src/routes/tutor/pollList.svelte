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

  const act = 'poll'

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
                <a href="tutor/{act}?id={poll.id}" class="q_box">
                  <span class="txt_s18cDGray">{poll.subject}</span>
                </a>
              </li>
            {/each}

<!--          <li class="list_question">-->
<!--            <a href="#none" class="q_box set">&lt;!&ndash; 출제 된 문제일때 set  추가 &ndash;&gt;-->
<!--              <span class="txt_s18cDGray">어떤 걸 어떻게 해야 해결이 가능할까요 어떻게 해야 해결이 가능할까요?</span>-->
<!--              <span class="txt_s18cBrown_set">출제</span>-->
<!--            </a>-->
<!--          </li>-->
          </ul>
        {/if}

      </div>
    </div>

  </section>

</div>
