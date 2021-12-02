# article_coverage
Using Google Search Query parameters and Puppeteer to check how many results are returned for a specific newspaper, over a time interval.

The idea is to make use of the *site*, *after* and *before* parameters in a google search (see: https://support.google.com/websearch/answer/2466433?hl=en) to quickly get a grasp of how much an issue is being talked about in a specific set of newspapers. As in the example below:

<img src="about_x_results.png"></img>

This could be adapted for SEO purposes if the "About X results" section is found to be a trustworthy indicator. Also I have found results to be sensitive to the browser choice. This implementation uses Chromium which is the default browser for Puppeteer.


## Usage

Install the modules from the package-lock.json file.

Then just run:

```
node coverage.js
```

And check results in the **results_covid.json** file!