<script>
  import Storage from '../liven-store'
  const key1 = Storage.get('key1')
  const key2 = Storage.get('key2')

  function updateKey1() {
    key1.update(k => k = {up:123, upp:455})
  }
</script>

<h2>Live.N Storage Debugger</h2>
<div>
  key1: {JSON.stringify($key1)}
  <button on:click={updateKey1}>update $key1</button>
</div>
<div>
  key2: {JSON.stringify($key2)}
</div>
