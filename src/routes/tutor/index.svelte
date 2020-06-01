<script context="module">
  export function preload({query}, session) {
    // TODO blackpet: set {namespace, userId} to session
    session.ns = !!query.ns ? query.ns : 'ON1234';
    session.userId = !!query.userId ? query.userId : 'tutor01';
  }
</script>

<script>
  import LivenStorage from '../../store/liven-store'

  import {stores} from '@sapper/app'
  const {session} = stores()


  LivenStorage.put('key1', {k: 'key1', v: 'val1'})
  LivenStorage.put('key2', {k: 'key2', v: 'val2'})

  const key1 = LivenStorage.get('key1')
  const key2 = LivenStorage.get('key2')

  const acts = [
    {name: 'Quiz', act: 'quiz', id: 1},
    {name: 'Poll', act: 'poll', id: 2},
    {name: 'Survey', act: 'survey', id: 1},
    {name: 'Q&A', act: 'qna'},
    {name: 'Live Share', act: 'share'}
  ];

</script>

<svelte:head>
  <title>Live.N Tutor</title>
</svelte:head>

<h1>new Tutor</h1>

<h2>[TEST] subjCd=ON1234 과정</h2>

<ul>
  {#each acts as {id, name, act}}
    <li><a href="tutor/{act}?id={id}">{name}</a></li>
  {/each}
</ul>


<div>
  key1: {JSON.stringify($key1)}
</div>

<div>
  key2: {JSON.stringify($key2)}
</div>
