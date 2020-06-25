<script>
  export let item

  import * as util from '../../service/utils'
  import {lazy} from '../../util/lazy-loading'
  import QnaService from '../../service/qna-service'
  import {createEventDispatcher} from 'svelte'
  import {stores} from '@sapper/app'


  const {session} = stores()
  const dispatch = createEventDispatcher()

  let like = item.likeYn === 'Y'
  let showTools = false // [수정/삭제] tools
  let editMode = false
  let contents = ''
  const placeholder =
          `내용을 입력해주세요
Markdown 형식을 지원합니다`

  // like / cancel like
  async function toggleLike() {
    const checked = this.checked
    const data = {seq: item.seq, type: 'Q', userId: $session.userId}

    const res = await QnaService.toggleLike(data, checked)

    item.likeYn = checked ? 'Y' : 'N'
    item.likeCnt += checked ? 1 : -1
  }

  function deleteQna() {
    // 확인
    async function ok() {
      const res = await QnaService.deleteQna({seq: item.seq, userId: $session.userId, type: 'Q'});

      showTools = false // tool box 를 닫자!
      this.close()
      dispatch('deleteQna', {seq: item.seq})
    }

    // 취소
    function cancel() {
      showTools = false // tool box 를 닫자!
      this.close()
    }

    confirm('질문과 모든 댓글이 삭제됩니다.<br>삭제하시겠습니까?', ok, cancel);
  }

  // [수정]btn
  function edit() {
    showTools = false
    editMode = true
    contents = item.contents
  }

  // [저장하기]btn
  async function save() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const {seq} = item
    const userId = $session.userId

    // TODO blackpet: 파일첨부 구현!!
    const data = {
      seq, contents, userId, type: 'Q'
    }
    const res = await QnaService.updateQna(data)

    // binding!
    item.contents = contents
    contents = ''
    editMode = false
  }
</script>

<style>
  .item_cont pre, .item_cont code {
    white-space: break-spaces;
    text-align: justify;
  }
  .items_btn_double > .item_list {
    padding: 0 0 0 5px;
    width: 50%;
  }
  .items_btn_double li span {
    letter-spacing: 0;
  }
</style>

<!-- 조회 모드 -->
{#if !editMode}
  <div class="profile_img_w">
    <i class="user_pic_comment">
      <img src="http://placehold.it/640x360" alt="임시이미지">
    </i>
  </div>
  <div class="item_userInfo">
    <span class="txt_s16cDGray">{item.nickname}</span>
    <span class="txt_s14cLGray">{item.date}</span>
  </div>
  <div class="item_cont">
    {#if item.savefile}
    <a href="qna/{item.seq}" class="thumb_img">
      <img src="" alt="" use:lazy={{src: util.imgSrc(item.savefile)}}>
    </a>
    {/if}

    <a href="qna/{item.seq}" class="txt_s16cGray">{@html util.nsMarked(item.contents)}</a>
  </div>

  <div class="formGroup_chk">
    <label class="inp_chk_likeHand">
      <input type="checkbox" bind:checked={like} on:click={toggleLike}>
      <i class="icon_chk"></i>
      <span class="txt_s14cLGray">{item.likeCnt}</span>
    </label>
    <label class="inp_chk_reply">
      <i class="icon_chk"></i>
      <span class="txt_s14cLGray">{item.replyCnt}</span>
    </label>
  </div>

  {#if item.userId === $session.userId}
  <div class="tools_w">
    <div class="tools_btn_w">
      <button type="button" class="btnIcon_tools" class:active={showTools} on:click={() => showTools = !showTools}>
        <span class="ir">버튼 열기/닫기</span>
      </button>

      <div class="tools_layer">
        <button type="button" class="btnIcon_h40Modify" on:click={edit}>
          <span class="txt_s16cDGray">수정</span>
        </button>
        <button type="button" class="btnIcon_h40Delete" on:click={deleteQna}>
          <span class="txt_s16cDGray">삭제</span>
        </button>
      </div>
    </div>
  </div>
  {/if}

<!-- 수정 모드 -->
{:else}
<div class="cb_inner">
  <div class="inp_txtArea_live">
    <textarea bind:value={contents} placeholder="{placeholder}"></textarea>
  </div>

  <div class="liveQnA_addSet">
    <ul class="file_lists_w">
      <li class="af_list">
        <a href="#none" class="linkIcon_file">
          <span class="txt_s16cDGray">첨부파일명,pdf</span>
        </a>
        <button type="button" class="btnIcon_delete_gray">
          <span class="ir">삭제</span>
        </button>
      </li>
    </ul>

    <label class="btn_lineGrayh40_file">
      <input type="file">
      <span class="txt_s16">파일선택</span>
    </label>
  </div>


  <footer class="pop_footer">
    <ul class="items_btn_double">
      <li class="item_list">
        <button type="button" class="btn_grayLineh50" on:click={() => {editMode = false}}>
          <span class="txt_s16">취소하기</span>
        </button>
      </li>
      <li class="item_list">
        <button type="button" class="btn_brownh50" on:click={save}>
          <span class="txt_s16">저장하기</span>
        </button>
      </li>
    </ul>
  </footer>

</div>

{/if}
