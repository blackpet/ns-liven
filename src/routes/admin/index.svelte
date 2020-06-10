<script>
  import io from 'socket.io-client'
  import {stores} from '@sapper/app'

  const {session} = stores()

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

<h2>session</h2>

<pre>{JSON.stringify($session, null, 4)}</pre>

<h2>serverStorage</h2>
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
