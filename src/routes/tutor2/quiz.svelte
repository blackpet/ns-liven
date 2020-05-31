<script>
  import {quiz} from '../../store/liven-data.js'
  import Storage from '../../liven-store'
  import LivenStorage from '../../components/LivenStorage'

  const key1 = Storage.get('key1')
  const key2 = Storage.get('key2')

  console.log(Storage.keys())

</script>

<svelte:head>
  <title>Live.N Quiz</title>
</svelte:head>

<h1>new Tutor : Quiz</h1>

<div>
  {JSON.stringify($quiz)}
</div>

<div>
  key1: {JSON.stringify($key1)}
</div>

<div>
  key2: {JSON.stringify($key2)}
</div>

<LivenStorage />
