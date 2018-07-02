<template>
  <div class="posts">
    <!-- Navbar -->
    <div class="w3-top">
    <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
      <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>Logo</a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i class="fa fa-envelope"></i></a>
      <div class="w3-dropdown-hover w3-hide-small">
        <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span class="w3-badge w3-right w3-small w3-green">3</span></button>     
        <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">
          <a href="#" class="w3-bar-item w3-button">One new friend request</a>
          <a href="#" class="w3-bar-item w3-button">John Doe posted on your wall</a>
          <a href="#" class="w3-bar-item w3-button">Jane likes your post</a>
        </div>
      </div>
      <a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
        <img src="../assets/w3images/avatar2.png" class="w3-circle" style="height:23px;width:23px" alt="Avatar">
      </a>
    </div>
    </div>

    <!-- Navbar on small screens -->
    <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
      <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 1</a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 2</a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 3</a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">My Profile</a>
    </div>

    <!-- Page Container -->
    <div class="w3-container w3-content" style="max-width:1400px;margin-top:80px">    
      <!-- The Grid -->
      <div class="w3-row">
        <!-- Left Column -->
        <div class="w3-col m3">
          <!-- Profile -->
          <div class="w3-card w3-round w3-white">
            <div class="w3-container">
            <h4 class="w3-center">My Profile</h4>
            <p class="w3-center"><img src="../assets/w3images/avatar3.png" class="w3-circle" style="height:106px;width:106px" alt="Avatar"></p>
            <hr>
            <p><i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
            <p><i class="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
            <p><i class="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
            </div>
          </div>
          <br>
          
          <!-- Filter Form --> 
          <div class="w3-card w3-round w3-white w3-hide-small">
            <div class="w3-container">
              <p>Filter:</p>
              <div class="w3-left-align">
                Created By:<br/>
                <input @change="toggleCreatedByMe()" type="checkbox" id="createdByMe" v-model="postSearchForm.createdByMe">
                <label for="createdByMe">Me</label>
                <input @change="toggleCreatedByFollowing()" type="checkbox" id="createdByFollowing" v-model="postSearchForm.createdByFollowing">
                <label for="createdByFollowing">Following</label>
                <input @keyup.enter="addSearchTag()" type="text" name="tags" placeholder="TAG" v-model="postSearchForm.tag" class="w3-margin-bottom">
                <span v-for="(tag) in postSearchForm.tags" class="w3-tag w3-medium w3-theme-d5 w3-margin-right w3-margin-bottom"> 
                  {{tag}} &nbsp;<a @click="removeSearchTag(tag)" type="button" class="w3-theme-d5"> X</a>
                </span>
              </div>
            </div>
          </div>
          <br>
          
          <!-- Accordion -->
          <div class="w3-card w3-round">
            <div class="w3-white">
              <button onclick="myFunction('Demo1')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups</button>
              <div id="Demo1" class="w3-hide w3-container">
                <p>Some text..</p>
              </div>
              <button onclick="myFunction('Demo2')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events</button>
              <div id="Demo2" class="w3-hide w3-container">
                <p>Some other text..</p>
              </div>
              <button onclick="myFunction('Demo3')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-users fa-fw w3-margin-right"></i> My Photos</button>
              <div id="Demo3" class="w3-hide w3-container">
            <div class="w3-row-padding">
            <br>
              <div class="w3-half">
                <img src="../assets/w3images/lights.jpg" style="width:100%" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="../assets/w3images/nature.jpg" style="width:100%" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="../assets/w3images/mountains.jpg" style="width:100%" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="../assets/w3images/forest.jpg" style="width:100%" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="../assets/w3images/nature.jpg" style="width:100%" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="../assets/w3images/fjords.jpg" style="width:100%" class="w3-margin-bottom">
              </div>
            </div>
              </div>
            </div>      
          </div>
          <br>
          
          <!-- Interests --> 
          <div class="w3-card w3-round w3-white w3-hide-small">
            <div class="w3-container">
              <p>Interests</p>
              <p>
                <span class="w3-tag w3-small w3-theme-d5">News</span>
                <span class="w3-tag w3-small w3-theme-d4">W3Schools</span>
                <span class="w3-tag w3-small w3-theme-d3">Labels</span>
                <span class="w3-tag w3-small w3-theme-d2">Games</span>
                <span class="w3-tag w3-small w3-theme-d1">Friends</span>
                <span class="w3-tag w3-small w3-theme">Games</span>
                <span class="w3-tag w3-small w3-theme-l1">Friends</span>
                <span class="w3-tag w3-small w3-theme-l2">Food</span>
                <span class="w3-tag w3-small w3-theme-l3">Design</span>
                <span class="w3-tag w3-small w3-theme-l4">Art</span>
                <span class="w3-tag w3-small w3-theme-l5">Photos</span>
              </p>
            </div>
          </div>
          <br>
          
          <!-- Alert Box -->
          <div class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
            <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
              <i class="fa fa-remove"></i>
            </span>
            <p><strong>Hey!</strong></p>
            <p>People are looking at your profile. Find out who.</p>
          </div>
        
        <!-- End Left Column -->
        </div>
        
        <!-- Middle Column -->
        <div class="w3-col m7">
        
          <div class="w3-row-padding">
            <div class="w3-col m12">
              <div class="w3-card w3-round w3-white">
                <div class="w3-container w3-padding">
                  <h6 class="w3-opacity">Social Media template by w3.css</h6>
                  <div class="w3-left-align">
                    <input type="text" name="title" placeholder="TITLE" v-model="postForm.title" class="w3-margin-bottom"><br/>
                    <textarea rows="3" cols="60" placeholder="DESCRIPTION" v-model="postForm.body" class="w3-margin-bottom"></textarea><br/>
                    <input @keyup.enter="addFormTag()" type="text" name="tags" placeholder="TAG" v-model="postForm.tag" class="w3-margin-bottom">
                    <span v-for="(tag) in postForm.tags" class="w3-tag w3-medium w3-theme-d5 w3-margin-right w3-margin-bottom"> 
                      {{tag}} &nbsp;<a @click="removeFormTag(tag)" type="button" class="w3-theme-d5"> X</a>
                    </span>
                  </div>
                  <div>
                    <button @click="addPost" type="button" class="w3-button w3-theme"><i class="fa fa-pencil-alt"></i> Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="w3-container w3-card w3-white w3-round w3-margin" v-for="(post) in posts"><br>
            <img src="../assets/w3images/avatar2.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
            <span class="w3-right w3-opacity">1 min</span>
            <h4>{{post.meta.creator.name}} 
              <button v-if="!post.meta.creator.meta.isFollowed" @click="followUser(post.meta.creator)" type="button" class="w3-button w3-text-theme"><i class="far fa-thumbs-up"></i> Follow ({{post.meta.creator.meta.numFollowers}})</button> 
              <button v-if="post.meta.creator.meta.isFollowed" @click="unfollowUser(post.meta.creator)" type="button" class="w3-button w3-text-theme"><i class="fa fa-thumbs-up"></i> Unfollow ({{post.meta.creator.meta.numFollowers}})</button> 
            </h4><br>
            <hr class="w3-clear">
            <p class="w3-theme-dark">{{post.title}}</p>
            <p class="w3-left-align">{{post.body}}<br/>
              <span v-for="(tag) in post.meta.tags" class="w3-tag w3-medium w3-theme-d5 w3-margin-right">{{tag}}</span>
              <br/>
              <like-button v-bind:post="post" @like="likePost(post)" @unlike="unlikePost(post)" />
<!--
              <button v-if="!post.meta.isLiked" @click="likePost(post)" type="button" class="w3-button w3-text-theme"><i class="far fa-thumbs-up"></i>  Like ({{post.meta.numLikes}})</button> 
              <button v-if="post.meta.isLiked" @click="unlikePost(post)" type="button" class="w3-button w3-text-theme"><i class="fa fa-thumbs-up"></i>  Unlike ({{post.meta.numLikes}})</button> 
-->              
            </p>
            <!--
            <div class="w3-row-padding" style="margin:0 -16px">
              <div class="w3-half">
                <img src="../assets/w3images/lights.jpg" style="width:100%" alt="Northern Lights" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="../assets/w3images/nature.jpg" style="width:100%" alt="Nature" class="w3-margin-bottom">
              </div>
            </div>
            -->
            <hr class="w3-clear">
            <div v-for="(comment) in post.meta.comments" class="w3-card">
              <div class="w3-theme-light">
                <img src="../assets/w3images/avatar3.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:25px">
                <span class="w3-left">{{comment.meta.creator.name}}</span>
                <span>{{comment.title}}</span>
              </div>
              <p class="w3-left-align">
                {{comment.body}}<br/>
                <button v-if="!comment.meta.isLiked" @click="likeComment(comment)" type="button" class="w3-button w3-text-theme"><i class="far fa-thumbs-up"></i>  Like ({{comment.meta.numLikes}})</button> 
                <button v-if="comment.meta.isLiked" @click="unlikeComment(comment)" type="button" class="w3-button w3-text-theme"><i class="fa fa-thumbs-up"></i>  Unlike ({{comment.meta.numLikes}})</button> 
              </p>
            </div>
            <hr class="w3-clear">
            <div>
              <div>
                <input type="text" name="commentTitle" placeholder="TITLE" v-model="post.meta.newTitle">
              </div>
              <div>
                <textarea rows="3" cols="45" placeholder="COMMENT" v-model="post.meta.newBody"></textarea>
              </div>
              <div>
                <button @click="addComment(post)" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button> 
              </div>
            </div>
          </div>
          
        <!-- End Middle Column -->
        </div>
        
        <!-- Right Column -->
        <div class="w3-col m2">
          <div class="w3-card w3-round w3-white w3-center">
            <div class="w3-container">
              <p>Upcoming Events:</p>
              <img src="../assets/w3images/forest.jpg" alt="Forest" style="width:100%;">
              <p><strong>Holiday</strong></p>
              <p>Friday 15:00</p>
              <p><button class="w3-button w3-block w3-theme-l4">Info</button></p>
            </div>
          </div>
          <br>
          
          <div class="w3-card w3-round w3-white w3-center">
            <div class="w3-container">
              <p>Friend Request</p>
              <img src="../assets/w3images/avatar6.png" alt="Avatar" style="width:50%"><br>
              <span>Jane Doe</span>
              <div class="w3-row w3-opacity">
                <div class="w3-half">
                  <button class="w3-button w3-block w3-green w3-section" title="Accept"><i class="fa fa-check"></i></button>
                </div>
                <div class="w3-half">
                  <button class="w3-button w3-block w3-red w3-section" title="Decline"><i class="fa fa-remove"></i></button>
                </div>
              </div>
            </div>
          </div>
          <br>
          
          <div class="w3-card w3-round w3-white w3-padding-16 w3-center">
            <p>ADS</p>
          </div>
          <br>
          
          <div class="w3-card w3-round w3-white w3-padding-32 w3-center">
            <p><i class="fa fa-bug w3-xxlarge"></i></p>
          </div>
          
        <!-- End Right Column -->
        </div>
        
      <!-- End Grid -->
      </div>
      
    <!-- End Page Container -->
    </div>
    <br>

    <!-- Footer -->
    <footer class="w3-container w3-theme-d3 w3-padding-16">
      <h5>Footer</h5>
    </footer>

    <footer class="w3-container w3-theme-d5">
      <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
    </footer>
  </div>
</template>

<script>
  import Posts from './Posts.ts'
  export default Posts
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
