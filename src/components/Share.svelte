<script context="module">


</script>

<script>
  import {onMount} from 'svelte'
  import Glide from '@glidejs/glide'
  import IconButton, {Icon} from '@smui/icon-button'

  onMount(() => {
    new Glide('.glide').mount()
  });
</script>

<!--#############################################-->

<div class="container">
  <section class="content">
    <div class="contBox_NLive_share">
      <div class="pop_wrap_cards">
        <i class="dim"></i>

        <IconButton class="material-icons" on:click={close}>close</IconButton>

        <div class="glide">
          <div class="ts_wrap" data-glide-el="track">
            <ul id="liveSlider" class="slider_lists_card">
              <li class="sld_list">
                <img src="http://placehold.it/1024x580" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/640x360" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/360x640" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/640x640" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/1024x768" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/768x1024" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/1024x1024" alt="임시이미지">
              </li>
              <li class="sld_list">
                <img src="http://placehold.it/1024x1440" alt="임시이미지">
              </li>
            </ul>
          </div>


          <div class="slide_btn_counter" data-glide-el="controls">
            <button type="button" class="btnIcon_slide_prev" data-glide-dir="<">
              <span class="ir">이전</span>
            </button>
            <div class="count_w">
              <span class="txt_s14cWhite_count"></span>
              <span class="txt_s14cWhite_total"></span>
            </div>
            <button type="button" class="btnIcon_slide_next" data-glide-dir=">">
              <span class="ir">다음</span>
            </button>
            <button type="button" class="btnIcon_autoPlay">
              <span class="ir">자동 플레이</span>
            </button>
          </div>

          <div class="slide_screen">
            <button type="button" class="btnIcon_screen_full">
              <span class="ir">크게보기</span>
            </button>
            <button type="button" class="btnIcon_screen_win">
              <span class="ir">작게보기</span>
            </button>
          </div>

        </div>

        <button type="button" class="btnIcon_close_white">
          <span class="ir">닫기</span>
        </button>

      </div>
    </div>
  </section>

</div>


<!--#############################################-->

<style>
  .sld_list {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sld_list img {
    max-width: 100vw;
    max-height: 100vh;
  }
</style>
