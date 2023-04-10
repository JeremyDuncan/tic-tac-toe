export function send_ga4_event() {
  const email_time_stamp = Math.floor(Date.now() / 1000);
  const event_name = `CDN_EVENT_TEST_${email_time_stamp}`;
  gtag("event", `${event_name}`, {});
}
