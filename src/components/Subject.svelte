<script>
  import {stores} from '@sapper/app'
  import moment from 'moment'

  const {session} = stores()
  // let course
  // $: {
  //   course = $session.course
  //   console.log('Subject.svelte', course)
  // }


</script>


<div class="liveTop_box">
  <span class="txtLabel_h22_s12Red">{$session.course.type}</span>
  <strong class="tit_s20cWhiteFB">{$session.course.title}</strong>
  <p class="ltb_info">
    <span class="txt_s16cWhite">신청 {$session.course.cnt} 명</span>
    <span class="txt_s16cWhite">{$session.course.start} ~ {$session.course.end}</span>
  </p>
</div>
