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

  // like / cancel like
  async function toggleLike() {
    const checked = this.checked
    const data = {seq: item.seq, type: 'Q', userId: $session.userId}

    const res = await QnaService.toggleLike(data, checked)

    item.likeYn = checked ? 'Y' : 'N'
    item.likeCnt += checked ? 1 : -1
  }

  function deleteQna() {
    confirm('질문과 모든 댓글이 삭제됩니다.<br>삭제하시겠습니까?', async function() {
      const res = await QnaService.deleteQna({seq: item.seq, type: 'Q'})

      showTools = false
      this.close()

      dispatch('deleteQna', {seq: item.seq})
    });
  }
</script>

<style>
  pre {
    white-space: break-spaces;
    text-align: justify;
  }
</style>

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

    <a href="qna/{item.seq}" class="txt_s16cGray"><pre>{item.contents}</pre></a>
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
        <button type="button" class="btnIcon_h40Modify">
          <span class="txt_s16cDGray">수정</span>
        </button>
        <button type="button" class="btnIcon_h40Delete" on:click={deleteQna}>
          <span class="txt_s16cDGray">삭제</span>
        </button>
      </div>
    </div>
  </div>
  {/if}

