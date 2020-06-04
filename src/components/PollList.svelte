
<script>
  export let data, role

  import {stores} from '@sapper/app'
  import Quiz from './Quiz.svelte'

  const {session} = stores()

</script>


{#each data as poll}
<Quiz data={poll} role="{$session.role}" />
{/each}


