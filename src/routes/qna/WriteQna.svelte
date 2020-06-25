<script>
  export let item = {}, mode = 'write'

  import {createEventDispatcher} from 'svelte'
  import {goto, stores} from '@sapper/app'
  import QnaService from '../../service/qna-service'
  const {session} = stores()
  const dispatch = createEventDispatcher()

  let contents = ''
  let imagefile = {realfile: '', savefile: ''} // 첨부파일 정보
  let imageSrc // 첨부 이미지 local 경로 (업로드 전 미리보기용)
  let uploadProgress = 0 // 첨부 이미지 업로드 진척율
  let uploading = false // 업로드 중??
  const placeholder = `내용을 입력해주세요. Markdown 형식을 지원합니다`

  let onCancel = toList // [취소하기]btn
  let onSave = write // [저장하기]btn

  ////////// edit mode init //////////////
  if (mode === 'edit') {
    contents = item.contents

    onSave = update
    onCancel = () => dispatch('cancelEdit')
  }

  // 목록으로 이동
  function toList() {
    goto('qna')
  }

  // [저장하기]btn > 신규등록
  async function write() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const {subjCd, subjSeq} = $session.course
    const {realfile, savefile} = imagefile
    const userId = $session.userId

    // TODO blackpet: 파일첨부 구현!!
    const data = {
      subjCd, subjSeq, userId, contents, realfile, savefile
    }
    console.log(data)
    await QnaService.writeQna(data)
    toList()
  }

  // [저장하기]btn > 수정
  async function update() {
    // validation
    if (contents.length === 0) {
      alert('내용을 입력해 주세요')
      return;
    }

    const {seq} = item
    const userId = $session.userId
    const {realfile, savefile} = imagefile

    // TODO blackpet: 파일첨부 구현!!
    const data = {
      seq, contents, userId, type: 'Q', realfile, savefile
    }
    const res = await QnaService.updateQna(data)

    // 부모에 갱신하자!
    item.contents = contents
    // 첨부파일이 있으면 갱신하자!
    if (imageSrc.length > 0) {
      item.realfile = imagefile.realfile;
      item.savefile = imagefile.savefile
    }
    dispatch('update', {item})
  }

  async function attachImage({target}) {
    const files = target.files ? [...target.files] : [];
    const image = files[0]

    uploading = true
    uploadProgress = 0
    imageSrc = ''

    // upload image
    function progress(p) {
      console.log('progress', p.loaded, p.total, p)
      uploadProgress = p.loaded / p.total
    }
    const upload = QnaService.uploadImage(image, progress)

    const preview = new Promise(resolve => {
      // render preview
      const reader = new FileReader()
      reader.onload = (e) => {
        imageSrc = e.target.result

        resolve()
      }
      reader.readAsDataURL(image)
    })
    const [res] = await Promise.all([upload, preview])
    imagefile = res.data // 첨부파일 정보를 저장하자!
    console.log('promise all', res.data)

    // upload completed & preview image!!
    uploadProgress = 1
    uploading = false
  }
</script>

<style>
  .items_btn_double > .item_list {padding: 0 0 0 5px;width: 50%;}
  .items_btn_double li span {letter-spacing: 0;}

  .liveQnA_addSet .btn_lineGrayh40_file {top: unset;}
  .preview-image {width: 150px;}

  .liveQnA_addSet span[class^="txt_"] {letter-spacing: normal;}

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 150px;
    height: 20px;
    border-radius: 7px;
    color: #489753;
  }
  progress::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 8px;
  }
  progress::-webkit-progress-value {
    background-color: #489753;
    border-radius: 8px;
  }
  progress::-moz-progress-bar {
    background-color: #eee;
    border-radius: 8px;
  }
</style>

<div class="container">

    <div class="contBox_NLive">

      <div class="cb_inner">
        <div class="inp_txtArea_live">
          <textarea bind:value={contents} placeholder="{placeholder}"></textarea>
        </div>

        <div class="liveQnA_addSet">
          <ul class="file_lists_w">
            <li class="af_list">
              <span class="linkIcon_file">
                {#if imageSrc && uploadProgress === 1}
                  <img class="preview-image" src="{imageSrc}" alt="미리보기">
                {:else}
                  {#if uploading}
                    <span class="txt_s16cDGray">사진을 업로드 중입니다....</span>
                <progress value="{uploadProgress}" />
                  {:else}
                    <span class="txt_s16cDGray">사진을 첨부해 주세요</span>
                  {/if}
                {/if}
              </span>
            </li>
          </ul>

          <label class="btn_lineGrayh40_file">
            <input type="file" accept="image/gif, image/jpeg, image/png" on:input={attachImage}>
            <span class="txt_s16">파일선택</span>
          </label>
        </div>


        <footer class="pop_footer">
          <ul class="items_btn_double">
            <li class="item_list">
              <button type="button" class="btn_grayLineh50" on:click={onCancel}>
                <span class="txt_s16">취소하기</span>
              </button>
            </li>
            <li class="item_list">
              <button type="button" class="btn_brownh50" on:click={onSave}>
                <span class="txt_s16">저장하기</span>
              </button>
            </li>
          </ul>
        </footer>

      </div>
    </div>
</div>
