<script>
  export let isSubpage = false

  import {goList} from '../service/liven-service'
  import {stores} from '@sapper/app'
  const {session} = stores()

</script>


<style>
  .floating-navigation {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: none;
  }
  .floating-navigation.show {
    display: block;
  }

  .home-btn {
    background-color: #2cd9c5;
    border-radius: 50%;
    display: block;
    width: 50px;
    height: 50px;
  }
</style>

{#if isSubpage}
<div class="floating-navigation" class:show={isSubpage}>
  <button class="home-btn" on:click={() => goList($session.role)}>
    Main
  </button>
</div>
{/if}

