export function process_ga4_event(api_secret, measurement_id, client_id, user_id, event_name, timestamp_micros) {
  const url = `https://www.google-analytics.com/mp/collect?api_secret=${api_secret}&measurement_id=${measurement_id}`;
  const data = {
    client_id: client_id,
    user_id: user_id,
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

export function send_ga4_event() {
  // =======================================
  // Hardcoded API Secret and Measurement ID
  // ---------------------------------------
  const api_secret = '1LRtEZUgSvqo1fHbrdHbiQ';   // REQUIRED
  const measurement_id = 'G-Q9LCMKMV42';         // REQUIRED
  const client_id = '12345';                     // REQUIRED
  const user_id = '2020';                        // OPTIONAL
  console.log("api_secret => ", api_secret)
  console.log("measurement_id => ", measurement_id)
  console.log("client_id => ", client_id)
  console.log("user_id => ", user_id)

  // ==============
  // Timing Section
  // --------------
  const email_time_stamp = Math.floor(Date.now() / 1000);
  const ga4_time_stamp = Math.floor(email_time_stamp * 1_000_000);
  const event_name = `CT_F_GA4_CUSTOM_EVENT_TEST_${email_time_stamp}`;
  console.log("email_time_stamp => ", email_time_stamp)
  console.log("ga4_time_stamp => ", ga4_time_stamp)
  console.log("event_name => ", event_name)


  process_ga4_event(api_secret,
                    measurement_id,
                    client_id,
                    user_id,
                    event_name,
                    ga4_time_stamp,
                    );
}