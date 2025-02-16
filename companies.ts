const companiesData = [
  {
    "name": "Uber",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
  },
  {
    "name": "Expedia",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Expedia_Logo_2023.svg"
  },
  {
    "name": "Twitter",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
  },
  {
    "name": "Nagarro",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Nagarro_logo_new.svg"
  },
  {
    "name": "SAP",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"
  },
  {
    "name": "Yahoo",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Yahoo%21_%282019%29.svg"
  },
  {
    "name": "Cisco",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg"
  },
  {
    "name": "Qualcomm",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Qualcomm-Logo.svg"
  },
  {
    "name": "tcs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg"
  },
  {
    "name": "Goldman Sachs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Goldman_Sachs_logo.svg"
  },
  {
    "name": "Yandex",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Yandex_logo.svg"
  },
  {
    "name": "ServiceNow",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg"
  },
  {
    "name": "Paypal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/PayPal_2024.svg"
  },
  {
    "name": "Coupang",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Coupang_logo.svg"
  },
  {
    "name": "VMware",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/09/Vmware-by-broadcom.svg"
  },
  {
    "name": "eBay",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg"
  },
  {
    "name": "ByteDance",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/07/ByteDance_logo_English.svg"
  },
  {
    "name": "Spotify",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/2024_Spotify_Logo.svg"
  },
  {
    "name": "Zillow",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Zillow_logo.svg"
  },
  {
    "name": "Flipkart",
    "image": "https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg"
  },
  {
    "name": "Coursera",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg"
  },
  {
    "name": "Roblox",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Roblox_Logo_2022.svg"
  },
  {
    "name": "LinkedIn",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg"
  },
  {
    "name": "Qualtrics",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Qualtrics_logo.svg"
  },
  {
    "name": "Tesla",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg"
  },
  {
    "name": "Twilio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg"
  },
  {
    "name": "Capital One",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/98/Capital_One_logo.svg"
  },
  {
    "name": "JPMorgan",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg"
  },
  {
    "name": "Morgan Stanley",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Morgan_Stanley_Logo_2024.svg"
  },
  {
    "name": "Samsung",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Samsung_Black_icon.svg"
  },
  {
    "name": "IBM",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    "name": "Atlassian",
    "image": "https://upload.wikimedia.org/wikipedia/en/c/c8/Atlassian.svg"
  },
  {
    "name": "Databricks",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png"
  },
  {
    "name": "Palantir Technologies",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/Palantir_Technologies_logo.svg"
  },
  {
    "name": "Rubrik",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Rubrik_Logo.svg"
  },
  {
    "name": "Epic Systems",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Epic_Systems.svg"
  },
  {
    "name": "Citadel",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/45/Citadel_LLC_Logo.svg"
  },
  {
    "name": "Square",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/81/Square_%28Block%2C_Inc.%29_Logo_08.2022.svg"
  },
  {
    "name": "Two Sigma",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Two_Sigma_logo.svg"
  },
  {
    "name": "Quora",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg"
  },
  {
    "name": "Affirm",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Affirm_logo.svg"
  },
  {
    "name": "Karat",
    "image": "https://karat.com/wp-content/themes/karat/assets/img/png/logo.png"
  },
  {
    "name": "Hotstar",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Disney%2B_Hotstar_2024.svg"
  },
  {
    "name": "Akuna Capital",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Dropbox_logo_2017.svg"
  },
  {
    "name": "Asana",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg"
  },
  {
    "name": "Codenation",
    "image": "https://codenation.org/wp-content/uploads/2023/04/CN_Logo_Black-01.png"
  },
  {
    "name": "Redfin",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Redfin_logo.png"
  },
  {
    "name": "Audible",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Audible_logo.svg"
  },
  {
    "name": "IXL",
    "image": "None"
  },
  {
    "name": "Pocket Gems",
    "image": "https://www.pocketgems.com/wp-content/themes/pocketgems/assets/images/pocket-gems-logo@2x.png"
  },
  {
    "name": "Houzz",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Houzz_logo_%282024%29.png"
  },
  {
    "name": "National Instruments",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/43/National_Instruments_logo_2020.svg"
  },
  {
    "name": "Booking.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg"
  },
  {
    "name": "Bloomreach",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Bloorch_logo_png.png"
  },
  {
    "name": "ZScaler",
    "image": "https://upload.wikimedia.org/wikipedia/en/f/fa/Zscaler_logo.svg"
  },
  {
    "name": "Clutter",
    "image": "None"
  },
  {
    "name": "Point72",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Point72logo.png"
  },
  {
    "name": "MachineZone",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Hm39422_created.svg"
  },
  {
    "name": "TripAdvisor",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/02/TripAdvisor_Logo.svg"
  },
  {
    "name": "endurance",
    "image": "None"
  },
  {
    "name": "Startup",
    "image": "None"
  },
  {
    "name": "Directi",
    "image": "https://www.directi.com/images/directi-logo-0b6a20d2.svg"
  },
  {
    "name": "Trexquant",
    "image": "None"
  },
  {
    "name": "HeavyWater",
    "image": "None"
  },
  {
    "name": "Lendingkart",
    "image": "None"
  },
  {
    "name": "CureFit",
    "image": "None"
  },
  {
    "name": "APT Portfolio",
    "image": "None"
  },
  {
    "name": "Adobe",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Adobe_Corporate_wordmark.svg"
  },
  {
    "name": "Facebook",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
  },
  {
    "name": "Splunk",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Splunk_logo.svg"
  },
  {
    "name": "Indeed",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Indeed_logo.svg"
  },
  {
    "name": "Reddit",
    "image": "https://upload.wikimedia.org/wikipedia/en/1/1f/Reddit_logo_2023.svg"
  },
  {
    "name": "Citrix",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/03/Citrix_Systems_logo.svg"
  },
  {
    "name": "Dropbox",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Dropbox_logo_2017.svg"
  },
  {
    "name": "Infosys",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"
  },
  {
    "name": "Robinhood",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/da/Robinhood_%28company%29_logo.svg"
  },
  {
    "name": "Arista Networks",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/99/Arista-networks-logo.svg"
  },
  {
    "name": "BlackRock",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/85/BlackRock_wordmark.svg"
  },
  {
    "name": "Works Applications",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%B9%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%BA%E7%A4%BE%E5%90%8D%E3%83%AD%E3%82%B4.jpg"
  },
  {
    "name": "TripleByte",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Crunchbase_wordmark_dark_blue.svg"
  },
  {
    "name": "Jane Street",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Jane_Street_Capital_Logo.svg"
  },
  {
    "name": "Sapient",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bc/PS_Logo_RGB.svg"
  },
  {
    "name": "Grab",
    "image": "https://upload.wikimedia.org/wikipedia/en/1/12/Grab_%28application%29_logo.svg"
  },
  {
    "name": "UiPath",
    "image": "https://upload.wikimedia.org/wikipedia/en/8/80/UiPath_2019_Corporate_Logo.png"
  },
  {
    "name": "Zoom",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/11/Zoom_Logo_2022.svg"
  },
  {
    "name": "Delivery Hero",
    "image": "https://upload.wikimedia.org/wikipedia/en/5/54/Delivery_Hero_food_delivery_logo.svg"
  },
  {
    "name": "Machine Zone",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Hm39422_created.svg"
  },
  {
    "name": "Mercari",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Mercari_logo_2018.svg"
  },
  {
    "name": "OT",
    "image": "https://www.otsolutionstech.com/wp-content/uploads/2024/10/Ot-Solutions-Tech-Logo-Main.png"
  },
  {
    "name": "redBus",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Redbus_logo.jpg"
  },
  {
    "name": "MindTickle",
    "image": "https://www.mindtickle.com/wp-content/uploads/2022/12/mindtickle-logo.png"
  },
  {
    "name": "Toptal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Toptal-Logo-Main-Colors_RGB.png"
  },
  {
    "name": "Activision",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/01/Activision.svg"
  },
  {
    "name": "Cashfree",
    "image": "None"
  },
  {
    "name": "edabit",
    "image": "None"
  },
  {
    "name": "JUSPAY",
    "image": "https://juspay.io/_astro/juspaylogo.Boq8x2qu.svg"
  },
  {
    "name": "Teradata",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Teradata_logo_%282024%29.svg"
  },
  {
    "name": "Fleetx",
    "image": "None"
  },
  {
    "name": "codeagon",
    "image": "None"
  },
  {
    "name": "Moonfrog Labs",
    "image": "https://moonfroglabs.com/wp-content/uploads/2020/11/logo-removebg-preview.png"
  },
  {
    "name": "Mahindra Comviva",
    "image": "https://www.comviva.com/wp-content/uploads/2020/01/logo@2x.png"
  },
  {
    "name": "Lybrate",
    "image": "None"
  },
  {
    "name": "Yodlee Infotech",
    "image": "None"
  },
  {
    "name": "Freshokartz",
    "image": "None"
  },
  {
    "name": "VMWare",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/09/Vmware-by-broadcom.svg"
  },
  {
    "name": "Rockstand",
    "image": "None"
  },
  {
    "name": "GreyOrange",
    "image": "https://www.greyorange.com/wp-content/uploads/2022/09/greyorange-logo.png"
  },
  {
    "name": "Wooker",
    "image": "None"
  },
  {
    "name": "Jabong",
    "image": "None"
  },
  {
    "name": "Taxi4Sure",
    "image": "None"
  },
  {
    "name": "Service Now",
    "image": "None"
  },
  {
    "name": "Philips",
    "image": "None"
  },
  {
    "name": "Knowlarity",
    "image": "None"
  },
  {
    "name": "Open Solutions",
    "image": "None"
  },
  {
    "name": "Kuliza",
    "image": "None"
  },
  {
    "name": "Vizury Interactive Solutions",
    "image": "None"
  },
  {
    "name": "Belzabar",
    "image": "None"
  },
  {
    "name": "Amazon",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },
  {
    "name": "Google",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
  },
  {
    "name": "Walmart Labs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg"
  },
  {
    "name": "Apple",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    "name": "Microsoft",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    "name": "Bloomberg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/56/Bloomberg_logo.svg"
  },
  {
    "name": "Oracle",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"
  },
  {
    "name": "Salesforce",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
  },
  {
    "name": "Wayfair",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/34/Wayfair_2024_logo.svg"
  },
  {
    "name": "Alation",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Bass_logo.svg"
  },
  {
    "name": "American Express",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
  },
  {
    "name": "Intel",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/85/Intel_logo_2023.svg"
  },
  {
    "name": "Intuit",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Intuit_Mint_new_logo.svg"
  },
  {
    "name": "Nvidia",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg"
  },
  {
    "name": "Wish",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/09/Wish_2022.svg"
  },
  {
    "name": "Snapchat",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Snap_Inc._logo.svg"
  },
  {
    "name": "C3 IoT",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Nokia_2023.svg"
  },
  {
    "name": "DoorDash",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "Pinterest",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg"
  },
  {
    "name": "Airbnb",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
  },
  {
    "name": "PayTM",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
  },
  {
    "name": "Docusign",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Ingram_Micro_logo_new.svg"
  },
  {
    "name": "Zenefits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d7/BambooHR_logo.svg"
  },
  {
    "name": "Twitch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Twitch_logo_2019.svg"
  },
  {
    "name": "Netflix",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  },
  {
    "name": "Lyft",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/General_Motors_%28logo_with_wordmark%2C_horizontal%29.svg"
  },
  {
    "name": "Mathworks",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "MAQ Software",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/57/Pfizer_%282021%29.svg"
  },
  {
    "name": "Visa",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
  },
  {
    "name": "Box",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/42/Jack_in_the_Box_2022_logo.svg"
  },
  {
    "name": "GoDaddy",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/GoDaddy_logo.svg"
  },
  {
    "name": "Barclays",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "Opendoor",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Zillow_logo.svg"
  },
  {
    "name": "Blizzard",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/Blizzard_Entertainment_Logo_2015.svg"
  },
  {
    "name": "Yelp",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Yelp_Logo.svg"
  },
  {
    "name": "Nutanix",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Flag_of_Belgrade%2C_Serbia.svg"
  },
  {
    "name": "Hulu",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Hulu_logo_%282018%29.svg"
  },
  {
    "name": "Pony.ai",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/80/Pony_Canyon_logo.svg"
  },
  {
    "name": "Swiggy",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/d4/Swiggy_Logo.svg"
  },
  {
    "name": "Cloudera",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Precisely_logo.svg"
  },
  {
    "name": "Garena",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Free_Fire_New_Logo.svg"
  },
  {
    "name": "Leap Motion",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/LeapFrog_Enterprises.svg"
  },
  {
    "name": "GSN Games",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Game_Show_Network_2018.svg"
  },
  {
    "name": "Netsuite",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Acumatica_New_Logo.svg"
  },
  {
    "name": "Gilt Groupe",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/04/Hudson%27s_Bay_Company_Official_Logo_2013.svg"
  },
  {
    "name": "Tencent",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Tencent_logo_2017.svg"
  },
  {
    "name": "Valve",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Valve_logo.svg"
  },
  {
    "name": "Accolite",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/40/Accolade_logo_1990s.svg"
  },
  {
    "name": "NetEase",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Quantic_Dream_2019_logo.svg"
  },
  {
    "name": "InMobi",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Aerospike_%28company%29_Logo.svg"
  },
  {
    "name": "Dunzo",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "Akamai",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg"
  },
  {
    "name": "Thumbtack",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Aerospike_%28company%29_Logo.svg"
  },
  {
    "name": "Zalando",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/About_You_logo.svg"
  },
  {
    "name": "Booking",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Kiwi.com_logo.svg"
  },
  {
    "name": "HBO",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg"
  },
  {
    "name": "Poshmark",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/Naver_Logotype.svg"
  },
  {
    "name": "Virtu Financial",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/48/Basketball_current_event.svg"
  },
  {
    "name": "United Health Group",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f3/UnitedHealth_Group_logo.svg"
  },
  {
    "name": "Postmates",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
  },
  {
    "name": "Traveloka",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg"
  },
  {
    "name": "Kakao",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Kakaoentlogo.svg"
  },
  {
    "name": "Media.net",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"
  },
  {
    "name": "DiDi",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/46/Didi_Chuxing.svg"
  },
  {
    "name": "Walmart",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg"
  },
  {
    "name": "Sumerge",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/VOX_logo.svg"
  },
  {
    "name": "JP Morgan",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg"
  },
  {
    "name": "DRW",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Blue_Bird_Logo.svg"
  },
  {
    "name": "C3.ai",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Realme_logo_SVG.svg"
  },
  {
    "name": "Dream11",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg"
  },
  {
    "name": "Nuro",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Kroger_%282021%29_logo.svg"
  },
  {
    "name": "Turvo",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/66/Bandeira_de_S%C3%A3o_Jos%C3%A9_dos_Campos.svg"
  },
  {
    "name": "Ajira",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Lost_main_title.svg"
  },
  {
    "name": "DJI",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/LogoHMSampoerna.svg"
  },
  {
    "name": "Brillio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Campari_Group_-_logo_%28Italy%2C_2008-%29.svg"
  },
  {
    "name": "Optum",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f3/UnitedHealth_Group_logo.svg"
  },
  {
    "name": "Whole Foods Market",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Whole_Foods_Market_201x_logo.svg"
  },
  {
    "name": "Unacademy",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Physics_wallah_logo.svg"
  },
  {
    "name": "TSYS",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Map_of_Georgia_highlighting_Muscogee_County.svg"
  },
  {
    "name": "NerdWallet",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "peak6",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Kit_left_arm.svg"
  },
  {
    "name": "Huwaei",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg"
  },
  {
    "name": "Huawei",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/20/Honor_Logo_%282020%29.svg"
  },
  {
    "name": "Sprinklr",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
  },
  {
    "name": "Duolingo",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Duolingo_logo_%282019%29.svg"
  },
  {
    "name": "AppDynamics",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Compuware_logo_2019.svg"
  },
  {
    "name": "Lucid",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Lucid_Motors_logo.svg"
  },
  {
    "name": "SoundHound",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Columbia_Pictures_logo.svg"
  },
  {
    "name": "Softwire",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "Tejas Network",
    "image": "None"
  },
  {
    "name": "CGI",
    "image": "None"
  },
  {
    "name": "Vimeo",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Liberty_Mutual_Insurance_logo.svg"
  },
  {
    "name": "Payu",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"
  },
  {
    "name": "Ola Cabs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Geely_Logo_2022.svg"
  },
  {
    "name": "Zoho",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Rclone_wide_logo.svg"
  },
  {
    "name": "24*7 Innovation Labs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Western_Electric_logo.svg"
  },
  {
    "name": "MetLife",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/MetLife_logo.svg"
  },
  {
    "name": "Housing.com",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Housing.com_logo.svg"
  },
  {
    "name": "SAP Labs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Alteryx_logo.svg"
  },
  {
    "name": "OYO Rooms",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/RitzCarlton.svg"
  },
  {
    "name": "Yatra.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Bharat_Jodo_Yatra_logo.svg"
  },
  {
    "name": "ABCO",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Alpha_Beta_logo_1990s.svg"
  },
  {
    "name": "Boomerang Commerce",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/83/Altafiber_logo_2022.svg"
  },
  {
    "name": "Wipro",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg"
  },
  {
    "name": "Cognizant",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg"
  },
  {
    "name": "Accenture",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg"
  },
  {
    "name": "Zillious",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg"
  },
  {
    "name": "Mobicip",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/97/Align_Technology_logo.svg"
  },
  {
    "name": "Veritas",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/03/Veritas_Technologies_logo.svg"
  },
  {
    "name": "Tesco",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Tesco_Logo.svg"
  },
  {
    "name": "Citicorp",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/The_Travelers_Companies.svg"
  },
  {
    "name": "Monotype Solutions",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/72/Segoe_UI_Example.svg"
  },
  {
    "name": "GE",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/ff/General_Electric_logo.svg"
  },
  {
    "name": "IgniteWorld",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"
  },
  {
    "name": "KLA Tencor",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Flag_of_San_Jos%C3%A9%2C_California.svg"
  },
  {
    "name": "Groupon",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg"
  },
  {
    "name": "nearbuy",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
  },
  {
    "name": "Synopsys",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/95/MIPS_Logo_v2.0_Final_Primary.svg"
  },
  {
    "name": "BrowserStack",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d5/I_Love_New_York.svg"
  },
  {
    "name": "CouponDunia",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Sharp_Corporation.svg"
  },
  {
    "name": "Cadence India",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/10/Marvel_Studios_2016_logo.svg"
  },
  {
    "name": "FreeCharge",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
  },
  {
    "name": "Amdocs",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Amdocs-2017-brand-mark.svg"
  },
  {
    "name": "One97",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
  },
  {
    "name": "Fab.com",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"
  },
  {
    "name": "Quikr",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Kijiji_%28ca%29_Logo_2019.svg"
  },
  {
    "name": "Juniper Networks",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/46/Hewlett_Packard_Enterprise_logo.svg"
  },
  {
    "name": "Pubmatic",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Kidoodle_TV_Logo.svg"
  },
  {
    "name": "InfoEdge",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2f/ABC-2021-LOGO.svg"
  },
  {
    "name": "Xome",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg"
  },
  {
    "name": "Times Internet",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "Opera",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Opera_2015_logo.svg"
  },
  {
    "name": "Code Brew",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Miller_Brewery_Logo.svg"
  },
  {
    "name": "Grofers",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg"
  },
  {
    "name": "PayPal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e5/PayPal_Honey_logo.svg"
  },
  {
    "name": "PropTiger",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Housing.com_logo.svg"
  },
  {
    "name": "Dell",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg"
  },
  {
    "name": "Polycom",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/Thyssenkrupp_AG_Logo_2015.svg"
  },
  {
    "name": "Cavisson System",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_BMW_Group_2021.svg"
  },
  {
    "name": "Capgemini",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Capgemini_logo.svg"
  },
  {
    "name": "HCL",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e5/HCLTech-new-logo.svg"
  },
  {
    "name": "Zycus",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Aegon_Logo_2023.svg"
  },
  {
    "name": "Komli Media",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Britannia_Industries_logo.svg"
  },
  {
    "name": "Infinera",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Nokia_2023.svg"
  },
  {
    "name": "Junglee Games",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg"
  },
  {
    "name": "Zomato",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg"
  },
  {
    "name": "HunanAsset",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Petrochina_logo.svg"
  },
  {
    "name": "Bidgely",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg"
  },
  {
    "name": "TCS",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg"
  },
  {
    "name": "HRT",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/HRT_Primary_Logo_-_Full_Color.png"
  },
  {
    "name": "DE Shaw",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/62/D._E._Shaw_%26_Co._Logo.svg"
  },
  {
    "name": "LiveRamp",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/LiveRamp-logo.png"
  },
  {
    "name": "Alibaba",
    "image": "https://upload.wikimedia.org/wikipedia/en/8/80/Alibaba-Group-Logo.svg"
  },
  {
    "name": "Sumologic",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Sumo_Logic_Logo.svg"
  },
  {
    "name": "Pure Storage",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Pure-storage-vector-logo.svg"
  },
  {
    "name": "Airtel",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg"
  },
  {
    "name": "FactSet",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/41/FactSet_wordmark.svg"
  },
  {
    "name": "Microstrategy",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/31/MicroStrategy_logo.svg"
  },
  {
    "name": "Rupeek",
    "image": "https://assets.rupeek.com/website/images/atl-refresh/logo-new.svg"
  },
  {
    "name": "Arcesium",
    "image": "https://www.arcesium.com/_next/image?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F8279000be2e444159cf06fa2a0d2c664%252Fd48a2a9dae8f47c78ecc5cf771cc41db&w=384&q=75&dpl=dpl_FPcUNZCRb9p3nga2P2hfZw9yNxme"
  },
  {
    "name": "Hike",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/05/Hike_Messenger_logo.svg"
  },
  {
    "name": "MakeMyTrip",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Makemytrip_logo.svg"
  },
  {
    "name": "Paytm",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
  },
  {
    "name": "Snapdeal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Snapdeal_new_official_logo.png"
  },
  {
    "name": "AllinCall",
    "image": "None"
  },
  {
    "name": "CoderByte",
    "image": "https://coderbytestaticimages.s3.amazonaws.com/dashboard-v3/coderbyte_logo_digital_white.png"
  },
  {
    "name": "D-E-Shaw",
    "image": "https://coderbytestaticimages.s3.amazonaws.com/dashboard-v3/coderbyte_logo_digital_white.png"
  },
  {
    "name": "Netskope",
    "image": "https://www.netskope.com/wp-content/themes/netskope/images/v3/netskope-logo-reverse.svg"
  },
  {
    "name": "Kritikal Solutions",
    "image": "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://kritikalsolutions.com/wp-content/uploads/2022/12/KritiKal-Logo-Black.png"
  },
  {
    "name": "BankBazaar",
    "image": "https://static.bankbazaar.com/images/bankbazaar-logo.svg"
  },
  {
    "name": "Myntra",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/d5/Myntra_logo.png"
  },
  {
    "name": "Linkedin",
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg"
  },
  {
    "name": "PlaySimple",
    "image": "None"
  },
  {
    "name": "CarWale",
    "image": "None"
  },
  {
    "name": "Motlay",
    "image": "None"
  },
  {
    "name": "Brocade",
    "image": "None"
  },
  {
    "name": "OATS Systems",
    "image": "None"
  },
  {
    "name": "Drishti-Soft",
    "image": "None"
  },
  {
    "name": "TinyOwl",
    "image": "None"
  },
  {
    "name": "HSBC",
    "image": "None"
  },
  {
    "name": "Target Corporation",
    "image": "None"
  },
  {
    "name": "Streamoid Technologies",
    "image": "None"
  },
  {
    "name": "Informatica",
    "image": "None"
  },
  {
    "name": "Zopper",
    "image": "None"
  },
  {
    "name": "Medlife",
    "image": "None"
  },
  {
    "name": "Oxigen Wallet",
    "image": "None"
  },
  {
    "name": "Dailyhunt",
    "image": "None"
  },
  {
    "name": "Unisys",
    "image": "None"
  }
]
export default companiesData