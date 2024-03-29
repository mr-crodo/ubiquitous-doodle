<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span> {{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview Photo</button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import BlogCoverPreview from "../components/BlogCoverPreview";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "CreatePost",
  components: {Loading, BlogCoverPreview},
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        }
      }
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    openPreview() {
      this.$store.commit("openPhotoPreview")
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on("state_changed", (snapshot) => {
        console.log(snapshot)
      },
  (err) => {
        console.log(err)
      },
async () => {
        const downloadURL = await docRef.getDownloadURL();
        Editor.insertEmbed(cursorLocation, "image", downloadURL);
        resetUploader();
        });
    },
    uploadBlog() {
      if(this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if(this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`document/BlogCoverPhoto/${this.$store.state.blogPhotoName}`);
          docRef.put(this.file).on(
          "state_changed",
          (snapshot) => {
              console.log(snapshot)
          },
    (err) => {
            console.log(err);
            this.loading = false;
          }, async () => {
                        const downloadURL = await  docRef.getDownloadURL();
                        const timestamp = await Date.now();
                        const dataBase = await db.collection("blogPosts").doc();

                        await dataBase.set({
                          blogID: dataBase.id,
                          blogHTML: this.blogHTML,
                          blogCoverPhoto: downloadURL,
                          blogCoverPhotoName: this.blogCoverPhotoName,
                          blogTitle: this.blogTitle,
                          profileId: this.profileId,
                          date: timestamp,
                        });
                        await this.$store.dispatch("getPost");
                        this.loading = false;
                        this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id} });
                        this.blogTitle = '';
                        this.blogHTML = '';
                        this.$store.state.blogPhotoName = '';
                        this.$store.state.blogPhotoFileURL = '';
                      }
          );
          return;
        }
        this.error = true;
        this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!"
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!"
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    }
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName(){
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload)
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload)
      }
    }
  }

}
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
    @media screen and (max-width: 800px) {
      flex-basis: 100%;
      text-align: center;
      margin-right: 10px;
      margin-left: 10px;
    }

  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  label {
    @media screen and (max-width: 800px) {
      flex-basis: 100%;
      text-align: center;
      margin: 10px;
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      max-width: 300px;
      width: 100%;
    }
    @media screen and (max-width: 800px) {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      @media screen and (max-width: 800px) {
        margin-bottom: 10px;
      }
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      @media screen and (max-width: 800px) {
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-left: 0!important;
      }
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
        @media screen and (max-width: 800px) {
          flex-basis: 100%;
          margin: 10px!important;
        }
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
        @media screen and (max-width: 800px) {
          flex-basis: 100%;
          margin: 10px;
        }
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    @media screen and (max-width: 800px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    button {
      margin-right: 16px;
      @media screen and (max-width: 800px) {
        flex-basis: 100%;
        margin: 0 10px 0 10px !important;
        text-align: center;
      }
    }
  }
}
</style>