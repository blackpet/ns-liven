<script context="module">
  import {env} from '../../env'

  export async function preload() {
    // TODO blackpet: 실 DB 에서 조회할 것!
    let data

    const res = await this.fetch(`${env.api}/share`)
    if (res.ok) {
      data = await res.json();
    } else {
      throw new Error('cannot retrieve share list')
    }

    return {data}
  }

</script>

<script>
  import CourseSummary from "../../components/CourseSummary.svelte";

  export let data

  import moment from 'moment'

</script>

<div class="container">
  <section class="content">

    <CourseSummary />

    <div class="contBox_NLive">
      <div class="cb_inner">
        <h3 class="title_wrap">
          <span class="tit_s20cDGray">자료 리스트</span>
        </h3>

        {#if !data && !data.length}
          <div class="noData_w">
            <span class="txtIcon_noData_s18cLGray">자료실 데이터가 없습니다.</span>
          </div>
        {:else}
            <ul class="lists_wrap_live">
          {#each data as item}
              <li class="list_live">
                <a href="share/{item.id}" class="link_liveSt">
                  <span class="tit_s18cDGray">{item.subject}</span>
                  <span class="txt_s16cLGray">{moment(item.date).format('YYYY.MM.DD')}</span>
                </a>
              </li>
          {/each}
            </ul>
        {/if}


      </div>
    </div>

  </section>

</div>
