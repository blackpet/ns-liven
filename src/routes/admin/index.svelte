<script>
  import io from 'socket.io-client'

  const socket = io('/?userId=admin')
  let serverStorage;

  // request ServerStorage
  socket.emit('admin:server-storage')
  socket.on('admin:server-storage', (ss) => {
    console.log(ss);
    serverStorage = ss
  });
</script>

<h1>Live.N Management Console</h1>

{#if !serverStorage}
  <div>Loading...</div>
{:else}
  <textarea>{JSON.stringify(serverStorage, null, 4)}</textarea>
{/if}


<style>
  textarea {
    width: 90vw;
    height: 80vh;
  }
</style>
