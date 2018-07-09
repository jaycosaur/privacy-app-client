# Client side application of Polity by ExamineChange.
### A web-based legal technology that tracks and alerts you of policy changes, analyses and measures public sentiment and dialogue on important issues, and allows advocacy groups, non-for-profits, and researchers to put their finger on the pulse and engage broadly with citizens.

***

## How to Run

`npm install --save` to install package dependencies

`npm run` to run on localhost:3000

`npm build` to package

`npm run deploy` to deploy to firebase hosting

## Notes

In firebase for schema, should have time travel so 'snapshot' each time it updates and save. 

When something updates, update algolia with record updation 'date' only, make an array attribute and put this in. 

Allows searching over date ranges then, as in algolia if you do a range search it will iterate over an array until a record matches.

This will also allow the search page to extract 'updated' results, by just highlighting records that have changed since last login.

