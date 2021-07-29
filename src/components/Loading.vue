<template>
  <div class="loading pl1">
    <!-- <span></span> -->
    <div class="pl1__a"></div>
    <div class="pl1__b"></div>
    <div class="pl1__c"></div>
  </div>
</template>
<script>
export default {
  name: "loading"
}
</script>
<style lang="scss" scoped>



  .loading {
    top: 0;
    z-index: 101;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes spin {
      to {
        transform: rotateZ(360deg);
      }
    }

    span {
      display: block;
      width: 60px;
      height: 60px;
      margin: 0 auto;
      border: 1px solid transparent;
      border-top-color: #fff;
      border-bottom-color: #fff;
      border-radius: 50%;
      animation: spin ease 1000ms infinite;
    }

      .pl1__a, .pl1__b, .pl1__c {
    border-radius: 50%;
		width: 1.2em;
		height: 1.2em;
		transform-origin: 50% 100%;
    margin: 8px;
  }

  .pl1__a, .pl1__b, .pl1__c {
    animation: bounce1 1000ms linear infinite;
  }

.pl1 {

	&__a {
    background: #{hsl(3,90%,55%)};
  }
	&__b {
    background: #{hsl(33,90%,55%)};
    animation-delay: 0.1s;
  }

	&__c {
    background: #{hsl(223,90%,55%)};
		animation-delay: 0.2s;
  }
}

@keyframes bounce1 {
  from{
    transform: translateY(0) scale(1,1);
		animation-timing-function: ease-in;
    }
  to {
    transform: translateY(0) scale(1,1);
    animation-timing-function: ease-in;
    }
	45% {
		transform: translateY(5em) scale(1,1);
		animation-timing-function: linear;
  }

	50% {
  transform: translateY(5em) scale(1.5,0.5);
		animation-timing-function: linear;
  }
	55% {
		transform: translateY(5em) scale(1,1);
		animation-timing-function: ease-out;
  }
}
  }
</style>