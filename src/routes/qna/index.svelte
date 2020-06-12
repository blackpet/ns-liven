<script>
  import Subject from '../../components/Subject.svelte'

</script>


<div class="container">
  <section class="content">

    <Subject />

    <div class="contBox_NLive">

      <div class="cb_inner">

        <div class="items_btn_single">
          <button type="button" class="btn_lineBrownh50">
            <span class="txt_s16">질문하기</span>
          </button>
        </div>

        <div class="inp_select_underline_live">
          <select class="h50s16cDGray">
            <option>최신순</option>
            <option>공감순</option>
          </select>
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
              <div class="formGroup_rdStar st45">
                                            <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="txt_s16cDGray">4.5</span>

              </div>
            </div>
            <div class="item_cont">
              <a href="#none" class="thumb_img">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </a>
              <a class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</a>
            </div>

            <div class="formGroup_chk">
              <label class="inp_chk_likeHand">
                <input type="checkbox">
                <i class="icon_chk"></i>
                <span class="txt_s14cLGray">999</span>
              </label>
              <label class="inp_chk_reply">
                <input type="checkbox" >
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
          <li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->
            <div class="profile_img_w">
              <i class="user_pic_comment">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </i>
            </div>
            <div class="item_userInfo">
              <span class="txt_s16cDGray">앵그리너구리RtA</span>
              <span class="txt_s14cLGray">2020-00-00 00:00</span>
              <div class="formGroup_rdStar st45">
                                            <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="txt_s16cDGray">4.5</span>

              </div>
            </div>
            <div class="item_cont">
              <a href="#none" class="thumb_img">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </a>
              <a class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</a>
            </div>

            <div class="formGroup_chk">
              <label class="inp_chk_likeHand">
                <input type="checkbox">
                <i class="icon_chk"></i>
                <span class="txt_s14cLGray">999</span>
              </label>
              <label class="inp_chk_reply">
                <input type="checkbox" >
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
          <li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->
            <div class="profile_img_w">
              <i class="user_pic_comment">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </i>
            </div>
            <div class="item_userInfo">
              <span class="txt_s16cDGray">앵그리너구리RtA</span>
              <span class="txt_s14cLGray">2020-00-00 00:00</span>
              <div class="formGroup_rdStar st45">
                                            <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="txt_s16cDGray">4.5</span>

              </div>
            </div>
            <div class="item_cont">
              <a href="#none" class="thumb_img">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </a>
              <a class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</a>
            </div>

            <div class="formGroup_chk">
              <label class="inp_chk_likeHand">
                <input type="checkbox">
                <i class="icon_chk"></i>
                <span class="txt_s14cLGray">999</span>
              </label>
              <label class="inp_chk_reply">
                <input type="checkbox" >
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
          <li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->
            <div class="profile_img_w">
              <i class="user_pic_comment">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </i>
            </div>
            <div class="item_userInfo">
              <span class="txt_s16cDGray">앵그리너구리RtA</span>
              <span class="txt_s14cLGray">2020-00-00 00:00</span>
              <div class="formGroup_rdStar st45">
                                            <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="inp_radio_starLeft">
                                                <i class="icon_star_left"></i>
                                            </span>
                <span class="inp_radio_starRight">
                                                <i class="icon_star_right"></i>
                                            </span>

                <span class="txt_s16cDGray">4.5</span>

              </div>
            </div>
            <div class="item_cont">
              <a href="#none" class="thumb_img">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </a>
              <a class="txt_s16cGray">기대했던 것 보다 훨씬 좋았던 강의! 기초 개념을 잘 잡아줍니다. 이 강의는 다양한 실제 사례를 예시로 들어주어 업무에 큰 도움이 될 것 같아요.</a>
            </div>

            <div class="formGroup_chk">
              <label class="inp_chk_likeHand">
                <input type="checkbox">
                <i class="icon_chk"></i>
                <span class="txt_s14cLGray">999</span>
              </label>
              <label class="inp_chk_reply">
                <input type="checkbox" >
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

        <div class="paging_w">
          <buttoh type="button" class="btnIcon_pg_first">
            <span class="ir">처음</span>
          </buttoh>
          <buttoh type="button" class="btnIcon_pg_prev">
            <span class="ir">처음</span>
          </buttoh>
          <div class="page_number">
            <a href="#none" class="link_s16 active">1</a>
            <a href="#none" class="link_s16">2</a>
            <a href="#none" class="link_s16">3</a>
            <a href="#none" class="link_s16">4</a>
            <a href="#none" class="link_s16">5</a>
          </div>
          <buttoh type="button" class="btnIcon_pg_next">
            <span class="ir">처음</span>
          </buttoh>
          <buttoh type="button" class="btnIcon_pg_last">
            <span class="ir">처음</span>
          </buttoh>
        </div>
      </div>

      <button type="button" class="btnIcon_write">
        <span class="ir">질문등록</span>
      </button>
    </div>



  </section>
</div>
