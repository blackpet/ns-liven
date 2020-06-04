<script>
  import {stores} from '@sapper/app'
  const {session} = stores()

  const course = $session.course


  const acts = [
    {name: 'Live Quiz', act: 'quiz', id: 1},
    {name: 'Live Poll', act: 'poll', id: 2},
    {name: 'Live Q&A', act: 'qna'},
    {name: 'Live Share', act: 'share'},
    {name: 'Survey', act: 'survey', id: 1},
  ];

</script>


<div class="container">
  <section class="content">
    <div class="liveTop_box">
      <span class="txtLabel_h22_s12Red">{course.type}</span>
      <strong class="tit_s20cWhiteFB">{course.title}</strong>
      <p class="ltb_info">
        <span class="txt_s16cWhite">신청 {course.cnt} 명</span>
        <span class="txt_s16cWhite">{course.start} ~ {course.end}</span>
      </p>
    </div>
    <div class="contBox_NLive">

      <div class="cb_inner">

        <ul class="live_lists_w">
          {#each acts as {id, name, act}}
          <li class="live_list">
            <a href="{$session.role}/{act}?id={id}" class="link_live_{act}">
              <span class="txt_s24cDGray">{name}</span>
            </a>
          </li>
          {/each}
        </ul>
      </div>
    </div>

  </section>

</div>
