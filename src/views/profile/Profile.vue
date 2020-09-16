<template>
  <div class="profile">
    <nav-bar class="profile-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <login />
    <money/>
    <profile-list></profile-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Login from './childComps/Login'
import Money from './childComps/Money'
import ProfileList from './childComps/ProfileList'
export default {
  name: "Profile",
  components:{
    NavBar,
    Login,
    Money,
    ProfileList
  }
}
</script>

<style scoped>
.profile-nav {
  background-color: rgb(255, 105, 150);
  color: #fff;
}
</style>
