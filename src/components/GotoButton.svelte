<script>
  export let isSubpage = false

  import {goList} from '../service/liven-service'
  import {stores} from '@sapper/app'
  const {session} = stores()

  function gotoList() {
    // history.back()
    goList($session.role)
  }
</script>


<style>
  .floating-navigation {
    position: fixed;
    bottom: 40px;
    left: 20px;
    display: none;
  }
  .floating-navigation.show {
    display: block;
  }

  .home-btn {
    background-color: rgba(44, 217, 197, 0.5);
    color: rgba(18, 18, 18, 0.7);
    border-radius: 50%;
    display: block;
    width: 50px;
    height: 50px;
  }

</style>

{#if isSubpage}
<div class="floating-navigation" class:show={isSubpage}>
  <button class="home-btn" on:click={gotoList}>
    Main
  </button>
</div>
{/if}

