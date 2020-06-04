
<script>
  import {stores} from '@sapper/app'

  import Standby from '../../components/Standby'

  const standbyMessage = {
    message: '강사의 요청을 기다려 주세요.',
    label: '대기중'
  }

  const {session} = stores()
  let socket;

</script>

<Standby {...standbyMessage} />
