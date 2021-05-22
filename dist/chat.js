// API URL, workaround for CORS issue via proxy. Encountering 429 error using this via lite-server now, and the main API link still returns the CORS issue. 
// So, if on loading via lite-server the full page does not display, running it locally should still work.
const url = 'https://cors-anywhere.herokuapp.com/https://jsonkeeper.com/b/T39D';

fetch(url)
.then(response => response.json())
.then(data =>  {



// Setting the header date

        headerDate (getWeekDay(getDateNow(data.data.conversationDate).getDay()) + ', ' + getMonth(getDateNow(data.data.conversationDate).getMonth())+ ' ' + getDateNow(data.data.conversationDate).getDate() + ',' + ' ' + ((getDateNow(data.data.conversationDate).getYear()) + 1900))

        //Declaring the scope variable for user data

        const scope = data.data.messages;

        //Loop user data

        scope.forEach((i) => {

            let user = i;

            if (user.username == "Mygel van Trabel") {

                user1( user.focused, user.message, getTimeStamp(user.timestamp), user.username);

            } else {

                user2( user.focused, user.message, getTimeStamp(user.timestamp), user.username);

            }

        });

    }).catch(error => console.error(error));

	//Creating Chat logs for HTML for User1 

	const user1 = (focused, message, timestamp, username) =>  {

	//Appending the HTML template to the DOM for user1

 		__('chat').innerHTML += 

		 	'<div class="chat-log user1">' + 
	 		'<ul>' + '<li class="avatar">' + 
	 		'<img src="./img/user1.jpg" alt="Mygel van Trabel">' 
	 		+'</li>' + '<span class="chat_arrow_left"></span>' +
	 		'<li class="message">' +'<li class="message-box">' +
	 		'<p class="text"> ' + message + '</p>' +
	 		'<ul class="text-bottom">' +'<li class="user-name">' + username + '</li>' + '<li class="timestamp">' +
	 		'<ul>' + '<li class="clock-icon">' + 
	 		'<img src="./img/clock.png" alt="clock-icon">' + 
	 		'<li class="time">' + 
	 		'<p>' + timestamp + '</p>' + '</li>' +
	 		'</ul>' +'</li>' +'</ul>' +'</div>' +'</li>' +'</ul>' +
	 		'</div>';
	}

	//Creating Chat logs for HTML for User2

	const user2 = (focused, message, timestamp, username) => {
		
		if (focused == true) {
			var styleFocused  = ' box-shadow: 0 15px 50px 0 rgba(0,0,0,0.13); ' + 'background-color: #fff;';
			var styleArrow = 'border-right:10px solid #fff;';

		}

	//Appending the HTML template to the DOM for user2

 		__('chat').innerHTML += 

	 	'<div class="chat-log user2">' + '<ul>' +
		'<li class="avatar">' + 
		'<img src="./img/user2.jpg" alt="Charlie Hemn">' +
		'</li>' +'<span class="chat_arrow_right" style="'+ styleArrow +'"></span>' + '<li class="message">' +
		'<li class="message-box" style= " '+ styleFocused +'">' +'<p class="text"> ' + message + '</p>' +
		'<ul class="text-bottom">' +'<li class="timestamp">' +
		'<ul>' + '<li class="time">' + '<p>' + timestamp + 
		'</p>' + '</li>' +'<li class="clock-icon">' +
		'<img src="./img/clock.png" alt="clock-icon">' + 
		'<li class="user-name">' + username + '</li>' +
		'</ul>' + '</li>' + '</ul>' + '</div>' + '</li>' + 
		'</ul>' +
		'</div>';
	}
	 
	 //Setting the Title Date
	const headerDate = (date) => {
		__('header-date').innerHTML = date;
	}

	const getDateNow = (date) => {
		return new Date(date);
	}

	const getWeekDay = (week) => {
		
		let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

		return weekDays[week];
	}

	const getMonth = (month) => {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		return months[month];
	}

//Setting up timestamp for chat bubble

	const getTimeStamp = (time) => { 
		
		let timeNow = getDateNow(time);
		let hour = timeNow.getHours();
		let minute = timeNow.getMinutes();
		let day = 'AM';

		  if (hour   > 11) { day = "PM";            }
		  if (hour   > 12) { hour = hour - 12;      }
		  if (hour   == 0) { hour = 12;             }
		  if (hour   < 10) { hour   = " " + hour;   }
		  if (minute < 10) { minute = "0" + minute; }
		
		const timeStamp = hour + ':' + minute + " " + day;

		return timeStamp;
	}

	 // Setting up innerHTML

	const __ = (id) => {
		return document.getElementById(id);
	}
