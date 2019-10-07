/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("feed has URL", function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("feed has name", function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* New test suite named "The menu" */
    describe('The menu', function () {
        /* This test ensures the menu element is
         * hidden by default by checking for the class "menu-hidden" on the body
         */
        it('is hidden', function () {
            const body = document.querySelector("body");
            expect(body.classList.contains("menu-hidden")).toBe(true);
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it("changes when clicked", function () {
            const body = document.querySelector("body");
            const icon = document.querySelector(".menu-icon-link");

            icon.click();
            expect(body.classList.contains("menu-hidden")).toBe(false);
            icon.click();
            expect(body.classList.contains("menu-hidden")).toBe(true);
        });

    })

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* This test ensures that when the loadFeed
         * function is called and completes its work, that there is at least
         * a single .entry element within the .feed container.
         * This is performed asynchronous.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it("completes work", function () {
            const entry = document.querySelectorAll(".feed .entry");
            expect(entry.length > 0).toBe(true);
        });
    });
    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * This is performed asynchronous.
         */
        let previousFeed,
            newFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                // gets initial Feed and saves it in a variable
                previousFeed = $('.feed').html();

                loadFeed(1, function () {
                    // gets new Feed and stores it in a variable
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });
        // checks if the previous Feed is not equal to the new Feed.
        it('changes content compared to previous Feed', function () {
            expect(previousFeed).not.toEqual(newFeed);
        });
    });
}())
