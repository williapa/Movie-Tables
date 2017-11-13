# Movie Tables

## About

Movie tables is a web scraping chrome extension that allows you to specify data-scraping scripts to inject into pages. The data is saved
to the browser's local storage to be aggregated and presented by a single page application, also served by the chrome extension. Extensions can
integrate with other backend services just like any other web applications.

## Advantages

1) Reduced Network Dependency. 
	Network is only needed for scraping. All other assets (js, css, html, data storage) live as static resources inside your browser. Installation
	is as simple as adding the directory to your browser. More importantly, there's no need to set up (Or pay for) databases & servers. 

2) Avoids Complications of Selenium. 
	Scraping approaches using selenium are different from your browser's user experience. With Selenium, you write instructions selenium 
	server interprets and sends to the browser, sometimes not running on the same hardware. Lots of work done just to pass messages along. A chrome extension
	lets you perform automation with your browser, your permissions, as if it was really you - beneficial for authentication purposes. 
	Don't worry about having to put your password or dubious security hacks into your scripts. 

3) Does More With Less Code.
	Using a browser extension lets you cut out the middle-men: replace selenium & backend server.
	Saving data in local storage lets your data persist offline, still allowing CSV download or database upload.
	Result: Does More With Less Code.
