<script>
  export let item

  import * as util from '../../service/utils'
  import {lazy} from '../../util/lazy-loading'
  import QnaService from '../../service/qna-service'
  import WriteQna from './WriteQna.svelte'
  import {createEventDispatcher} from 'svelte'
  import {stores} from '@sapper/app'


  const {session} = stores()
  const dispatch = createEventDispatcher()

  $: like = item.likeYn === 'Y'
  let showTools = false // [수정/삭제] tools
  let editMode = false
  let contents = ''
  const placeholder = `내용을 입력해주세요. Markdown 형식을 지원합니다`

  // like / cancel like
  async function toggleLike() {
    const checked = this.checked
    const data = {seq: item.seq, type: 'Q', userId: $session.userId}

    const res = await QnaService.toggleLike(data, checked)

    item.likeYn = checked ? 'Y' : 'N'
    item.likeCnt += checked ? 1 : -1
  }

  // nickname (비공개 여부에 따른 표시 분기)
  function getNickname() {
    if (item.privateYn === 'Y') {
      return '비공개'
    }
    return item.nickname;
  }

  function deleteQna() {
    // 확인
    async function ok() {
      const res = await QnaService.updateQna({seq: item.seq, userId: $session.userId, type: 'Q'});

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

  function cancelEdit() {
    editMode = false
  }

  function update(e) {
    item = e.detail.item
    editMode = false
  }

</script>

<style>
  .fas.fa-user {
    color: #89827f;
    padding: 7px 9px;
    font-size: 18px;
  }
</style>

<!-- 조회 모드 -->
{#if !editMode}
  <div class="profile_img_w">
    <i class="user_pic_comment">
      {#if item.privateYn === 'Y'}
        <i class="fas fa-user"></i>
      {:else}
        <img src="{QnaService.profileImageSrc(item.userId)}" onerror="this.src='http://placehold.it/640x360'" alt="profile">
      {/if}
    </i>
  </div>
  <div class="item_userInfo">
    <span class="txt_s16cDGray">{getNickname()}</span>
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

  <WriteQna {item} mode="edit" on:cancelEdit={cancelEdit} on:update={update} />

{/if}
