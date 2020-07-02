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
  let contents = '', isPrivate = false

  import QnaItem from "./QnaItem.svelte";
  import ReplyItem from "./ReplyItem.svelte";

  import * as animationScroll from 'svelte-scrollto'
  import moment from 'moment'
  import {goto, stores} from '@sapper/app'

  const {session} = stores()

  // nickname (비공개 여부에 따른 표시 분기)
  function getNickname() {
    if (qna.privateYn === 'Y') {
      return '비공개'
    }
    return qna.nickname;
  }

  // 댓글 [등록]btn
  async function writeReply() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const userId = $session.userId
    const depth = 1 // qna의 댓글은 depth=1
    const groupSeq = 0 // qna 댓글은 자동생성 seq 를 사용한다!
    const privateYn = isPrivate ? 'Y' : 'N'
    let data = {
      qnaSeq, depth, groupSeq, contents, privateYn, userId
    }

    const res = await QnaService.writeReply(data)
    data.seq = res.seq
    data.groupSeq = res.seq

    // 입력 댓글은 초기화 하자!
    contents = ''
    isPrivate = false

    // 입력한 댓글을 dataset 에 반영하자! (rendering)
    appendReply(data)

  }

  // 입력한 댓글을 dataset 에 반영하자! (rendering)
  function appendReply(data) {
    // TODO blackpet: broadcast 할꺼냐??

    data.nickname = $session.nickname
    data.date = moment().format('YY/MM/DD HH:m')
    data.likeCnt = 0
    data.replyCnt = 0
    data.delYn = 'N'
    data.likeYn = 'N'
    // 신규 등록건 highlight 시키기!
    data.new = true

    // 제일 뒤에 추가하자~
    replies = [...replies, data]

    // 질문에 댓글 count 증가!
    qna.replyCnt++

    // scroll to bottom
    animationScroll.scrollToBottom({
      onDone: () => {
        // 스크롤 후 'new' highlight를 없애자!
        replies[replies.length - 1].new = false
      }
    })
  }

  // 댓글의 답글 작성!
  function writeReply2(e) {
    // TODO blackpet: broadcast 할꺼냐??
    console.log(e.detail)

    const {reply2, prevIdx} = e.detail

    reply2.nickname = $session.nickname
    reply2.date = moment().format('YY/MM/DD HH:m')
    reply2.likeCnt = 0
    reply2.replyCnt = 0
    reply2.delYn = 'N'
    reply2.likeYn = 'N'
    // 신규 등록건 highlight 시키기!
    reply2.new = true

    // 이전답글의 nextGroupSeq 를 신규 댓글로 밀어내자!
    reply2.nextGroupSeq = replies[prevIdx].nextGroupSeq
    replies[prevIdx].nextGroupSeq = replies[prevIdx].groupSeq

    // 순서에 맞게 삽입하자!
    replies.splice(prevIdx + 1, 0, reply2)

    // 부모 댓글 count 증가!
    replies.find(r => r.seq === reply2.groupSeq).replyCnt++

    replies = [...replies] // touch!

    // 'new' highlight 제거하자!
    setTimeout(() => {
      replies[prevIdx + 1].new = false
    }, 10);
  }

</script>

<style>
  .comm_write .profile_img_w {top: 18px;}
  label.inp_chk {position: absolute;right: 0;top: 18px;}
</style>

<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">

        <ul class="lists_wrap_comment detail_View">

          <li class="list_comment reply">
            <QnaItem item={qna} on:deleteQna={() => goto('qna')} />
          </li>

        </ul>


        <!-- 댓글 -->
        <div class="comments_review">

          <div class="title_wrap_comment">
            <h3 class="tit_s18cDGray">댓글 <span class="cRed">{replies.filter(p => p.depth === 1).length}</span></h3>
          </div>

          <div class="comm_write">
            <div class="profile_img_w">
              <i class="user_pic_comment">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </i>
            </div>
            <div class="item_userInfo">
              <span class="txt_s16cDGray">{qna.nickname}</span>

              <label class="inp_chk">
                <input type="checkbox" bind:checked={isPrivate}>
                <i class="icon_chk"></i>
                <span class="txt_s14cBlack">비공개</span>
              </label>
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

              {#each replies as reply, i (reply.seq)}

                <ReplyItem {reply} idx={i} on:writeReply2={writeReply2}/>

              {/each}

            </ul>
          {/if}

        </div>
        <!--// 댓글 -->
      </div>


    </div>

  </section>

</div>
