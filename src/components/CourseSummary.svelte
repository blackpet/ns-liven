<script>
  import {stores} from '@sapper/app'

  const {session} = stores()
  const course = $session.course
</script>


<div class="liveTop_box">
  <span class="txtLabel_h22_s12Red">{course.type}</span>
  <strong class="tit_s20cWhiteFB">{course.title}</strong>
  <p class="ltb_info">
    <span class="txt_s16cWhite">신청 {course.stdCnt} 명</span>
    <span class="txt_s16cWhite">{course.startDt} ~ {course.endDt}</span>
  </p>
</div>
