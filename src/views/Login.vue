<template>
  <div class="form-wrap">
    <form action="login">
      <p class="login-register">
        Don't have ana account?
        <router-link class="router-link" :to="{name: 'Register'}"></router-link>
      </p>
      <h2>Login to Pied Doodle</h2>
      
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
}
</script>
<style lang="scss">
  
</style>