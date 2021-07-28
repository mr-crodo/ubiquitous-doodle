<template>
  <div class="home">
      <BlogPost :post="welcomeScreen" />
      <BlogPost 
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
       />
       <div class="blog-card-wrap">
         <div class="container">
           <h3>View More Recent Blog</h3>
           <div class="blog-cards">
             <BlogCards 
             :post="post"
             v-for="(post, index) in sampleBlogCards"
             :key="index"
              />
           </div>
         </div>
       </div>
       <div class="updates">
         <div class="container">
           <h2>never miss a post. Register for your free account today</h2>
           <router-link class="router-button" to="#">
             Register for Pied Doodle <Arrow class="arrow arrow-light" />
           </router-link>
         </div>
       </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
import BlogCards from "../components/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg"
export default {
  name: "Home",
  components: { BlogPost, BlogCards, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome",
        blogPost: 
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "This is a Filler Title If",
          blogHTML: "This is a Filler blog post title",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a Filler Title Else",
          blogHTML: "This is a Filler blog post title",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
      sampleBlogCards: [
        { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2021"},
        { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2021"},
        { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2021"},
        { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2021"},
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 25px;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
  }
}
</style>