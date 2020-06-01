<script context="module">
  export async function preload({path, param, query}) {
    const api = '//localhost:4004'
    const act = path.substring(path.lastIndexOf('/') + 1)

    const res = await this.fetch(`${api}/${act}`)
    const data = await res.json()

    return { act, data };
  }
</script>

<script>
  export let act, data;

  console.log(act, data);

  import LivenStorage from '../../store/liven-store'
  import LivenStorageDebugger from '../../components/LivenStorageDebugger'

  const key1 = LivenStorage.get('key1')
  const key2 = LivenStorage.get('key2')

  console.log(LivenStorage.keys())

</script>

<svelte:head>
  <title>Live.N Quiz</title>
</svelte:head>

<h1>new Tutor : Quiz</h1>

<div>
  key1: {JSON.stringify($key1)}
</div>

<div>
  key2: {JSON.stringify($key2)}
</div>

<LivenStorageDebugger/>
