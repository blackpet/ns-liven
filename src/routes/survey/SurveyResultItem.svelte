<script>
  export let data

  import {stores} from '@sapper/app'

  const {session} = stores()
  const course = $session.course

  // total attendee user count
  let resUserTotal = 1
  $: resUserTotal = !!data && !!data.items ? data.items.reduce((sum, i) => sum + i.vote, 0) : 1

  function percent(item) {
    return Math.round(item.vote / resUserTotal * 100)
  }

</script>

<div class="question_w">
  <span class="icon_qRed">
      <span class="txt_s30cWhiteFB">Q</span>
  </span>
  <span class="txt_s18cDGrayFB">{@html data.subject}</span>
</div>

<ul class="lists_wrap_result">

  {#if data && data.items && data.items.length}
    {#each data.items as item, i (item.id)}
      <li class="list_result">
        <span class="txt_s18cDGray">{i+1}. {@html item.subject}</span>
        <div class="grap_x_red">
          <span class="gWrap">
              <i class="gBar" style="width:{percent(item)}%;"></i>
          </span>
          <span class="txt_s16cDGray"><b class="cRed">{item.vote}</b> 명</span>
        </div>
      </li>
    {/each}
  {/if}

</ul>

<style>
  .question_w {margin-top: 20px;}
</style>
