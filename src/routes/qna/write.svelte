<script>
  import {goto, stores} from '@sapper/app'
  import QnaService from '../../service/qna-service'
  const {session} = stores()

  let contents = ''
  const placeholder =
          `내용을 입력해주세요
Markdown 형식을 지원합니다`

  // 목록으로 이동
  function toList() {
    goto('qna')
  }

  // [등록하기]btn
  async function write() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const {subjCd, subjSeq} = $session.course;
    const userId = $session.userId

    // TODO blackpet: 파일첨부 구현!!
    const data = {
      subjCd, subjSeq, userId, contents
    }
    await QnaService.writeQna(data)
    toList()
  }
</script>

<style>
  .liveQnA_addSet .btn_lineGrayh40_file {
    top: unset;
  }
</style>

<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">
        <div class="inp_txtArea_live">
          <textarea bind:value={contents} placeholder="{placeholder}"></textarea>
        </div>

        <div class="liveQnA_addSet">
          <ul class="file_lists_w">
            <li class="af_list">
              <a href="#none" class="linkIcon_file">
                <span class="txt_s16cDGray">첨부파일명,pdf</span>
              </a>
              <button type="button" class="btnIcon_delete_gray">
                <span class="ir">삭제</span>
              </button>
            </li>
          </ul>

          <label class="btn_lineGrayh40_file">
            <input type="file">
            <span class="txt_s16">파일선택</span>
          </label>
        </div>


        <footer class="pop_footer">
          <ul class="items_btn_double">
            <li class="item_list">
              <button type="button" class="btn_grayLineh50" on:click={toList}>
                <span class="txt_s16">취소하기</span>
              </button>
            </li>
            <li class="item_list">
              <button type="button" class="btn_brownh50" on:click={write}>
                <span class="txt_s16">등록하기</span>
              </button>
            </li>
          </ul>
        </footer>

      </div>
    </div>
  </section>
</div>
