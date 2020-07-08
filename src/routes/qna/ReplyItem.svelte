<script>
  export let reply, idx

  import * as util from '../../service/utils'
  import QnaService from '../../service/qna-service'
  import {stores} from '@sapper/app'
  import {createEventDispatcher} from 'svelte'

  const {session} = stores()
  const dispatch = createEventDispatcher()

  let like = reply.likeYn === 'Y'
  let showTools = false // [수정/삭제] tools
  let editMode = false // 수정 모드
  let editContents = '', isEditPrivate = false // 수정용 입력값
  let newContents = '', isNewPrivate = false // 신규 댓글용 입력값

  // like / cancel like
  async function toggleLike() {
    const checked = this.checked
    const data = {seq: reply.seq, type: 'R', userId: $session.userId}

    const res = await QnaService.toggleLike(data, checked)

    reply.likeYn = checked ? 'Y' : 'N'
    reply.likeCnt += checked ? 1 : -1
  }

  // nickname (비공개 여부에 따른 표시 분기)
  function getNickname() {
    if (reply.privateYn === 'Y') {
      return '비공개'
    }
    return reply.nickname;
  }

  // 답글 [등록]btn
  async function writeReply2() {
    // validation
    if (newContents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const userId = $session.userId
    const depth = 2 // 댓글의 답글은 depth=2
    const {qnaSeq, groupSeq} = reply
    const privateYn = isNewPrivate ? 'Y' : 'N'
    let data = {
      qnaSeq, depth, groupSeq, contents: newContents, privateYn, userId
    }

    const res = await QnaService.writeReply(data)
    data.seq = res.seq

    // 입력 댓글은 초기화 하자!
    newContents = ''

    // 입력한 답글을 dataset 에 반영하자! (rendering)
    dispatch('writeReply2', {reply2: data, prevIdx: idx})
  }

  async function deleteReply() {
    const res = await QnaService.updateQna({seq: reply.seq, userId: $session.userId, type: 'R'})
    reply.delYn = 'Y'

    showTools = false
  }

  // [수정]btn
  function edit() {
    showTools = false
    editMode = true
    editContents = reply.contents
    isEditPrivate = reply.privateYn === 'Y' ? true : false
  }

  // [저장하기]btn
  async function save() {
    // validation
    if (editContents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const {seq} = reply
    const userId = $session.userId

    const privateYn = isEditPrivate ? 'Y' : 'N'
    const data = {
      seq, userId, type: 'R', contents: editContents, privateYn
    }
    const res = await QnaService.updateQna(data)

    // binding!
    reply.contents = editContents
    reply.privateYn = isEditPrivate ? 'Y' : 'N'
    editContents = ''
    isEditPrivate = false
    editMode = false
  }

</script>

<style>
  li.list_comment {transition: background-color 1s ease-in-out;}
  li.list_comment.depth1.new, li.list_comment.depth2.new {background-color: #ffec73;}
  li.list_comment.depth2 {background-color: #e0eff6;}

  /* 답글 작성 폼 */
  .inp_txtArea_reply {width: 70vw;}
  .reply_write_w {padding-top: 20px;}
  .reply_write_w button {
    width: 18vw;
    float: right;
    height: 65px;
  }

  .reply-write-form {
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #d0d0d0;
    padding-bottom: 20px;
  }
  .inp_txtArea_live { margin-top: unset; }


  /* 삭제된 댓글 */
  .deleted {text-decoration: line-through;}

  .private_chk {position: relative;height: 30px;}
  .private_chk label.inp_chk {position: absolute;top: 10px; right: 15px;}

  .fas.fa-user {
    color: #89827f;
    padding: 7px 9px;
    font-size: 18px;
  }
</style>

<!-- 조회 모드 -->
{#if !editMode}
  <li class="list_comment depth{reply.depth}" class:new={reply.new}>
    <div class="profile_img_w">
      <i class="user_pic_comment">
        {#if reply.privateYn === 'Y'}
          <i class="fas fa-user"></i>
        {:else}
          <img src="{QnaService.profileImageSrc(reply.userId)}" onerror="this.src='http://placehold.it/640x360'" alt="profile">
        {/if}
      </i>
    </div>
    <div class="item_userInfo">
      <span class="txt_s16cDGray">{getNickname()}</span>
      <span class="txt_s14cLGray">{reply.date}</span>
    </div>
    <div class="item_cont">
      {#if reply.delYn === 'Y'}
        <span class="txt_s16cGray deleted">삭제된 댓글 입니다.</span>
      {:else}
        <span class="txt_s16cGray">{@html util.nsMarked(reply.contents)}</span>
      {/if}
    </div>

    <div class="formGroup_chk">
      <label class="inp_chk_likeHand">
        <input type="checkbox" bind:checked={like} on:click={toggleLike}>
        <i class="icon_chk"></i>
        <span class="txt_s14cLGray">{reply.likeCnt}</span>
      </label>

      <!-- 댓글의 답글은 더이상 답글이 없다! 댓글에만 답글 개수 표시! -->
      {#if reply.depth === 1}
        <label class="inp_chk_reply">
          <i class="icon_chk"></i>
          <span class="txt_s14cLGray">{reply.replyCnt}</span>
        </label>
      {/if}

    </div>

    {#if reply.userId === $session.userId && reply.delYn === 'N'}
      <div class="tools_w">
        <div class="tools_btn_w">
          <button type="button" class="btnIcon_tools" class:active={showTools} on:click={() => showTools = !showTools}>
            <span class="ir">버튼 열기/닫기</span>
          </button>

          <div class="tools_layer">
            <button type="button" class="btnIcon_h40Modify" on:click={edit}>
              <span class="txt_s16cDGray">수정</span>
            </button>
            <button type="button" class="btnIcon_h40Delete" on:click={deleteReply}>
              <span class="txt_s16cDGray">삭제</span>
            </button>
          </div>
        </div>
      </div>
    {/if}

  </li>

<!-- 수정 모드 -->
{:else}
  <li class="reply-write-form">
    <div class="cb_inner">
      <div class="inp_txtArea_live">
        <textarea bind:value={editContents} placeholder="내용을 입력해 주세요."></textarea>
      </div>

      <div class="private_chk">
        <label class="inp_chk">
          <input type="checkbox" bind:checked={isEditPrivate}>
          <i class="icon_chk"></i>
          <span class="txt_s14cBlack">익명</span>
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
  </li>
{/if}

<!-- 댓글 그룹의 마지막이면 댓글 입력창 출력! -->
{#if reply.groupSeq !== reply.nextGroupSeq}
  <li class="reply-write-form">

    <div class="private_chk">
      <label class="inp_chk">
        <input type="checkbox" bind:checked={isNewPrivate}>
        <i class="icon_chk"></i>
        <span class="txt_s14cBlack">익명</span>
      </label>
    </div>

    <div class="reply_write_w">
      <div class="inp_txtArea_reply">
        <textarea bind:value={newContents} class="s16cDGray" placeholder="답글을 입력해 주세요."></textarea>
      </div>
      <button type="button" class="btn_gray_reply" on:click={writeReply2}>
        <span class="txt_s18cWhite">등록</span>
      </button>
    </div>
  </li>
{/if}



