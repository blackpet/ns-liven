<script>
  import {stores} from '@sapper/app'
  import CourseSummary from "./CourseSummary.svelte";

  const {session} = stores()

  const acts = [
    {name: 'Live Quiz', act: 'quiz', id: 1},
    {name: 'Live Poll', act: 'poll', id: 2},
    {name: 'Live Q&A', act: 'qna'},
    {name: 'Live Share', act: 'share'},
    {name: 'Survey', act: 'survey', id: 1},
  ];

  function getUrl(act) {
    let url = ''
    if (['quiz', 'poll'].includes(act.act)) {
      url = `${$session.role}/`
    }
    url += act.act

    return url
  }

</script>


<div class="container">
  <section class="content">

    <CourseSummary />

    <div class="contBox_NLive">

      <div class="cb_inner">

        <ul class="live_lists_w">
          {#each acts as item}
          <li class="live_list">
            <a href="{getUrl(item)}" class="link_live_{item.act}">
              <span class="txt_s24cDGray">{item.name}</span>
            </a>
          </li>
          {/each}
        </ul>
      </div>
    </div>

  </section>

</div>
