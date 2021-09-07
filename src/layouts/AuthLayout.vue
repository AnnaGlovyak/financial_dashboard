<template>
  <div class="auth-layout">
    <Auth class="auth-form"/>
  </div>
</template>

<script>
import Auth from '../pages/Auth.vue'

export default {
    name: 'AuthLayout',
    components: {
        Auth
    }
}
</script>

<style lang="scss" scoped>
.auth-layout {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .auth-form {
        min-width: 700px;
    }
}
</style>