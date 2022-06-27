<template>
  <div class="hero-container">
    <div class="hero-title-block">
      <h1 class="hero-title">A new level of anime listings</h1>
      <p class="hero-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id
        metus quis dui mollis efficitur. Pellentesque in lectus nec lacus
        condimentum mollis et sed nisl. Curabitur viverra blandit ante, nec
        tristique arcu. Sed sollicitudin nunc quis euismod mollis.
      </p>
      <router-link to="/my-anime-list">
        <button class="hero-btn">Create a list</button>
      </router-link>
    </div>
    <div class="hero-img-block">
      <img
        class="hero-img"
        src="../assets/images/anime-head.png"
        alt="Anime Girl"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hero-container {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  margin-top: -80px;
}
.hero-title-block {
  max-width: 600px;
}
.hero-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--c-white);
}
.hero-description {
  font-size: 18px;
  font-weight: 500;
}
.hero-btn {
  color: var(--c-white);
  background-color: var(--c-btn-red);
  margin-top: 40px;
  padding: 12px 50px;
  border-radius: 20px;
  transition: 0.3s ease;
}
.hero-btn:hover {
  background-color: var(--c-btn-red-hover);
  box-shadow: 0 0 20px var(--c-btn-red);
  transition: 0.3s ease;
}
.hero-img {
  width: 95%;
  position: relative;
  bottom: -65px;
  pointer-events: none;
}
</style>
