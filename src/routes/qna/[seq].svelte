<script context="module">
  import QnaService from '../../service/qna-service'

  export async function preload({params}, session) {
    const qna = await QnaService.retrieveQnaDetail(session.course, session.userId, params.seq)
    const replies = await QnaService.retrieveReplies(session.userId, params.seq)

    return {qna, replies}
  }
</script>

<script>
  export let qna, replies = []

  import * as util from '../../service/utils'
  import {lazy} from '../../util/lazy-loading'

  // 댓글 [등록]btn
  function writeReply() {
    console.log('writeReply')
  }


</script>

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
                <textarea cols="" rows="" class="s16cDGray" placeholder="댓글을 입력해 주세요."></textarea>
              </div>
              <button type="button" class="btn_brown_replyApply" on:click={writeReply}>
                <span class="txt_s18cWhite">등록</span>
              </button>
            </div>
          </div>

          <ul class="lists_wrap_comment">
            <li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->
              <div class="profile_img_w">
                <i class="user_pic_comment">
                  <img src="http://placehold.it/640x360" alt="임시이미지">
                </i>
              </div>
              <div class="item_userInfo">
                <span class="txt_s16cDGray">앵그리너구리RtA</span>
                <span class="txt_s14cLGray">2020-00-00 00:00</span>
              </div>
              <div class="item_cont">
                <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
              </div>

              <div class="formGroup_chk">
                <label class="inp_chk_likeHand">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
                <label class="inp_chk_reply">
                  <input type="checkbox" checked>
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
              </div>

              <div class="tools_w">
                <div class="tools_btn_w">
                  <button type="button" class="btnIcon_tools">
                    <span class="ir">버튼 열기/닫기</span>
                  </button>

                  <div class="tools_layer">
                    <button type="button" class="btnIcon_h40Modify">
                      <span class="txt_s16cDGray">수정</span>
                    </button>
                    <button type="button" class="btnIcon_h40Delete">
                      <span class="txt_s16cDGray">삭제</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 댓글 의 댓글 -->
              <div class="reply_w">
                <ul class="lists_wrap_comment">
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
                    </div>

                    <div class="formGroup_chk">
                      <label class="inp_chk_likeHand">
                        <input type="checkbox">
                        <i class="icon_chk"></i>
                        <span class="txt_s14cLGray">999</span>
                      </label>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!-- 수정 일때  -->
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <div class="inp_txtArea_modify">
                        <textarea cols="" rows="" class="s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</textarea>
                      </div>
                      <div class="bottom_btn_w">
                        <ul class="items_btn_double">
                          <li class="item_list">
                            <button type="button" class="btn_grayh40">
                              <span class="txt_s16">취소</span>
                            </button>
                          </li>
                          <li class="item_list">
                            <button type="button" class="btn_brownh40">
                              <span class="txt_s16">수정</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!--// 수정 일때  -->
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
                    </div>

                    <div class="formGroup_chk">
                      <label class="inp_chk_likeHand">
                        <input type="checkbox">
                        <i class="icon_chk"></i>
                        <span class="txt_s14cLGray">999</span>
                      </label>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="bottom_btn_w">
                  <button type="button" class="btnIcon_fold">
                    <span class="txt_s14cLGray">답글접기</span>
                  </button>
                </div>
                <div class="reply_write_w">
                  <div class="inp_txtArea_reply">
                    <textarea cols="" rows="" class="s16cDGray" placeholder="댓글을 입력해 주세요."></textarea>
                  </div>
                  <button type="button" class="btn_gray_reply">
                    <span class="txt_s18cWhite">등록</span>
                  </button>
                </div>
              </div>
              <!--// 댓글 의 댓글 -->
            </li>
            <li class="list_comment">
              <div class="profile_img_w">
                <i class="user_pic_comment">
                  <img src="http://placehold.it/640x360" alt="임시이미지">
                </i>
              </div>
              <div class="item_userInfo">
                <span class="txt_s16cDGray">앵그리너구리RtA</span>
                <span class="txt_s14cLGray">2020-00-00 00:00</span>
              </div>
              <div class="item_cont">
                <div class="inp_txtArea_modify">
                  <textarea cols="" rows="" class="s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</textarea>
                </div>
                <div class="bottom_btn_w">
                  <ul class="items_btn_double">
                    <li class="item_list">
                      <button type="button" class="btn_grayh40">
                        <span class="txt_s16">취소</span>
                      </button>
                    </li>
                    <li class="item_list">
                      <button type="button" class="btn_brownh40">
                        <span class="txt_s16">수정</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="formGroup_chk">
                <label class="inp_chk_likeHand">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
                <label class="inp_chk_reply">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
              </div>

              <div class="tools_w">
                <div class="tools_btn_w">
                  <button type="button" class="btnIcon_tools">
                    <span class="ir">버튼 열기/닫기</span>
                  </button>

                  <div class="tools_layer">
                    <button type="button" class="btnIcon_h40Modify">
                      <span class="txt_s16cDGray">수정</span>
                    </button>
                    <button type="button" class="btnIcon_h40Delete">
                      <span class="txt_s16cDGray">삭제</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 댓글 의 댓글 -->
              <div class="reply_w">
                <ul class="lists_wrap_comment">
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
                    </div>

                    <div class="formGroup_chk">
                      <label class="inp_chk_likeHand">
                        <input type="checkbox">
                        <i class="icon_chk"></i>
                        <span class="txt_s14cLGray">999</span>
                      </label>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!-- 수정 일때  -->
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <div class="inp_txtArea_modify">
                        <textarea cols="" rows="" class="s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</textarea>
                      </div>
                      <div class="bottom_btn_w">
                        <ul class="items_btn_double">
                          <li class="item_list">
                            <button type="button" class="btn_grayh40">
                              <span class="txt_s16">취소</span>
                            </button>
                          </li>
                          <li class="item_list">
                            <button type="button" class="btn_brownh40">
                              <span class="txt_s16">수정</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!--// 수정 일때  -->
                </ul>
                <div class="bottom_btn_w">
                  <button type="button" class="btnIcon_fold">
                    <span class="txt_s14cLGray">답글접기</span>
                  </button>
                </div>
                <div class="reply_write_w">
                  <div class="inp_txtArea_reply">
                    <textarea cols="" rows="" class="s16cDGray" placeholder="댓글을 입력해 주세요."></textarea>
                  </div>
                  <button type="button" class="btn_gray_reply">
                    <span class="txt_s18cWhite">등록</span>
                  </button>
                </div>
              </div>
              <!--// 댓글 의 댓글 -->

            </li>
            <li class="list_comment">
              <div class="profile_img_w">
                <i class="user_pic_comment">
                  <img src="http://placehold.it/640x360" alt="임시이미지">
                </i>
              </div>
              <div class="item_userInfo">
                <span class="txt_s16cDGray">앵그리너구리RtA</span>
                <span class="txt_s14cLGray">2020-00-00 00:00</span>
              </div>
              <div class="item_cont">
                <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
              </div>

              <div class="formGroup_chk">
                <label class="inp_chk_likeHand">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
                <label class="inp_chk_reply">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
              </div>

              <div class="tools_w">
                <div class="tools_btn_w">
                  <button type="button" class="btnIcon_tools">
                    <span class="ir">버튼 열기/닫기</span>
                  </button>

                  <div class="tools_layer">
                    <button type="button" class="btnIcon_h40Modify">
                      <span class="txt_s16cDGray">수정</span>
                    </button>
                    <button type="button" class="btnIcon_h40Delete">
                      <span class="txt_s16cDGray">삭제</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 댓글 의 댓글 -->
              <div class="reply_w">
                <ul class="lists_wrap_comment">
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
                    </div>

                    <div class="formGroup_chk">
                      <label class="inp_chk_likeHand">
                        <input type="checkbox">
                        <i class="icon_chk"></i>
                        <span class="txt_s14cLGray">999</span>
                      </label>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!-- 수정 일때  -->
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <div class="inp_txtArea_modify">
                        <textarea cols="" rows="" class="s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</textarea>
                      </div>
                      <div class="bottom_btn_w">
                        <ul class="items_btn_double">
                          <li class="item_list">
                            <button type="button" class="btn_grayh40">
                              <span class="txt_s16">취소</span>
                            </button>
                          </li>
                          <li class="item_list">
                            <button type="button" class="btn_brownh40">
                              <span class="txt_s16">수정</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!--// 수정 일때  -->
                </ul>
                <div class="bottom_btn_w">
                  <button type="button" class="btnIcon_fold">
                    <span class="txt_s14cLGray">답글접기</span>
                  </button>
                </div>
                <div class="reply_write_w">
                  <div class="inp_txtArea_reply">
                    <textarea cols="" rows="" class="s16cDGray" placeholder="댓글을 입력해 주세요."></textarea>
                  </div>
                  <button type="button" class="btn_gray_reply">
                    <span class="txt_s18cWhite">등록</span>
                  </button>
                </div>
              </div>
              <!--// 댓글 의 댓글 -->

            </li>
            <li class="list_comment">
              <div class="profile_img_w">
                <i class="user_pic_comment">
                  <img src="http://placehold.it/640x360" alt="임시이미지">
                </i>
              </div>
              <div class="item_userInfo">
                <span class="txt_s16cDGray">앵그리너구리RtA</span>
                <span class="txt_s14cLGray">2020-00-00 00:00</span>
              </div>
              <div class="item_cont">
                <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
              </div>

              <div class="formGroup_chk">
                <label class="inp_chk_likeHand">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
                <label class="inp_chk_reply">
                  <input type="checkbox">
                  <i class="icon_chk"></i>
                  <span class="txt_s14cLGray">999</span>
                </label>
              </div>

              <div class="tools_w">
                <div class="tools_btn_w">
                  <button type="button" class="btnIcon_tools">
                    <span class="ir">버튼 열기/닫기</span>
                  </button>

                  <div class="tools_layer">
                    <button type="button" class="btnIcon_h40Modify">
                      <span class="txt_s16cDGray">수정</span>
                    </button>
                    <button type="button" class="btnIcon_h40Delete">
                      <span class="txt_s16cDGray">삭제</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 댓글 의 댓글 -->
              <div class="reply_w">
                <ul class="lists_wrap_comment">
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
                    </div>

                    <div class="formGroup_chk">
                      <label class="inp_chk_likeHand">
                        <input type="checkbox">
                        <i class="icon_chk"></i>
                        <span class="txt_s14cLGray">999</span>
                      </label>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="list_comment">
                    <div class="profile_img_w">
                      <i class="user_pic_comment">
                        <img src="http://placehold.it/640x360" alt="임시이미지">
                      </i>
                    </div>
                    <div class="item_userInfo">
                      <span class="txt_s16cDGray">앵그리너구리RtA</span>
                      <span class="txt_s14cLGray">2020-00-00 00:00</span>
                    </div>
                    <div class="item_cont">
                      <span class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</span>
                    </div>

                    <div class="formGroup_chk">
                      <label class="inp_chk_likeHand">
                        <input type="checkbox">
                        <i class="icon_chk"></i>
                        <span class="txt_s14cLGray">999</span>
                      </label>
                    </div>

                    <div class="tools_w">
                      <div class="tools_btn_w">
                        <button type="button" class="btnIcon_tools">
                          <span class="ir">버튼 열기/닫기</span>
                        </button>

                        <div class="tools_layer">
                          <button type="button" class="btnIcon_h40Modify">
                            <span class="txt_s16cDGray">수정</span>
                          </button>
                          <button type="button" class="btnIcon_h40Delete">
                            <span class="txt_s16cDGray">삭제</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="bottom_btn_w">
                  <button type="button" class="btnIcon_fold">
                    <span class="txt_s14cLGray">답글접기</span>
                  </button>
                </div>
                <div class="reply_write_w">
                  <div class="inp_txtArea_reply">
                    <textarea cols="" rows="" class="s16cDGray" placeholder="댓글을 입력해 주세요."></textarea>
                  </div>
                  <button type="button" class="btn_gray_reply">
                    <span class="txt_s18cWhite">등록</span>
                  </button>
                </div>
              </div>
              <!--// 댓글 의 댓글 -->

            </li>
          </ul>

        </div>
        <!--// 댓글 -->
      </div>


    </div>

  </section>

</div>
