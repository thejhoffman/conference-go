window.addEventListener('DOMContentLoaded', async () => {
  const payloadCookie = await cookieStore.get("jwt_access_payload");

  if (payloadCookie) {
    const encodedPayload = payloadCookie.value;
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);

    if (payload.user.perms.includes("events.add_location")) {
      const locationLink = document.querySelector('a[href="new-location.html"]');
      locationLink.classList.remove('d-none');
    }

    if (payload.user.perms.includes("events.add_conference")) {
      const conferenceLink = document.querySelector('a[href="new-conference.html"]');
      conferenceLink.classList.remove('d-none');
    }

  }
});
