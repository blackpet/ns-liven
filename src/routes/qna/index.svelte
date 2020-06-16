<script context="module">
  import LivenService from '../../service/liven-service'

  export async function preload({query, params}, session) {
    const data = await LivenService.retrieveQnaList(session.course)

    return {data}
  }
</script>


<script>
  export let data

  import QnaItem from './QnaItem.svelte'

</script>


<div class="container">
  <section class="content">


    <div class="contBox_NLive">

      <div class="cb_inner">

        <div class="items_btn_single">
          <button type="button" class="btn_lineBrownh50">
            <span class="txt_s16">질문하기</span>
          </button>
        </div>

        {#if data.length === 0}
          <span class="txt_s16cLGray">강의 중 궁금한 것이 있다면 바로 질문해 보세요!</span>

        {:else}
          <div class="inp_select_underline_live">
            <select class="h50s16cDGray">
              <option>최신순</option>
              <option>공감순</option>
            </select>
          </div>

          <ul class="lists_wrap_comment">

            {#each data as item}
              <QnaItem {item}/>
            {/each}

          </ul>

          <div class="paging_w">
            <buttoh type="button" class="btnIcon_pg_first">
              <span class="ir">처음</span>
            </buttoh>
            <buttoh type="button" class="btnIcon_pg_prev">
              <span class="ir">처음</span>
            </buttoh>
            <div class="page_number">
              <a href="#none" class="link_s16 active">1</a>
              <a href="#none" class="link_s16">2</a>
              <a href="#none" class="link_s16">3</a>
              <a href="#none" class="link_s16">4</a>
              <a href="#none" class="link_s16">5</a>
            </div>
            <buttoh type="button" class="btnIcon_pg_next">
              <span class="ir">처음</span>
            </buttoh>
            <buttoh type="button" class="btnIcon_pg_last">
              <span class="ir">처음</span>
            </buttoh>
          </div>
        {/if}

      </div>


      <button type="button" class="btnIcon_write">
        <span class="ir">질문등록</span>
      </button>
    </div>


  </section>
</div>
