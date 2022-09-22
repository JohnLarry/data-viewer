# Implementation Details

-  Variables
-  displayedData - holds the results received from api request;
-  current_url - holds the current url that will be used for api request
-  next_url - holds the value of next page url
-  previous_url - holds the value of previous page url
-  current_page - holds the value of current page on the ui
-  next_page - holds the value of the next page
-  previous_page - holds the value of the previous page
-  lastItem - true next or previous page data is on the localstorage
-  prevBtn is disabled on first load
-  prevBtn is disabled when prevBtn is clicked and the currentPage is "2"
-  Since a single api request always returns two pages, there was a need improve the user experience by making the next page load faster.I achieved this by saving the results from the api in local storage and checking if the data exist and then update the ui or making a new api request if the current requested page does not exist on the localstorage and update the ui
-  This made the app very fast, saved resouces because
  the amount of api request to be sent to the server has been reduced by 50%.
-  previous_page, current_page, next_page variables are used to keep track of the
  pages so that the correct page can be selected from the localstorage.
-  prev_url and next_url variable is used to store the previous_url and next_url received
  from api request and updated accordingly when prevBtn or nextBtn is clicked
-  loadNext function loads the next page when nextBtn is clicked and loadPrev function
  loads the previous page when prevBtn is clicked
-  updateData function updates the ui
-  getData function takes a url and return the result
-  next_url and prev_url is updated after each api request
-  On initial page load, current_url which is passed to the getData function is
-  "https:// randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84" which loads page 1
-  current_url is subsequently resassigned under the movePrev and moveNext function

## How it works

-  It makes an api request and load page 1 after the initial page load
-  When Next button is clicked, the moveNext function checks if the current page is displaying the last array of the results from initial api request
-  if true, which means that next_page data is not on the localstorage, next_url is passed to getData and the new page ui is updated and also the api result is saved to localstorage
-  if false, which means the next_page data is on the localstorage, the next_page data is loaded from the local storage and the ui updated
-  When Previous button is clicked, the movePrev function checks if the current page is displaying the last array of the results from initial api request
-  if false which means that previous_page data is not on the localstorage, prev_url is passed to getData and the new page ui is updated and also the api result is saved to localstorage
-  if true, which means the previous_page data is on the localstorage, the previous_page data is loaded from the local storage and the ui updated
