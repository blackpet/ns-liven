<script>
  export let message = '강사의 요청을 기다려 주세요.', label = '대기중'

</script>


<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">

        <span class="txt_s18cDGray_ready">{@html message}</span>
        <div class="nl_loading_w">
          <div class="nl_progress">
            <span class="txt_s18cWhite">{label}</span>
          </div>
          <i class="nlp_circle_01"></i>
          <i class="nlp_circle_02"></i>
        </div>
      </div>
    </div>

  </section>

</div>
