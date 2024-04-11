# PagerDuty Events Parser
PagerDuty Events Parser will take a csv file containing events from PagerDuty and remove regular expression in the Title column pointing to Team invoking the event.
The script will add the theam info as a new column and write back to an csv file called output.csv

#Setup
Run in node
download the csv file containing PagerDuty Events locally

#Install dependencies
Install node https://nodejs.org/en/learn/getting-started/how-to-install-nodejs locally on you comptuter
npm install csv-parser
npm install json2csv

#Run the script
node pdEventsParser3.js <csv-file>

#Result
The script will write updated information in 'output.csv' in local catalogue.


