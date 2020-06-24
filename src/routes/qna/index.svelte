<script context="module">
  import QnaService from '../../service/qna-service'


  export async function preload({query, params}, session) {
    const data = await QnaService.retrieveQnaList(session.course, session.userId)

    return {data}
  }
</script>


<script>
  export let data

  import {goto} from '@sapper/app'
  import QnaItem from './QnaItem.svelte'

  // [질문하기]btn
  async function write() {
    await goto('qna/write')
  }

  // [더보기 +]btn
  function nextPage() {
    // TODO blackpet
  }

  function deleteQna(e) {
    const seq = e.detail.seq

    data = data.filter(q => q.seq !== seq)
  }

</script>

<style>
  .items_btn_single .btn_grayh50 {
    background-color: #bbbbbb;
  }
</style>

<div class="container">
  <section class="content">


    <div class="contBox_NLive">

      <div class="cb_inner">

        <div class="items_btn_single">
          <button type="button" class="btn_lineBrownh50" on:click={write}>
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
              <li class="list_comment reply">
                <QnaItem {item} on:deleteQna={deleteQna} />
              </li>
            {/each}

          </ul>

          <div class="items_btn_single">
            <button type="button" class="btn_grayh50" on:click={nextPage}>
              <span class="txt_s16">더보기 +</span>
            </button>
          </div>

        {/if}

      </div>


      <button type="button" class="btnIcon_write">
        <span class="ir">질문등록</span>
      </button>
    </div>


  </section>
</div>
