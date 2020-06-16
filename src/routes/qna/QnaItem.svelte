<script>
  export let item

  import {lazy} from '../../util/lazy-loading'

  const starRating = Math.round(item.star * 10 / 5) * 5
</script>


<li class="list_comment reply"><!-- 댓글 있을 때 reply 추가 -->
  <div class="profile_img_w">
    <i class="user_pic_comment">
      <img src="http://placehold.it/640x360" alt="임시이미지">
    </i>
  </div>
  <div class="item_userInfo">
    <span class="txt_s16cDGray">{item.nickname}</span>
    <span class="txt_s14cLGray">{item.date}</span>
    <div class="formGroup_rdStar st{starRating}">
      <span class="inp_radio_starLeft"><i class="icon_star_left"></i></span>
      <span class="inp_radio_starRight"><i class="icon_star_right"></i></span>

      <span class="inp_radio_starLeft"><i class="icon_star_left"></i></span>
      <span class="inp_radio_starRight"><i class="icon_star_right"></i></span>

      <span class="inp_radio_starLeft"><i class="icon_star_left"></i></span>
      <span class="inp_radio_starRight"><i class="icon_star_right"></i></span>

      <span class="inp_radio_starLeft"><i class="icon_star_left"></i></span>
      <span class="inp_radio_starRight"><i class="icon_star_right"></i></span>

      <span class="inp_radio_starLeft"><i class="icon_star_left"></i></span>
      <span class="inp_radio_starRight"><i class="icon_star_right"></i></span>

      <span class="txt_s16cDGray">{item.star}</span>

    </div>
  </div>
  <div class="item_cont">
    <a href="#none" class="thumb_img">
      <img src="" alt="" use:lazy={{src: item.imageSrc}}>
    </a>
    <a class="txt_s16cGray">{@html item.content}</a>
  </div>

  <div class="formGroup_chk">
    <label class="inp_chk_likeHand">
      <input type="checkbox">
      <i class="icon_chk"></i>
      <span class="txt_s14cLGray">{item.like}</span>
    </label>
    <label class="inp_chk_reply">
      <input type="checkbox">
      <i class="icon_chk"></i>
      <span class="txt_s14cLGray">{item.reply}</span>
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
