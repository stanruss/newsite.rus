$(document).ready(function() {
 
    var lastId,
    topMenu = $(".nav-collapse"),
    topMenuHeight = 0,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      
      if (item.length) { 
         return item; 
      }
    });

    
    
    // Bind to scroll
    $(window).scroll(function(){
      // Get container scroll position
      var fromTop = $(this).scrollTop()+topMenuHeight;
       
      // Get id of current scroll item
      var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
          return this;
      });
      
      changeNavMenu();
    });

});

function changeNavMenu(){
  if($(window).width()>240)
  {
    if ($(window).scrollTop() > 1)
    {
      $('.navbar-default, .logo').addClass("sticky");        
    }
    else 
    {
      $('.navbar-default, .logo').removeClass("sticky");
    } 
  }
  else {
    $('.navbar-default, .logo').removeClass("sticky");
  }
}




