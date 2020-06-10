<script context="module">
  import {env} from '../../env'

  export async function preload({params}) {
    // TODO blackpet: 실 DB 에서 조회할 것!
    let data

    const res = await this.fetch(`${env.api}/share/${params.id}`)
    if (res.ok) {
      data = await res.json();
    } else {
      throw new Error('cannot retrieve share slide')
    }

    return {data}
  }
</script>

<script>
  export let data

  import {onMount} from 'svelte'
  import {stores} from '@sapper/app'
  import Glide from '@glidejs/glide'
  import {EVENT, ROLE} from '../../service/liven-service'
  import {LivenSocket} from '../../store/action'

  const {session} = stores()
  const socket = LivenSocket.get()

  let autoPlay = true // (강사의 제어에) 자동재생
  $: page = 1
  let glide
  onMount(() => {
    glide = new Glide('.glide')

    // handle event
    glide.on('run', () => {
      page = glide.index + 1
      // navigate slider by tutor
      if ($session.role === ROLE.TUTOR) {
        socket.emit(EVENT.TUTOR_NAVIGATE_SHARE, {shareId: data.id, index: glide.index})
      }
      console.log(glide.index);
    });
    glide.mount()
  });

  if ($session.role === ROLE.STUDENT) {
    // [student] listen on navigate slide by tutor
    socket.on(EVENT.TUTOR_NAVIGATE_SHARE, res => {
      // 같은 자료실에 들어와 있고 && [자동모드] 인 경우에만 navigation 하자!
      if (data.id == res.shareId && autoPlay) {
        glide.go(`=${res.index}`);
      }
    });
  }


</script>

<!--#############################################-->

<div class="container">
  <section class="content contBox_NLive_share">
    <div class="thumbSlider_cardView">
      <div class="pop_wrap_cards">
        <i class="dim"></i>

        <div class="glide">
          <div class="ts_wrap" data-glide-el="track">
            <ul id="liveSlider" class="slider_lists_card">

              {#each data.slides as slide}
                <li class="sld_list">
                  <img src="{slide.img}" alt="">
                </li>
              {/each}

            </ul>
          </div>


          <div class="slide_btn_counter" data-glide-el="controls">
            <button type="button" class="btnIcon_slide_prev" data-glide-dir="<">
              <span class="ir">이전</span>
            </button>
            <div class="count_w">
              <span class="txt_s14cWhite_count">{page}</span>
              <span class="txt_s14cWhite_total">{data.slides.length}</span>
            </div>
            <button type="button" class="btnIcon_slide_next" data-glide-dir=">">
              <span class="ir">다음</span>
            </button>

            {#if $session.role === ROLE.STUDENT}
            <button type="button" class="btnIcon_autoPlay" class:pause={autoPlay} on:click={() => autoPlay = !autoPlay}>
              <span class="ir">자동 플레이</span>
            </button>
            {/if}
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

  .contBox_NLive_share .dim {
    z-index: unset;
  }
</style>
