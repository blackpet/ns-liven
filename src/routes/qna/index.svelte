<script context="module">
  import QnaService from '../../service/qna-service'


  export async function preload({query, params}, session) {
    const {subjCd, subjSeq} = session.course
    const userId = session.userId
    const order = 'new' // default '최신순'
    const data = await QnaService.retrieveQnaList({subjCd, subjSeq, userId, order})

    return {data, session}
  }
</script>


<script>
  export let data, session

  import {goto} from '@sapper/app'
  import QnaItem from './QnaItem.svelte'

  let order = 'new'

  // [질문하기]btn
  async function write() {
    await goto('qna/write')
  }

  function deleteQna(e) {
    const seq = e.detail.seq

    data = data.filter(q => q.seq !== seq)
  }

  // 정렬하기
  async function reorder() {
    const {subjCd, subjSeq} = session.course
    const userId = session.userId

    data = await QnaService.retrieveQnaList({subjCd, subjSeq, userId, order})
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
            <select bind:value={order} class="h50s16cDGray" on:change={reorder}>
              <option value="new">최신순</option>
              <option value="like">공감순</option>
            </select>
          </div>

          <ul class="lists_wrap_comment">

            {#each data as item (item.seq)}
              <li class="list_comment reply">
                <QnaItem {item} on:deleteQna={deleteQna} />
              </li>
            {/each}

          </ul>

        {/if}

      </div>


      <button type="button" class="btnIcon_write">
        <span class="ir">질문등록</span>
      </button>
    </div>


  </section>
</div>
