<template>

  <youtube
    :video-id="activeTask.data.url"
    player-width="100%"
    :player-vars="{ autoplay: 0 }"
    @ended=""
  />

</template>

<script>
  import BaseTask from './BaseTask';

  export default {
    extends: BaseTask
  };
</script>

<style scoped>
</style>
