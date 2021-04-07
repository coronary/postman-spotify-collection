auth_request = {
  id: "auth",
  name: "OAuth",
  description: "starter auth request",
  request: {
    url: {
      raw: "https://accounts.spotify.com/authorize",
      protocol: "https",
      host: ["accounts", "spotify", "com"],
      path: ["authorize"],
      query: [
        {
          value: "token",
          key: "response_type",
          description: "REQUIRED",
          type: "String",
        },
        {
          value: "https://oauth.pstmn.io/v1/browser-callback",
          key: "redirect_uri",
          description: "REQUIRED",
          type: "String",
        },
        {
          value: "",
          key: "client_id",
          description: "REQUIRED",
          type: "String",
        },
        {
          value: "",
          key: "scope",
          description: "REQUIRED",
          type: "String",
        },
      ],
    },
  },
};

base_info = {
  info: {
    name: "Spotify",
    schema:
      "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
  },
};
auth = {
  type: "bearer",
  bearer: {
    token: "{{bearerToken}}",
  },
};
header = [
  {
    key: "Content-Type",
    value: "application/json",
  },
];
module.exports = {
  auth_request,
  base_info,
  auth,
  header
};
