<script>
  export let reply
</script>


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
  <span class="txt_s16cGray"><pre>{reply.contents}</pre></span>
</div>

<div class="formGroup_chk">
  <label class="inp_chk_likeHand">
    <input type="checkbox">
    <i class="icon_chk"></i>
    <span class="txt_s14cLGray">{reply.likeCnt}</span>
  </label>

  <!-- 댓글의 답글은 더이상 답글이 없다! -->
  {#if reply.depth === 1}
  <label class="inp_chk_reply">
    <input type="checkbox" checked>
    <i class="icon_chk"></i>
    <span class="txt_s14cLGray">{reply.replyCnt}</span>
  </label>
  {/if}

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
