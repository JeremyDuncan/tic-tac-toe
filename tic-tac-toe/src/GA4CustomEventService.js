// const { gtag } = window;

// =============================================================================
// Pulls Cookie data from user's browser to be utilized for Client ID
// -----------------------------------------------------------------------------
function getCookie(name) {
  if (document.cookie) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) { 
      const result = parts.pop().split(';').shift();
      const client_info = result.split('.').slice(-2).join('.');
      return client_info;
    }
  } else {
    return "Cookies_Disabled";
  }
}

// =============================================================================
// Pulls Traffic Source data from user's browser to be utilized 
// -----------------------------------------------------------------------------
function extractDomain(url) {
  let domain = null;
  // Find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }
  // Find & remove port number
  domain = domain.split(':')[0];
  // Find & remove query string
  domain = domain.split('?')[0];
  return domain;
}



// =============================================================================
// Processes the GA4 Event to be sent to Google Analytics
// -----------------------------------------------------------------------------
function process_ga4_event(api_secret, measurement_id, client_id, event_name, timestamp_micros) {
  const url = `https://www.google-analytics.com/mp/collect?api_secret=${api_secret}&measurement_id=${measurement_id}`;
  const data = {
    client_id: client_id,
    timestamp_micros: timestamp_micros,
    non_personalized_ads: false,
    events: [
      {
        name: event_name,
        params: {
          custom_timestamp: timestamp_micros
        }
      }
    ]
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode: 'no-cors'
  };
  return fetch(url, options);
}

// // =============================================================================
// // Sends required GA4 data to be processed
// // -----------------------------------------------------------------------------
// export function send_ga4_event() {
//   // =======================================
//   // Hardcoded API Secret and Measurement ID
//   // ---------------------------------------
//   const api_secret = '1LRtEZUgSvqo1fHbrdHbiQ';   // REQUIRED
//   const measurement_id = 'G-Q9LCMKMV42';         // REQUIRED
//   const client_id = getCookie('_ga')             // REQUIRED
//   console.log("api_secret => ", api_secret)
//   console.log("measurement_id => ", measurement_id)
//   console.log("client_id => ", client_id)

//   // ==============
//   // Timing Section
//   // --------------
//   const marked_time = Date.now()
//   const email_time_stamp = Math.floor(marked_time / 1000);
//   const ga4_time_stamp = marked_time * 1000;
//   const event_name = `CT_F_GA4_CUSTOM_EVENT_TEST_${email_time_stamp}`;
//   console.log("email_time_stamp => ", email_time_stamp)
//   console.log("ga4_time_stamp => ", ga4_time_stamp)
//   console.log("event_name => ", event_name)

  
//   // ==========================
//   // GTAG EVENTS ==============
//   // --------------------------
//   const gtag_event_name = `Manual_GTAG_CUSTOM_EVENT_TEST_${email_time_stamp}`;
//   gtag('event', `${gtag_event_name}`, {
//     'app_name': 'TEST_TIC_TAC_TOE_PAGE',
//     'screen_name': 'JEREMY DUNCAN',                                                 
//     'Measurement_ID': 'G-Q9LCMKMV42',                                 
//     'Random_Page_ID': Math.floor(Math.random() * 10000000000),          
//     'Client_ID': getCookie('_ga'),                                  
//     'Language': navigator.language,                                
//     'Screen_Resolution': `${window.screen.width}x${window.screen.height}`, 
//     'User_Agent_Architecture': navigator.userAgentData.architecture,              
//     'User_Agent_Bitness': navigator.userAgentData.bitness,                   
//     'UA_Full_Ver_List': navigator.userAgent,                            
//     'User_Agent_Mobileness': navigator.userAgentData.mobile,                   
//     'User_Agent_Model': navigator.userAgentData.model,                    
//     'User_Agent_Platform': navigator.platform,                               
//     'UA_Platform_Ver': navigator.userAgentData.platformVersion,     
//     'WOW64': navigator.userAgentData.wow64,                                                         
//     'Request_Number': Math.floor(Math.random() * 10000000000),            
//     'Session_ID': Date.now(),                                                                            
//     'Page_Location': window.location.href, 
//     'Page_Referrer': document.referrer, 
//     'Page_Title': document.title, 
//     'Source': extractDomain(document.referrer), 
//     'Landing_Page': window.location.href,
//     'OS': navigator.userAgentData.os, 
//     'Device': navigator.userAgentData.model 
//   });



//   process_ga4_event(api_secret,
//                     measurement_id,
//                     client_id,
//                     event_name,
//                     ga4_time_stamp,
//                     );
// }

const { gtag } = window;
export function send_ga4_event() {
  const email_time_stamp = Math.floor(Date.now() / 1000);
  const event_name = `GTAG_CUSTOM_EVENT_TEST_${email_time_stamp}`;
  gtag('event', `${event_name}`, {});
}
