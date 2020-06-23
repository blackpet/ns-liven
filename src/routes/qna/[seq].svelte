<script context="module">
  import QnaService from '../../service/qna-service'

  export async function preload({params}, session) {
    const qnaSeq = params.seq
    const qna = await QnaService.retrieveQnaDetail(session.course, session.userId, params.seq)
    const replies = await QnaService.retrieveReplies(session.userId, qnaSeq)

    return {qnaSeq, qna, replies}
  }
</script>

<script>

  export let qnaSeq, qna, replies = []
  let contents = ''

  import ReplyItem from "./ReplyItem.svelte";
  import * as util from '../../service/utils'
  import {lazy} from '../../util/lazy-loading'
  import moment from 'moment'
  import {stores} from '@sapper/app'
  const {session} = stores()


  // 댓글 [등록]btn
  async function writeReply() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    // TODO blackpet: nickname 가져와야 하는데....
    const nickname = '불타는앵그리RtA'
    const date = moment()
    const userId = $session.userId
    const depth = 1 // qna의 댓글은 depth=1
    const groupSeq = 0
    let data = {
      qnaSeq, depth, groupSeq, contents, userId
    }

    const res = await QnaService.writeReply(data)

    // TODO blackpet: broadcast 할꺼냐??
    // 입력한 댓글을 dataset 에 반영하자!
    data.nickname = nickname
    data.date = date
    data.seq = res.seq
    data.likeCnt = 0
    data.replyCnt = 0
    data.delYn = 'N'
    data.likeYn = 'N'
    console.log('writeReply', res)
    replies = [data, ...replies]

    // 입력 댓글은 초기화 하자!
    contents = ''
  }

</script>

<style>
  pre {
    white-space: break-spaces;
    text-align: justify;
  }
</style>


<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">

        <ul class="lists_wrap_comment detail_View">
          <li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->
            <div class="profile_img_w">
              <i class="user_pic_comment">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </i>
            </div>
            <div class="item_userInfo">
              <span class="txt_s16cDGray">{qna.nickname}</span>
              <span class="txt_s14cLGray">{qna.date}</span>
            </div>
            <div class="item_cont">

              {#if qna.savefile}
              <div class="img_w">
                <img src="" alt="" use:lazy={{src: util.imgSrc(qna.savefile)}}>
              </div>
              {/if}

              <span class="txt_s16cGray"><pre>{qna.contents}</pre></span>
            </div>

            <div class="formGroup_chk">
              <label class="inp_chk_likeHand">
                <input type="checkbox">
                <i class="icon_chk"></i>
                <span class="txt_s14cLGray">{qna.likeCnt}</span>
              </label>
              <label class="inp_chk_reply">
                <input type="checkbox">
                <i class="icon_chk"></i>
                <span class="txt_s14cLGray">{qna.replyCnt}</span>
              </label>
            </div>


          </li>
        </ul>


        <!-- 댓글 -->
        <div class="comments_review">

          <div class="title_wrap_comment">
            <h3 class="tit_s18cDGray">댓글 <span class="cRed">{replies.length}</span></h3>
          </div>

          <div class="comm_write">
            <div class="profile_img_w">
              <i class="user_pic_comment">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </i>
            </div>
            <div class="item_userInfo">
              <span class="txt_s16cDGray">앵그리너구리RtA</span>
            </div>
            <div class="item_write">
              <div class="inp_txtArea_comment">
                <textarea bind:value={contents} class="s16cDGray" placeholder="댓글을 입력해 주세요."></textarea>
              </div>
              <button type="button" class="btn_brown_replyApply" on:click={writeReply}>
                <span class="txt_s18cWhite">등록</span>
              </button>
            </div>
          </div>

          {#if replies.length > 0}
          <ul class="lists_wrap_comment">

            {#each replies as reply (reply.seq)}
            <li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->

              <ReplyItem {reply} />

            </li>
            {/each}

          </ul>
          {/if}

        </div>
        <!--// 댓글 -->
      </div>


    </div>

  </section>

</div>
