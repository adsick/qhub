const activityOptions = document.querySelectorAll("[activity-option]");


// анимация на личной странице: выбор блоги/посты/комменты
activityOptions.forEach((item) => {
    item.addEventListener("click", (event) => {
      let $this = event.target;
      let optionId = $this.getAttribute("activity-option");
  
      //? нах мне это let clickedOption = document.getElementById(optionId)
  
      activityOptions.forEach((item) => {
        if (item.getAttribute("activity-option") == optionId){
            item.classList.add("--activity-block-chosen");

        }
          
        else item.classList.remove("--activity-block-chosen");
      });


    });
  });


  function loadMyBlogs(){

  }

  function loadMyPosts(){

  }

  function loadMyComments(){
      
  }