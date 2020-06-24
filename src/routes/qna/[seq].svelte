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

  import QnaItem from "./QnaItem.svelte";

  export let qnaSeq, qna, replies = []
  let contents = ''

  import * as animationScroll from 'svelte-scrollto'
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

    const userId = $session.userId
    const depth = 1 // qna의 댓글은 depth=1
    const groupSeq = 0 // qna 댓글은 자동생성 seq 를 사용한다!
    let data = {
      qnaSeq, depth, groupSeq, contents, userId
    }

    const res = await QnaService.writeReply(data)
    data.seq = res.seq
    data.groupSeq = res.groupSeq

    // 입력 댓글은 초기화 하자!
    contents = ''

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
        replies[replies.length-1].new = false
      }
    })
  }

  // 댓글 group 마지막이면 답글 입력창을 보여주자!
  function leafOfGroup(i, groupSeq) {
    // case1. 마지막 reply 면 무조건 보여주자!
    if (replies.length - 1 === i) {
      return true
    }

    // case2. 그룹의 마지막 이냐?(다음 reply가 다른 그룹인 경우)
    else if (replies[i+1].groupSeq !== groupSeq) {
      return true
    }

    return false
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

    // 순서에 맞게 삽입하자!
    console.log('before', replies)
    replies.splice(prevIdx+1, 0, reply2)

    // 부모 댓글 count 증가!
    replies.find(r => r.seq === reply2.groupSeq).replyCnt++

    replies = [...replies] // touch!
    console.log('after', replies)

    // 'new' highlight 제거하자!
    setTimeout(() => {
      replies[prevIdx+1].new = false
    }, 10);
  }
</script>


<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">

        <ul class="lists_wrap_comment detail_View">

          <QnaItem item={qna} />
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
              <span class="txt_s16cDGray">{$session.nickname}</span>
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

              <ReplyItem {reply} idx={i} leafOfGroup={leafOfGroup(i, reply.groupSeq)}
                         on:writeReply2={writeReply2} />

            {/each}

          </ul>
          {/if}

        </div>
        <!--// 댓글 -->
      </div>


    </div>

  </section>

</div>
