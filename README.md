This app pulls live coin data from the coinbase api and displays in an interactive dashboard.
This app was made using NextJs, Typescript,  Highcharts stock, Axios,  Vitest, ShadcnUi, HeadlessUI, Lucide 
The app is currently deployed to: https://coin-dashboard-iota.vercel.app/

## Getting Started
You can view the dashboard in action via https://coin-dashboard-iota.vercel.app/

else: 
you can run locall and add your own API keys (theyre not necessary for any of the data fetching but support for them has been built in)
1) clone this repo
2) install dependencies (yarn install/ npm install)
3) create a .env.local file in the root directory and add your coinbase api key there
    eg:  NEXT_PUBLIC_API_PASSPHRASE=<your api passphrase>
         NEXT_PUBLIC_API_SECRET=<your api secret>
         NEXT_PUBLIC_API_KEY=<your api key>
4) run the development server (yarn dev/npm run dev)
5) run unittests (yarn test)


