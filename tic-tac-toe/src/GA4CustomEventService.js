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

// =============================================================================
// Sends required GA4 data to be processed
// -----------------------------------------------------------------------------
export function send_ga4_event() {
  // =======================================
  // Hardcoded API Secret and Measurement ID
  // ---------------------------------------
  const api_secret = '1LRtEZUgSvqo1fHbrdHbiQ';   // REQUIRED
  const measurement_id = 'G-Q9LCMKMV42';         // REQUIRED
  const client_id = getCookie('_ga')             // REQUIRED
  console.log("api_secret => ", api_secret)
  console.log("measurement_id => ", measurement_id)
  console.log("client_id => ", client_id)

  // ==============
  // Timing Section
  // --------------
  const marked_time = Date.now()
  const email_time_stamp = Math.floor(marked_time / 1000);
  const ga4_time_stamp = marked_time * 1000;
  const event_name = `CT_F_GA4_CUSTOM_EVENT_TEST_${email_time_stamp}`;
  console.log("email_time_stamp => ", email_time_stamp)
  console.log("ga4_time_stamp => ", ga4_time_stamp)
  console.log("event_name => ", event_name)


  process_ga4_event(api_secret,
                    measurement_id,
                    client_id,
                    event_name,
                    ga4_time_stamp,
                    );
}
