<script>
  import LivenStorage from '../store/liven-store'
  const key1 = LivenStorage.get('key1')
  const key2 = LivenStorage.get('key2')

  function updateKey1() {
    key1.update(k => k = {up:123, upp:455})
  }

</script>


<hr>
<h2>Live.N Storage Debugger</h2>

<div>
  key1: {JSON.stringify($key1)}
  <button on:click={updateKey1}>update $key1</button>
</div>
<div>
  key2: {JSON.stringify($key2)}
</div>
