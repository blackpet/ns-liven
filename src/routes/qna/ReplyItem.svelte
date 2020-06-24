<script>
  export let reply, leafOfGroup, idx
  let contents = ''

  import QnaService from '../../service/qna-service'
  import {stores} from '@sapper/app'
  import {createEventDispatcher} from 'svelte'

  const {session} = stores()
  const dispatch = createEventDispatcher()

  let like = reply.likeYn === 'Y'
  let showTools = false // [수정/삭제] tools

  // like / cancel like
  async function toggleLike() {
    const checked = this.checked
    const data = {seq: reply.seq, type: 'R', userId: $session.userId}

    const res = await QnaService.toggleLike(data, checked)

    reply.likeYn = checked ? 'Y' : 'N'
    reply.likeCnt += checked ? 1 : -1
  }

  // 답글 [등록]btn
  async function writeReply2() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    console.log('reply', reply)

    const userId = $session.userId
    const depth = 2 // 댓글의 답글은 depth=2
    const {qnaSeq, groupSeq} = reply
    let data = {
      qnaSeq, depth, groupSeq, contents, userId
    }
    console.log('data', data)

    const res = await QnaService.writeReply(data)
    data.seq = res.seq

    // 입력 댓글은 초기화 하자!
    contents = ''

    // 입력한 답글을 dataset 에 반영하자! (rendering)
    dispatch('writeReply2', {reply2: data, prevIdx: idx})
  }

  async function deleteReply() {
    const res = await QnaService.deleteQna({seq: reply.seq, type: 'R'})
    reply.delYn = 'Y'

    showTools = false
  }

</script>

<style>
  pre {
    white-space: break-spaces;
    text-align: justify;
  }

  li.list_comment {
    transition: background-color 1s ease-in-out;
  }

  li.list_comment.depth1.new, li.list_comment.depth2.new {
    background-color: #ffec73;
  }

  li.list_comment.depth2 {
    background-color: #e0eff6;
  }

  /* 답글 작성 폼 */
  .inp_txtArea_reply {
    width: 70vw;
  }

  .reply_write_w {
    padding-top: 20px;
  }

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

  .deleted {
    text-decoration: line-through;
  }
</style>

<li id="reply-{reply.seq}" class="list_comment depth{reply.depth}" class:new={reply.new}>
  <div class="profile_img_w">
    <i class="user_pic_comment">
      <img src="http://placehold.it/640x360" alt="임시이미지">
    </i>
  </div>
  <div class="item_userInfo">
    <span class="txt_s16cDGray">{reply.nickname}</span>
    <span class="txt_s14cLGray">{reply.date}</span>
  </div>
  <div class="item_cont">
    {#if reply.delYn === 'Y'}
    <span class="txt_s16cGray deleted">삭제된 댓글 입니다.</span>
    {:else}
    <span class="txt_s16cGray"><pre>{reply.contents}</pre></span>
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
        <input type="checkbox">
        <i class="icon_chk"></i>
        <span class="txt_s14cLGray">{reply.replyCnt}</span>
      </label>
    {/if}

  </div>

  {#if reply.userId === $session.userId}
  <div class="tools_w">
    <div class="tools_btn_w">
      <button type="button" class="btnIcon_tools" class:active={showTools} on:click={() => showTools = !showTools}>
        <span class="ir">버튼 열기/닫기</span>
      </button>

      <div class="tools_layer">
        <button type="button" class="btnIcon_h40Modify">
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

{#if leafOfGroup}
<li class="reply-write-form">
  <div class="reply_write_w">
    <div class="inp_txtArea_reply">
      <textarea bind:value={contents} class="s16cDGray" placeholder="답글을 입력해 주세요."></textarea>
    </div>
    <button type="button" class="btn_gray_reply" on:click={writeReply2}>
      <span class="txt_s18cWhite">등록</span>
    </button>
  </div>
</li>
{/if}
