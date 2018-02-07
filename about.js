// main document ready function to check if dom is loaded fully or not
 $( document ).ready(function() {
	
	$(".page2").hide();
	$("#aboutMe").on('click',function(){
		$(".check").show();
		$(".check2").hide();
		$("#work").css("display","none");
		$("#contact").css("display","none");
	});
	
	$("#feedInfo").on('click',function(){
		$(".check").hide();
		$(".check2").show();
	
	});
	$("#goBack").on('click',function(){
		$(".page2").hide();
		$(".page1").show();
		$("#loginForm").css("display","none");
	});
	
   $(".test1").on('click',function(){
	// var myFacebookToken = 'EAACEdEose0cBAIaFBsQZBMdfZCnnEhgIOZCUGwCHt9v5v6xSMOVJCjOs9y6FjeX3iiDXliw6MdFbebOCa7OMViK9R2AoZCWZB3WEB8wNsT8EGcrOojGrxFqZBc2MtzGItZA1zyISmFsRrPBwwV9nyvh8MktJi4zcMY6OoEUvSdLSmQHChv1wcAU2dhztmZCRh74QG6tFTQcSuQZDZD';

	$(".page1").hide();
	$(".page2").show();
	$(".check").hide();
	$(".check2").hide();
	var myFacebookToken = $("#acsTkn").val();
         $.ajax('https://graph.facebook.com/me?fields=posts{created_time,type,full_picture,story,message,source},picture.width(250).height(250),id,name,first_name,last_name,birthday,about,hometown,languages,gender,education,work,relationship_status,quotes,family,website,email,cover.width(815).height(320)&access_token='+myFacebookToken,{

		
                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
					$(".coverPic").attr("src", "" + response.cover.source + "");  //cover Photo
          
					$(".profilePic").attr("src", "" + response.picture.data.url + "");// Profile photo
					
					$("#myName").text(response.name); // Name
					
					$("#myFacebookId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>'); //facebook Id
					
					$("#myGender").text(response.gender); // gender
					
					$("#myBirthday").text(response.birthday); //birthday
					
					$("#myEmail").text(response.email);//email
					
					var myWork = $.map(response.work, function(x) //work: data is in array  
					
					{
						return x.employer.name;
					});
					$("#myWork").text(myWork);
					
					var myEducation = $.map(response.education, function(x) 
					{
						return x.school.name;
					});
					$("#myEducation").text(myEducation);
					
					$("#myHomeTown").text(response.hometown.name);
					
					$("#myWebsite").text(response.website);
					
					var myFeed = $.map(response.posts.data, function(x) 
					{
						//return x.type;
						
							if (x.type == "status") {
								return x.story + "<br>" + x.message +"<br>"+"<hr>"+"<br>";
							
							  }

							  //for photo
							  else if (x.type == "photo") {
								  var image = x.story +"<br>" + "<img src=" + x.full_picture+">" +"<br>"+"<hr>"+"<br>";
								  
								  return image;
								
							  }

							  //for video
							  else if (x.type == "video") {
								  var video= x.story +"<br>" + "<video controls> <source src" + x.source + "type="+"video/mp4"+"></video>"+"<br>"+"<hr>"+"<br>"
								  return video;
								
							  }
										
						
					});
					$("#myFeed").html(myFeed); //load recent post into #myFeed;
					
                }
	      
            }//end argument list 

			

        );// end ajax call 
	
	
	});
  
 
	// modal 
	var modal = document.getElementById('loginForm');

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	//when the user click on first login button 
	$("#loginButton").on('click',function(){
		$("#loginForm").css("display","block");
	});

	$("#cancelBtn").on('click',function(){
		$("#loginForm").css("display","none");
	});


	//when the user click on anytab of about section 
	$("#home").on('click',function(){
		$(".check").hide();
		$(".check2").hide();
	});
	
	$(".tabOverview").on('click',function(){
		$("#overview").css("display","block");
		$("#work").css("display","none");
		$("#contact").css("display","none");
		$(".tabOverview").addClass('active');
		$(".tabWork").removeClass('active');
		$(".tabContact").removeClass('active');
	});

	$(".tabWork").on('click',function(){
		$("#overview").css("display","none");
		$("#work").css("display","block");
		$("#contact").css("display","none");
		$(".tabWork").addClass('active');
		$(".tabOverview").removeClass('active');
		$(".tabContact").removeClass('active');
	});

	$(".tabContact").on('click',function(){
		$("#overview").css("display","none");
		$("#work").css("display","none");
		$("#contact").css("display","block");
		$(".tabContact").addClass('active');
		$(".tabWork").removeClass('active');
		$(".tabOverview").removeClass('active');
	});

});